import TextField from '@mui/material/TextField';
import { useState ,useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';

import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import FormControl from '@mui/material/FormControl';
import ApiUrls from '../APIs';
import './form.css';
const Form = ({submit,create}) => {
    
    
    

    const [Data,setData] = useState(
        {
            firstName : 'ousss',
            lastName:'ouiyxc',
            email:'arpoiuyghdi@esi-sba.dz',
            degree:'Master',
            phoneNumber:'0645684894',
            major:'info',
            employmentStatus:'',
            position:'663d576e241c0d0a5a146e1a',
            dateOfBirth:'2003-07-02',
            homeInstitution:'esi',
            cardType:'CCP',
            cardNumber:'1351354'
            
        }
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setData({
            ...Data,
            [name]: value
        });
    };
    const handleChangeT = (event) => {
        console.log(event)
    };
    const handleDateChange = (date) => {
        setData({
            ...Data,
            dateOfBirth: date ? date.format('YYYY-MM-DD') : null
        });
    };
    const apiUrls = new ApiUrls();
    function sub (){
        fetch(apiUrls.getUrl('getTeachers'), {
            method: 'POST', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify(Data) // Convert the data object to a JSON string
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Response:', data); // Handle the response data
        })
        .catch(error => {
            console.error('Error:', error.message   ); // Handle errors
        });
        
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
    return ( 
        <div className="form">
            
            <div className="formC">
            <Button
      component="label"
      
      role={undefined}
      variant="outlined"
      tabIndex={-1}
     
    >
      add profile pictue
      <VisuallyHiddenInput type="file" />
    </Button>
            </div>
            <div className="formC">
                <div className="form1"><TextField fullWidth id="outlined-basic" label="First name" variant="outlined" value={Data.firstName} name='firstName' onChange={handleChange} /></div>
                <div className="form1"><TextField fullWidth id="outlined-basic" label="last name" variant="outlined" value={Data.lastName} name='lastName' onChange={handleChange}/></div>
            </div>
            <div className="formC">
                <div className="form1"><TextField fullWidth id="outlined-basic" label="Email" variant="outlined" value={Data.email} name='email' onChange={handleChange} /></div>
                <div className="form1"><TextField fullWidth id="outlined-basic" label="Phone number" variant="outlined" value={Data.phoneNumber} name='phoneNumber' onChange={handleChange}/></div>
                

            </div>
            
            <div className="formC">
            <div className="form1"><TextField fullWidth id="outlined-basic" label="Home institution" variant="outlined" value={Data.homeInstitution} name='homeInstitution' onChange={handleChange}/></div>
                
                <div className="form1"><TextField fullWidth id="outlined-basic" label="Major" variant="outlined" value={Data.major} name='major' onChange={handleChange}/></div>
            </div>
            <div className="formC">
                <div className="form1">
                <FormControl fullWidth>
                <InputLabel id="">Position</InputLabel>
                <Select
                fullWidth
          labelId="degree"
          id="demo-simple-select"
          value={Data.position}
          label="position"
          name='position'
          onChange={handleChange}
          
        >
            <MenuItem value={'662d0dbfed0ec17a9299c946'}>searcher</MenuItem>
          
          
        </Select>
        </FormControl>
        
                </div>
                <div className="form1">
                <FormControl fullWidth>
                <InputLabel id="degree">Degree</InputLabel>
                <Select
                fullWidth
          labelId="degree"
          id="demo-simple-select"
          value={Data.degree}
          label="Degree"
          name='degree'
          onChange={handleChange}
          
        >
            <MenuItem value={'Master'}>Master</MenuItem>
          <MenuItem value={'Licence'}>Licence</MenuItem>
          <MenuItem value={'Doctorat'}>Doctorat</MenuItem>
          <MenuItem value={'Specialized Diploma'}>Specialized Diploma</MenuItem>
          <MenuItem value={'Professional Degrees'}>Professional Degrees</MenuItem>
          
        </Select>
        </FormControl>
                </div>
            </div>
            <div className="formC">
            <div className="form3">
            <FormControl fullWidth>
                <InputLabel id="">Status</InputLabel>
                <Select
                fullWidth
          labelId="degree"
          id="demo-simple-select"
          value={Data.employmentStatus}
          label="employmentStatus"
          name='employmentStatus'
          onChange={handleChange}
          
        >
            <MenuItem value={'Full-time'}>Full time</MenuItem>
            <MenuItem value={'Part-time'}>Part time</MenuItem>
            <MenuItem value={'Contract'}>Contract</MenuItem>
          
          
        </Select>
        </FormControl>
                </div>
                <div className="form3">
                    
                    <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
      
        <DatePicker label="Birth day"  value={ Data.dateOfBirth ? dayjs(Data.dateOfBirth) : null} name='dateOfBirth' onChange={handleDateChange}
        />
     
    </LocalizationProvider>
                </div>
            </div>
            
            <div className="formC">
            <IconButton aria-label="submit" fullWidth color="success" onClick={()=>{
                submit(true);
                sub();
                // console.log(Data);
                create(false);
            }}>
        <DeleteIcon />
      </IconButton>
            </div>
            
        </div>
     );
}
 
export default Form;