import React, { useRef } from "react";
import "./GroupPlanning.css"; // Make sure to create and link this CSS file
// PrintPreview.js
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

import { useLocation } from "react-router-dom";

// Helper component to render a single session row
const SessionRow = ({
  seanceDay,
  startHour,
  endHour,
  seanceType,
  subject,
  room,
}) => (
  <tr>
    <td>{seanceDay}</td>
    <td>{startHour}</td>
    <td>{endHour}</td>
    <td>{seanceType}</td>
    <td>{subject}</td>
    <td>{room}</td>
  </tr>
);

// Main component to render the group planning
export default function GroupPlanning({ data }) {
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
    groupPlanning: [
      {
        groupPlanning: [
          {
            seanceDay: "Wednesday",
            startHour: "03:00",
            endHour: "08:00",
            seanceType: "Tp",
            subject: "BDD",
            room: "Salle 2",
          },
          {
            seanceDay: "Wednesday",
            startHour: "01:00",
            endHour: "02:00",
            seanceType: "Tp",
            subject: "IGL",
            room: "Salle 2",
          },
        ],
        from: "2023-09-01T00:00:00.000Z",
        to: "2024-12-31T00:00:00.000Z",
      },
      {
        groupPlanning: [
          {
            seanceDay: "Sunday",
            startHour: "08:00",
            endHour: "10:00",
            seanceType: "Cours",
            subject: "BDD",
            room: "Salle 2",
          },
          {
            seanceDay: "Sunday",
            startHour: "10:00",
            endHour: "12:00",
            seanceType: "Cours",
            subject: "BDD",
            room: "Salle 2",
          },
          {
            seanceDay: "Sunday",
            startHour: "14:00",
            endHour: "16:00",
            seanceType: "Tp",
            subject: "BDD",
            room: "Salle 2",
          },
          {
            seanceDay: "Monday",
            startHour: "14:00",
            endHour: "16:00",
            seanceType: "Tp",
            subject: "BDD",
            room: "Salle 2",
          },
          {
            seanceDay: "Monday",
            startHour: "10:00",
            endHour: "12:00",
            seanceType: "Tp",
            subject: "BDD",
            room: "Salle 2",
          },
        ],
        from: "2025-01-10T00:00:00.000Z",
        to: "2025-04-10T00:00:00.000Z",
      },
    ],
  };

  const currentDate = new Date();

  // Filter the planning data to include only the current planning
  const currentPlanning = planningData.groupPlanning.filter((planning) => {
    const fromDate = new Date(planning.from);
    const toDate = new Date(planning.to);
    return currentDate >= fromDate && currentDate <= toDate;
  });

  if (currentPlanning.length === 0) {
    return <div>No current planning available</div>;
  }

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
        <h2>Aperçu Planning de group</h2>

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
        <div className="planning-container">
          {currentPlanning.map((planning, index) => (
            <div key={index} className="planning-section">
              <h2>Group 2 Planning</h2>
              <table className="planning-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Start Hour</th>
                    <th>End Hour</th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Room</th>
                  </tr>
                </thead>
                <tbody>
                  {planning.groupPlanning.map((session, sessionIndex) => (
                    <SessionRow key={sessionIndex} {...session} />
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
