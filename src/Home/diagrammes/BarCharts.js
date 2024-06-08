
import Chart from 'react-apexcharts'
import Cookies from "js-cookie";
import './BarCharts.css'
import apiUrl from "../../global_Vars/apiConfig";
import React, {  useState,useEffect } from 'react';
import { BarChart, Bar,XAxis,YAxis,Tooltip,Legend,CartesianGrid,PieChart, Pie, ResponsiveContainer } from 'recharts';

export default function ({status}){


    const data = [
        {
            positionName: "M A B",
            totalAddHours: 12
        },
        {
            positionName: "M B A",
            totalAddHours: 8
        },
        {
            positionName: "M C B",
            totalAddHours: 4
        },
        {
            positionName: "M C A",
            totalAddHours: 16
        },
        {
            positionName: "Professeur",
            totalAddHours: 5
        },
      ];



return(
    <div className='container-diagramme'>
        <h2 style={{textAlign:'center'}}>Diagramme Des Heures Supplémentaires Archivées Selon La position :</h2>
        {status&& <div className='Bar-Pie-Home'>
        <div style={{ width: 570   }}>
            <BarChart
                width={500}
                height={300}
                data={status.archiveAggregateResult}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                barSize={35}
                >
                <XAxis dataKey='positionName' scale="point" padding={{ left: 40, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="totalAddHours" fill="#2A436A" background={{ fill: "#eee" }} />
            </BarChart>
        </div>
    </div>}

    <h2 style={{textAlign:'center'}}> Enseignants Ont Plus Heures Supplémentaires:</h2>
        {status&& <div className='Bar-Pie-Home'>
        <div style={{ width: 570   }}>
            <BarChart
                width={500}
                height={300}
                data={status.top5Teachers
                }
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                barSize={35}
                >
                <XAxis dataKey='lastName' scale="point" padding={{ left: 40, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="totalAddHours" fill="#2A436A" background={{ fill: "#eee" }} />
            </BarChart>
        </div>
    </div>}

    <h2 style={{textAlign:'center'}}> Enseignants Ont Moins Heures Supplémentaires:</h2>
        {status&& <div className='Bar-Pie-Home'>
        <div style={{ width: 570   }}>
            <BarChart
                width={500}
                height={300}
                data={status.least5Teachers}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                barSize={35}
                >
                <XAxis dataKey='lastName' scale="point" padding={{ left: 40, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="totalAddHours" fill="#2A436A" background={{ fill: "#eee" }} />
            </BarChart>
        </div>
    </div>}
          

    {/* <div style={{ width: 380, height: 300 ,marginTop:'30px'}}>
      <ResponsiveContainer>
        <PieChart>
        
          <Pie
           dataKey="totalAddHours" 
           isAnimationActive={true}
           data={status.archiveAggregateResult} 
           cx={200}
           cy={200}
           outerRadius={80}
           fill="#1E8b60" 
           label 
           
           />
           <Tooltip dataKey='positionName'/>
        </PieChart>
      </ResponsiveContainer>
    </div> */}
    </div>
)
}