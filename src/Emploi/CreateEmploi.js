import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


export default function CreateEmploi(){


    const [isOpen, setIsOpen] = useState(false);

        const handleClickOpen = async() => {              
             setIsOpen(true);                 
        };

        const handleClickClose = () => {
            setIsOpen(false);
        };

        const lesJours = [
            "Samedi",
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
          ];
          const modules = [
            "Archi",
            "Anum",
            "Se",
            "Ro",
            "LOW",
            "IGL",
            
          ];

          const types = [
            "Cours",
            "Td",
            "Tp",
          ];


const [day,setDay]=useState(lesJours[0]);
const [hourStart,setHourStart]=useState('08:00');
const [hourFin,setHourFin]=useState('10:00');
const [module,setModule]=useState('');
const [type_s,setType_s]=useState(types[1]);

const [dep,setDep]=useState(null);
const [selectedDep,setSelectedDep]=useState(null);


const [niveau,setNiveau]=useState(null);
const [selectedNiveau,setSelectedNiveau]=useState(null);
const [specialite,setSpecialite]=useState(null);
const [sem,setSem]=useState(null);
const [section,setSection]=useState(null);
const [groupe,setGroupe]=useState(null);



useEffect(()=>{
    const fetchData = async () => {
    try {
        const token = Cookies.get("token");
        const response = await fetch('http://172.20.10.4:3000/api/v1/departments', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization :`Bearer ${token}`
            },
         
        });

        console.log(response)
  
        const data = await response.json();
        console.log(data.departments);
        setDep(data.departments);
        if (!response.ok) { 
          console.log('ERROR :', data)
          throw new Error(data.message || 'Server Error'); 
        }

      } catch (error) {
         console.log(error.message)
      }
      }
      fetchData();
},[])

//________________________________________Get Level________________________
const getLevel = async (depId)=>{
    console.log(selectedDep)
    try {
        const token = Cookies.get("token");
        const response = await fetch(`http://172.20.10.4:3000/api/v1/departments/${depId}/levels`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization :`Bearer ${token}`
            },
         
        });

        console.log(response)
  
        const data = await response.json();
        console.log(data.levels);
        setNiveau(data.levels);
        if (!response.ok) { 
          console.log('ERROR :', data)
          throw new Error(data.message || 'Server Error'); 
        }

      } catch (error) {
         console.log(error.message)
      }
}

//________________________________________Get Specialties________________________
const getSpecialties = async (lvlID)=>{
    try {
        const token = Cookies.get("token");
        const response = await fetch(`http://172.20.10.4:3000/api/v1/levels/${lvlID}/specialties`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization :`Bearer ${token}`
            },
         
        });

        console.log(response)
  
        const data = await response.json();
        console.log(data.levels);
        setSpecialite(data.specialtys);
        if (!response.ok) { 
          console.log('ERROR :', data)
          throw new Error(data.message || 'Server Error'); 
        }

      } catch (error) {
         console.log(error.message)
      }
}   


const getSemesters = async (str,parentID)=>{

    try {
        const token = Cookies.get("token");
        const response = await fetch(`http://172.20.10.4:3000/api/v1/${str}/${parentID}/semesters`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization :`Bearer ${token}`
            },
         
        });

        console.log(response)
  
        const data = await response.json();
        setSem(data.semesters);
        if (!response.ok) { 
          console.log('ERROR :', data)
          throw new Error(data.message || 'Server Error'); 
        }

      } catch (error) {
         console.log(error.message)
      }
}   

const getSections = async (str,parentID)=>{

    
    try {
        const token = Cookies.get("token");
        const response = await fetch(`http://172.20.10.4:3000/api/v1/${str}/${parentID}/sections`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization :`Bearer ${token}`
            },
         
        });

        console.log(response)
  
        const data = await response.json();
        setSection(data.sections);
        if (!response.ok) { 
          console.log('ERROR :', data)
          throw new Error(data.message || 'Server Error'); 
        }

      } catch (error) {
         console.log(error.message)
      }
}  



