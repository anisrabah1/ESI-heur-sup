import React from 'react';
import './card.css';
import customIconImage from '../155.png';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
import ApiUrls from '../../APIs'; 

export default function Subject({dataGlobal,delURL}) {
  const data = dataGlobal;
  const apiUrls = new ApiUrls();
  function capitalizeFirstLetters(inputString) {

    console.log(inputString);
   
    // Split the input string into words
    const words = inputString.split(' ');
   

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase());

    // Join the capitalized letters together
    const capitalizedString = capitalizedWords.join('');

    return capitalizedString;
}

const Delete = async () => {
  const apiUrls = new ApiUrls();
  const token = Cookies.get("token");
  
  try {
      console.log(`${delURL}subjects/${data._id}`); 
      const response = await fetch(`${delURL}subjects/${data._id}`,{
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
           <div>{data.subjectName}</div>  
          
            </div>
          
            <div className="custom-subtitle">
          <div className="delete"onClick={()=>{Delete()}}>Delete</div>

            
          </div>
        
        </div>
        <button className="custom-button">
          <img src={customIconImage} alt="Custom Icon" className="custom-img" onClick={()=>{}}/>
        </button>
        </div>
        <div className="custom-info">
         <div className="custom-level">Coefficient</div>
         <div className="custom-number">{data.coefficient}</div> 
        </div>
        
      
      </div>
      
    
  );
}
