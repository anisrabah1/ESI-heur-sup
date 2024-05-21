import React from 'react';
import './departement.css';
import customIconImage from './155.png'; 

export default function Departement({show,data,setShow,selected}) {
  function capitalizeFirstLetters(inputString) {
    // Split the input string into words
    const words = inputString.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase());

    // Join the capitalized letters together
    const capitalizedString = capitalizedWords.join('');

    return capitalizedString;
}
  return (
    <div className="custom-container">
      <div className="custom-content">
        <div>
          
          <div className="custom-title">
          {show === 1 && <div>{capitalizeFirstLetters(data.departmentName)}</div>  }
          {!(show === 1) && data.name  } 
            </div>
          
          <div className="custom-subtitle">
            {show === 1 && data.departmentName}
            {show === 6 && <div> capacity  {data.capacity} </div> }
            {show === 6 && <div> Type  {data.type} </div> }
            {show === 2 && <div> equipment  {data.equipement} </div> }
            
          </div>
        
        </div>
        <button className="custom-button">
          <img src={customIconImage} alt="Custom Icon" className="custom-img" onClick={()=>{selected(data._id);setShow(show+1)}}/>
        </button>
      </div>
      <div className="custom-info">
        {show === 1 && 
         <div className="custom-number">{data.levels.length}</div>}
        {show === 1 && <div className="custom-level">Levels</div> }
        {show === 1 && <div className="custom-number"> {data.rooms.length} </div> }
        {show === 1 && <div className="custom-level">Rooms</div>}
        
        
        {show === 2 && <div className="custom-number">2</div>}
        {show === 2 &&  <div className="custom-level">Sections</div>}
        {show === 2 &&  <div className="custom-number">2</div>}
        {show === 2 &&  <div className="custom-level">Speciality</div>}
        {show === 2 &&  <div className="custom-number">2</div>}
        {show === 2 && <div className="custom-level">Semestres</div>}
        </div>
        
      </div>
    
  );
}
