import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
export default function PopCalculate({
  ouvert,
  setOuvert,
  result,
  isCalculating,
  seances,
  teacherInfos,
}) {
  const navigate = useNavigate();

  const [detls, setDetls] = useState(result);

  const handleNavigate = () => {
    console.log(teacherInfos);
    navigate("/to-printView", {
      state: {
        seances: seances,
        result: result,
        teacherInfos: teacherInfos,
      },
    });
  };

  const handleCloseCalculate = () => {
    setOuvert(false);
  };

  return (
    <div className={`popUp-Calculate ${ouvert ? "open" : ""}`}>
      <div className="resultsY">
        <div className="icon" onClick={handleCloseCalculate}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ color: "#2f4971" }}
            className="icon2"
          />
        </div>
        <Spin tip="Loading..." spinning={isCalculating}>
          <div
            className="lineY"
            style={{ borderBottom: "solid 1px black", paddingBottom: "10px" }}
          >
            <p className="keyY">Heures Total :</p>{" "}
            <p className="valueY">{result ? result.totalHour : 0}</p>{" "}
            <p className="unitéY">Heures</p>
          </div>
          <div>
            {result &&
              result.seances.map((item) => {
                return (
                  <>
                    <div className="lineY" key={`${item.coefficient}-cours`}>
                      <p className="keyY">{item.seanceTypeName}</p>
                      <p className="valueY">{item.hoursNumber}</p>
                      <p className="unitéY">Heures</p>
                    </div>
                  </>
                );
              })}
          </div>
          <div
            className="lineY"
            id="heure-sup-line"
            style={{
              borderTop: "solid 1px black",
              padding: "10px 0px",
              marginTop: "10px",
            }}
          >
            <p className="keyY">Heures Supplémentaires :</p>
            <p className="valueY">
              {result && result.addHours ? result.addHours : 0}
            </p>
            <span className="unitéY">Heures</span>
          </div>
          <div className="" style={{ marginTop: "8%" }}>
            <button id="btn-To-Calculate" onClick={handleNavigate}>
              Imprimer
            </button>
          </div>
        </Spin>
      </div>
    </div>
  );
}
