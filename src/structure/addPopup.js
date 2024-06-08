import { useState ,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ApiUrls from '../APIs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Cookies from "js-cookie";
import { toaster } from 'evergreen-ui';



const DayOff_popup = ({AddSubURL,addURL,set_close,id,dataIn,set_data,dataPlus,set_dataPlus,dataPlus2,set_dataPlus2}) => {
    const today = dayjs();
    const apiUrls = new ApiUrls();
    const createDayOff = async (AddSubURL) => {
        const token = Cookies.get("token");
      
        try {
           console.log(path);
           console.log(body);
           console.log(AddSubURL);
            const response = await fetch(path,
          {
              method: 'POST', // Specify the HTTP method as POST
              headers: {
                  'Content-Type': 'application/json' ,
                  Authorization: `Bearer ${token}`,// Specify the content type as JSON
              },
              body: JSON.stringify(body)
          }
          );
            // console.log(response)
            
            const data = await response.json();
            
                if ([1,2,6,7,9,10].includes(AddSubURL)){set_data([...dataIn,data.data.data])} ;
                if ([3,4,5].includes(AddSubURL)){set_dataPlus([...dataPlus,data.data.data])} ;
                if ([8].includes(AddSubURL)){set_dataPlus2([...dataPlus2,data.data.data])} ;
                
            
            
            
            
          } catch (error) {
            toaster.notify(error.message);
             console.log(error.message)
            
          }
          
    };

useEffect(()=>{
    switch(AddSubURL){
        case 1 : setPath(`${addURL}`); setBody({departmentName : Data.name}); break;
        case 2 : setPath(`${addURL}rooms`); setBody({
            roomName : Data.name,
            roomCapacity : Data.capacity ,
            roomType: Data.type
        }); break;
        case 3 : setPath(`${addURL}levels`); setBody({levelName : Data.name}); break;
        case 4 : setPath(`${addURL}semesters`); setBody({semesterName : Data.name}); break;
        case 5 : setPath(`${addURL}semesters`); setBody({semesterName : Data.name}); break;
        case 6 : setPath(`${addURL}sections`); setBody({sectionName : Data.name}); break;
        case 9 : setPath(`${addURL}sections`); setBody({sectionName : Data.name}); break;
        case 7 : setPath(`${addURL}groups`); setBody({groupName : Data.name ,   groupSize : Data.size}); break;
        case 8 : setPath(`${addURL}specialties`); setBody({specialtyName : Data.name}); break;
        case 10 : setPath(`${addURL}subjects`); setBody({
            subjectName : Data.name,
            coefficient : Data.coefficient , 
            credit :Data.credit
        }); break;
        default : setPath(`AWWWWWWWWWWW`);break;
      };
      
})
   
const [path,setPath] = useState();
const [body,setBody] = useState();
const [Data,setData] = useState(
    {
        name : '',
        capacity : '',
        type : '',
        size:'',
        coefficient:'',
        credit:'',  
    }
);

const [testing , setTesting] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...Data,
            [name]: value
        });
       
    };
    
  
    return ( 
        <div className="modal-overlay" onClick={()=>{set_close(false)}}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={()=>{set_close(false)}}>×</button>
            <div className="formC">
            <TextField fullWidth id="outlined-basic" label="name" variant="outlined" value={Data.name} name='name' onChange={handleChange} />
                   
                </div>
                { (AddSubURL === 2) && <div className="formC">
            <TextField fullWidth id="outlined-basic" label="capacity" variant="outlined" value={Data.capacity} name='capacity' onChange={handleChange} />
                   
                </div>}
                { (AddSubURL === 10) && <div className="formC">
            <TextField fullWidth id="outlined-basic" label="coefficient" variant="outlined" value={Data.coefficient} name='coefficient' onChange={handleChange} />
                   
                </div>
                }
                { (AddSubURL === 7) && <div className="formC">
            <TextField fullWidth id="outlined-basic" label="size" variant="outlined" value={Data.size} name='size' onChange={handleChange} />
                   
                </div>}
                {(AddSubURL === 10) && <div className="formC">
            <TextField fullWidth id="outlined-basic" label="credit" variant="outlined" value={Data.credit} name='credit' onChange={handleChange} />
                   
                </div>}
               {(AddSubURL === 2) && <div className="formC">
            <TextField fullWidth id="outlined-basic" label="type (salleTp or salleTd)" variant="outlined" value={Data.type} name='type' onChange={handleChange} />
                   
                </div>}
            <div className="formC" >
            <Button  color="success" onClick={()=>{
                createDayOff(AddSubURL);
               
                set_close(false)
                
            }}>
        ADD
      </Button></div>
            </div>
    </div>
     );
}
 
export default DayOff_popup;