import React from 'react';
import './card.css';
import customIconImage from '../155.png';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
import ApiUrls from '../../APIs'; 

export default function Departement({dataGlobal,setdata,set_dataPlus,setShow,pushdata,AddURL}) {
  const data = dataGlobal;
  const apiUrls = new ApiUrls();
  function capitalizeFirstLetters(inputString) {
    // Split the input string into words
    const words = inputString.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase());

    // Join the capitalized letters together
    const capitalizedString = capitalizedWords.join('');

    return capitalizedString;
}

const fetchRooms = async () => {
  const apiUrls = new ApiUrls();
  const token = Cookies.get("token");
  
  try {
      console.log(`${apiUrls.getUrl('getDepartments')}${data._id}/rooms`); 
      const response = await fetch(`${apiUrls.getUrl('getDepartments')}${data._id}/rooms`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      const datafetched = await response.json();
     
      
      
      if(datafetched.rooms){
        setdata(datafetched.rooms);
      }else{
        setdata([]);
      }
      
      
    } catch (error) {
      
       toaster.notify(error); 
      
    }
};
const fetchlevels = async () => {
  const apiUrls = new ApiUrls();
  const token = Cookies.get("token");
  
  try {
      console.log(`${apiUrls.getUrl('getDepartments')}${data._id}/levels`); 
      const response = await fetch(`${apiUrls.getUrl('getDepartments')}${data._id}/levels`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      const datafetched = await response.json();
     
      
      console.log(datafetched)
      if(datafetched.levels){
        set_dataPlus(datafetched.levels);
      }
      
      
    } catch (error) {
       
       toaster.notify(error); 
      
    }
};
const Delete = async () => {
  const apiUrls = new ApiUrls();
  const token = Cookies.get("token");
  
  try {
      console.log(`${apiUrls.getUrl('getDepartments')}${data._id}`); 
      const response = await fetch(`${apiUrls.getUrl('getDepartments')}${data._id}`,{
        method:'DELETE',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload(false);

    } catch (error) {
       
       toaster.notify(error); 
      
    }
};
  return (
    <div className="custom-container">
      <div className="custom-content">
        <div>
          
          <div className="custom-title">
           <div>{capitalizeFirstLetters(data.departmentName)}</div>  
          
            </div>
          
          <div className="custom-subtitle">
            {data.departmentName}

            
          </div>
          <div className="custom-subtitle">
          <div className="delete"onClick={()=>{Delete()}}>Delete</div>

            
          </div>
          
        </div>
        <button className="custom-button">
          <img src={customIconImage} alt="Custom Icon" className="custom-img" onClick={()=>{pushdata();fetchlevels();fetchRooms();AddURL(`${apiUrls.getUrl('getDepartments')}${data._id}/`);setShow(2);}}/>
        </button>
      </div>
      <div className="custom-info">
        
       
         <div className="custom-level">Levels</div>
         <div className="custom-number">{data.levels.length}</div> 
         
         <div className="custom-level">Rooms</div>
         <div className="custom-number"> {data.rooms.length} </div>
         
        
        
       
        </div>
        
      </div>
    
  );
}
