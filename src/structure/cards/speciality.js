import React from 'react';
import './card.css';
import customIconImage from '../155.png';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
import ApiUrls from '../../APIs'; 

export default function Section({dataGlobal,delURL,setdata,set_dataPlus,set_dataPlus2,setShow,pushdata,AddURL}) {
  const data = dataGlobal;
  const apiUrls = new ApiUrls();

  const Delete = async () => {
    const apiUrls = new ApiUrls();
    const token = Cookies.get("token");
    
    try {
        console.log(`${apiUrls.getUrl('getSpeciality')}${data._id}`); 
        const response = await fetch(`${apiUrls.getUrl('getSpeciality')}${data._id}`,{
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


const fetchsemester = async () => {
  const apiUrls = new ApiUrls();
  const token = Cookies.get("token");
  
  try {
      console.log(`${apiUrls.getUrl('getSpeciality')}${data._id}/semesters`); 
      const response = await fetch(`${apiUrls.getUrl('getSpeciality')}${data._id}/semesters`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      const datafetched = await response.json();
     
      
      console.log(datafetched)
      if(datafetched.semesters){
        set_dataPlus(datafetched.semesters);
      }
      
      
    } catch (error) {
       
       toaster.notify(error); 
      
    }
};
const fetchsection = async () => {
  const apiUrls = new ApiUrls();
  const token = Cookies.get("token");
  
  try {
      console.log(`${apiUrls.getUrl('getSpeciality')}${data._id}/sections`); 
      const response = await fetch(`${apiUrls.getUrl('getSpeciality')}${data._id}/sections`,{
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      
      
      const datafetched = await response.json();
     
      
      console.log(datafetched)
      if(datafetched.sections){
        setdata(datafetched.sections);
      }
     
      
    } catch (error) {
       
       toaster.notify(error); 
      
    }
};
  return (
    <div className="custom-container">
      <div className="custom-content">
        <div>
          
          <div className="custom-title">
           <div>{capitalizeFirstLetters(data.specialtyName)}</div>  
          
            </div>
          
          <div className="custom-subtitle">
            
{data.specialtyName}
            
          </div>
          <div className="custom-subtitle">
          <div className="delete"onClick={()=>{Delete()}}>Delete</div>

            
          </div>
        
        </div>
        <button className="custom-button">
          <img src={customIconImage} alt="Custom Icon" className="custom-img" onClick={async ()=>{
            try {
              pushdata();
              await fetchsection();
              await fetchsemester();
              AddURL(`${apiUrls.getUrl('getSpeciality')}${data._id}/`);
              set_dataPlus2([]);
              pushdata();
              setShow(4);
            } catch (error) {
              console.error("Error during fetch operations:", error);
            }
          }}/>
        </button>
      </div>
      <div className="custom-info">
        
         
         <div className="custom-level">Semesters</div>
         <div className="custom-number">{data.semesters.length}</div> 
         <div className="custom-level">sections</div>
         <div className="custom-number">{data.sections.length}</div>
        </div>
        
      </div>
    
  );
}
