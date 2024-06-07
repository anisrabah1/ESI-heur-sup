import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Teacher_dayOff.css";
import { useState, useEffect } from "react";
import ApiUrls from "../../APIs";
import Cookies from "js-cookie";
import { toaster } from "evergreen-ui";

const Teacher_dayOff = ({
  popup,
  sessionID,
  create,
  sessionStart,
  sessionEnd,
  setOffRange,
  range,
}) => {
  const [fetched, setFetched] = useState(false);
  const apiUrls = new ApiUrls();
  const fetchData = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${apiUrls.getUrl("getAllSessions")}/${sessionID}/personalOffDays`,
        {
          method: "GET", // Specify the HTTP method as POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Specify the content type as JSON
          },
        }
      );
      // console.log(response)
      const data = await response.json();

      setRows(data.offDays);
    } catch (error) {
      console.log(error);
    }
  };
  window.fetchDayOffs = fetchData;

  const [rows, setRows] = useState([
    { dayStart: "", dayEnd: "", hourStart: "", hourEnd: "", motive: "" },
  ]);
  useEffect(() => {
    fetchData();
    console.log(rows);
  }, [fetched]);

  const deleteDayOff = async (day_id) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${apiUrls.getUrl(
          "getAllSessions"
        )}/${sessionID}/personalOffDays/${day_id}`,
        {
          method: "DELETE", // Specify the HTTP method as POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Specify the content type as JSON
          },
        }
      );
      // console.log(response)

      const data = await response.json();
      toaster.notify(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dayOff">
      <div className="cardLabel">
        <div>Days off</div>
        <div
          className="addDay"
          onClick={() => {
            window.set_currentSessionStart(sessionStart);
            window.set_currentSessionEnd(sessionEnd);
            popup(true);
            create(sessionID);
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, classes: ["table"], size: "lg" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="tableText">start</div>
              </TableCell>
              <TableCell>
                {" "}
                <div className="tableText">end</div>{" "}
              </TableCell>
              <TableCell align="">
                {" "}
                <div className="tableText">start hour </div>{" "}
              </TableCell>
              <TableCell align="">
                {" "}
                <div className="tableText">end hour</div>{" "}
              </TableCell>
              <TableCell align="">
                {" "}
                <div className="tableText">motive</div>{" "}
              </TableCell>
              <TableCell align="">
                {" "}
                <div className="tableText"></div>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="tableText">
                      {row.startDate
                        ? row.startDate.substring(0, 10)
                        : "--------------"}
                    </div>
                  </TableCell>
                  <TableCell align="">
                    {" "}
                    <div className="tableText">
                      {row.endDate
                        ? row.endDate.substring(0, 10)
                        : "--------------"}
                    </div>
                  </TableCell>
                  <TableCell align="">
                    <div className="tableText">
                      {row.startHour ? row.startHour : "--------------"}
                    </div>
                  </TableCell>
                  <TableCell align="">
                    <div className="tableText">
                      {row.endHour ? row.endHour : "--------------"}
                    </div>
                  </TableCell>
                  <TableCell align="">
                    <div className="tableText">sick</div>
                  </TableCell>
                  <TableCell align="">
                    <div className="tableText">
                      <button
                        className="icon-button button1"
                        onClick={() => {
                          deleteDayOff(row._id);
                          window.fetchDayOffs();
                        }}
                      ></button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Teacher_dayOff;
