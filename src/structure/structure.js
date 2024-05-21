import { useState ,useEffect } from 'react';
import Tamplate from '../tamplate/tamplate';    
import Departement from './departement';
import './structure.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Add from './add';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
import ApiUrls from '../APIs';


const Structure = () => {
const [showContent,set_showContent]=useState(1);
const [data,set_data]=useState();
const [dataRoom,set_dataRoom]=useState();
const [selected,set_selected]=useState();


const apiUrls = new ApiUrls();
const fetchdepartments = async () => {
    const token = Cookies.get("token");
    try {
      
        const response = await fetch(`${apiUrls.getUrl('getDepartments')}`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
       
        toaster.notify(data.message); 
        
        set_data(data.departments );
      } catch (error) {
         
         toaster.notify(error); 
        
      }
};

const fetchRooms = async (depID) => {
    const token = Cookies.get("token");
    
    try {
      
        const response = await fetch(`${apiUrls.getUrl('getDepartment')}/${depID}/rooms`,{
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
       
        toaster.notify(data.message); 
        
        set_dataRoom(data.rooms);
      } catch (error) {
         
         toaster.notify(error); 
        
      }
};

useEffect( ()=>{
    if(showContent === 1 ){
        fetchdepartments()
    }
    if(showContent === 2 ){
        // set_data([{name:'1er'},{name:'3em'},{name:'4em'}])
        // set_dataRoom([{name:'A1',type:'TD',capacity:'10',equipement:'any'},{name:'A2',type:'TD',capacity:'10',equipement:'any'},{name:'A3',type:'TD',capacity:'10',equipement:'any'},{name:'A4',type:'TD',capacity:'10',equipement:'any'},{name:'A5',type:'TD',capacity:'10',equipement:'any'}])
      
      fetchRooms(selected)      
    }
    
},[showContent])
    return ( 
        <div>
            <Tamplate/> 
            <div  className="  content">
                
                <div className="structure_set">
                

                {/* ------------------------------------------------- */}
                {showContent === 1 && <div>
                <div className='structure-label'>Departement</div>
                    <div className="structure">
                    
                    {data && data.map((m)=>(
                        <Departement data={m} show={showContent} setShow={set_showContent} selected={set_selected} />
                    ))}
                
                <Add/>
                    </div></div>}
                  
                 {/* ------------------------------------------------- */}
                 {showContent === 2  && <div>
                 <div className='structure-label'>Rooms</div>
                 <div className="structure">
                 {dataRoom  && dataRoom.map((m)=>(
                         <Departement data={m} show={6} setShow={set_showContent} selected={set_selected} />
                    ))}
                
                <Add/>
                    </div></div> }
                    {/* ------------------------------------------------- */}
                    {showContent === 2 && <div>
                    <div className='structure-label'>levels</div>
                    <div className="structure">
                    {data  && data.map((m)=>(
                        <Departement data={m} show={2} />
                    ))}
                
                <Add/>
                    </div></div> }
                    {/* ------------------------------------------------- */}
                    {showContent === 3 && <div>
                    <div className='structure-label'>Semesters</div>
                    <div className="structure">
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                
                <Add/>
                    </div></div> }
                    {/* ------------------------------------------------- */}
                    {showContent === 4 && <div>
                    <div className='structure-label'>Subjects</div>
                    <div className="structure">
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                
                <Add/>
                    </div></div> }
                    {/* ------------------------------------------------- */}
                    {showContent === 3 && <div>
                    <div className='structure-label'>Speciality</div>
                    <div className="structure">
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                
                <Add/>
                    </div>
                    {/* ------------------------------------------------- */}
                    <div className='structure-label'>Sections</div>
                    <div className="structure">
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                
                <Add/>
                    </div></div> }
                    {/* ------------------------------------------------- */}
                    {showContent === 5 && <div>
                    <div className='structure-label'>Groupes</div>
                    <div className="structure">
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                    <Departement/>
                
                <Add/>
                    </div>   </div> }
                
                </div>


                


            </div>
        </div>
     );
}
 
export default Structure;