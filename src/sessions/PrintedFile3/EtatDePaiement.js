import './EtatDePaiement.css'

export default function EtatDePaiement({dataToPrint}){

    return(
        <div class="container-page-3">
        <header className="headY">
            <div className='center-header-3'> 
            <p>الجمهوريــة الجزائريــة الديمقراطيــة الشعبيــة</p>
            <p>وزارة التعليم العالي والبحث العلمي</p>
            </div>
         
            <div className='left-header-3'>
            <p>École Supérieure en Informatique -08 MAI 1945- Sidi bel Abbes</p>
            <p>Secrétariat générale</p>
            <p>Service budget, Comptabilité et financement des activités de recherche</p>
          </div>

          <h4>Etat de paiement des enseignants Vacataire "Compte CCP" 1er Semestre 2022-2023</h4>
    
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
            <tr>
              <td>1</td>
              <td>Docteur</td>
              <td>750</td>
              <td>144</td>
              <td>108 000,00</td>
              <td>9 720,00</td>
              <td>9 828,00</td>
              <td>19 548,00</td>
              <td>88 452,00</td>
              <td>du 2022-09-25 au 2022-12-22</td>
            </tr>
     
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6">Montant Total</td>
              <td>367 050,00</td>
              <td>33 034,50</td>
              <td>33 401,55</td>
              <td>66 436,05</td>
              <td>300 613,95</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <footer>
          <p>ARRÊTE LE PRÉSENT ÉTAT DE PAIEMENT À LA SOMME DE : <span class="amount"></span></p>
          <p>Directeur</p>
        </footer>
      </div>
    )
}