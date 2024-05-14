import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import "./cards.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiUrl from "../global_Vars/apiConfig";

import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

import { TimePicker, TimePickerProps } from "antd";
import { Popconfirm } from "antd";
import { Spin } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

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









export default function CreateEmploi({sessionId,teacherId}) {

  dayjs.extend(customParseFormat);
  const onChange = (time, timeString) => {
    console.log(timeString);
    setHourStart(timeString[0]);
    setHourFin(timeString[1]);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFetch, setIsFetch] = useState(false);

  const handleClickOpen = async () => {
    setIsOpen(true);
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const [day, setDay] = useState(lesJours[0]);
  const [hourStart, setHourStart] = useState("08:00");
  const [hourFin, setHourFin] = useState("10:00");
  const [module, setModule] = useState("");
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

  const [cards, setCards] = useState(null);

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
        console.log(data);
        if (!response.ok) {
          console.log("ERROR :", data);
          throw new Error(data.message || "Server Error");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData(
      "teacherSessions",
      '662c1513ba129bf7b1cb438f',
      "seances",
      setCards
    );
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

 

  const mySubmit = async (e) => {
    e.preventDefault();
    console.log("_____________zbi________________" + selectedSalle);
    const newSeance = {
      seanceDay: day,
      startHour: hourStart,
      endHour: hourFin,
      group: selectedGroupe,
      level: selectedNiveau,
      semester: selectedSem,
      department: selectedDep,
      seanceType: selectedType, // TD : 662ad5e270358c3d8a41cc59 , TP : 662ad6243b0e958c646c8b67 , cour : 662b548512cc1bd7c62cc1b1
      // "section" : "6626ac86eddb6454f58adc21",
      section: selectedSection,
      subject: selectedModule,
      room: selectedSalle,
    };

    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await fetch(
        "http://" +
          apiUrl +
          ":3000/api/v1/teacherSessions/662c1513ba129bf7b1cb438f/seances",
        {
          method: "POST",
          body: JSON.stringify(newSeance),
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
      console.log("Creation___ seance__!");
      if (!response.ok) {
        console.log("ERROR :", data);
        throw new Error(data.message || "Server Error");
      }

      // Update state to trigger re-render
      setIsFetch((prev) => !prev);
    } catch (error) {
      console.log(error.message);
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

      // Update state to trigger re-render
      setIsFetch((prev) => !prev);

      // // Filter out the deleted object
      // setFiltring(prevObjects => prevObjects.filter(object => object._id !== id));

      // console.log('Sessions after deletion:', sessions);
    } catch (error) {
      console.log("Error during deletion:", error.message);
    }
  };

  

  return (
    <>
      <div className="container">
        
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Seances :</h3>
            <div className="add-icon" onClick={handleClickOpen}>
              <lord-icon
                src="https://cdn.lordicon.com/hqymfzvj.json"
                trigger="hover"
                style={{ width: "30px", height: "30px" }}
              ></lord-icon>
            </div>
          </div>
        <Spin tip="Loading..." fullscreen="true" spinning={isSpinning}></Spin>

        <div className="container-Cards">
          {cards &&
            cards.map((item) => {
              return (
                <div className="card">
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
                  <div className="c2-3-4lines-icon">
                    <div className="c2-3-4lines">
                      <div className="second-Line">
                        <h5>{item.seanceType.seanceTypeName}</h5>
                        <p>{item.subject.subjectName} </p>
                      </div>
                      <div className="third-Line">
                        <p>{item.level.levelName}</p>
                        <p>{item.department.departmentName}</p>
                        <p>{item.section.sectionName}</p>
                        <p>{item.group.groupName}</p>
                      </div>
                      <div className="foorth-Line">
                        <p>{item.room.roomName}</p>
                      </div>
                    </div>
                    <div className="icons">
                      <div
                        className="lord-icon"
                        style={{ margin: "0px 0px 0px 10%" }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/lyrrgrsl.json"
                          trigger="hover"
                          colors="primary:#ffffff"
                          style={{
                            width: "48px",
                            height: "46px",
                            margin: "0px 0px 0px 10%",
                          }}
                          techer
                        ></lord-icon>
                      </div>

                      <div
                        className="lord-icon"
                        style={{ margin: "0px 0px 0px 5%" }}
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
                              width: "48px",
                              height: "48px",
                              margin: "0px 0px 0px 15%",
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
      </div>

      {isOpen && (
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
              <form onSubmit={mySubmit}>
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
                      <option value="">---Niveau---</option>

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
                      <option value=""></option>
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
      )}
    </>
  );
}
