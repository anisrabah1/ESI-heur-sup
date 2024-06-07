import React from "react";
import "./card.css";
import customIconImage from "../155.png";
import { toaster } from "evergreen-ui";
import Cookies from "js-cookie";
import ApiUrls from "../../APIs";

export default function Rooms({
  dataGlobal,
  delURL,
  setRoomId,
  setShow,
  setDepartmentId,
}) {
  const data = dataGlobal;

  const Delete = async () => {
    const apiUrls = new ApiUrls();
    const token = Cookies.get("token");

    try {
      console.log(`${delURL}rooms/${data._id}`);
      const response = await fetch(`${delURL}rooms/${data._id}`, {
        method: "DELETE",
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
            <div>{data.roomName}</div>
          </div>

          <div className="custom-subtitle">{data.roomType}</div>
          <div className="custom-subtitle">
            <div
              className="delete"
              onClick={() => {
                Delete();
              }}
            >
              Delete
            </div>
          </div>
        </div>
        <button className="custom-button">
          <img
            src={customIconImage}
            alt="Custom Icon"
            className="custom-img"
            onClick={() => {
              setRoomId(data._id);
              setDepartmentId(data.department);
              setShow(101);
            }}
          />
        </button>
      </div>
      <div className="custom-info">
        <div className="custom-level">Capacity</div>
        <div className="custom-number">{data.roomCapacity}</div>

        {data.blocked && <div className="custom-level"> blocked </div>}
        {!data.blocked && <div className="custom-level"> not blocked </div>}
      </div>
    </div>
  );
}
