
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { deepOrange, green, blue, grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Teacher_details = ({ data, set_showMore, showMore }) => {
  console.log(data);
  const [close, set_close] = useState(false);
  const navigate = useNavigate();
  console.log(
    "-------------------------------------------------------------------"
  );
  return (
    <div
      className="details_card inArchive"
      
    >
      <div className="photo">
        <Avatar
          alt={"anis"}
          src=""
          sx={{ width: 150, height: 150, bgcolor: blue[700] }}
          className="photo_container"
        />
      </div>
      <div className="details">
        <div className="formC">
          <div className="details-first-name form1">
            {" "}
            <div className="details_label">First name : </div>
            {data.firstName}
          </div>
          <div className="details-last-name form1">
            <div className="details_label">Last name : </div>
            {data.lastName}
          </div>
        </div>
        <div className="formC">
          <div className="details-email form1">
            <div className="details_label">Email : </div>
            {data.email}
          </div>
          <div className="details-phone form1">
            <div className="details_label">Phone number : </div>
            {data.phoneNumber}
          </div>
        </div>
        
        {data.positions.length > 0 && data.positions.map((e,index)=>(
            <div className="formC formINarchive">
            <div className="details-position form1">
                <div className="details_label">position {e.positionName} started : </div>
                
{e.startDate.substring(0, 10)}
                
                
            </div>
            <div className="details-position form1">
                <div className="details_label">amount amount Per Seance : </div>
                
{e.amountPerSeance}
                
                
            </div>
            
            </div>))
                }{" "}
        
        
      </div>

      
     
      
     
    
    </div>
  );
};

export default Teacher_details;
