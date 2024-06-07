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


const DayOff_popup = ({set_close,id,data}) => {
    const today = dayjs();
    const apiUrls = new ApiUrls();
    
    function getpositions (){
        const token = Cookies.get("token");
        fetch(apiUrls.getUrl('getPositions'),{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
              },
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            
            
            setPositions(data.positions);
            
             // Handle the response data
        })
        .catch(error => {
            toaster.notify(error.message);
             // Handle errors
        });
        
    };

    const [posit , setPosit]= useState({ 
        "position":  '', // Example ObjectId of a Position 
        "startDate": new Date(Date.now()) ,
      } );

    const [positions , setPositions]= useState();
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

useEffect(()=>{
   
    getpositions()   
    
},[])
const [testing , setTesting] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPosit(
            { 
                ...posit,
                "position":  value._id, // Example ObjectId of a Position 
                
              } 
        );
        
        console.log(posit)
       
    };
    const handleDateChange = (date) => {
        
        setPosit(
            { 
                ...posit, // Example ObjectId of a Position 
                startDate: date ? date.format('YYYY-MM-DD') : null ,
              } 
        );
        
        console.log(posit)
       
    };

    function sub (){
        const token = Cookies.get("token");
        fetch(`${apiUrls.getUrl('getTeachers')}/${id}/addNewPosition`, {
            method: 'PATCH', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Specify the content type as JSON
            },
            body: JSON.stringify(posit) // Convert the data object to a JSON string
        })
        .then(response => response.json()) // Parse the JSON response
        .then(dataFetched => {
            if(!(dataFetched.message)){
                // set_ts([data.data.data,...ts])
                console.log(dataFetched)
                window.location.reload(false);

            }
            console.log(dataFetched.message)
            toaster.notify(data.message); // Handle the response data
        })
        .catch(error => {
            toaster.notify(error.message); // Handle errors
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
                <div className="form1 addDayPop">position</div>
                <div className="form1 addDayPop">amount</div>
                <div className="form1 addDayPop">sataring from</div>
            </div>
            {data &&  data.map((e)=>(
                <div className="formC">
                <div className="form1 ">{e.position.positionName}</div>
                <div className="form1 ">{e.position.amountPerSeance}</div>
                <div className="form1 ">{e.startDate.substring(0, 10)}</div>
            </div>
            )) }
            <div className="formC positionAdding">
            <div className="form1 "><FormControl fullWidth>
                <InputLabel id="">Position</InputLabel>
                <Select
                fullWidth
          labelId="positions"
          id="demo-simple-select"
          value={posit.positionName}
          label="positions"
          name='positions'
          onChange={handleChange}
          
        >
            {positions && positions.map((e)=>(
                <MenuItem value={e}>{e.positionName}</MenuItem>
            ))}
            
          
          
        </Select>
        </FormControl>
        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><DatePicker label="Start Day"   value={ posit.startDate ? dayjs(posit.startDate) : null} name='startDate' onChange={handleDateChange} /> </LocalizationProvider></div>
            <Button  color="success" onClick={()=>{console.log(Data)
                
                sub()
            }}>
        ADD
      </Button>   
            </div>
            </div>
    </div>
     );
}
 
export default DayOff_popup;