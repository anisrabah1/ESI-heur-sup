import Tamplate from "../../tamplate/tamplate";
import{useParams} from "react-router-dom"
import Teacher_details from './teacher_details';
import './teacher_info.css';
import {useState ,useEffect} from 'react';
import Teacher_sessions from "./teacher_sessions";
import Teacher_dayOff from "./teacher_dayOff";
import ApiUrls from '../../APIs';
const Teacher_info = ({search,setSearch}) => {
    const {id}=useParams();
    const {dataT,set_DataT}=useState();
    const {close,set_close}=useState(true);
    const fetchData = async () => {
        
        try {
            console.log()
            const response = await fetch(`http://192.168.43.5:3000/api/v1/teachers/${id}`, {
                method: 'GET', // Specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
               
            });
            // console.log(response)
            const data = await response.json();
            console.log(data)

        set_DataT(data)
           
            console.log('succsee!');
          } catch (error) {
             console.log(error)
            
          }
    };
    
  useEffect(()=>(
   fetchData()
  ),[dataT,close])
    return ( 
        <div>
        <Tamplate search={search} setSearch={setSearch}/>
        <div className=" content">
         <div className="teacher-info">
         <Teacher_details data={dataT}/>
         <Teacher_dayOff popup={set_close}/>
           <Teacher_sessions/>
           
         </div>
           
        </div>
        { close &&
        <div className="modal-overlay" onClick={()=>{set_close(false)}}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={()=>{set_close(false)}}>×</button>
                hi11111111111111111111111111111111111111
            </div>
        </div>}
        </div>
     );
}
 
export default Teacher_info;