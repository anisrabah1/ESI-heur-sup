import React from 'react';
import './card.css';
import customIconImage from '../155.png';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
import ApiUrls from '../../APIs'; 

export default function Section({dataGlobal,delURL,setdata,setShow,pushdata,AddURL}) {
  const data = dataGlobal;
  const apiUrls = new ApiUrls();
  const Delete = async () => {
    const apiUrls = new ApiUrls();
    const token = Cookies.get("token");
    
    try {
        console.log(`${delURL}sections/${data._id}`); 
        const response = await fetch(`${delURL}sections/${data._id}`,{
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


const fetchgroupe = async () => {
  const apiUrls = new ApiUrls();
  const token = Cookies.get("token");
  
  try {
      console.log(`${apiUrls.getUrl('getSection')}${data._id}/groups`); 
      const response = await fetch(`${apiUrls.getUrl('getSection')}${data._id}/groups`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      const datafetched = await response.json();
     
      
      console.log(datafetched)
      if(datafetched.groups){
        setdata(datafetched.groups);
      }else{setdata([]);}
      
      
    } catch (error) {
       
       toaster.notify(error); 
      
    }
};
  return (
    <div className="custom-container">
      <div className="custom-content">
        <div>
          
          <div className="custom-title">
           <div>{capitalizeFirstLetters(data.sectionName)}</div>  
          
            </div>
          
            <div className="custom-subtitle">
          <div className="delete"onClick={()=>{Delete()}}>Delete</div>

            
          </div>
        
        </div>
        <button className="custom-button">
          <img src={customIconImage} alt="Custom Icon" className="custom-img" onClick={ async ()=>{
            try {
              await fetchgroupe();
              pushdata();
              AddURL(`${apiUrls.getUrl('getSection')}${data._id}/`);
              setShow(6);
            } catch (error) {
              console.error("Error during fetch operations:", error);
            }
          }}/>
        </button>
      </div>
      <div className="custom-info">
        
         
         <div className="custom-level">Groops</div>
         <div className="custom-number">{data.groups.length}</div> 
         
         
        
        
       
        </div>
        
      </div>
    
  );
}
