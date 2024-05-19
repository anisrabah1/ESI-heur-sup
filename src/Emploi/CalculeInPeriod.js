import Cookies from "js-cookie";
import apiUrl from "../global_Vars/apiConfig";
import {  useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalculeInPeriod.css';
import './PopCalculate.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Spin } from "antd";

import {  toaster } from 'evergreen-ui'





export default function CalculeInPeriod ({ouvertPourPeriod,setOuvertPourPeriod,sessionDates,techerSessionId,teacherInfos,seances}){

const navigate=useNavigate();

const[afficheCalcule,setAfficheCalcule]=useState(false);
const[result,setResult]=useState();
const[fetchHoursInPeriode , setFetchHoursInPeriode]=useState(false);

const [calculateFrom ,setCalculateFrom]=useState(sessionDates[0].substring(0,10));
const [calculateTo ,setCalculateTo]=useState(sessionDates[1].substring(0,10));

const[errorDate,setErrorDate]=useState(false);

const distinctSeance=()=>{
  let s =[];
  seances.map((item,ind)=>{
    s.push(item.seanceType.seanceTypeName)
  })
  return [...new Set(s)];
}

const distinctModule=()=>{
  let m =[];
  seances.map((item,ind)=>{
    m.push(item.subject.subjectName)
  })
  return [...new Set(m)];
}

const handleNavigate = () => {
      navigate('/to-printDetailView', {
        state: { 
        
          result: result, 
          teacherInfos : teacherInfos,
          seances:distinctSeance(),
          modules:distinctModule(),
        }
      });
    };

    
      
      
    


const fetchAddHourInPeriod = async () => {
    setFetchHoursInPeriode(true);
    setErrorDate(false);
    try {
      const token = Cookies.get("token");
      let response = await fetch(
        `http://${apiUrl}:3000/api/v1/teacherSessions/${techerSessionId}/calculate-add-hours`,
        {
          method: "POST",
          body: JSON.stringify({
            startDate:calculateFrom,
            endDate:calculateTo,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
           
          },
          
        }
      );
      let data = await response.json();
     setResult(data.data);
      console.log(data.data);
      setFetchHoursInPeriode(false)
      if (!response.ok) {
        console.log("ERROR :", data);
        setFetchHoursInPeriode(false);
        setErrorDate(true);
        throw new Error(data.message || "Server Error");  
            }
        } catch (error) {
        console.log(error.message);
        toaster.warning(error.message);
        }
    };

    

return(
    <div className={`popUp-Calculate ${ouvertPourPeriod ? 'open' : ''}`}>
        
        <div className="resultsY">
                <div className="icon" onClick={()=>{setOuvertPourPeriod(false);
                                                    setAfficheCalcule(false);
                }}>
                    <FontAwesomeIcon
                    icon={faCircleXmark}
                    
                    style={{ color: "#2f4971" }}
                    className="icon2"
                    />
                </div>
                <div className='line-in-calculate-period' >
                        <div className='from-to-Y'>
                            <span>L'interval de la session </span>
                            <span> {`[ ${sessionDates[0].substring(0,10)}  `} <span>  <FontAwesomeIcon icon={faArrowRight} /> </span>
                            {` ${sessionDates[1].substring(0,10)} ]`} </span>
                        </div>
                        

                </div>

           <div className='line-in-calculate-period' >
                        <div className='from-to-Y'>
                            <span>De</span>
                            <input type='date' onChange={(e)=>{setCalculateFrom(e.target.value)}}
                            defaultValue={sessionDates[0].substring(0,10)} />
                        </div>
                        <div className='from-to-Y'>
                            <span>A</span>
                            <input type='date' onChange={(e)=>{setCalculateTo(e.target.value)}}
                            defaultValue={sessionDates[1].substring(0,10)} />
                        </div>
                        

                        <div className="ContainerY-btn-To-Calculate">
                        <button id="btn-To-Calculate" 
                        onClick={() => {setAfficheCalcule(true)
                            fetchAddHourInPeriod();      } }
                        >Calculer
                        </button>
                        </div>

                </div>  
                    {errorDate && <div className="lineY">
                            <p style={{color:'red',fontSize:'13px',letterSpacing:'0.7px' ,marginLeft:'2%'}}
                            >Vérifier Votre Intervale De Date !</p>
                        </div>    }   
    {/*_________________________________________  */}
             <Spin tip="Loading..." spinning={fetchHoursInPeriode}>
                       <div className={`resultsY-in-Period-close ${afficheCalcule ? 'openpen' : ''}`}>

                                 <div className="lineY">
                                        <p className="keyY">Heures Supplémentaires Total:</p> 
                                        <p className='valueY'>{result ? result.totalHoursForAllMonths: 0}</p>
                                         <p  className='unitéY'>Heures</p> 
                                         <span   style={{fontSize:'14px' ,fontWeight:'400',marginTop:'3px'}}>Dévisé on :</span>
                                    </div>
                                    
                        {result &&  result.combinedResult.Cours   && <div className="lineY">
                                        <p className="keyY">Total Cours:</p> 
                                        <p className='valueY'>{result &&  result.combinedResult.Cours ? result.combinedResult.Cours:0}</p>
                                         <p  className='unitéY'>Heures</p>
                                    </div> }
                        {result &&  result.combinedResult.Tp   && <div className="lineY">
                                        <p className="keyY">Total Tps:</p> 
                                        <p className='valueY'>{result  && result.combinedResult.Tp ?result.combinedResult.Tp:0}</p>
                                         <p  className='unitéY'>Heures</p>
                                    </div> }
                        {result &&  result.combinedResult.Td   &&  <div className="lineY">
                                        <p className="keyY">Total Tds:</p> 
                                        <p className='valueY'>{result && result.combinedResult.Tp ?result.combinedResult.Tp:0 }</p>
                                         <p  className='unitéY'>Heures</p>
                                    </div>        }

                                    <div className="lineY" style={{borderTop:'solid 1px black' ,paddingTop:'8px'}}>
                                        <p className="keyY">Brute Total:</p> 
                                        <p className='valueY'>{result ? result.totalBrut: 0}</p>
                                         <p  className='unitéY'>DA</p>
                                    </div>  
                                    <div className="lineY">
                                        <p className="keyY">L'IRG Total:</p> 
                                        <p className='valueY'>{result ? result.totalIRG: 0}</p>
                                         <p  className='unitéY'>DA</p>
                                    </div>  
                                    <div className="lineY">
                                        <p className="keyY">Le Net Total:</p> 
                                        <p className='valueY'>{result ? result.totalNet: 0}</p>
                                         <p  className='unitéY'>DA</p>
                                    </div>  
                    
                                    <div className="" style={{marginTop:'8%' }}>
                                        <button id="btn-To-Calculate" 
                                         onClick={() => {setAfficheCalcule(false)
                                            handleNavigate();
                                         } }
                                        >Afficher on détaills</button>
                                    </div> 
                                    
                                
                    </div>
            </Spin>

           
        </div>        
    </div>
)
}