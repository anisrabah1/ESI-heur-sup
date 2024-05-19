
import "./HSupDetail.css"
import { useState } from "react";

export default function HSupDetail (dataToPrint){
    const [mounths,setMounths]=useState(dataToPrint.dataToPrint.result.details)
    const [profData,setProfData]=useState(dataToPrint.dataToPrint.teacherInfos)
    const [typesSeances ,setTypesSeances]  =useState(dataToPrint.dataToPrint.seances)
    const [modules ,setModules]  =useState(dataToPrint.dataToPrint.modules)

return(
    <div className="container-Feuille2">
            <header>
            <div className="header-left">
                <p onClick={()=>console.log(mounths)} className="L1">République Algérienne Démocratique et Populaire</p>
                <p className="L2">Ministère de l'Enseignement Supérieur et de la Recherche Scientifique</p>
                <p className="L3">ÉCOLE SUPÉRIEURE EN INFORMATIQUE</p>
                <p className="L4">8 Mai 1945 - Sidi-Bel-Abbès</p>
            </div>
            <div className="header-center">
            <img src={require("./ESI_logo.png")  }/>   
            </div>
            <div className="header-right">
            <p onClick={()=>console.log('teacheInfos')} className="L1">الجـمـهـوريــة الـجزائـريـــــة الديمقراطيــــة الشعبيـــــة</p>
                <p className="L2">وزارة الــتــعــلــيـــــــم الـــعـــالــــــــي والـبـحــــــث العـلـمـــــي</p>
                <p className="L3">الــمــدرســـــــة الـعــــلـــيــــــا لاعـــــــلام الالــــــــي</p>
                <p className="L4">8 ماي 1945 ســيــدي بــلــعــبــاس</p>
            </div>
        </header>
        <main className="mainY">
            <h3 onClick={()=>{console.log(modules)}}> بطاقة التعليمات لتصفية تعويضات الساعات الاضافية للأساتدة الدائمين</h3>
            <div className="arabic-infos">
                <div className="coloneY">
                    <div className="nomY">
                        <div className="titY">اللقب</div>
                        <div className="infoY">{profData.firstName}</div>
                    </div>
                    {/* <div className="nomY">
                        <div>الرتبة</div>
                        <div className="infoY">استاذ محاضر</div>
                    </div> */}
                    <div className="nomY">
                        <div className="titY">المقياس المدرس</div>
                        <div className="infoY"> {modules.join(' , ')}</div>
                    </div>
                </div>
                <div className="coloneY">
                    <div className="nomY">
                        <div className="titY">الاسم : </div>
                        <div  className="infoY">{profData.lastName}</div>
                    </div>
                    <div className="nomY">
                        <div className="titY">الهيئة المستخدمة الاصلية</div>
                        <div className="infoY">ESI-SBA</div>
                    </div>
                    <div className="nomY">
                        <div className="titY"> توع التدريس</div>
                        <div className="infoY">{typesSeances.join(' , ')} </div>
                    </div>
                </div>
            </div>

    <div className="cnt-tables-data">
    {mounths && mounths.map((item,index)=>{return(

      
        <div className="cnt-tab1">
            <div style={{textAlign:'center' ,marginTop:'10px' ,fontWeight:'600'}}>  الرتبة  :     
                <span className="infoY">{`   ${item.positionName}`} </span>
                        </div>
                    <table class="tableYY"> 
                <thead> 
                <tr> 
                    <th>اليوم و التاريخ</th> 
                    <th>عدد الساعات</th> 
                </tr> 
                </thead> 
                <tbody> 
                 
                {item.days.septembre &&  
                <tr> 
                 <td> 
                    شهر سبتمبر<br /> 
                    الأسبوع 1: {item.days.septembre['week-1'] && item.days.septembre['week-1'].days && item.days.septembre['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.septembre['week-2'] && item.days.septembre['week-2'].days && item.days.septembre['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.septembre['week-3'] && item.days.septembre['week-3'].days && item.days.septembre['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.septembre['week-4'] && item.days.septembre['week-4'].days && item.days.septembre['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.septembre['week-5'] && item.days.septembre['week-5'].days && item.days.septembre['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.septembre['week-6'] && item.days.septembre['week-6'].days && item.days.septembre['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td> 
                <td> 
                {item.days.septembre['week-1'] && item.days.septembre['week-1'].days && item.days.septembre['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.septembre['week-2'] && item.days.septembre['week-2'].days && item.days.septembre['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.septembre['week-3'] && item.days.septembre['week-3'].days && item.days.septembre['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.septembre['week-4'] && item.days.septembre['week-4'].days && item.days.septembre['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.septembre['week-5'] && item.days.septembre['week-5'].days && item.days.septembre['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.septembre['week-6'] && item.days.septembre['week-6'].days ? item.days.septembre['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}) : '[ ]'}<br />  
                
                    المجموع: {item.days.septembre && item.days.septembre.totalHoursForMonth} 
                    </td> 
                </tr> }
                    
                    
                {item.days.octobre &&   
                <tr> 
                 <td> 
                    شهر أكتوبر<br /> 
                    الأسبوع 1: {item.days.octobre['week-1'] && item.days.octobre['week-1'].days && item.days.octobre['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.octobre['week-2'] && item.days.octobre['week-2'].days && item.days.octobre['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.octobre['week-3'] && item.days.octobre['week-3'].days && item.days.octobre['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.octobre['week-4'] && item.days.octobre['week-4'].days && item.days.octobre['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.octobre['week-5'] && item.days.octobre['week-5'].days && item.days.octobre['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.octobre['week-6'] && item.days.octobre['week-6'].days && item.days.octobre['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td>
                <td> 
                {item.days.octobre['week-1'] && item.days.octobre['week-1'].days && item.days.octobre['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.octobre['week-2'] && item.days.octobre['week-2'].days && item.days.octobre['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.octobre['week-3'] && item.days.octobre['week-3'].days && item.days.octobre['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.octobre['week-4'] && item.days.octobre['week-4'].days && item.days.octobre['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.octobre['week-5'] && item.days.octobre['week-5'].days && item.days.octobre['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.octobre['week-6'] && item.days.octobre['week-6'].days ? item.days.octobre['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.octobre && item.days.octobre.totalHoursForMonth} 
                    </td>  
                </tr>  }
                
                {item.days.novembre &&  
                <tr>  
                 <td> 
                    شهر نوفمبر<br /> 
                    الأسبوع 1: {item.days.novembre['week-1'] && item.days.novembre['week-1'].days && item.days.novembre['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.novembre['week-2'] && item.days.novembre['week-2'].days && item.days.novembre['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.novembre['week-3'] && item.days.novembre['week-3'].days && item.days.novembre['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.novembre['week-4'] && item.days.novembre['week-4'].days && item.days.novembre['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.novembre['week-5'] && item.days.novembre['week-5'].days && item.days.novembre['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.novembre['week-6'] && item.days.novembre['week-6'].days ? item.days.novembre['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );}):'[ ]'} 
                </td> 
                <td> 
                {item.days.novembre['week-1'] && item.days.novembre['week-1'].days && item.days.novembre['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.novembre['week-2'] && item.days.novembre['week-2'].days && item.days.novembre['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.novembre['week-3'] && item.days.novembre['week-3'].days && item.days.novembre['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.novembre['week-4'] && item.days.novembre['week-4'].days && item.days.novembre['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.novembre['week-5'] && item.days.novembre['week-5'].days && item.days.novembre['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.novembre['week-6'] && item.days.novembre['week-6'].days ? item.days.novembre['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.novembre && item.days.novembre.totalHoursForMonth} 
                    </td> 
                </tr> }
                
                
                {item.days.décembre &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.décembre['week-1'] && item.days.décembre['week-1'].days && item.days.décembre['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.décembre['week-2'] && item.days.décembre['week-2'].days && item.days.décembre['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.décembre['week-3'] && item.days.décembre['week-3'].days && item.days.décembre['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.décembre['week-4'] && item.days.décembre['week-4'].days && item.days.décembre['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.décembre['week-5'] && item.days.décembre['week-5'].days && item.days.décembre['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.décembre['week-6'] && item.days.décembre['week-6'].days && item.days.décembre['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td> 
                <td> 
                {item.days.décembre['week-1'] && item.days.décembre['week-1'].days && item.days.décembre['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.décembre['week-2'] && item.days.décembre['week-2'].days && item.days.décembre['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.décembre['week-3'] && item.days.décembre['week-3'].days && item.days.décembre['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.décembre['week-4'] && item.days.décembre['week-4'].days && item.days.décembre['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.décembre['week-5'] && item.days.décembre['week-5'].days && item.days.décembre['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.décembre['week-6'] && item.days.décembre['week-6'].days ? item.days.décembre['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'} <br /> 
                
                    المجموع: {item.days.décembre && item.days.décembre.totalHoursForMonth} 
                    </td> 
                </tr> }

                {item.days.janvier &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.janvier['week-1'] && item.days.janvier['week-1'].days && item.days.janvier['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.janvier['week-2'] && item.days.janvier['week-2'].days && item.days.janvier['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.janvier['week-3'] && item.days.janvier['week-3'].days && item.days.janvier['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.janvier['week-4'] && item.days.janvier['week-4'].days && item.days.janvier['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.janvier['week-5'] && item.days.janvier['week-5'].days && item.days.janvier['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.janvier['week-6'] && item.days.janvier['week-6'].days ? item.days.janvier['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );}):'[ ]'} <br /> 
                </td> 
                <td> 
                {item.days.janvier['week-1'] && item.days.janvier['week-1'].days && item.days.janvier['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.janvier['week-2'] && item.days.janvier['week-2'].days && item.days.janvier['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.janvier['week-3'] && item.days.janvier['week-3'].days && item.days.janvier['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.janvier['week-4'] && item.days.janvier['week-4'].days && item.days.janvier['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.janvier['week-5'] && item.days.janvier['week-5'].days && item.days.janvier['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.janvier['week-6'] && item.days.janvier['week-6'].days ? item.days.janvier['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.janvier && item.days.janvier.totalHoursForMonth} 
                    </td>
                </tr> }

                {item.days.février &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.février['week-1'] && item.days.février['week-1'].days && item.days.février['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.février['week-2'] && item.days.février['week-2'].days && item.days.février['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.février['week-3'] && item.days.février['week-3'].days && item.days.février['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.février['week-4'] && item.days.février['week-4'].days && item.days.février['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.février['week-5'] && item.days.février['week-5'].days && item.days.février['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.février['week-6'] && item.days.février['week-6'].days && item.days.février['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} <br /> 
                </td> 
                <td> 
                {item.days.février['week-1'] && item.days.février['week-1'].days && item.days.février['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.février['week-2'] && item.days.février['week-2'].days && item.days.février['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.février['week-3'] && item.days.février['week-3'].days && item.days.février['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.février['week-4'] && item.days.février['week-4'].days && item.days.février['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.février['week-5'] && item.days.février['week-5'].days && item.days.février['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.février['week-6'] && item.days.février['week-6'].days ? item.days.février['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.février && item.days.février.totalHoursForMonth} 
                    </td>
                </tr> }

                {item.days.mars &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.mars['week-1'] && item.days.mars['week-1'].days && item.days.mars['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.mars['week-2'] && item.days.mars['week-2'].days && item.days.mars['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.mars['week-3'] && item.days.mars['week-3'].days && item.days.mars['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.mars['week-4'] && item.days.mars['week-4'].days && item.days.mars['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.mars['week-5'] && item.days.mars['week-5'].days && item.days.mars['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.mars['week-6'] && item.days.mars['week-6'].days && item.days.mars['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td> 
                <td> 
                {item.days.mars['week-1'] && item.days.mars['week-1'].days && item.days.mars['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.mars['week-2'] && item.days.mars['week-2'].days && item.days.mars['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.mars['week-3'] && item.days.mars['week-3'].days && item.days.mars['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.mars['week-4'] && item.days.mars['week-4'].days && item.days.mars['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.mars['week-5'] && item.days.mars['week-5'].days && item.days.mars['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.mars['week-6'] && item.days.mars['week-6'].days ? item.days.mars['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.mars && item.days.mars.totalHoursForMonth} 
                    </td>
                </tr> }

                {item.days.avril &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.avril['week-1'] && item.days.avril['week-1'].days && item.days.avril['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.avril['week-2'] && item.days.avril['week-2'].days && item.days.avril['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.avril['week-3'] && item.days.avril['week-3'].days && item.days.avril['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.avril['week-4'] && item.days.avril['week-4'].days && item.days.avril['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.avril['week-5'] && item.days.avril['week-5'].days && item.days.avril['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.avril['week-6'] && item.days.avril['week-6'].days && item.days.avril['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td> 
                <td> 
                {item.days.avril['week-1'] && item.days.avril['week-1'].days && item.days.avril['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.avril['week-2'] && item.days.avril['week-2'].days && item.days.avril['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.avril['week-3'] && item.days.avril['week-3'].days && item.days.avril['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.avril['week-4'] && item.days.avril['week-4'].days && item.days.avril['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.avril['week-5'] && item.days.avril['week-5'].days && item.days.avril['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.avril['week-6'] && item.days.avril['week-6'].days ? item.days.avril['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.avril && item.days.avril.totalHoursForMonth} 
                    </td>
                </tr> }

                {item.days.mai &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.mai['week-1'] && item.days.mai['week-1'].days && item.days.mai['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.mai['week-2'] && item.days.mai['week-2'].days && item.days.mai['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.mai['week-3'] && item.days.mai['week-3'].days && item.days.mai['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.mai['week-4'] && item.days.mai['week-4'].days && item.days.mai['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.mai['week-5'] && item.days.mai['week-5'].days && item.days.mai['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.mai['week-6'] && item.days.mai['week-6'].days && item.days.mai['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td> 
                <td> 
                {item.days.mai['week-1'] && item.days.mai['week-1'].days && item.days.mai['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.mai['week-2'] && item.days.mai['week-2'].days && item.days.mai['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.mai['week-3'] && item.days.mai['week-3'].days && item.days.mai['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.mai['week-4'] && item.days.mai['week-4'].days && item.days.mai['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.mai['week-5'] && item.days.mai['week-5'].days && item.days.mai['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.mai['week-6'] && item.days.mai['week-6'].days ? item.days.mai['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.mai && item.days.mai.totalHoursForMonth} 
                    </td>
                </tr> }
                {item.days.juin &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.juin['week-1'] && item.days.juin['week-1'].days && item.days.juin['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.juin['week-2'] && item.days.juin['week-2'].days && item.days.juin['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.juin['week-3'] && item.days.juin['week-3'].days && item.days.juin['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.juin['week-4'] && item.days.juin['week-4'].days && item.days.juin['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.juin['week-5'] && item.days.juin['week-5'].days && item.days.juin['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.juin['week-6'] && item.days.juin['week-6'].days && item.days.juin['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td> 
                <td> 
                {item.days.juin['week-1'] && item.days.juin['week-1'].days && item.days.juin['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.juin['week-2'] && item.days.juin['week-2'].days && item.days.juin['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.juin['week-3'] && item.days.juin['week-3'].days && item.days.juin['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.juin['week-4'] && item.days.juin['week-4'].days && item.days.juin['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.juin['week-5'] && item.days.juin['week-5'].days && item.days.juin['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.juin['week-6'] && item.days.juin['week-6'].days ? item.days.juin['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.juin && item.days.juin.totalHoursForMonth} 
                    </td> 
                </tr> }
                {item.days.juillet &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.juillet['week-1'] && item.days.juillet['week-1'].days && item.days.juillet['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.juillet['week-2'] && item.days.juillet['week-2'].days && item.days.juillet['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.juillet['week-3'] && item.days.juillet['week-3'].days && item.days.juillet['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.juillet['week-4'] && item.days.juillet['week-4'].days && item.days.juillet['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.juillet['week-5'] && item.days.juillet['week-5'].days && item.days.juillet['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.juillet['week-6'] && item.days.juillet['week-6'].days && item.days.juillet['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} 
                </td> 
                <td> 
                {item.days.juillet['week-1'] && item.days.juillet['week-1'].days && item.days.juillet['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.juillet['week-2'] && item.days.juillet['week-2'].days && item.days.juillet['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.juillet['week-3'] && item.days.juillet['week-3'].days && item.days.juillet['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.juillet['week-4'] && item.days.juillet['week-4'].days && item.days.juillet['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.juillet['week-5'] && item.days.juillet['week-5'].days && item.days.juillet['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.juillet['week-6'] && item.days.juillet['week-6'].days ? item.days.juillet['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.juillet && item.days.juillet.totalHoursForMonth} 
                    </td> 
                </tr> }
                {item.days.août &&   
                <tr> 
                 <td> 
                    شهر ديسمبر<br /> 
                    الأسبوع 1: {item.days.août['week-1'] && item.days.août['week-1'].days && item.days.août['week-1'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 2: {item.days.août['week-2'] && item.days.août['week-2'].days && item.days.août['week-2'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 3: {item.days.août['week-3'] && item.days.août['week-3'].days && item.days.août['week-3'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 4: {item.days.août['week-4'] && item.days.août['week-4'].days && item.days.août['week-4'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 5: {item.days.août['week-5'] && item.days.août['week-5'].days && item.days.août['week-5'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})}<br /> 
                    الأسبوع 6: {item.days.août['week-6'] && item.days.août['week-6'].days && item.days.août['week-6'].days.map((day)=>{return(<>[{day.date.substring(8,10)}]</> );})} <br /> 
                </td> 
                <td> 
                {item.days.août['week-1'] && item.days.août['week-1'].days && item.days.août['week-1'].days.map((day)=>{return(<>[{ `${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.août['week-2'] && item.days.août['week-2'].days && item.days.août['week-2'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.août['week-3'] && item.days.août['week-3'].days && item.days.août['week-3'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br />  
                {item.days.août['week-4'] && item.days.août['week-4'].days && item.days.août['week-4'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.août['week-5'] && item.days.août['week-5'].days && item.days.août['week-5'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا `}]</> );})}<br /> 
                {item.days.août['week-6'] && item.days.août['week-6'].days ? item.days.août['week-6'].days.map((day)=>{return(<>[{` ${day.numberOfAddHours} سا` }]</> );}):'[ ]'}<br />  
                
                    المجموع: {item.days.août && item.days.août.totalHoursForMonth} 
                    </td>
                </tr> }
                
                <tr>
                    <td>المجموع الكلي :</td>
                    <td>{` ${item.days.totalHoursForAllMonths} ساعة`}</td>
                </tr>



               
                </tbody> 
            </table> 
            </div>
           
        );})} 
           
           
     
      </div>

      <div className="cnt-tab2">
            <table class="tableYY">
                <thead>
                    <th>امضاء المعني بالامر</th>
                    <th>مدير الدراسات</th>
                    <th>مدير المدرسة</th>
                </thead>
                <tbody>
                   <td className="signature"></td> 
                   <td className="signature"></td>
                   <td className="signature"></td>
                </tbody>
            </table>

        </div>
        </main>
    </div>
)
}