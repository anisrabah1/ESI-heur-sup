import Tamplate from "../../tamplate/tamplate";
import{useParams} from "react-router-dom"
import Teacher_details from './teacher_details';
import './teacher_info.css';
import {useState ,useEffect} from 'react';
import Teacher_sessions from "./teacher_sessions";
import TextField from '@mui/material/TextField';
import Teacher_dayOff from "./teacher_dayOff";
import ApiUrls from '../../APIs';
import DayOff_popup from "./dayOff_popup";

const Teacher_info = ({search,setSearch}) => {
    const {id}=useParams();
    const [dataT,set_DataT]=useState();
    const [close,set_close]=useState(false);
    const apiUrls = new ApiUrls();
    const fetchData = async () => {
        
        try {
            console.log()
            const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${id}`, {
                method: 'GET', // Specify the HTTP method as POST
                headers: {
                    'Content-Type': 'application/json' // Specify the content type as JSON
                },
               
            });
            // console.log(response)
            const data = await response.json();
            console.log(data)

            // set_DataT(data)
        
            // console.log('succsee!');
            
          } catch (error) {
             console.log(error)
            
          }
    };
    
  useEffect(()=>{
   fetchData();
});
    return ( 
        <div>
        <Tamplate search={search} setSearch={setSearch}/>
        <div className=" content">
         <div className="teacher-info">
         <Teacher_details data={dataT}/>
         
           <Teacher_sessions popup={set_close} teacher_id={id}/>
           
         </div>
           
        </div>
        { close &&
        <DayOff_popup set_close={set_close}/>
       }
        </div>
     );
}
 
export default Teacher_info;