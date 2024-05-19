// PrintPreview.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintablePage2 from './PrintablePage2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPrint
} from "@fortawesome/free-solid-svg-icons";

import "../PrintedFiles/PrintView.css"



import { useLocation } from 'react-router-dom';

const PrintPreview = () => {

    const location = useLocation();
    const { result ,teacherInfos,seances ,modules} = location.state || {};


  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div >
        <div style={{display:'flex' , alignItems:'center' ,justifyContent:'space-between' , padding:'4px 22px'}}>
            <h2 onClick={()=>console.log(seances)}>Aperçu de la Page à Imprimer</h2>
            
            <div onClick={handlePrint}  style={{display:'flex', flexDirection:'column', justifyContent:'Center' ,alignItems:'center'}
                } className='icon-print'
                >
                <FontAwesomeIcon icon={faPrint} beat size="xl" />   
                <div style={{fontSize:'12px', fontWeight:'600',marginTop:'4px'}}
                className='text-print'>imprimer</div> 
            </div>
      </div>
      <hr/>
      <div ref={componentRef}>
        <PrintablePage2 result={result} teacherInfos={teacherInfos} seances={seances} modules={modules}/>
      </div>
     
    </div>
  );
};

export default PrintPreview;
