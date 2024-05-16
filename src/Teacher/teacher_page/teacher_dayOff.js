import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Teacher_dayOff.css'
import { useState ,useEffect } from 'react';
import ApiUrls from '../../APIs';
const Teacher_dayOff = ({popup,sessionID,create}) => {

  const apiUrls = new ApiUrls();
  const fetchData = async () => {
        
    try {
        console.log()
        const response = await fetch(`${apiUrls.getUrl('getAllSessions')}/${sessionID}/personalOffDays`, {
            method: 'GET', // Specify the HTTP method as POST
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
           
        });
        // console.log(response)
        const data = await response.json();
        
        console.log(data);

        setRows(data.offDays);
        
      } catch (error) {
         console.log(error)
        
      }
};
    
      const [rows , setRows] = useState(
        [
          { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
          { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
          { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
          { dayStart:'12 | 07 | 2024', dayEnd:'12 | 07 | 2024',hourStart:'8am',hourEnd:'9am',motive:'sick'},
        ]
      );
useEffect(()=>{
  fetchData()
  console.log(rows)
  
},[])
    return ( 
        <div className='dayOff'>
<div className="cardLabel">
    <div>Days off</div>
    <div className="addDay" onClick={()=>{popup(true);create(sessionID)}} />
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
          {rows && rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <div className="tableText">{row.startDate}</div>
              </TableCell>
              <TableCell align=""> <div className="tableText">{row.endDAte}</div></TableCell>
              <TableCell align=""><div className="tableText">{row.startHour}</div></TableCell>
              <TableCell align=""><div className="tableText">{row.endHour}</div></TableCell>
              <TableCell align=""><div className="tableText">sick</div></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>
     );
}
 
export default Teacher_dayOff;