import React, { useState } from 'react';
import './CustomPopup.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Combobox } from 'evergreen-ui'
import { toaster } from "evergreen-ui";


const CustomPopup = ({ trigger, setTrigger,session }) => {

    const navigate = useNavigate();
    const [typeCompte, setTypeCompte] = useState(null);
    const [typeEnsg, setTypeEnsg] = useState(null);
  
    const handleNavigate = (e) => {
      e.preventDefault(); // Prevent the default form submission
        if (typeCompte==null) {
            toaster.danger("Select Type de Compte");
        }
        if(typeEnsg===null){
            toaster.danger("Select Type d'anseignement");
        }
        if(typeEnsg!==null && typeCompte!=null){
      navigate('/to-printStatusView', {
        state: { session, typeCompte, typeEnsg },
      });
    }
    };


    const [animateBorder, setAnimateBorder] = useState(false);

  const handlePrintClick = () => {
    setAnimateBorder(true);
    setTimeout(() => setAnimateBorder(false), 4000); // Adjust duration as needed
    console.log(typeCompte);


    // const fetchData = async () => {/
      
    //   try {
    //     console.log("Hello from the use effect");

    //     const token = Cookies.get("token");
    //     const response = await fetch(
    //       `http://${apiUrl}:3000/api/v1/sessions/${session._id}/getTeacherStatus`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-type": "application/json; charset=UTF-8",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     const data = await response.json();
    //     setObject(data[dataToFetch]);
    //     console.log(data[dataToFetch]);
    //     if (!response.ok) {
    //       console.log("ERROR :", data);
    //       throw new Error(data.message || "Server Error");
    //     }
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };

  };


  return trigger ? (
    <div className={`custom-popup-container ${animateBorder ? 'animate-border' : ''}`}>
      <div className="custom-popup-content">
        {/* <button className="custom-popup-close-btn" onClick={() => setTrigger(false)}>Close</button> */}
        <div className="icon" onClick={() => setTrigger(false)}>
            <FontAwesomeIcon icon={faCircleXmark} size="lg" style={{ color: '#2f4971' }} className="icon2" />
          </div>
        <h2>Imprimer l'état de paiement des enseignants seleon :</h2>
        <div className="form-Content">
            <form onSubmit={handleNavigate}>
             
            <form className="custom-form-content">
                <label>
                    Type du Compte:
                    <Combobox
                    items={['CCP', 'Banque']}
                    onChange={(selected) => {setTypeCompte(selected)

                    }}
                    placeholder="...."
                  />
                </label>
                <label>
                    Type d'enseignement:
                    <Combobox
                    items={['Vacataire', 'Permanant']}
                    onChange={(selected) => setTypeEnsg(selected)}
                    placeholder="..."
                  />
                </label>
                {/* <button type="button" className="custom-print-btn" onClick={handlePrintClick }>Imprimer</button> */}
        </form>
             
              <div className="container-Btn-Add" style={{ marginTop: '20px' }}>
                <input type="submit" value="Afficher" className="btn-Add" onClick={handlePrintClick }/>
              </div>
            </form>
          </div>
      </div>
    </div>
  ) : '';
};

export default CustomPopup;
