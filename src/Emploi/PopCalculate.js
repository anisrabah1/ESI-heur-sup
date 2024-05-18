import { useState ,useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

import { Spin } from "antd";
import { useNavigate } from 'react-router-dom';
export default function PopCalculate ({ouvert,setOuvert,result,isCalculating,seances,teacherInfos}){
    const navigate=useNavigate();


    // const [total_t,set_total_t] = useState('64')
    // const [total_h,set_total_h] = useState('123')
    // let intervalId = null;
    // let intervalId2 = null;
    // useEffect(()=>{
    //     fetch('').then(res=>{return res.json();}).then(data => {set_total_t('64')});
        
    // },[]);
    // const [currentNumber, setCurrentNumber] = useState(0);
    // const [currentNumber2, setCurrentNumber2] = useState(0);

    // // Define a function to increment the current number
    // const incrementNumber_T = () => {
    //     setCurrentNumber((prevNumber) => {
    //         // Increment the number by 1
    //         const newNumber = prevNumber + 1;
    //         // If the new number reaches or exceeds the target number, stop the interval
    //         if (newNumber >= total_t) {
    //             clearInterval(intervalId);
    //         }
    //         return newNumber;
    //     });
    // };
    // const incrementNumber_H = () => {
    //     setCurrentNumber2((prevNumber) => {
    //         // Increment the number by 1
    //         const newNumber = prevNumber + 1;
    //         // If the new number reaches or exceeds the target number, stop the interval
    //         if (newNumber >= total_h) {
    //             clearInterval(intervalId2);
    //         }
    //         return newNumber;
    //     });
        
    // };

    // // Set up an interval to increment the current number
    // useEffect(() => {
    //     // Set up an interval to call incrementNumber every 100ms (you can adjust this timing)
    //      intervalId = setInterval(incrementNumber_T, currentNumber+currentNumber+30);
    //      intervalId2 = setInterval(incrementNumber_H, currentNumber+currentNumber2+30);
    //     // Cleanup the interval when the component unmounts or the effect re-runs
    //     return () => {
    //         clearInterval(intervalId);
    //         clearInterval(intervalId2);
    //     };
    // }, [total_t,total_h]); 
const[detls,setDetls]=useState(result);
    
    const handleNavigate = () => {
      console.log(teacherInfos);
        navigate('/to-printView', {
          state: { 
            seances: seances, 
            result: result, 
            teacherInfos : teacherInfos,
          }
        });
      };


    const handleCloseCalculate = () => {
        setOuvert(false);
      }

    
    
    return(


        <div className={`popUp-Calculate ${ouvert ? 'open' : ''}`}>
           
            <div className="resultsY">
                <div className="icon" onClick={handleCloseCalculate}>
                    <FontAwesomeIcon
                    icon={faCircleXmark}
                    
                    style={{ color: "#2f4971" }}
                    className="icon2"
                    />
                </div>
           <Spin tip="Loading..." spinning={isCalculating}>
                <div className="lineY" style={{borderBottom:'solid 1px black',paddingBottom:'10px'}}>
                    <p className="keyY">Heures Total :</p> <p className='valueY'>{result ? result.totalHour : 0}</p> <p  className='unitéY'>Heures</p>
                </div>
                <div >
                {result && result.seances.map((item) => {
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
                <div className="lineY" id="heure-sup-line" style={{borderTop:'solid 1px black',padding:'10px 0px',marginTop:'10px'}}>
                    <p className="keyY">Heures Supplémentaires :</p> 
                   <p className='valueY'>{result && result.addHours ? result.addHours : 0}</p>
                     <span className='unitéY'>Heures</span>
                </div>
                <div className="" style={{marginTop:'8%' }}>
                                        <button id="btn-To-Calculate" 
                                         onClick={ 
                                            handleNavigate
                                            
                                         } 
                                        >Imprimer</button>
                                    </div> 

                
            </Spin> 
            </div>

        </div>


    

)
}