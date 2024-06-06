import React from "react";

import EtatDePaiement from "./EtatDePaiement";

const PrintablePage3 = React.forwardRef((props, ref) => {
  const dataToPrint = props; // Access session from props

  


  return (
    <div ref={ref} className="printable-page">
      <EtatDePaiement dataToPrint={dataToPrint} />
    </div>
  );
});

export default PrintablePage3;

