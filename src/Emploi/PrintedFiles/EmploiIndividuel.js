import { useState } from "react";
import "./EmploiIndividuel.css";
import "../PopCalculate.css";

export default function EmploiIndividuel({ dataToPrint }) {
  const [seances, setSeances] = useState(dataToPrint.seances);
  const [coursTdTp, setCourTdTp] = useState(dataToPrint.result);
  const [teacheInfos, setTeacherInfos] = useState(dataToPrint.teacherInfos);
  return (
    <div className="container-Feuille">
      <header>
        <div className="header-left">
          <p onClick={() => console.log(seances)} className="L1">
            République Algérienne Démocratique et Populaire
          </p>
          <p className="L2">
            Ministère de l'Enseignement Supérieur et de la Recherche
            Scientifique
          </p>
          <p className="L3">ÉCOLE SUPÉRIEURE EN INFORMATIQUE</p>
          <p className="L4">8 Mai 1945 - Sidi-Bel-Abbès</p>
        </div>
        <div className="header-center">
          <img src={require("./ESI_logo.png")} />
        </div>
        <div className="header-right">
          <p onClick={() => console.log(seances)} className="L1">
            الجـمـهـوريــة الـجزائـريـــــة الديمقراطيــــة الشعبيـــــة
          </p>
          <p className="L2">
            وزارة الــتــعــلــيـــــــم الـــعـــالــــــــي والـبـحــــــث
            العـلـمـــــي
          </p>
          <p className="L3">
            الــمــدرســـــــة الـعــــلـــيــــــا لاعـــــــلام الالــــــــي
          </p>
          <p className="L4">8 ماي 1945 ســيــدي بــلــعــبــاس</p>
        </div>
      </header>
      <main className="mainY-emploi-ind">
        <h2>Emploi du temps individuel</h2>
        <p>Année universitaire : 2023-2024</p>
        <p>Fonction : Enseignant-Chercheur</p>
        <p>Nom : {teacheInfos.firstName}</p>
        <p>Prénom : {teacheInfos.lastName}</p>
        <p>
          Grade :{" "}
          {
            teacheInfos.positions[teacheInfos.positions.length - 1].position
              .positionName
          }
        </p>
        <table className="tableY">
          <thead>
            <tr>
              <th>Jours</th>
              <th>Horaires</th>
              <th>Type de la séance</th>
              <th>Module enseigné</th>
              <th>Promotion</th>
              <th>Section - Groupe / Salle</th>
            </tr>
          </thead>
          <tbody>
            {seances &&
              seances.map((item, index) => (
                <tr key={index}>
                  <td>{item.seanceDay}</td>
                  <td>
                    {item.startHour}-{item.endHour}
                  </td>
                  <td>{item.seanceType.seanceTypeName}</td>
                  <td>{item.subject.subjectName}</td>
                  <td>{`${item.level.levelName} ${item.department.departmentName}`}</td>
                  <td>{`${item.section.sectionName || ""} ${
                    (item.group && "- " + item.group.groupName) || ""
                  }
                  / ${item.room.roomName}`}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {coursTdTp.seances &&
          coursTdTp.seances.map((item, index) => {
            return (
              <div className="lineY-individuel" key={index}>
                <p className="keyY">
                  {item.seanceTypeName && item.seanceTypeName}
                </p>
                <p className="valueY">{item.hoursNumber && item.hoursNumber}</p>
                <p className="unitéY">Heures</p>
              </div>
            );
          })}
        <div className="lineY-individuel">
          <p className="keyY">Heur Sup</p>
          <p className="valueY">{coursTdTp && coursTdTp.addHours}</p>
          <p className="unitéY">Heures</p>
        </div>
      </main>
      <footer className="fouterY">
        <div class="signature">
          <p>Enseignant(e)</p>
          {/* <p class="signature-line">...</p> */}
        </div>
        <div class="department">
          <p>Le chef de département</p>
          {/* <p class="stamp">...</p> */}
        </div>
      </footer>
    </div>
  );
}
