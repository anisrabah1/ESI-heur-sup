import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Teacher_dayOff.css'

const Teacher_dayOff = ({popup}) => {

    const rows = [
        { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
        { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
        { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
        { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
      ];

    return ( 
        <div className='dayOff'>
<div className="cardLabel">
    <div>Days off</div>
    <div className="addDay" onClick={()=>{popup(true)}} />
</div>
<TableContainer component={Paper} >
      <Table sx={{ minWidth: 650, classes:['table'],size:'lg'}} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell><div className="tableText"> date start</div></TableCell>
            <TableCell> <div className="tableText">date end</div> </TableCell>
            <TableCell align=""> <div className="tableText">houre start</div> </TableCell>
            <TableCell align=""> <div className="tableText">houre end</div> </TableCell>
            <TableCell align=""> <div className="tableText">motive</div> </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <div className="tableText">{row.dayStart}</div>
              </TableCell>
              <TableCell align=""> <div className="tableText">{row.dayEnd}</div></TableCell>
              <TableCell align=""><div className="tableText">{row.hourStart}</div></TableCell>
              <TableCell align=""><div className="tableText">{row.hourEnd}</div></TableCell>
              <TableCell align=""><div className="tableText">{row.motive}</div></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
     );
}
 
export default Teacher_dayOff;