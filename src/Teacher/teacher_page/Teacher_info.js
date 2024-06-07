import Tamplate from "../../tamplate/tamplate";
import { useParams } from "react-router-dom";
import Teacher_details from "./teacher_details";
import "./teacher_info.css";
import { useState, useEffect } from "react";
import Teacher_sessions from "./teacher_sessions";
import TextField from "@mui/material/TextField";
import Teacher_dayOff from "./teacher_dayOff";
import ApiUrls from "../../APIs";
import DayOff_popup from "./dayOff_popup";
import Session_popup from "./session_popup";

const Teacher_info = ({ search, setSearch }) => {
  const { id } = useParams();
  const [createSessionID, setCreateSessionID] = useState();
  const [offRange, setOffRange] = useState(["", ""]);
  const [sessionSet, setSessionSet] = useState([]);
  const [DataT, set_DataT] = useState({
    dateOfBirth: "",

    degree: "",
    email: "",
    employmentStatus: "",
    firstName: "",
    homeInstitution: "",
    lastName: "",
    major: "",
    phoneNumber: "",
  });
  const [sessionClose, set_sessionClose] = useState(false);
  const [dayOffClose, set_dayOffClose] = useState(false);
  const apiUrls = new ApiUrls();
  const fetchData = async () => {
    try {
      console.log();
      const response = await fetch(`${apiUrls.getUrl("getTeachers")}/${id}`, {
        method: "GET", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
      });
      // console.log(response)
      const data = await response.json();

      set_DataT(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Tamplate search={search} setSearch={setSearch} />
      <div className=" content">
        <div className="teacher-info">
          {/* <Teacher_details data={DataT}/> */}

          <Teacher_sessions
            set_session={setSessionSet}
            session={sessionSet}
            setOffRange={setOffRange}
            sessionPopup={set_sessionClose}
            dayOffPopup={set_dayOffClose}
            teacherID={id}
            sessionCreate={setCreateSessionID}
            teacherInfos={DataT}
          />
        </div>
      </div>
      {dayOffClose && (
        // eslint-disable-next-line react/jsx-pascal-case
        <DayOff_popup
          set_close={set_dayOffClose}
          id={createSessionID}
          personal={true}
          url="getAllSessions"
          offdays="personalOffDays"
        />
      )}
      {sessionClose && (
        <Session_popup
          sessionSet={sessionSet}
          setSessionSet={setSessionSet}
          set_close={set_sessionClose}
          teacherID={id}
        />
      )}
    </div>
  );
};

export default Teacher_info;
