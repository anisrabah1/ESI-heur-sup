import { useState, useEffect } from "react";
import "./teacher_sessions.css";
import Teacher_dayOff from "./teacher_dayOff";
import ApiUrls from "../../APIs";
import { toaster } from "evergreen-ui";
import Cookies from "js-cookie";
import CreateEmploi from "../../Emploi/CreateEmploi";
const Teacher_sessions = ({
  sessionPopup,
  dayOffPopup,
  teacherID,
  sessionCreate,
  teacherInfos,
  setOffRange,
  session,
  set_session,
}) => {
  // const [session, set_session] = useState([]);
  const [currentSessionStart, set_currentSessionStart] = useState();
  const [currentSessionEnd, set_currentSessionEnd] = useState();
  window.currentSessionStart = currentSessionStart;
  window.set_currentSessionStart = set_currentSessionStart;
  window.currentSessionEnd = currentSessionEnd;
  window.set_currentSessionEnd = set_currentSessionEnd;
  const apiUrls = new ApiUrls();
  const fetchData = async () => {
    const token = Cookies.get("token");
    try {
      console.log(
        ` api is here ${apiUrls.getUrl(
          "getTeachers"
        )}/${teacherID}/teacherSessions`
      );
      const response = await fetch(
        `${apiUrls.getUrl("getTeachers")}/${teacherID}/teacherSessions`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      set_session(data.teacherSessions);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSession = async (session_id) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${apiUrls.getUrl("getAllSessions")}/${session_id}`,
        {
          method: "DELETE", // Specify the HTTP method as POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Specify the content type as JSON
          },
        }
      );
      // console.log(response)

      window.location.reload(false);
    } catch (error) {
      toaster.notify(error.message);
      console.log(error.message);
    }
  };

  const ArchiveSession = async (session_id) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${apiUrls.getUrl("getAllSessions")}/${session_id}/archive`,
        {
          method: "POST", // Specify the HTTP method as POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Specify the content type as JSON
          },
        }
      );
      // console.log(response)

      const data = await response.json();
      console.log("archive data", data.message);
    } catch (error) {
      toaster.notify(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {session &&
        session.map((m, i) => (
          <div className="sessionA">
            <div className="seesionHeader">
              <div>Session {i + 1}</div>
              <div>start {m.startDate.substring(0, 10)}</div>
              <div>end {m.endDate.substring(0, 10)}</div>
              <button
                className="icon-button button1 sessionArchiveButton"
                onClick={() => {
                  ArchiveSession(m._id);
                }}
              ></button>

              <button
                className="icon-button button1 sessionDeletButton"
                onClick={() => {
                  deleteSession(m._id);
                }}
              ></button>
            </div>
            {/* here is the emploi */}
            <CreateEmploi
              sessionId={m._id}
              sessionDates={[m.startDate, m.endDate]}
              teacherInfos={teacherInfos}
              seances={session.seances}
            />

            <Teacher_dayOff
              setOffRange={setOffRange}
              range={[m.startDate.substring(0, 10), m.endDate.substring(0, 10)]}
              popup={dayOffPopup}
              create={sessionCreate}
              sessionID={m._id}
              seesionStart={m.startDate.substring(0, 10)}
              sessionEnd={m.endDate.substring(0, 10)}
            />
          </div>
        ))}
      <center>
        <div
          className="addB"
          onClick={() => {
            // set_session([...session,{id:'undefined'}])
            sessionPopup(true);
          }}
        />
      </center>
    </div>
  );
};

export default Teacher_sessions;
