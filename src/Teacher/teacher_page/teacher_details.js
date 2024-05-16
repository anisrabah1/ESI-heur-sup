import './teacher_details.css'
import Avatar from '@mui/material/Avatar';
import {useState ,useEffect} from 'react';
const Teacher_details = ({data}) => {
console.log(data);

console.log('-------------------------------------------------------------------');
    return ( 
        <div className="details_card">
            <div className="photo">
            <Avatar alt={'anis'} src=""  sx={{ width: 150, height: 150 }} className='photo_container'/>
            </div>
            <div className="details">
                <div className="formC">
                <div className="details-first-name form1"> <div className="details_label">First name : </div>{data.firstName}</div>
                <div className="details-last-name form1"><div className="details_label">Last name : </div>{data.lastName}</div>
                </div>
                <div className="formC">
                <div className="details-email form1"><div className="details_label">Email : </div>{data.email}</div>
                <div className="details-phone form1"><div className="details_label">Phone number : </div>{data.phoneNumber}</div>
                </div>
                <div className="formC">
                <div className="details-degree form1"><div className="details_label">Degree :  </div>{data.degree}</div>
                <div className="details-position form1"><div className="details_label">position : </div>Searcher</div>
                </div>
                <div className="formC">
                <div className="details-major form1"><div className="details_label">Major : </div>{data.major}</div>
                <div className="details-home form1"><div className="details_label">Home institution : </div>{data.homeInstitution}</div>
                </div>
                <div className="formC">
                <div className="details-status form1"><div className="details_label">Status : </div>full time</div>
                <div className="details-day form1"><div className="details_label">birth day : </div>{data.dateOfBirth}</div>
                </div>
                

            </div>
        </div>
     );
}
 
export default Teacher_details;