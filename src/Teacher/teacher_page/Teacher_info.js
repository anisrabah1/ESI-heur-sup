import Tamplate from "../../tamplate/tamplate";
import{useParams} from "react-router-dom"
import Teacher_details from './teacher_details'

const Teacher_info = ({search,setSearch}) => {
    const {id}=useParams()
    return ( 
        <div>
        <Tamplate search={search} setSearch={setSearch}/>
        <div className="infos content">
           <Teacher_details/>
        </div>
        </div>
     );
}
 
export default Teacher_info;