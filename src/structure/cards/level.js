import React from "react";
import "./card.css";
import customIconImage from "../155.png";
import { toaster } from "evergreen-ui";
import Cookies from "js-cookie";
import ApiUrls from "../../APIs";

export default function Level({
  dataGlobal,
  setdata,
  set_dataPlus,
  set_dataPlus2,
  setShow,
  pushdata,
  AddURL,
}) {
  const data = dataGlobal;
  const apiUrls = new ApiUrls();
  function capitalizeFirstLetters(inputString) {
    // Split the input string into words
    const words = inputString.split(" ");

    // Capitalize the first letter of each word
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase());

    // Join the capitalized letters together
    const capitalizedString = capitalizedWords.join("");

    return capitalizedString;
  }

  const fetchsection = async () => {
    const apiUrls = new ApiUrls();
    const token = Cookies.get("token");

    try {
      console.log(`${apiUrls.getUrl("getLevels")}${data._id}/sections`);
      const response = await fetch(
        `${apiUrls.getUrl("getLevels")}${data._id}/sections`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const datafetched = await response.json();

      console.log(datafetched);

      if (datafetched.sections) {
        setdata(datafetched.sections);
      } else {
        setdata([]);
      }
    } catch (error) {
      setdata([]);
      toaster.notify(error);
    }
  };
  const fetchsemesters = async () => {
    const apiUrls = new ApiUrls();
    const token = Cookies.get("token");

    try {
      console.log(`${apiUrls.getUrl("getLevels")}${data._id}/semesters`);
      const response = await fetch(
        `${apiUrls.getUrl("getLevels")}${data._id}/semesters`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const datafetched = await response.json();

      console.log(datafetched);
      if (datafetched.semesters) {
        set_dataPlus(datafetched.semesters);
      } else {
        set_dataPlus([]);
      }
    } catch (error) {
      set_dataPlus([]);
      toaster.notify(error);
    }
  };
  const fetchspeciality = async () => {
    const apiUrls = new ApiUrls();
    const token = Cookies.get("token");

    try {
      console.log(`${apiUrls.getUrl("getLevels")}${data._id}/specialties`);
      const response = await fetch(
        `${apiUrls.getUrl("getLevels")}${data._id}/specialties  `,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const datafetched = await response.json();

      console.log(datafetched);
      if (datafetched.specialtys) {
        set_dataPlus2(datafetched.specialtys);
      } else {
        set_dataPlus2([]);
      }
    } catch (error) {
      set_dataPlus2([]);
      toaster.notify(error);
    }
  };

  const Delete = async () => {
    const apiUrls = new ApiUrls();
    const token = Cookies.get("token");

    try {
      console.log(`${apiUrls.getUrl("getLevels")}${data._id}`);
      const response = await fetch(
        `${apiUrls.getUrl("getLevels")}${data._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
            <div>{data.levelName}</div>
          </div>

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
            onClick={async () => {
              try {
                await pushdata();
                await fetchsection();
                await fetchspeciality();
                await fetchsemesters();
                AddURL(`${apiUrls.getUrl("getLevels")}${data._id}/`);

                setShow(3);
              } catch (error) {
                console.error("Error during fetch operations:", error);
              }
            }}
          />
        </button>
      </div>
      <div className="custom-info">
        <div className="custom-level">Semesters</div>
        <div className="custom-number">{data.semesters.length}</div>

        <div className="custom-level">Sections</div>
        <div className="custom-number"> {data.sections.length} </div>

        <div className="custom-level">Specialties</div>
        <div className="custom-number"> {data.specialties.length} </div>
      </div>
    </div>
  );
}
