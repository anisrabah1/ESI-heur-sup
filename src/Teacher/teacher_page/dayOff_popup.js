import { useState ,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const DayOff_popup = ({set_close}) => {
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');
    const todayStartOfTheDay = today.startOf('day'); 

const [Data,setData] = useState(
    {
        StartDay : '',
        EndDay : '',
        StartTime:'',
        EndTime:'',
        motive:'',
        type:'',
        
    }
);

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
            StartDay: date ? date.format('YYYY-MM-DD') : null
        });
    };
    const handleDate2 = (date) => {
        setData({
            ...Data,
            EndDay: date ? date.format('YYYY-MM-DD') : null
        });
    };
    return ( 
        <div className="modal-overlay" onClick={()=>{set_close(false)}}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={()=>{set_close(false)}}>×</button>
            <div className="formC">
                <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><DatePicker label="Start Day"  value={ Data.StartDay ? dayjs(Data.StartDay) : null} name='StartDay' onChange={handleDate1}/></LocalizationProvider></div>
                <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><DatePicker label="End Day"  value={ Data.StartDay ? dayjs(Data.StartDay) : null} name='StartDay' onChange={handleDate2}/></LocalizationProvider></div>
            </div>
            <div className="formC">
                <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><TimePicker label="Start Time" name='StartTime' value={Data.StartTime} onChange={handleChange}/></LocalizationProvider></div>
                <div className="form1"><LocalizationProvider fullWidth dateAdapter={AdapterDayjs}><TimePicker label="End Time" name='EndTime' value={Data.EndTime} onChange={handleChange}  /></LocalizationProvider></div>
            </div>
            <div className="formC">
                <div className="form1"><TextField fullWidth id="outlined-basic" label="motive" variant="outlined"  name='motive' onChange={handleChange} /></div>
                <div className="form1"><TextField fullWidth id="outlined-basic" label="type" variant="outlined"  name='type' onChange={handleChange} /></div>
            </div>
            <div className="formC" >
            <Button  color="success" onClick={()=>{console.log(Data)}}>
        ADD
      </Button></div>
            </div>
    </div>
     );
}
 
export default DayOff_popup;