const getGroupe = async (parentID)=>{

    
    try {
        const token = Cookies.get("token");
        const response = await fetch(`http://172.20.10.4:3000/api/v1/sections/${parentID}/groups`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization :`Bearer ${token}`
            },
         
        });

        console.log(response)
  
        const data = await response.json();
        setGroupe(data.groups);
        if (!response.ok) { 
          console.log('ERROR :', data)
          throw new Error(data.message || 'Server Error'); 
        }

      } catch (error) {
         console.log(error.message)
      }
}  

const getSubject = async (parentID)=>{

    
    try {
        const token = Cookies.get("token");
        const response = await fetch(`http://172.20.10.4:3000/api/v1/semesters/${parentID}/subjects`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              Authorization :`Bearer ${token}`
            },
         
        });

        console.log(response)
  
        const data = await response.json();
        setModule(data.subjects);
        if (!response.ok) { 
          console.log('ERROR :', data)
          throw new Error(data.message || 'Server Error'); 
        }

      } catch (error) {
         console.log(error.message)
      }
}  

const[selectedSpec,setSelectedSpec]=useState(null);
const[selectedSection,setSelectedSection]=useState(null);
const [selectedSem,setSelectedSem]=useState(null);
const  [selectedModule,setSelectedModule] = useState(null);

