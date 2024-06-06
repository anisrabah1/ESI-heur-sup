import "./teacher_details.css";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { deepOrange, green, blue, grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import AddPosition from "./addPosition";

const Teacher_details = ({ data, set_showMore, showMore }) => {
  console.log(data);
  const [close, set_close] = useState(false);
  const navigate = useNavigate();
  console.log(
    "-------------------------------------------------------------------"
  );
  return (
    <div
      className="details_card"
      onClick={() => {
        set_showMore(!showMore);
        // navigate(`/teacher/${teacher._id}`);
      }}
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
        <div className="formC">
          <div className="details-degree form1">
            <div className="details_label">Degree : </div>
            {data.degree}
          </div>
          <div className="details-position form1">
            <div className="details_label">position : </div>
            {data.positions.length > 0 &&
              data.positions[data.positions.length - 1].position
                .positionName}{" "}
            <div
              className="more"
              onClick={(e) => {
                e.stopPropagation();
                set_close(true);
              }}
            >
              ...
            </div>{" "}
          </div>
        </div>
        <div className="formC">
          <div className="details-major form1">
            <div className="details_label">Major : </div>
            {data.major}
          </div>
          <div className="details-home form1">
            <div className="details_label">Home institution : </div>
            {data.homeInstitution}
          </div>
        </div>
        <div className="formC">
          <div className="details-status form1">
            <div className="details_label">Status : </div>
            {data.employmentStatus}
          </div>
          <div className="details-day form1">
            <div className="details_label">birth day : </div>
            {data.dateOfBirth.substring(0, 10)}
          </div>
        </div>
        <div className="formC">
          <div className="details-status form1">
            <div className="details_label">Card Type : </div>
            {data.cardType}
          </div>
          <div className="details-day form1">
            <div className="details_label">Card Number : </div>
            {data.cardNumber}
          </div>
        </div>
      </div>

      <button
        className="icon-button button2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></button>
      <button
        className="icon-button button3"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/teacher/${data._id}`);
        }}
      ></button>
      <button
        className="icon-button button1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></button>
      <button
        className="icon-button button1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      ></button>
      {close && <AddPosition set_close={set_close} />}
    </div>
  );
};

export default Teacher_details;
