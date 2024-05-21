import React, { useRef } from "react";
import "./Schedule.css"; // Ensure this CSS file is in the same directory

import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";
// Helper function to map day names to grid column numbers
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// List of colors to alternate between
const colors = ["#E0FBE2", "#BFF6C3", "#B0EBB4", "#ACE1AF"];

export default function RoomPlanning({ data }) {
  const location = useLocation();
  const { seances, result, teacherInfos } = location.state || {};

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Example usage
  const planningData = {
    status: "success",
    result: 2,
    roomPlanning: [
      {
        roomPlanning: [
          {
            seanceDay: "Wednesday",
            startHour: "08:00",
            endHour: "10:00",
            seanceType: "Tp",
            subject: "BDD",
            group: "gr3",
          },
          {
            seanceDay: "Wednesday",
            startHour: "10:00",
            endHour: "12:00",
            seanceType: "Tp",
            subject: "IGL",
            group: "gr3",
          },
          {
            seanceDay: "Sunday",
            startHour: "13:00",
            endHour: "13:30",
            seanceType: "Tp",
            subject: "BDD",
          },
          {
            seanceDay: "Tuesday",
            startHour: "09:00",
            endHour: "10:00",
            seanceType: "Cours",
            subject: "BDD",
          },
        ],
        from: "2023-09-01T00:00:00.000Z",
        to: "2024-12-31T00:00:00.000Z",
      },
      {
        roomPlanning: [
          {
            seanceDay: "Sunday",
            startHour: "08:00",
            endHour: "10:00",
            seanceType: "Cours",
            subject: "BDD",
          },
          {
            seanceDay: "Sunday",
            startHour: "10:00",
            endHour: "12:00",
            seanceType: "Cours",
            subject: "BDD",
          },
          {
            seanceDay: "Sunday",
            startHour: "14:00",
            endHour: "16:00",
            seanceType: "Tp",
            subject: "BDD",
          },
          {
            seanceDay: "Monday",
            startHour: "14:00",
            endHour: "16:00",
            seanceType: "Tp",
            subject: "BDD",
          },
          {
            seanceDay: "Monday",
            startHour: "10:00",
            endHour: "12:00",
            seanceType: "Tp",
            subject: "BDD",
          },
        ],
        from: "2025-01-10T00:00:00.000Z",
        to: "2025-04-10T00:00:00.000Z",
      },
    ],
  };

  const currentDate = new Date();

  // Filter the planning data to include only the current planning
  const currentPlanning = planningData.roomPlanning.filter((planning) => {
    const fromDate = new Date(planning.from);
    const toDate = new Date(planning.to);
    return currentDate >= fromDate && currentDate <= toDate;
  });

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
            justifyContent: "Center",
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
                    // Check if the current cell is already occupied
                    const occupiedKey = `${day}-${rowIndex}`;
                    if (occupiedCells[occupiedKey]) {
                      return null; // Skip this cell
                    }

                    // Find the session that should be placed at the current time and day
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

                      // Mark cells as occupied
                      for (let i = 0; i < rowSpan; i++) {
                        occupiedCells[`${day}-${rowIndex + i}`] = true;
                      }

                      // Use alternating colors
                      const sessionColor = colors[colorIndex];
                      colorIndex = (colorIndex + 1) % colors.length;

                      return (
                        <td
                          key={day}
                          rowSpan={rowSpan}
                          style={{
                            backgroundColor: sessionColor,
                            // border: "1px solid #000",
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
          {/* <div className="notes-section">Notes:</div> */}
        </div>
      </div>
    </div>
  );
}
