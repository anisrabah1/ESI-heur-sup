import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import "./Teacher_dayOff.css";
import ApiUrls from "../APIs";
import Cookies from "js-cookie";

const SessionOffDays = ({ popup, sessionID, create }) => {
  const [rows, setRows] = useState([]);
  const [fetching, setFetching] = useState(false);

  const apiUrls = new ApiUrls();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");

      try {
        const response = await fetch(
          `${apiUrls.getUrl("getGlobSessions")}/${sessionID}/offDays`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setRows(data.offDays);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [fetching]);

  const deleteDayOff = async (day_id) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `${apiUrls.getUrl("getGlobSessions")}/${sessionID}/offDays/${day_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setFetching((prev) => !prev);
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
          onClick={(e) => {
            popup(true);
            create(sessionID);
            setFetching((prev) => !prev);
            e.preventDefault();
          }}
        ></div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="tableText">Start</div>
              </TableCell>
              <TableCell>
                <div className="tableText">End</div>
              </TableCell>
              <TableCell align="">
                <div className="tableText">Start Hour</div>
              </TableCell>
              <TableCell align="">
                <div className="tableText">End Hour</div>
              </TableCell>
              <TableCell align="">
                <div className="tableText">Motive</div>
              </TableCell>
              <TableCell align="">
                <div className="tableText"></div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row._id}
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
                  <div className="tableText">
                    {row.motive ? row.motive : "sick"}
                  </div>
                </TableCell>
                <TableCell align="">
                  <div className="tableText">
                    <div
                      style={{}}
                      onClick={(e) => {
                        deleteDayOff(row._id);
                        e.preventDefault();
                      }}
                    >
                      {" "}
                      <lord-icon
                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                        trigger="hover"
                        colors="primary:#2c4770"
                        style={{
                          width: "28px",
                          height: "28x",
                          marginLeft: "8px",
                        }}
                      ></lord-icon>
                    </div>
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

export default SessionOffDays;
