// PrintComponent.js
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintablePage from './PrintablePage';




const PrintComponent = () => {

   



  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={{handlePrint}} id="btn-To-Calculate">Imprimer cette page</button>
      <div style={{ display: 'none' }}>
        <PrintablePage ref={componentRef}  seances={seances}/>
      </div>
    </div>
  );
};

export default PrintComponent;
