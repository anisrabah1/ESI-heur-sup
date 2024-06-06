import React, { useRef, useState, useEffect } from "react";
import "./Schedule.css"; // Ensure this CSS file is in the same directory

import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import apiUrl from "../global_Vars/apiConfig";

import { useLocation } from "react-router-dom";

// Helper function to map day names to grid column numbers
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// List of colors to alternate between
const colors = ["#E0FBE2", "#BFF6C3", "#B0EBB4", "#ACE1AF"];

export default function RoomPlanning({ departmentId, roomId }) {
  const location = useLocation();
  const { seances, result, teacherInfos } = location.state || {};
  const [planningData, setPlanningData] = useState(null);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Hello from the useEffect");

        const token = Cookies.get("token");
        const response = await fetch(
          `http://${apiUrl}:3000/api/v1/departments/${departmentId}/rooms/${roomId}/planning`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok || !data) {
          throw new Error(data.message || "Server Error");
        }

        setPlanningData(data);
        console.log("Data fetched successfully:", data.roomPlanning);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date("2024-12-01");

  const currentPlanning =
    planningData?.roomPlanning.filter((planning) => {
      const fromDate = new Date(planning.from);
      const toDate = new Date(planning.to);
      return currentDate >= fromDate && currentDate <= toDate;
    }) || [];

  if (currentPlanning.length === 0) {
    return <div>No current planning available</div>;
  }

  // Helper functions
  const findTimeIndex = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return (hour - 8) * 2 + minute / 30;
  };

  const calculateRowSpan = (start, end) => {
    return findTimeIndex(end) - findTimeIndex(start);
  };

  // Generate time labels
  const times = [];
  for (let hour = 8; hour < 17; hour++) {
    times.push(`${hour}:00 - ${hour}:30`, `${hour}:30 - ${hour + 1}:00`);
  }

  // Track occupied cells to handle row spans
  const occupiedCells = {};
  let colorIndex = 0;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 22px",
        }}
      >
        <h2>Aperçu Planning des classes</h2>
        <div
          onClick={handlePrint}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="icon-print"
        >
          <FontAwesomeIcon icon={faPrint} beat size="xl" />
          <div
            style={{ fontSize: "12px", fontWeight: "600", marginTop: "4px" }}
            className="text-print"
          >
            imprimer
          </div>
        </div>
      </div>
      <hr />
      <div ref={componentRef}>
        <div className="schedule-container">
          <div className="schedule-header">
            <h1>Room Schedule</h1>
            <div className="schedule-info">
              <div>Name: {}</div>
              <div>Class: {}</div>
            </div>
          </div>
          <table className="schedule-table">
            <thead>
              <tr>
                <th style={{ minWidth: "90px" }}>TIME</th>
                {daysOfWeek.map((day) => (
                  <th key={day}>{day.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, rowIndex) => (
                <tr key={time}>
                  <td>{time}</td>
                  {daysOfWeek.map((day) => {
                    const occupiedKey = `${day}-${rowIndex}`;
                    if (occupiedCells[occupiedKey]) {
                      return null;
                    }

                    const session = currentPlanning[0].roomPlanning.find(
                      (session) => {
                        const startIndex = findTimeIndex(session.startHour);
                        return (
                          session.seanceDay === day && startIndex === rowIndex
                        );
                      }
                    );

                    if (session) {
                      const rowSpan = calculateRowSpan(
                        session.startHour,
                        session.endHour
                      );

                      for (let i = 0; i < rowSpan; i++) {
                        occupiedCells[`${day}-${rowIndex + i}`] = true;
                      }

                      const sessionColor = colors[colorIndex];
                      colorIndex = (colorIndex + 1) % colors.length;

                      return (
                        <td
                          key={day}
                          rowSpan={rowSpan}
                          style={{
                            backgroundColor: sessionColor,
                            textAlign: "center",
                          }}
                        >
                          {session.subject} ({session.seanceType}) -{" "}
                          {session.group}
                        </td>
                      );
                    } else {
                      return <td key={day}></td>;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
