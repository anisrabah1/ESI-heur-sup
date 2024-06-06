import { useState ,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ApiUrls from '../../APIs';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Cookies from "js-cookie";
import { toaster } from 'evergreen-ui';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


const DayOff_popup = ({set_close,id,offRange}) => {
    const today = dayjs();
    const apiUrls = new ApiUrls();
    const createDayOff = async () => {
        const token = Cookies.get("token");
      
        try {
           
            const response = await fetch(`${apiUrls.getUrl('getAllSessions')}/${id}/personalOffDays`,
          {
              method: 'POST', // Specify the HTTP method as POST
              headers: {
                  'Content-Type': 'application/json' ,
                  Authorization: `Bearer ${token}`,// Specify the content type as JSON
              },
              body: JSON.stringify(Data)
          }
          );
            // console.log(response)
            
            const data = await response.json();
            toaster.notify(data.message);
            window.location.reload(false);
        
            
            
          } catch (error) {
            toaster.notify(error.message);
             console.log(error.message)
            
          }
          
    };


   

const [Data,setData] = useState(
    {
        startDate : '',
        endDate : '',
        startHour:'',
        endHour:'',
        
        offDayType:'',
        
    }
);
const [dayOffType,set_dayOffType]=useState();
function  getDayOffTypes () {
    const token = Cookies.get("token");
    console.log('we will request now')
    fetch(`${apiUrls.getUrl('getDayTypes')}`,{
        method:'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        set_dayOffType(data.offDayTypes);
        
       
         // Handle the response data
    })
    .catch(error => {
        toaster.notify(error.message);
         // Handle errors
    });
    
};
useEffect(()=>{
    getDayOffTypes()
    setData(
        {
            startDate : offRange[0],
            endDate : offRange[1],
            startHour:'',
            endHour:'',
            
            offDayType:'',
            
        }
    )
    
},[])
const [testing , setTesting] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...Data,
            [name]: value
        });
       
    };
    const handleDate1 = (date) => {
        
        setData({
            ...Data,
            startDate: date ? date.format('YYYY-MM-DD') : null
        });
     
    };
    const handleDate2 = (date) => {
        
        setData({
            ...Data,
            endDate: date ? date.format('YYYY-MM-DD') : null
        });
       
    };
    const handleStartTimeChange = (date) => {
        
        setData({
            ...Data,
            startHour: date ? date.format('HH:mm') : null
        });
       
    };
    const handleEndTimeChange = (date) => {

       
        setData({
            ...Data,
            endHour: date ? date.format('HH:mm') : null
        });
        
    };
    return ( 
        <div className="modal-overlay" onClick={()=>{set_close(false)}}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={()=>{set_close(false)}}>×</button>
            <div className="formC">
                    <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><DatePicker label="Start Day"   value={ Data.startDate ? dayjs(Data.startDate) : null} name='startDate' onChange={handleDate1} /> </LocalizationProvider></div>
                    
                    <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><DatePicker label="End Day"  value={ Data.endDate ? dayjs(Data.endDate) : null} name='endDate' onChange={handleDate2} defaultValue={dayjs('2022-04-17')} /></LocalizationProvider></div>
                </div>
           
            { Data.startDate === Data.endDate && !( Data.startDate ==='') && !( Data.endDate ==='') &&
             <div className="formC">
             <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><TimePicker label="Start Time" name='startHour' value={Data.startHour ? dayjs(Data.startHour, 'HH:mm') : null} onChange={handleStartTimeChange}/></LocalizationProvider></div>
             <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><TimePicker label="End Time" name='endHour' value={Data.endHour ? dayjs(Data.endHour, 'HH:mm') : null} onChange={handleEndTimeChange}  /></LocalizationProvider></div>
         </div>
            }
            <div className="formC">
               
            <FormControl fullWidth>
                <InputLabel id="degree">motive</InputLabel>
                <Select
                fullWidth
          labelId="degree"
          id="demo-simple-select"
          value={Data.Type}
          label="motive"
          name='offDayType'
          onChange={handleChange}
          
        >
            { dayOffType && dayOffType.map((e)=>(
                <MenuItem value={e._id}>{e.offDayTypeName}</MenuItem>
            )) }
            
          
          
        </Select>
        </FormControl>
            </div>
            <div className="formC" >
            <Button  color="success" onClick={()=>{console.log(Data)
                createDayOff();
                window.fetchDayOffs();
                set_close(false)
            }}>
        ADD
      </Button></div>
            </div>
    </div>
     );
}
 
export default DayOff_popup;