const [wait,setWait] = useState(false);

            const seance ={
                seanceDay:"Wednesday", 
                startHour : "10:00", 
                endHour : "13:00",  
                group : "662a58ca40b914adc8370592", 
                level : "66075803ba1501b5cf8edc2f", 
                semester : "6626c358e27889543821a568", 
                department : "6607572dba1501b5cf8edc19", 
                seanceType : "662ad6243b0e958c646c8b67", // TD : 662ad5e270358c3d8a41cc59 , TP : 662ad6243b0e958c646c8b67 , cour : 662b548512cc1bd7c62cc1b1 
                // "section" : "6626ac86eddb6454f58adc21", 
                subject : "6626e409fbf71d72f4b2c874", 
                room: "66280c1c19a1193c4e0361ab" 
            }

            const mySubmit =(e)=> {
                e.preventDefault();
                const newSeance = {
                    day ,
                    hourStart,
                    hourFin,
                    module, 
                    type_s,
                    dep,
                    niveau,
                    specialite,
                    sem,
                    section,
                    groupe,
            } 

                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(newSeance),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        console.log('New Seance Added');
                        setWait(false);
                    });
              }
            


         

        //       useEffect(()=>
        // {
        //     fetch(url)
        //     .then(response=>{
                
        //         console.log(response.ok);
        //         if(!response.ok){
        //             throw Error('can not connect to the server');
        //         }
        //         return response.json();
        //     })
        //     .then(data=>{
        //         console.log(data);
        //         setPost(data);
        //         setIsWaiting(false);
        //     }).catch(e=>{
        //         console.log("e.message = "+e.message);
        //         setIsWaiting(false);
        //         console.log("-----"+url)
        //     })
        // }

        // ,[url]
        // );







    return(
        <>
        <div className="container">
            <h2>Creation Emploi du temps</h2>
            <button className="button" onClick={handleClickOpen}
            >Create</button>

            <div className='seances'>
                <div className='seance-Card' >
                    <div className='seance-Date'>
                        <div>
                        <label htmlFor='jour'>Jour :</label>
                        <input type='text' value={day} id='jour'/>
                        </div>
                        <div>
                        <label htmlFor='heure-debut'>De:</label>
                        <input type='time' value={hourStart} id='heure-debut'/>
                        </div>
                        <div>
                        <label htmlFor='heure-fin'>A:</label>
                        <input type='time' value={hourFin} id='heure-fin'/>
                        </div>
                        <div >
                        <label htmlFor='type_s'>Type:</label>
                        <input type='text' value={type_s} id='groupe'/>
                        </div>
                    </div>
                    <div className='seance-Module'>
                        <div>
                        <label htmlFor='module'>Module:</label>
                        <input type='text' value={module} id='module'/>
                        </div>
                        <div >
                        <label htmlFor='groupe'>Groupe:</label>
                        <input type='text' value={groupe} id='groupe'/>
                        </div>
                        <div>
                        <label htmlFor='annee'>Niveau:</label>
                        <input type='text' value={niveau} id='annee'/>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        
        {isOpen && (
        <div className={`popup ${isOpen ? 'open' : ''}`}>
            <div className="popup-content">
                <div className='icon' onClick={handleClickClose}> 
                <FontAwesomeIcon icon={faCircleXmark} size='lg' style={{color:'#2f4971'}} className='icon2'/></div>
                <h4>Formulaire Ajouter séance</h4>

                <div className='form-Content'>
                <form onSubmit={mySubmit}>
                    <div className='module-type'>
                    <div className='input-Box'>
                                <span>Le jour</span>
                                <select id="myDataList" name='jour' required value={day} 
                                onChange={(e)=>setDay(e.target.value)}>
                                    {lesJours.map((jour) => (
                                    <option key={jour} value={jour}>
                                        {jour}
                                    </option>
                                    ))}
                                </select>                     
                    </div>
                    <div className='input-Box'>
                                <span>Type</span>
                                <select id="myDataList" name='type-s' required value={type_s}
                                onChange={(e)=>setType_s(e.target.value)}>
                                    {types.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                    ))}
                                </select>
                        </div> 
                    </div>

                    <div className='heure-debut-fin'>
                        <div className='input-Box'>
                                    <span>Heure début</span>
                                    <input type='time' name='heure_debut' required value={hourStart} 
                                    onChange={(e)=>setHourStart(e.target.value)}/>                  
                        </div>
                        <div className='input-Box'>
                                    <span>Heure fin</span>
                                    <input type='time' name='fin' required value={hourFin}
                                    onChange={(e)=>setHourFin(e.target.value)}/>                  
                        </div>
                    </div>

                    <div className='module-type'>
                        
                                      
                    <div className='input-Box'>
                                    <span>Département</span>
                                    <select id="DepId" name='dep' required  
                                        onFocus={(e)=>{
                                            setSelectedDep(e.target.value)
                                            const selectedDepartment = dep.find((department) => department.departmentName === e.target.value);
                                            getLevel(selectedDepartment._id);
                                            }}
                                            
                                            onChange={(e)=>{
                                                // setSelectedDep(e.target.value)
                                                const selectedDepartment = dep.find((department) => department.departmentName === e.target.value);
                                                getLevel(selectedDepartment._id)
                                                }}
                                            >
                                            {dep&&dep.map((dep) =>{ 
                                                console.log("in map:",dep);
                                           return( 
                                            <option key={dep._id} value={dep.departmentName} >
                                                {dep.departmentName}
                                            </option>
                                           )
                                            })}
                                    </select>                  
                        </div>
                        <div className='input-Box'>
                                    <span>Niveau</span> 
                                    <select  id="nivId" name='niveau' required 
                                        onFocus={(e)=>{setSelectedNiveau(e.target.value) ;
                                            const selecteLevel = niveau.find((niv) => niv.levelName === e.target.value);
                                            setSpecialite(null);
                                            setSection(null);
                                            setSem(null)
                                            if(selecteLevel.specialties.length>0)getSpecialties(selecteLevel._id) 
                                            else{ 
                                                getSemesters("levels",selecteLevel._id);
                                                getSections("levels",selecteLevel._id);
                                        }
                                        }}
                                        onChange={(e)=>{setSelectedNiveau(e.target.value) ;
                                            const selecteLevel = niveau.find((niv) => niv.levelName === e.target.value);
                                            setSpecialite(null);
                                            setSection(null);
                                            setSem(null)
                                            if(selecteLevel.specialties.length>0)getSpecialties(selecteLevel._id) 
                                            else{
                                            getSemesters("levels",selecteLevel._id);
                                            getSections("levels",selecteLevel._id);
                                        }
                                        }}>
                                            {niveau&&niveau.map((niv) =>{ 
                                               

                                           return( 
                                            <option key={niv._id} value={niv.levelName} >
                                                {niv.levelName}
                                            </option>
                                            )})}
                                    </select>                  
                        </div>
                        


                    </div>
                    <div className='annee-groupe'>
                        
                        <div className='input-Box'>
                                    <span>Spécialité</span>
                                    <select id="myDataList" name='specialite' required  
                                        onFocus={(e)=>{setSelectedSpec(e.target.value) 
                                            const selectespecialtie = specialite.find((spec) => spec.specialtyName === e.target.value);
                                            setSection(null);
                                            setSem(null)
                                            getSemesters("specialties",selectespecialtie._id);
                                            getSections("specialties",selectespecialtie._id);
                                        }}
                                        onChange={(e)=>{setSelectedSpec(e.target.value) ;
                                            const selectespecialtie = specialite.find((spec) => spec.specialtyName === e.target.value);
                                            setSection(null);
                                            setSem(null)
                                            getSemesters("specialties",selectespecialtie._id);
                                            getSections("specialties",selectespecialtie._id);
                                        }}>
                                            {specialite&&specialite.map((spc) => (
                                            <option key={spc._id} value={spc.specialtyName}>
                                                {spc.specialtyName}
                                            </option>
                                            ))}
                                    </select>                   
                        </div>
                        <div className='input-Box'>
                                    <span>Semestre</span>
                                    <select id="myDataList" name='semester' required 
                                         onFocus={(e)=>{setSelectedSem(e.target.value) 
                                            const selectedSemester = sem.find((sem) => sem.semesterName === e.target.value);
                                            setModule(null);
                                            getSubject(selectedSemester._id);
                                            
                                        }}
                                        onChange={(e)=>{setSelectedSem(e.target.value) ;
                                            const selectedSemester = sem.find((sem) => sem.semesterName === e.target.value);
                                            setModule(null);
                                            getSubject(selectedSemester._id);
                                            
                                        }}>
                                            {sem&&sem.map((sem) => (
                                            <option key={sem._id} value={sem.semesterName}>
                                                {sem.semesterName}
                                            </option>
                                            ))}
                                    </select>                 
                        </div>
                        <div className='input-Box'>
                                    <span>Section</span>
                                    <select id="myDataList" name='section' required
                                         onFocus={(e)=>{setSelectedSection(e.target.value) 
                                            const selectedSection = section.find((sec) => sec.sectionName === e.target.value);
                                            setGroupe(null);
                                            getGroupe(selectedSection._id);
                                            
                                        }}
                                        onChange={(e)=>{setSelectedSection(e.target.value) ;
                                            const selectedSection = section.find((sec) => sec.sectionName === e.target.value);
                                            setGroupe(null);
                                            getGroupe(selectedSection._id);
                                            
                                        }}>
                                            {section&& section.map((sec) => (
                                            <option key={sec._id} value={sec.sectionName}>
                                                {sec.sectionName}
                                            </option>
                                            ))}
                                    </select>                 
                        </div>
                        <div className='input-Box'>
                                    <span>Groupe</span>
                                    <select id="myDataList" name='groupe' required  
                                        onChange={(e)=>setType_s(e.target.value)}>
                                            {groupe && groupe.map((grp) => (
                                            <option key={grp._id} value={grp.groupName}>
                                                {grp.groupName} 
                                            </option>
                                            ))}
                                    </select>        
                                       
                        </div>
                    </div>

                                <div className='input-Sub'>
                                    <div className='input-Box' id='last-Div'>
                                    <span>module</span>                           
                                    <select id="modules" name="module"  value={selectedModule}
                                    onChange={(e)=>setSelectedModule(e.target.value)}>
                                        {module && module.map((modul)=>(
                                            <option key={modul._id} value={modul.subjectName}>{modul.subjectName}</option>
                                        ))}
                                    </select>
                                    </div> 
                                    <input type='submit' value='Ajouter' name=''  className='btn-Create'  />
                                   
                                </div>
                </form>
                </div>



            </div> 
        </div>
    )}
        
        </>
    )
}