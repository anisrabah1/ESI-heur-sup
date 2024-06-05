import './Teachers.css'
import Avatar from '@mui/material/Avatar';
import { deepOrange,green,blue,grey } from '@mui/material/colors';
import { useState ,useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ApiUrls from '../../APIs';
import Teacher_details from '../teacher_page/teacher_details';
import Cookies from "js-cookie"
const Teacher_card
 = ({teacher,submit}) => {
    const [showMore, set_showMore] = useState(false);
    const navigate = useNavigate();

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Function to update the screen size
    const updateScreenSize = () => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };
    useEffect(() => {
        // // Add the resize event listener
        // window.addEventListener('resize', updateScreenSize);

        // // Cleanup function to remove the event listener
        // return () => {
        //     window.removeEventListener('resize', updateScreenSize);
        // };
    }, []);
    const apiUrls = new ApiUrls();
    const DeletData = async () => {
        const token = Cookies.get("token");
        try {
             
            console.log('this is me',`${apiUrls.getUrl('getTeachers')}/${teacher._id}`)
            const response = await fetch(`${apiUrls.getUrl('getTeachers')}/${teacher._id}`,
            {
                method:'DELETE',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Specify the content type as JSON
            },
        });
            // console.log(response)
            const data = await response.json();
            console.log(data.message)
            window.location.reload(false);

            console.log('Delete succsee!');
            
          } catch (error) {
             console.log(error);
             window.location.reload(false);
          }
    };

    return ( 
        <div>
    {showMore &&
        <Teacher_details data={teacher} showMore={showMore} set_showMore={set_showMore} />
    }
    { !showMore &&
        <div className="teacher"  onClick={()=>{
        set_showMore(!showMore)
            // navigate(`/teacher/${teacher._id}`);
            }} >
        
        <Avatar  src="/assets/n.png"  sx={{ width: window.innerWidth*0.08,
            height: window.innerWidth*0.08 ,bgcolor: blue[700]}} className='photo_container'/>
        
        
        <div className="info">
            <div className="name">{teacher.firstName.toUpperCase()} {teacher.lastName.toUpperCase()}</div>
            <div className="sub_info ">
                <div className="sub_info1 ">
                <div className="email"><div className="Tlabel">Email :</div> {teacher.email}</div>
                
                <div className="number sub_info2"><div className="Tlabel">Phone :</div>  {teacher.phoneNumber}</div>
                </div>
                <div className="sub_info1 " >
                <div className="degree"><div className="Tlabel">Degree :</div>  {teacher.degree}</div>
                <div className="major sub_info2"><div className="Tlabel">Major :</div> {teacher.major}</div>
                </div>
                
            
            </div>
            
        </div>
        <button className="icon-button button2" onClick={(e)=>{e.stopPropagation();}}></button>
                   <button className="icon-button button3" onClick={(e)=>{e.stopPropagation();navigate(`/teacher/${teacher._id}`);}}></button>
                    <button className="icon-button button1" onClick={(e)=>{e.stopPropagation();DeletData()}}></button>
                    
                    
                   
                    
               
    </div>
    }
    </div>
     );
}
 
export default Teacher_card
;