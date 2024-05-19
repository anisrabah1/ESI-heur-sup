import React from 'react';

import HSupDetail from './HSupDetail';

const PrintablePage2 = React.forwardRef((props,ref) => {
  const  dataToPrint  = props; // Access seances from props
  
  return (
    <div ref={ref} className="printable-page">
      {/* <EmploiIndividuel dataToPrint={dataToPrint} /> */}
      <HSupDetail dataToPrint={dataToPrint}/>
    </div>
  );
});

export default PrintablePage2;
