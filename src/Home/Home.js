import { useState ,useEffect } from 'react';
import Tamplate from '../tamplate/tamplate';
import './Home.css';
import  BarCharts  from './diagrammes/BarCharts';


import Cookies from "js-cookie";
import apiUrl from "../global_Vars/apiConfig";


const Home = () => {
    const [total_t,set_total_t] = useState(0);
    const [total_h,set_total_h] = useState(0);
    const [tracherInSessionNow ,setTeacherInSessionNow]=useState(0);
    const [tracherInSessionNow_But ,setTeacherInSessionNow_But]=useState(0);

    const [status,setStatus]=useState(null);    
    let intervalId = null;
    let intervalId2 = null;
    let intervalId3 = null;
    let intervalId4 = null;
    
        useEffect(() => {
          const fetchData = async (
          ) => {
        
            try {
              console.log("Hello from Home Effect");
      
              const token = Cookies.get("token");
              const response = await fetch(
                `http://${apiUrl}:3000/api/v1/home/`,
                {
                  method: "GET",
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
      
              const data = await response.json();
              setStatus(data.data);
              set_total_t(data.data.totalTeacherCount);
              set_total_h(data.data.currentTotalAddHours);
              setTeacherInSessionNow(data.data.teachersThatHaveATeacherSessionNow);
              setTeacherInSessionNow_But(data.data.teachersThatHaveATeacherSessionNowButNotYetCalculated);

              console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
              console.log(data.data);
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




    useEffect(()=>{
        fetch('').then(res=>{return res.json();}).then(data => {set_total_t('64')});
            
    },[]);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [currentNumber2, setCurrentNumber2] = useState(0);
    const [currentNumber3, setCurrentNumber3] = useState(0);
    const [currentNumber4, setCurrentNumber4] = useState(0);


    // Define a function to increment the current number
    const incrementNumber_T = () => {
        setCurrentNumber((prevNumber) => {
            // Increment the number by 1
            const newNumber = prevNumber + 1;
            // If the new number reaches or exceeds the target number, stop the interval
            if (newNumber >= total_t) {
                clearInterval(intervalId);    
            }
            return newNumber;    
        });    
    };
    const incrementNumber_H = () => {
        setCurrentNumber2((prevNumber) => {
            // Increment the number by 1
            const newNumber = prevNumber + 1;
            // If the new number reaches or exceeds the target number, stop the interval
            if (newNumber >= total_h) {
                clearInterval(intervalId2);    
            }
            return newNumber;    
        });
            
    };

    const incrementNumber_3 = () => {
        setCurrentNumber3((prevNumber) => {
            // Increment the number by 1
            let newNumber ;
            if(tracherInSessionNow==1){      newNumber = prevNumber;     }else
           { newNumber = prevNumber+1} 
            // If the new number reaches or exceeds the target number, stop the interval
            if (newNumber >= tracherInSessionNow) {
                clearInterval(intervalId3);    
            }
            return newNumber;    
        });    
    };

    const incrementNumber_4 = () => {
        setCurrentNumber4((prevNumber) => {
            // Increment the number by 1
            let newNumber ;
            if(tracherInSessionNow_But==1){      newNumber = prevNumber;     }else
           { newNumber = prevNumber+1} 
            // If the new number reaches or exceeds the target number, stop the interval
            if (newNumber >= tracherInSessionNow_But) {
                clearInterval(intervalId4);    
            }
            return newNumber;    
        });    
    };

    // Set up an interval to increment the current number
    useEffect(() => {
        // Set up an interval to call incrementNumber every 100ms (you can adjust this timing)
         intervalId = setInterval(incrementNumber_T, currentNumber+currentNumber+30);
         intervalId2 = setInterval(incrementNumber_H, currentNumber+currentNumber2+30);
         intervalId3 = setInterval(incrementNumber_3, currentNumber+currentNumber3+30);
         intervalId4 = setInterval(incrementNumber_4, currentNumber+currentNumber4+30);

        // Cleanup the interval when the component unmounts or the effect re-runs 
        return () => {
            clearInterval(intervalId);
            clearInterval(intervalId2);    
            clearInterval(intervalId3);    
            clearInterval(intervalId4);    

        };    
    }, [total_t,total_h,tracherInSessionNow,tracherInSessionNow_But]); 





    return (
<div>
    <Tamplate/>
        <div className='content'>
           
                        
                    <div className="homeA">
                        
                        <div className="labels">
                            <div className="label-1" onClick={()=>{console.log(status)}}>Bienvenue, Administrateurs !</div>
                            <div className="label-2">Calculs précis, rapports clairs. Tout en un seul endroit</div>
                        </div>
                        <div className="counters">
                            
                        <div className="total-houre">
                            <center>
                            <div className="c-label">Nombre Total D'enseignants</div>
                            <div className="n-label">{currentNumber}</div>
                            </center>
                        </div>
                        <div className="total-houre">
                        <center>
                            <div className="c-label">Heures Supplémentaires Totales</div>
                            <div className="n-label">{currentNumber2}</div>
                            </center>
                        </div>
                        
                        

                        <div className="total-houre">
                            <center>
                            <div className="c-label"
                            onClick={()=>console.log(tracherInSessionNow)}
                            >Enseignants Ont Une Session Maintenant</div>
                            <div className="n-label">{currentNumber3}</div>
                            </center>
                        </div>

                        <div className="total-houre">
                            <center>
                            <div className="c-label"
                            onClick={()=>console.log(tracherInSessionNow)}
                            >Enseignants pas encore calculée</div>
                            <div className="n-label">{currentNumber4}</div>
                            </center>
                        </div>
                        
                        </div>
                        <BarCharts status={status}/>
                    </div>
                   
        </div>


</div>
     );
}
 
export default Home;