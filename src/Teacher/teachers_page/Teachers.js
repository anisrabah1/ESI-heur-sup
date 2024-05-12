import { useState ,useEffect } from 'react';
import Form from '../form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Teacher_card from './Teacher_card';
import Tamplate from '../../tamplate/tamplate';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ApiUrls from '../../APIs';
import { useNavigate } from 'react-router-dom';



    
const Teachers = ({search,setSearch}) => {
    const [create, set_create] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submit, setsubmit] = useState(false);
    const navigate = useNavigate();

    
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
    

    

    const rv = () => {
        if (create){
            set_create(false);
        }else{
            set_create(true);

        };
        
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            console.log('this is me',apiUrls.getUrl('getTeachers'))
            const response = await fetch(apiUrls.getUrl('getTeachers'));
            // console.log(response)
            const data = await response.json();
            console.log(data)

        set_t(data.teachers)
           setIsLoading(false)
            console.log('succsee!');
          } catch (error) {
             console.log(error)
            
          }
    };


    function addObjectIfStringContained() {
        // Iterate over the array
        const buf =[];
        for (let i = 0; i < t.length; i++) {
            // Get the current object
            const currentObject = t[i];
            
            // Iterate over the properties of the object
            for (const key in currentObject) {
                // Check if the property value contains the search string
                if (typeof currentObject[key] === 'string' && currentObject[key].includes(search)) {
                    // Add the new object to the array
                    buf.push(currentObject);
                    break;
                    
                     // Exit the function since the new object is added
                }
            }
        }
        set_ts(buf)

        console.log(ts)    }
    // Create an instance of the ApiUrls class
const apiUrls = new ApiUrls();
    const [t,set_t] = useState([
       
    ])
    const [ts,set_ts] = useState([])
        useEffect (() => {
            fetchData();
            
        },[]);
        useEffect(()=>{
            
                set_ts(t)
                   
                
        },[t])
        useEffect(()=>{
            
            if (search.length===0){
                set_ts(t)
                 }else{
                    addObjectIfStringContained()  
                 }   
                 
            
    },[search])
        
        return ( 
            <div>
               
                <Tamplate search={search} setSearch={setSearch}/>
                <div className='content'>
                
    {submit && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      create teacher was successful.
    </Alert>
    }
        <div className="teachers">
            
            { !create && !isLoading && ts.map((m)=>(
              
                <Teacher_card teacher={m} />
                
            )) }
            {create && !isLoading &&
<Form submit={setsubmit} create={set_create}/>
            }
 {!create && isLoading &&  <div className="loading"><CircularProgress /></div> }





            <button className="floating-button" onClick={()=>{rv()}}>
            <FontAwesomeIcon icon={faPlus} />
            </button>  
        </div>
        </div>
        </div>
     );
}
 
export default Teachers;