import { Combobox } from 'evergreen-ui'
import './popupSelect.css'
import '../Emploi/style.css'

import { useNavigate } from 'react-router-dom';
import {useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function PopupSelect({ setIsSelecting, isSelecting, session }) {
    const navigate = useNavigate();
    const [typeCompte, setTypeCompte] = useState('Ccp');
    const [typeEnsg, setTypeEnsg] = useState('permanant');
  
    const handleClickClose = () => {
      setIsSelecting(false);
    };
  
    const handleNavigate = (e) => {
      e.preventDefault(); // Prevent the default form submission
      navigate('/to-printStatusView', {
        state: { session, typeCompte, typeEnsg },
      });
    };
  
    return (
      <div className={`lastPopup ${isSelecting ? 'openLastPopup' : ''}`}>
        <div className="last-popup-content">
          <div className="icon" onClick={handleClickClose}>
            <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{ color: '#2f4971' }} className="icon2" />
          </div>
          <h4>Imprimer l'état de paiement des enseignants seleon :</h4>
          <div className="form-Content">
            <form onSubmit={handleNavigate}>
              <div className="form-group">
                <div className="input-param">
                  <span>Type du Compte :</span>
                  <Combobox
                    items={['CCP', 'Banque']}
                    onChange={(selected) => setTypeCompte(selected)}
                    placeholder="...."
                  />
                </div>
                <div className="input-param">
                  <span>Type d'enseignement :</span>
                  <Combobox
                    items={['Vacataire', 'Permanant']}
                    onChange={(selected) => setTypeEnsg(selected)}
                    placeholder="..."
                  />
                </div>
              </div>
              <div className="container-Btn-Add" style={{ marginTop: '20px' }}>
                <input type="submit" value="Afficher" className="btn-Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }