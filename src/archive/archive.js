import Tamplate from '../tamplate/tamplate'
import { useState ,useEffect } from 'react';
import { toaster } from 'evergreen-ui';
import Cookies from "js-cookie";
import ApiUrls from '../APIs';
import TeacherSection from './teacherSection'
import dayjs from "dayjs";
import { TimePicker } from "antd";
import './archive.css'
const Archive = () => {
    const apiUrls = new ApiUrls();
    const [archiveData,set_archiveData]=useState([])

    function fetchData (){
        const token = Cookies.get("token");
        fetch(apiUrls.getUrl('getArchives'),{
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
              },
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            
           console.log(data) 
           set_archiveData(data.archives) 
             // Handle the response data
        })
        .catch(error => {
            toaster.notify(error.message);
             // Handle errors
        });
        
    };
useEffect(()=>{
    fetchData()
},[])
    return ( <div>
        <Tamplate />
        <div className="content">
            <div className="archive_set">
                {archiveData && archiveData.map((e)=>(
                    <div className="archiveCard">
                        <div className="seesionHeader">
              
              <div>start {e.startDate.substring(0, 10)}</div>
              <div>end {e.endDate.substring(0, 10)}</div>
            </div>
                        <TeacherSection data={e.teacher}/>

                         <div className="container-Cards">
            {e.seances &&
              e.seances.map((item) => {
                return (
                  <div
                    className="card"
                    onClick={(e) => console.log(item.startHour)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="first-Line">
                        <h4>{item.seanceDay}</h4>
                        <div>
                          <TimePicker.RangePicker
                            format="HH:mm "
                            defaultValue={[
                              dayjs(item.startHour, "HH:mm"),
                              dayjs(item.endHour, "HH:mm"),
                            ]}
                            className="duree"
                            inputReadOnly="true"
                            disabled="true"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div className="c2-3-4lines-icon">
                      <div className="c2-3-4lines">
                        <div className="second-Line archiveLine">
                          {item.seanceType && (
                            <h5> coefficient : {item.coefficient}  priority : {item.priority}</h5>
                            
                          )}
                          
                        </div>
                       
                        <div className="second-Line archiveLine">
                        <h3>{item.seanceType}</h3>
                        </div>
                        
                      </div>
                     
                    </div>
                  </div>
                );
              })}
          </div>
                    </div>
                ))}
                
            </div>
        </div>
    </div> );
}
 
export default Archive;