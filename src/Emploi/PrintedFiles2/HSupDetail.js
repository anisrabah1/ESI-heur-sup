import "./HSupDetail.css";
import { useState } from "react";

export default function HSupDetail(dataToPrint) {
  console.log(dataToPrint);
  const [mounths, setMounths] = useState(
    dataToPrint.dataToPrint.result.details
  );
  const [profData, setProfData] = useState(
    dataToPrint.dataToPrint.teacherInfos
  );
  const [typesSeances, setTypesSeances] = useState(
    dataToPrint.dataToPrint.seances
  );
  const [modules, setModules] = useState(dataToPrint.dataToPrint.modules);

  const renderMonthData = (monthName, monthData) => (
    <>
      <td>
        <div
          style={{
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          {`شهر ${monthName}`}
        </div>
        {Array.from({ length: 6 }, (_, i) => {
          const weekNumber = `week-${i + 1}`;
          const weekData = monthData[weekNumber];
          return (
            <span key={weekNumber}>
              {`الأسبوع ${i + 1}: `}
              {weekData && weekData.days
                ? weekData.days.map((day, index) => (
                    <span key={index} style={{ fontSize: "16px" }}>
                      [{day.date.substring(8, 10)}]
                    </span>
                  ))
                : "[ ]"}
              <br />
            </span>
          );
        })}
      </td>
      <td>
        <span>
          <br />
        </span>
        {Array.from({ length: 6 }, (_, i) => {
          const weekNumber = `week-${i + 1}`;
          const weekData = monthData[weekNumber];
          return (
            <span key={weekNumber} style={{ fontSize: "16px" }}>
              {weekData && weekData.days
                ? weekData.days.map((day, index) => (
                    <span key={index}>[{`${day.numberOfAddHours} سا `}]</span>
                  ))
                : "[ ]"}
              <br />
            </span>
          );
        })}
      </td>
      <td style={{ fontSize: "16px", textAlign: "center" }}>
        {monthData.totalHoursForMonth}
      </td>
    </>
  );

  const renderAllMonths = (item) => {
    const months = [
      { name: "جانفي", data: item.days.January },
      { name: "فيفري", data: item.days.February },
      { name: "مارس", data: item.days.March },
      { name: "افريل", data: item.days.April },
      { name: "ماي", data: item.days.May },
      { name: "جوان", data: item.days.June },
      { name: "جويلية", data: item.days.July },
      { name: "اوت", data: item.days.August },
      { name: "سبتمبر", data: item.days.September },
      { name: "أكتوبر", data: item.days.October },
      { name: "نوفمبر", data: item.days.November },
      { name: "ديسمبر", data: item.days.December },
    ];

    return (
      <>
        {months.map(
          (month) =>
            month.data && (
              <tr key={month.name}>
                {renderMonthData(month.name, month.data)}
              </tr>
            )
        )}
      </>
    );
  };

  return (
    <div className="container-Feuille2">
      <header>
        <div className="header-left">
          <p onClick={() => console.log(mounths)} className="L1">
            République Algérienne Démocratique et Populaire
          </p>
          <p className="L2">
            Ministère de l'Enseignement Supérieur et de la Recherche
            Scientifique
          </p>
          <p className="L3">ÉCOLE SUPÉRIEURE EN INFORMATIQUE</p>
          <p className="L4">8 Mai 1945 - Sidi-Bel-Abbès</p>
        </div>
        <div className="header-center">
          <img src={require("./ESI_logo.png")} />
        </div>
        <div className="header-right">
          <p onClick={() => console.log("teacheInfos")} className="L1">
            الجـمـهـوريــة الـجزائـريـــــة الديمقراطيــــة الشعبيـــــة
          </p>
          <p className="L2">
            وزارة الــتــعــلــيـــــــم الـــعـــالــــــــي والـبـحــــــث
            العـلـمـــــي
          </p>
          <p className="L3">
            الــمــدرســـــــة الـعــــلـــيــــــا لاعـــــــلام الالــــــــي
          </p>
          <p className="L4">8 ماي 1945 ســيــدي بــلــعــبــاس</p>
        </div>
      </header>
      <main className="mainY">
        <h3
          onClick={() => {
            console.log(modules);
          }}
        >
          {" "}
          بطاقة التعليمات لتصفية تعويضات الساعات الاضافية للأساتدة الدائمين
        </h3>
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
              <div className="infoY"> {modules.join(" , ")}</div>
            </div>
          </div>
          <div className="coloneY">
            <div className="nomY">
              <div className="titY">الاسم : </div>
              <div className="infoY">{profData.lastName}</div>
            </div>
            <div className="nomY">
              <div className="titY">الهيئة المستخدمة الاصلية</div>
              <div className="infoY">ESI-SBA</div>
            </div>
            <div className="nomY">
              <div className="titY"> توع التدريس</div>
              <div className="infoY">{typesSeances.join(" , ")} </div>
            </div>
          </div>
        </div>
        <div className="cnt-tables-data">
          {mounths &&
            mounths.map((item, index) => {
              return (
                <div className="cnt-tab1" key={index}>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: "600",
                    }}
                  >
                    الرتبة :
                    <span className="infoY">{`   ${item.positionName}`} </span>
                  </div>
                  <table className="tableYY">
                    <thead>
                      <tr>
                        <th>اليوم و التاريخ</th>
                        <th>عدد الساعات</th>
                        <th>المجموع</th>
                      </tr>
                    </thead>
                    <tbody>{renderAllMonths(item)}</tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan="2"
                          style={{ fontSize: "16px", textAlign: "center" }}
                        >
                          المجموع الكلي :
                        </td>
                        <td style={{ fontSize: "16px", textAlign: "center" }}>
                          {item.workedResult.total}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              );
            })}
        </div>
        <div style={{ fontSize: "16px", textAlign: "center", marginTop: 16 }}>
          المجموع النهائي :{" "}
          {dataToPrint.dataToPrint.result.totalHoursForAllMonths}{" "}
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
  );
}
