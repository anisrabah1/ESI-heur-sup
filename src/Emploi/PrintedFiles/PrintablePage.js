import React from 'react';
import EmploiIndividuel from './EmploiIndividuel';

const PrintablePage = React.forwardRef((props,ref) => {
  const  dataToPrint  = props; // Access seances from props
  
  return (
    <div ref={ref} className="printable-page">
      <EmploiIndividuel dataToPrint={dataToPrint} />
    </div>
  );
});

export default PrintablePage;
