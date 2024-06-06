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


const DayOff_popup = ({set_close,setData,Data,fetch,done,id,offRange}) => {
    const today = dayjs();
    const apiUrls = new ApiUrls();

const [dayOffType,set_dayOffType]=useState();

useEffect(()=>{
   
    
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
           
           
            <div className="formC" >
            <Button  color="success" onClick={()=>{console.log(Data)
                fetch();set_close(false) ;done(false)
                
            }}>
        ADD
      </Button></div>
            </div>
    </div>
     );
}
 
export default DayOff_popup;