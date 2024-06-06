// add.js
import React from 'react';
import addImage from './456.png';
import './add.css'; 

export default function Add({create,AddSubURL,content}) {
  return (
    <div className="add-container">
      <button className="add-button" onClick={()=>{create(true);AddSubURL(content)}}>
        <img src={addImage} alt="Add" className="add-icon" /> 
      </button>
    </div>
  );
}
