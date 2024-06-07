import { useState } from 'react'
import './EtatDePaiement.css'

export default function EtatDePaiement({dataToPrint}){

    const [tableLines , setTableLines]=useState(dataToPrint.tableData.data);

    const TOTAL_MONTANT = tableLines.reduce((acc, item) => acc + item.totalAmount, 0);
    const TOTAL_SECURITY = tableLines.reduce((acc, item) => acc + item.socialSecurity, 0);
    const TOTAL_IRG = tableLines.reduce((acc, item) => acc + item.IRG, 0);
    const TOTAL_DEBITE = tableLines.reduce((acc, item) => acc + item.debitedAmount, 0);
    const TOTAL_NET = tableLines.reduce((acc, item) => acc + item.netAmount, 0);

  let check =true ;  
  if (tableLines.length>17 ){check=false}


    return(
        <div class="container-page-3">
        <header className="headY">
            <div className='center-header-3'> 
            <p onClick={(e)=>console.log(dataToPrint)}>الجمهوريــة الجزائريــة الديمقراطيــة الشعبيــة</p>
            <p>وزارة التعليم العالي والبحث العلمي</p>
            </div>
         
            <div className='left-header-3'>
            <p>École Supérieure en Informatique -08 MAI 1945- Sidi bel Abbes</p>
            <p>Secrétariat générale</p>
            <p>Service budget, Comptabilité et financement des activités de recherche</p>
          </div>

          <h4>Etat de paiement des enseignants {dataToPrint.typeEnsg} "Compte {dataToPrint.typeCompte}" 1er Semestre 2022-2023</h4>
    
        </header>
        <table border='1'>
          <thead>
            <tr>
              <th>N°</th>
              <th>Désignation du bénéficiaire</th>
              <th>N° de Compte</th>
              <th>Grade</th>
              <th>Prix unitaire</th>
              <th>Nombre des Heures</th>
              <th>Montant Total</th>
              <th>Sécurité Sociale</th>
              <th>IRG</th>
              <th>Montant débité</th>
              <th>Montant NET</th>
              <th>Mois</th>
            </tr>
          </thead>
          <tbody>
            {tableLines && tableLines.map((line,index)=>{return(
           <tr>
           <td>{index + 1}</td>
           <td>{line.firstName && line.lastName ? `${line.firstName} ${line.lastName}` : ''}</td>
           <td>{line.cardNumber && line.cardNumber}</td>
           <td>{line.position && line.position}</td>
           <td>{line.amountPerSeance && line.amountPerSeance}</td>
           <td>{line.totalAddHours && line.totalAddHours}</td>
           <td><b>{line.totalAmount && line.totalAmount}</b></td>
           <td>{line.socialSecurity && line.socialSecurity}</td>
           <td>{line.irg && line.irg}</td>
           <td><b>{line.debitedAmount && line.debitedAmount}</b></td>
           <td><b>{line.netAmount && line.netAmount}</b></td>
           <td>{line.startDate && line.endDate ? `du ${line.startDate.substring(0, 10)} au ${line.endDate.substring(0, 10)}` : ''}</td>
         </tr>
         
      )})}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6">Montant Total</td>
              <td>{TOTAL_MONTANT && TOTAL_MONTANT}</td>
              <td>{TOTAL_SECURITY && TOTAL_SECURITY}</td>
              <td>{TOTAL_IRG && TOTAL_IRG}</td>
              <td>{TOTAL_DEBITE && TOTAL_DEBITE}</td>
              <td>{TOTAL_NET &&TOTAL_NET}</td>
              
            </tr>
          </tfoot>
        </table>
        <footer className={check ? 'footer3' : ''}>
          <p className='phrase-p'>ARRÊTE LE PRÉSENT ÉTAT DE PAIEMENT À LA SOMME DE : </p>
          <p><b>Directeur</b></p>
        </footer>
      </div>
    )
}