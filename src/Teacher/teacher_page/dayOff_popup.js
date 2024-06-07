import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ApiUrls from "../../APIs";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Cookies from "js-cookie";
import { toaster } from "evergreen-ui";

const DayOff_popup = ({ set_close, id, offRange, personal }) => {
  const today = dayjs();
  const apiUrls = new ApiUrls();

  const createDayOff = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${apiUrls.getUrl("getGlobSessions")}/${id}/offDays`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(Data),
        }
      );
      const data = await response.json();
      toaster.notify(data.message);
      window.location.reload(false);
    } catch (error) {
      toaster.notify(error.message);
      console.log(error.message);
    }
  };


  const [Data, setData] = useState({
    startDate: today.format("YYYY-MM-DD"),
    endDate: today.format("YYYY-MM-DD"),
    startHour: "",
    endHour: "",
    offDayType: "",
  });

  const [dayOffType, set_dayOffType] = useState([]);

  const getDayOffTypes = () => {
    const token = Cookies.get("token");
    fetch(`${apiUrls.getUrl("getDayTypes")}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Filter the day off types to only include personal ones
        const filteredDayOffTypes = data.offDayTypes.filter(
          (type) => type.personal === personal
        );
        set_dayOffType(filteredDayOffTypes);
      })
      .catch((error) => {
        toaster.notify(error.message);
      });
  };

  useEffect(() => {
    getDayOffTypes();

    if (offRange && offRange.length >= 2) {
      setData((prevData) => ({
        ...prevData,
        startDate: offRange[0],
        endDate: offRange[1],
      }));
    }
  }, [offRange]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

  const handleDate1 = (date) => {
    setData({
      ...Data,
      startDate: date ? date.format("YYYY-MM-DD") : null,
    });
  };

  const handleDate2 = (date) => {
    setData({
      ...Data,
      endDate: date ? date.format("YYYY-MM-DD") : null,
    });
  };

  const handleStartTimeChange = (date) => {
    setData({
      ...Data,
      startHour: date ? date.format("HH:mm") : null,
    });
  };

  const handleEndTimeChange = (date) => {
    setData({
      ...Data,
      endHour: date ? date.format("HH:mm") : null,
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        set_close(false);
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-button"
          onClick={() => {
            set_close(false);
          }}
        >
          ×
        </button>
        <div className="formC">
          <div className="form1">
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Day"
                value={Data.startDate ? dayjs(Data.startDate) : today}
                name="startDate"
                onChange={handleDate1}
              />
            </LocalizationProvider>
          </div>
          <div className="form1">
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Day"
                value={Data.endDate ? dayjs(Data.endDate) : today}
                name="endDate"
                onChange={handleDate2}
              />
            </LocalizationProvider>
          </div>
        </div>
        {Data.startDate === Data.endDate && Data.startDate && Data.endDate && (
          <div className="formC">
            <div className="form1">
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  name="startHour"
                  value={Data.startHour ? dayjs(Data.startHour, "HH:mm") : null}
                  onChange={handleStartTimeChange}
                />
              </LocalizationProvider>
            </div>
            <div className="form1">
              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="End Time"
                  name="endHour"
                  value={Data.endHour ? dayjs(Data.endHour, "HH:mm") : null}
                  onChange={handleEndTimeChange}
                />
              </LocalizationProvider>
            </div>
          </div>
        )}
        <div className="formC">
          <FormControl fullWidth>
            <InputLabel id="degree">motive</InputLabel>
            <Select
              fullWidth
              labelId="degree"
              id="demo-simple-select"
              value={Data.offDayType}
              label="motive"
              name="offDayType"
              onChange={handleChange}
            >
              {dayOffType &&
                dayOffType.map((e) => (
                  <MenuItem key={e._id} value={e._id}>
                    {e.offDayTypeName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="formC">
          <Button
            color="success"
            onClick={() => {
              createDayOff();
              set_close(false);
            }}
          >
            ADD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DayOff_popup;
