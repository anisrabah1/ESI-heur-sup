import Home from "./Home/Home";
import Teachers from "./Teacher/teachers_page/Teachers";

import { useState, useEffect } from "react";

import "./App.css";

import PrintView from "./Emploi/PrintedFiles/PrintView";

import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import CreateEmploi from "./Emploi/CreateEmploi";
import SystemeParam from "./Sys_param/SystemParam";

import Loading from "./loading";
import Log_in from "./loginPage/Log-in";
import Teacher_info from "./Teacher/teacher_page/Teacher_info";
import EmploiIndividuel from "./Emploi/PrintedFiles/EmploiIndividuel";
import PrintView2 from "./Emploi/PrintedFiles2/PrintView2";
import PrintView3 from "./sessions/PrintedFile3/PrintView3";
import Structure from "./structure/structure";
import GroupPlanning from "./GroupPlanning/groupPlanning";
import RoomPlanning from "./roomPlanning/roomPlanning";
import Sessions from "./sessions/Sessions";
import Archive from "./archive/archive";

function App() {
  const [search, setSearch] = useState([]);
  useEffect(() => {
    console.log(search);
  }, [search]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Loading />} />
          <Route path="/home" element={<Home />} />
          <Route index element={<Log_in />} />
          <Route path="/structure" element={<Structure />} />
          <Route
            path="teachers"
            element={<Teachers search={search} setSearch={setSearch} />}
          />
          <Route
            path="/teacher/:id"
            element={<Teacher_info search={search} setSearch={setSearch} />}
          />
          <Route path="creatEmploi" element={<CreateEmploi />}></Route>
          <Route path="/systemParam" element={<SystemeParam />}></Route>
          <Route path="/to-printed" element={<EmploiIndividuel />}></Route>
          <Route path="/to-printView" element={<PrintView />}></Route>
          <Route path="/to-printDetailView" element={<PrintView2 />}></Route>
          <Route path="/groupPlanning" element={<GroupPlanning />}></Route>
          <Route path="/roomPlanning" element={<RoomPlanning />}></Route>
          <Route path="/archive" element={<Archive />}></Route>
          <Route path="/sessions" element={<Sessions />}></Route>
          <Route path="/to-printStatusView" element={<PrintView3 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
