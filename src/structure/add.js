// add.js
import React from 'react';
import addImage from './456.png';
import './add.css'; 

export default function Add() {
  return (
    <div className="add-container">
      <button className="add-button">
        <img src={addImage} alt="Add" className="add-icon" /> 
      </button>
    </div>
  );
}
