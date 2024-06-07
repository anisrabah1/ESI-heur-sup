import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import "./cards.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiUrl from "../global_Vars/apiConfig";

import { Tooltip } from "antd";
import { TimePicker } from "antd";
import { Popconfirm } from "antd";
import { Spin } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { toaster } from "evergreen-ui";

import "./PopCalculate.css";
import PopCalculate from "./PopCalculate";
import CalculeInPeriod from "./CalculeInPeriod";

// Mapping between French and English names of the days of the week
const dayMappings = {
  Samedi: "Saturday",
  Dimanche: "Sunday",
  Lundi: "Monday",
  Mardi: "Tuesday",
  Mercredi: "Wednesday",
  Jeudi: "Thursday",
};
// Mapping between English and French names of the days of the week
const dayMappings2 = {
  Saturday: "Samedi",
  Sunday: "Dimanche",
  Monday: "Lundi",
  Tuesday: "Mardi",
  Wednesday: "Mercredi",
  Thursday: "Jeudi",
};
const lesJours = Object.keys(dayMappings);

export default function CreateEmploi({
  sessionId,
  sessionDates,
  teacherInfos,
  seances,
}) {
  const [detailsOpened, setDetailsOpened] = useState(false);
  dayjs.extend(customParseFormat);
  const onChange = (time, timeString) => {
    console.log(timeString);
    setHourStart(timeString[0]);
    setHourFin(timeString[1]);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  const [ouvertPourPeriod, setOuvertPourPeriod] = useState(false);

  const handleClickOpen = async () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const [day, setDay] = useState(lesJours[0]);
  const [hourStart, setHourStart] = useState(null);
  const [hourFin, setHourFin] = useState(null);
  const [module, setModule] = useState(null);
  const [type_s, setType_s] = useState(null);
  const [selectedType, setSelectedType] = useState();
  const [dep, setDep] = useState(null);
  const [selectedDep, setSelectedDep] = useState(null);
  const [selectedSalle, setSelectedSalle] = useState();

  const [niveau, setNiveau] = useState(null);
  const [selectedNiveau, setSelectedNiveau] = useState(null);
  const [specialite, setSpecialite] = useState(null);
  const [sem, setSem] = useState(null);
  const [section, setSection] = useState(null);
  const [groupe, setGroupe] = useState([]);
  const [salles, setSalles] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState(seances);

  const [startFetchingStructure, setStartFetchingStructure] = useState();

  useEffect(() => {
    const fetchData = async (
      whereFetch,
      teacherSessionId,
      dataToFetch,
      setObject
    ) => {
      // dataToFetch = name data in backend
      // const[object,setObject]
      try {
        console.log("Hello from the use effect");

        const token = Cookies.get("token");
        const response = await fetch(
          `http://${apiUrl}:3000/api/v1/${whereFetch}/${teacherSessionId}/${dataToFetch}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setObject(data[dataToFetch]);
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
        console.log(data[dataToFetch]);
        if (!response.ok) {
          console.log("ERROR :", data);
          throw new Error(data.message || "Server Error");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData("teacherSessions", sessionId, "seances", setCards);
  }, [isFetch]);

  //fetch________Departement !

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        let response = await fetch(
          "http://" + apiUrl + ":3000/api/v1/departments",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetch Dep " + response);

        let data = await response.json();
        setDep(data.departments);
        if (!response.ok) {
          console.log("ERROR :", data);
          throw new Error(data.message || "Server Error");
        }

        response = await fetch(
          "http://" + apiUrl + ":3000/api/v1/seanceTypes",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetch Seance Types " + response);

        data = await response.json();

        setType_s(data.seanceTypes);
        console.log(type_s);
        console.log("___________");
        if (!response.ok) {
          console.log("ERROR :", data);
          throw new Error(data.message || "Server Error");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  //________________________________________Get Level________________________
  const getLevel = async (depId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/departments/${depId}/levels`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Fetch Level " + data.levels);
      setNiveau(data.levels);
      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //________________________________________Get Salles________________________
  const getSalles = async (depId) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/departments/${depId}/rooms`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("ERROR:", errorData.message || "Server Error");
        throw new Error(errorData.message || "Server Error");
      }

      const data = await response.json();
      console.log("Fetched salles:", data.rooms);
      setSalles(data.rooms);
    } catch (error) {
      console.log(error.message);
      // Handle error here, like displaying a message to the user
    }
  };

  //________________________________________Get Specialties________________________
  const getSpecialties = async (lvlID) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/levels/${lvlID}/specialties`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetch Specialities " + response);

      const data = await response.json();
      console.log(data.levels);
      setSpecialite(data.specialtys);
      console.log("----------specialite:" + typeof specialite + specialite);

      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSemesters = async (str, parentID) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/${str}/${parentID}/semesters`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetch Semester:" + response);

      const data = await response.json();
      setSem(data.semesters);
      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSections = async (str, parentID) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/${str}/${parentID}/sections`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetch Section:" + response);

      const data = await response.json();
      setSection(data.sections);
      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const ondepChange = (event) => {
    setNiveau(null);
    setSpecialite(null);
    setSection(null);
    setSem(null);
    setModule(null);
    setGroupe(null);

    setSelectedDep(event.target.value);
    getLevel(event.target.value);
    getSalles(event.target.value);
  };

  const ondepFocus = (event) => {
    setSelectedDep(event.target.value);
    getLevel(event.target.value);
    getSalles(event.target.value);
  };

  const getGroupe = async (parentID) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/sections/${parentID}/groups`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetch Groupe:" + response);

      const data = await response.json();
      setGroupe(data.groups);
      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSubject = async (parentID) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/semesters/${parentID}/subjects`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      const data = await response.json();
      setModule(data.subjects);
      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedGroupe, setSelectedGroupe] = useState([]);

  const [wait, setWait] = useState(false);

  //add seance _____________________//

  const mySubmit = async (e, teacherSessionId) => {
    e.preventDefault();

    console.log("___________in this________________" + selectedSalle);

    const newSeance = {
      seanceDay: day,
      startHour: hourStart,
      endHour: hourFin,
      group: selectedGroupe,
      level: selectedNiveau,
      semester: selectedSem,
      department: selectedDep,
      seanceType: selectedType,
      section: selectedSection,
      subject: selectedModule,
      room: selectedSalle,
    };

    try {
      setIsLoading(true);
      const token = Cookies.get("token");

      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/teacherSessions/${teacherSessionId}/seances`,
        {
          method: "POST",
          body: JSON.stringify(newSeance),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("ERROR :", data);
        toaster.danger(data.message || "Server Error");
        return; // Exit the function if there is an error
      }

      console.log("Creation___ seance__!", data.data);
      toaster.success("Seance successfully created");

      // Update state to trigger re-render
      setIsFetch((prev) => !prev);
    } catch (error) {
      console.error("Request failed:", error.message);
      toaster.danger("An error occurred while creating the seance");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSeance = async (id) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/seances/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        const data = await response.json();
        console.log("ERROR:", data);
        throw new Error(data.message || "Server Error");
      }

      // Deletion was successful
      console.log("Deleting success!");
      toaster.success("seance successfuly deleted !");
      // Update state to trigger re-render
      setIsFetch((prev) => !prev);

      // // Filter out the deleted object
      // setFiltring(prevObjects => prevObjects.filter(object => object._id !== id));

      // console.log('Sessions after deletion:', sessions);
    } catch (error) {
      console.log("Error during deletion:", error.message);
    }
  };

  //_______________________________________________
  const [addingHourSup, setAddingHourSup] = useState(false);
  const [selectedAddHour, setSelectedAddHour] = useState(0.5);
  const [dureeH, setDureeH] = useState();
  const [coef, setCoef] = useState([]);
  const handleClickToAddHourSup = (item, Hstart, Hend) => {
    setAddingHourSup(true);
    setSeanceToPatch(item);
    const start = parseInt(Hstart.substring(0, 2));
    const end = parseInt(Hend.substring(0, 2));
    const minS = parseInt(Hstart.substring(3, 5));
    const minE = parseInt(Hend.substring(3, 5));
    let diff = end - start;
    if (minE !== minS) {
      diff = diff + 0.5;
    }
    let tab = [];
    for (let i = 0.5; i <= diff; i = i + 0.5) {
      tab.push(i);
    }
    setDureeH(diff);
    setCoef(tab);
    console.log("Dureé = = " + diff);
  };

  const handleCloseAddingHoureSup = () => {
    setAddingHourSup(false);
  };

  const [seanceToPatch, setSeanceToPatch] = useState();

  const deleteAddHour = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const seanceId = seanceToPatch._id; // Replace this with the actual seance ID
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/teacherSessions/${sessionId}/seances/${seanceId}/unset-add-hour`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setIsLoading(false);
      const data = await response.json();
      console.log(data.data);
      if (!response.ok) {
        toaster.danger(data.message);
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
      console.log("successfully");
      toaster.success("successfully removing Additional Hour");
      // Update state to trigger re-render
      setIsFetch((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [hoveredIcons, setHoveredIcons] = useState({});

  const handleMouseEnter = (id) => {
    // console.log('Mouse Enter:', id);
    setHoveredIcons((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    // console.log('Mouse Leave:', id);
    setHoveredIcons((prev) => ({ ...prev, [id]: false }));
  };

  // console.log('Hovered Icons:', hoveredIcons);

  const myUpdate = async (seanceId, sessionId) => {
    const updatedSeance = {
      addHour: true,
      numberOfAddHours: selectedAddHour,
    };

    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(
        `http://${apiUrl}:3000/api/v1/teacherSessions/${sessionId}/seances/${seanceId}/set-add-hour`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedSeance),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setIsLoading(false);
      const data = await response.json();
      console.log(data.data);
      console.log("Update___ seance__!");
      if (!response.ok) {
        toaster.danger(data.message);
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
      console.log("successfully");
      toaster.success(
        "Successfully Updated contains :" + selectedAddHour + " Add-hours"
      );
      setAddingHourSup(false); // close popup
      // Update state to trigger re-render
      setIsFetch((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [ouvert, setOuvert] = useState(false);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const fetchHourlyCharge = async () => {
    try {
      setIsCalculating(true);
      const token = Cookies.get("token");
      let response = await fetch(
        `http://${apiUrl}:3000/api/v1/teacherSessions/${sessionId}/seances/HourlyCharge`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      setIsCalculating(false);
      let data = await response.json();
      setResult(data.hourlyCharge);
      console.log(data.hourlyCharge);
      console.log("________________");
      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const distinctItems = [...new Set(items)];
  return (
    <div className="container-Create-empoi">
      <CalculeInPeriod
        ouvertPourPeriod={ouvertPourPeriod}
        setOuvertPourPeriod={setOuvertPourPeriod}
        sessionDates={sessionDates}
        techerSessionId={sessionId}
        teacherInfos={teacherInfos}
        seances={cards}
      />
      <PopCalculate
        ouvert={ouvert}
        setOuvert={setOuvert}
        result={result}
        fetchHourlyCharge={fetchHourlyCharge}
        sessionDates={sessionDates}
        techerSessionId={sessionId}
        isCalculating={isCalculating}
        seances={cards}
        teacherInfos={teacherInfos}
      />

      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 1% 0px 1.5%",
          }}
        >
          <h3>Seances :</h3>
          {/* <div className="add-icon" onClick={handleClickOpen}>
              <lord-icon
                src="https://cdn.lordicon.com/hqymfzvj.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
             */}
          {!detailsOpened ? (
            <div
              className={`more-icon-tk ${
                detailsOpened ? "more-icon-tk-after" : ""
              }`}
              onClick={(e) => {
                setDetailsOpened((prev) => !prev);
                console.log(detailsOpened + "+++++++++++++++++++");
              }}
            >
              <lord-icon
                src="https://cdn.lordicon.com/rmkahxvq.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          ) : (
            <div
              className="more-icone"
              style={{ display: "flex", justifyContent: "end" }}
              onClick={(e) => {
                setDetailsOpened((prev) => !prev);
              }}
            >
              <lord-icon
                src="https://cdn.lordicon.com/rmkahxvq.json"
                trigger="hover"
                style={{
                  width: "30px",
                  height: "30px",
                  transform: "rotateX(180deg)",
                }}
              ></lord-icon>
            </div>
          )}
        </div>
        <Spin tip="Loading..." fullscreen="true" spinning={isSpinning}></Spin>

        <div
          className={`container-Cards-more-icone ${
            detailsOpened ? "AFTER" : ""
          }`}
        >
          <div className="container-Cards">
            {cards &&
              cards.map((item) => {
                return (
                  <div
                    className="card"
                    onClick={(e) => console.log(item.startHour)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="first-Line">
                        <h4>{dayMappings2[item.seanceDay]}</h4>
                        <div>
                          <TimePicker.RangePicker
                            format="HH:mm "
                            defaultValue={[
                              dayjs(item.startHour, "HH:mm"),
                              dayjs(item.endHour, "HH:mm"),
                            ]}
                            className="duree"
                            inputReadOnly="true"
                            disabled="true"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <Popconfirm
                        title="Delete additional Hour?"
                        description="Are you sure to delete this additional Hour?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={deleteAddHour}
                      >
                        {item.addHour && (
                          <Tooltip
                            title={`contient ${item.numberOfAddHours} heures Sup`}
                            color="#87d068"
                          >
                            <div
                              className="add-hour-Y"
                              onMouseEnter={() => {
                                handleMouseEnter(item._id);
                                setSeanceToPatch(item);
                              }}
                              onMouseLeave={() => handleMouseLeave(item._id)}
                            >
                              {hoveredIcons[item._id] ? (
                                <img
                                  src={require("./delete_hsupp.png")}
                                  alt="Delete Icon"
                                />
                              ) : (
                                <img
                                  src={require("./hsup_inthis_seance.png")}
                                  alt="Hover Icon"
                                />
                              )}
                            </div>
                          </Tooltip>
                        )}
                      </Popconfirm>
                    </div>
                    <div className="c2-3-4lines-icon">
                      <div className="c2-3-4lines">
                        <div className="second-Line">
                          {item.seanceType.seanceTypeName && (
                            <h5>{item.seanceType.seanceTypeName}</h5>
                          )}
                          <p>{item.subject.subjectName} </p>
                        </div>
                        <div className="third-Line">
                          <p>{item.level.levelName}</p>
                          <p>{item.department.departmentName}</p>
                        </div>
                        <div className="foorth-Line">
                          {item.section.sectionName && (
                            <p>
                              <span>Section</span> {item.section.sectionName}
                            </p>
                          )}
                          {item.group && <p>{item.group.groupName}</p>}
                        </div>
                        <div className="foorth-Line">
                          <p>{item.room.roomName}</p>
                        </div>
                      </div>
                      <div className="icons-card-seance">
                        <div
                          title="Add Hour Sup"
                          className="lord-icon"
                          onClick={() => {
                            handleClickToAddHourSup(
                              item,
                              item.startHour,
                              item.endHour
                            );
                          }} //-------------------------------
                        >
                          <lord-icon //____________________________________Add Hour Supp
                            src="https://cdn.lordicon.com/mwikjdwh.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{
                              width: "30px",
                              height: "30px",
                              margin: "0px 0px 0px 10%",
                            }}
                          ></lord-icon>
                        </div>
                        {/* <div className="lord-icon" style={{}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                            style={{
                              width: "30px",
                              height: "30px",
                              margin: "0px 0px 0px 25%",
                            }}
                            techer
                          >
                            qsd
                          </lord-icon>
                        </div> */}

                        <div //____________________________________Supprimer
                          className="lord-icon"
                          style={{}}
                        >
                          <Popconfirm
                            title="Delete the seance"
                            description="Are you sure to delete this seance?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => deleteSeance(item._id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wpyrrmcq.json"
                              trigger="morph"
                              state="morph-trash-full"
                              colors="primary:#ffffff"
                              style={{
                                width: "30px",
                                height: "30px",
                                margin: "0px 0px 0px 25%",
                              }}
                            ></lord-icon>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div
            className="add-icon"
            onClick={handleClickOpen}
            style={{ display: "flex", justifyContent: "end", width: "100%" }}
          >
            <lord-icon // tala3 l More
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
              style={{ width: "30px", height: "30px", marginRight: "1%" }}
            ></lord-icon>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "start",
              padding: "6px 3px 6px 30px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                letterSpacing: "1px",
                marginRight: "15px",
                fontWeight: "500",
              }}
            >
              Calculer et Imprimer La charge Horaire{" "}
            </span>
            <button
              id="btn-To-Calculate"
              onClick={(e) => {
                setOuvert(true);
                console.log(ouvert);
                fetchHourlyCharge();
              }}
            >
              Calculer
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                  position: "absolute",
                  right: "0",
                  marginRight: "6px",
                }}
                src={require("./clock.png")}
              ></img>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "start",
              padding: "6px 3px 6px 30px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                letterSpacing: "1px",
                marginRight: "15px",
                fontWeight: "500",
              }}
            >
              Calculer dans certains periode
            </span>
            <div className="">
              <button
                id="btn-To-Calculate"
                onClick={() => setOuvertPourPeriod(true)}
              >
                Calculer
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                    filter: "invert(1) sepia(1) saturate(5) hue-rotate(180deg)",
                    position: "absolute",
                    right: "0",
                    marginRight: "6px",
                  }}
                  src={require("./noun-money.png")}
                ></img>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ____________________________Popup Adding Hour Sup______________________________________________________________________  */}

      <div className={`popup ${addingHourSup ? "open" : ""}`}>
        <div className="popup-content-forAddingHSup">
          <div className="icon" onClick={handleCloseAddingHoureSup}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              style={{ color: "#2f4971" }}
              className="icon2"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <h4>Ajouter Heure Supplémentaire Dans :</h4>
            <div disabled style={{ marginLeft: "10%" }}>
              <TimePicker.RangePicker
                format="HH:mm "
                placeholder={
                  seanceToPatch && [
                    seanceToPatch.startHour,
                    seanceToPatch.endHour,
                  ]
                }
                className="houre-Style-Adding"
                inputReadOnly="true"
                style={{ color: "red" }}
              />
            </div>
          </div>
          <div className="form-Content">
            <form
              onSubmit={(e) => {
                myUpdate(seanceToPatch._id, sessionId);
                e.preventDefault();
              }}
            >
              <div className="heure-supp-y">
                <div className="input-Box-Adding-HSup">
                  <div
                    id="rnk"
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <span>Nombre Des Heures Supplémentaire:</span>
                    <select
                      autoFocus
                      onFocus={(e) => {
                        setSelectedAddHour(e.target.value);
                        console.log("Dureé  reelle= " + dureeH);
                      }}
                      onChange={(e) => {
                        setSelectedAddHour(e.target.value);
                      }}
                    >
                      {coef &&
                        coef.map((c) => {
                          return <option value={c}>{c}</option>;
                        })}
                    </select>
                  </div>
                  <div className="co">
                    <input
                      type="submit"
                      value={isLoading ? "En cours..." : "Add"}
                      name=""
                      className="btn-Create"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`popup ${isOpen ? "open" : ""}`}>
        <div className="popup-content">
          <div className="icon" onClick={handleClickClose}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              style={{ color: "#2f4971" }}
              className="icon2"
            />
          </div>
          <h4>Formulaire Ajouter séance</h4>

          <div className="form-Content">
            <form onSubmit={(e) => mySubmit(e, sessionId)}>
              <div className="module-type">
                <div className="input-Box">
                  <span>Le jour</span>
                  <select
                    id="myDataList"
                    name="jour"
                    required
                    onChange={(e) => {
                      const frenchDay = e.target.value; // Get French day
                      const englishDay = dayMappings[frenchDay]; // Get English day from mapping
                      setDay(englishDay); // Set English day to state

                      // setDay(e.target.value);
                    }}
                  >
                    {lesJours.map((jour) => (
                      <option key={jour} value={jour}>
                        {jour}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-Box">
                  <span>Heure : </span>
                  <TimePicker.RangePicker
                    minuteStep="30"
                    format="HH:mm"
                    placeholder={["Début", "Fin"]}
                    className="houre-Style"
                    order="true"
                    onChange={onChange}
                  />
                </div>
                <div className="input-Box">
                  <span>Type</span>
                  <select
                    id="myDataList"
                    name="type-s"
                    required
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="" style={{ textAlign: "center" }}>
                      choose SeanceType
                    </option>
                    {type_s &&
                      type_s.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.seanceTypeName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="heure-debut-fin">
                {/* <div className='input-Box'>
                                    <span>Heure début</span>
                                    <input type='time' name='heure_debut' required value={hourStart} 
                                    onChange={(e)=>setHourStart(e.target.value)}/>                  
                        </div>
                        <div className='input-Box'>
                                    <span>Heure fin</span>
                                    <input type='time' name='heure_fin' required value={hourFin}
                                    onChange={(e)=>setHourFin(e.target.value)}/>                  
                        </div> */}
              </div>

              <div className="module-type">
                <div className="input-Box">
                  <span>Département</span>
                  <select
                    id="DepId"
                    name="dep"
                    required
                    onFocus={ondepFocus}
                    onChange={ondepChange}
                    // // setSelectedDep(e.target.value)
                    // const selectedDepartment = dep.find((department) => department.departmentName === e.target.value);
                    // getLevel(selectedDepartment._id)
                  >
                    <option value="" style={{ textAlign: "center" }}>
                      choose Department
                    </option>{" "}
                    {dep &&
                      dep.map((dep) => {
                        return (
                          <option key={dep._id} value={dep._id}>
                            {dep.departmentName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="input-Box">
                  <span>Niveau</span>
                  <select
                    id="nivId"
                    name="niveau"
                    required
                    onFocus={
                      (e) => {
                        setSelectedNiveau(e.target.value);

                        // if(selectedNiveau.specialties.length>0){getSpecialties(e.target.value); console.log('ID level:'+selectedNiveau)}
                        // else{
                        getSpecialties(e.target.value);
                        getSemesters("levels", e.target.value);
                        getSections("levels", e.target.value);
                      }
                      // }
                    }
                    onChange={(e) => {
                      setSelectedNiveau(e.target.value);
                      setSpecialite(null);
                      setSection(null);
                      setSem(null);
                      setModule(null);
                      setGroupe(null);

                      // if(selectedNiveau.specialties.length>0){getSpecialties(e.target.value); console.log('ID level:'+selectedNiveau)}
                      // else{
                      getSpecialties(e.target.value);
                      getSemesters("levels", e.target.value);
                      getSections("levels", e.target.value);

                      //  }
                    }}
                  >
                    <option value="" style={{ textAlign: "center" }}>
                      choose Level
                    </option>

                    {niveau &&
                      niveau.map((niv) => {
                        return (
                          <option key={niv._id} value={niv._id}>
                            {niv.levelName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="input-Box">
                  <span>Spécialité</span>

                  <select
                    id="myDataList"
                    name="specialite"
                    className={!specialite && "disabled-element"}
                    onFocus={(e) => {
                      setSelectedSpec(e.target.value);
                      //   const selectespecialtie = specialite.find((spec) => spec.specialtyName === e.target.value);
                      console.log(specialite);
                      getSemesters("specialties", e.target.value);
                      getSections("specialties", e.target.value);
                    }}
                    onChange={(e) => {
                      setSelectedSpec(e.target.value);
                      //    const selectespecialtie = specialite.find((spec) => spec.specialtyName === e.target.value);
                      setSection(null);
                      setSem(null);
                      setModule(null);
                      setGroupe(null);
                      getSemesters("specialties", e.target.value);
                      getSections("specialties", e.target.value);
                    }}
                  >
                    <option value="" style={{ textAlign: "center" }}>
                      choose Speciality
                    </option>
                    {specialite &&
                      specialite.map((spc) => (
                        <option key={spc._id} value={spc._id}>
                          {spc.specialtyName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="module-type">
                <div className="input-Box">
                  <span>Semestre</span>
                  <select
                    id="myDataList"
                    name="semester"
                    required
                    onFocus={(e) => {
                      setSelectedSem(e.target.value);
                      // const selectedSemester = sem.find((sem) => sem.semesterName === e.target.value);
                      getSubject(e.target.value);
                    }}
                    onChange={(e) => {
                      setSelectedSem(e.target.value);
                      // const selectedSemester = sem.find((sem) => sem.semesterName === e.target.value);
                      setModule(null);
                      setGroupe(null);
                      getSubject(e.target.value);
                    }}
                  >
                    <option value="" style={{ textAlign: "center" }}>
                      choose Semester
                    </option>
                    {sem &&
                      sem.map((sem) => (
                        <option key={sem._id} value={sem._id}>
                          {sem.semesterName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-Box">
                  <span>Section</span>
                  <select
                    id="myDataList"
                    name="section"
                    required
                    onFocus={(e) => {
                      setSelectedSection(e.target.value);
                      // const selectedSection = section.find((sec) => sec.sectionName === e.target.value);
                      setGroupe(null);
                      setSelectedGroupe([]);
                      console.log("_______________" + specialite);
                      getGroupe(e.target.value);
                    }}
                    onChange={(e) => {
                      setSelectedSection(e.target.value);
                      // const selectedSection = section.find((sec) => sec.sectionName === e.target.value);
                      setSelectedGroupe([]);
                      getGroupe(e.target.value);
                    }}
                  >
                    <option value="" style={{ textAlign: "center" }}>
                      choose Section
                    </option>
                    {section &&
                      section.map((sec) => (
                        <option key={sec._id} value={sec._id}>
                          {sec.sectionName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-Box">
                  <span>Groupe</span>
                  <select
                    id="myDataList"
                    name="groupe"
                    onChange={(e) => {
                      setSelectedGroupe(e.target.value);
                      console.log(selectedGroupe);
                    }}
                  >
                    <option value="" style={{ textAlign: "center" }}>
                      choose Group
                    </option>
                    {groupe &&
                      groupe.map((grp) => (
                        <option key={grp._id} value={grp._id}>
                          {grp.groupName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="module-type">
                <div className="input-Sub">
                  <div className="input-Box" id="last-Div">
                    <span>module</span>
                    <select
                      id="modules"
                      name="module"
                      value={selectedModule}
                      onChange={(e) => setSelectedModule(e.target.value)}
                    >
                      <option value="" style={{ textAlign: "center" }}>
                        choose Subject
                      </option>
                      {module &&
                        module.map((modul) => (
                          <option key={modul._id} value={modul._id}>
                            {modul.subjectName}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="input-Box">
                    <span>Salle</span>
                    <select
                      id="myDataList"
                      name="salle-s"
                      required
                      onChange={(e) => setSelectedSalle(e.target.value)}
                    >
                      <option value="" style={{ textAlign: "center" }}>
                        choose Room
                      </option>
                      {salles &&
                        salles.map((salle) => (
                          <option key={salle._id} value={salle._id}>
                            {salle.roomName}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="container-Btn">
                    <input
                      type="submit"
                      value={isLoading ? "En cours..." : "Submit"}
                      name=""
                      className="btn-Create"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
