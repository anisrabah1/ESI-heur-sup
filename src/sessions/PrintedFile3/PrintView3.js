// PrintPreview.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintablePage3 from './PrintablePage3';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPrint
} from "@fortawesome/free-solid-svg-icons";




import { useLocation } from 'react-router-dom';

const PrintPreview3 = () => {

    const location = useLocation();
    const { dataOfStatus } = location.state || {};


  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div >
        <div style={{display:'flex' , alignItems:'center' ,justifyContent:'space-between' , padding:'4px 22px'}}>
            <h2 onClick={(e)=>console.log(dataOfStatus)} >Aperçu de la Page à Imprimer</h2>
            
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
        <PrintablePage3 dataOfStatus={dataOfStatus} />
      </div>
     
    </div>
  );
};

export default PrintPreview3;
