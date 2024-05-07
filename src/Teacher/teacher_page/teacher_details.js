import './teacher_details.css'
import Avatar from '@mui/material/Avatar';
const Teacher_details = ({data}) => {

    return ( 
        <div className="details_card">
            <div className="photo">
            <Avatar alt={'anis'} src=""  sx={{ width: 150, height: 150 }} className='photo_container'/>
            </div>
            <div className="details">
                <div className="formC">
                <div className="details-first-name form1"> <div className="details_label">First name : </div> anis rabah</div>
                <div className="details-last-name form1"><div className="details_label">Last name : </div>khaldi</div>
                </div>
                <div className="formC">
                <div className="details-email form1"><div className="details_label">Email : </div>ar.khaldi@esi-sba.dz</div>
                <div className="details-phone form1"><div className="details_label">Phone number : </div>0659896891</div>
                </div>
                <div className="formC">
                <div className="details-degree form1"><div className="details_label">Degree :  </div>Doctor</div>
                <div className="details-position form1"><div className="details_label">position : </div>Searcher</div>
                </div>
                <div className="formC">
                <div className="details-major form1"><div className="details_label">Major : </div>info</div>
                <div className="details-home form1"><div className="details_label">Home institution : </div>ESI</div>
                </div>
                <div className="formC">
                <div className="details-status form1"><div className="details_label">Status : </div>full time</div>
                <div className="details-day form1"><div className="details_label">birth day : </div>20/2/2003</div>
                </div>
                

            </div>
        </div>
     );
}
 
export default Teacher_details;