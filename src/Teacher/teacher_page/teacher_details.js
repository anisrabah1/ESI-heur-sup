import './teacher_details.css'
import Avatar from '@mui/material/Avatar';
const Teacher_details = () => {
    return ( 
        <div className="details_card">
            <div className="photo">
            <Avatar alt={'anis'} src=""  sx={{ width: 150, height: 150 }} className='photo_container'/>
            </div>
            <div className="details"></div>
        </div>
     );
}
 
export default Teacher_details;