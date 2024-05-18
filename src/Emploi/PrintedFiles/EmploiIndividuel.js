
import { useState } from "react";
import "./EmploiIndividuel.css";



export default function EmploiIndividuel({dataToPrint}){

    const [seances,setSeances]=useState(dataToPrint.seances);
    const [coursTdTp ,setCourTdTp] =useState(dataToPrint.result);
    const[teacheInfos ,setTeacherInfos]=useState(dataToPrint.teacherInfos)
    return(
        <div className="container-Feuille">
         
        <header>
            <div class="header-left">
                <p onClick={()=>console.log(teacheInfos)} >République Algérienne Démocratique et Populaire</p>
                <p>Ministère de l'Enseignement Supérieur et de la Recherche Scientifique</p>
                <p>ÉCOLE SUPÉRIEURE EN INFORMATIQUE</p>
                <p >8 Mai 1945 - Sidi-Bel-Abbès</p>
            </div>
            <div class="header-right">
                <img src="logo.png" alt="ESI Logo" />
            </div>
        </header>
        <main>
            <h1>Emploi du temps individuel</h1>
            <p>Année universitaire : 2023-2024</p>
            <p>Fonction : Enseignant-Chercheur</p>
            <p>Nom : {teacheInfos.firstName}</p>
            <p>Prénom : {teacheInfos.lastName}</p>
            <p>Grade : {teacheInfos.positions[teacheInfos.positions.length -1].position.positionName}</p>
            <table className="tableY">
                <thead>
                    <tr>
                        <th>Jours</th>
                        <th>Horaires</th>
                        <th>Type de la séance</th>
                        <th>Module enseigné</th>
                        <th>Promotion</th>
                        <th>Groupe / Salle</th>
                    </tr>
                </thead>
                <tbody>
                {seances && seances.map((item, index) => (
                        <tr key={index}>
                            <td>{item.seanceDay}</td>
                            <td>{item.startHour}-{item.endHour}</td>
                            <td>{item.seanceType.seanceTypeName}</td>
                            <td>{item.subject.subjectName}</td>
                            <td>{`${item.level.levelName} ${item.department.departmentName}`}</td>
                            <td>{`${item.department.group || ''} / ${item.room.roomName}`}</td>
                        </tr>
                    ))}
                
                </tbody>
            </table>
            {coursTdTp.seances && coursTdTp.seances.map((item,index)=> {
                return(
                        <div className="lineY" key={index}>
                            <p className="keyY">{item.seanceTypeName && item.seanceTypeName}</p> 
                            <p className="valueY">{item.hoursNumber && item.hoursNumber}</p> 
                            <p className="unitéY">Heures</p>
                        </div>
                );
            })}
                
        </main>
        <footer className="fouterY">
            <div class="signature">
                <p>Enseignant(e)</p>
                <p class="signature-line">_________________________</p>
            </div>
            <div class="department">
                <p>Le chef de département</p>
                <p class="stamp">_________________________</p>
            </div>
        </footer>

      </div>  
    )
}