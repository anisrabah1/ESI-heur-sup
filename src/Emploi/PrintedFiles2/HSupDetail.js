import "./HSupDetail.css";
import { useState } from "react";

export default function HSupDetail(dataToPrint) {
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
        <div className="header-right2">
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
                <div className="cnt-tab1">
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    الرتبة :
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
                      {item.days.September && (
                        <tr>
                          <td>
                            شهر سبتمبر
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.September["week-1"] &&
                              item.days.September["week-1"].days &&
                              item.days.September["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.September["week-2"] &&
                              item.days.September["week-2"].days &&
                              item.days.September["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.September["week-3"] &&
                              item.days.September["week-3"].days &&
                              item.days.September["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.September["week-4"] &&
                              item.days.September["week-4"].days &&
                              item.days.September["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.September["week-5"] &&
                              item.days.September["week-5"].days &&
                              item.days.September["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.September["week-6"] &&
                              item.days.September["week-6"].days &&
                              item.days.September["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.September["week-1"] &&
                              item.days.September["week-1"].days &&
                              item.days.September["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.September["week-2"] &&
                              item.days.September["week-2"].days &&
                              item.days.September["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.September["week-3"] &&
                              item.days.September["week-3"].days &&
                              item.days.September["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.September["week-4"] &&
                              item.days.September["week-4"].days &&
                              item.days.September["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.September["week-5"] &&
                              item.days.September["week-5"].days &&
                              item.days.September["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.September["week-6"] &&
                            item.days.September["week-6"].days
                              ? item.days.September["week-6"].days.map(
                                  (day) => {
                                    return (
                                      <>[{` ${day.numberOfAddHours} سا`}]</>
                                    );
                                  }
                                )
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.September &&
                              item.days.September.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.October && (
                        <tr>
                          <td>
                            شهر أكتوبر
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.October["week-1"] &&
                              item.days.October["week-1"].days &&
                              item.days.October["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.October["week-2"] &&
                              item.days.October["week-2"].days &&
                              item.days.October["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.October["week-3"] &&
                              item.days.October["week-3"].days &&
                              item.days.October["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.October["week-4"] &&
                              item.days.October["week-4"].days &&
                              item.days.October["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.October["week-5"] &&
                              item.days.October["week-5"].days &&
                              item.days.October["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.October["week-6"] &&
                              item.days.October["week-6"].days &&
                              item.days.October["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.October["week-1"] &&
                              item.days.October["week-1"].days &&
                              item.days.October["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.October["week-2"] &&
                              item.days.October["week-2"].days &&
                              item.days.October["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.October["week-3"] &&
                              item.days.October["week-3"].days &&
                              item.days.October["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.October["week-4"] &&
                              item.days.October["week-4"].days &&
                              item.days.October["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.October["week-5"] &&
                              item.days.October["week-5"].days &&
                              item.days.October["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.October["week-6"] &&
                            item.days.October["week-6"].days
                              ? item.days.October["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.October &&
                              item.days.October.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.November && (
                        <tr>
                          <td>
                            شهر نوفمبر
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.November["week-1"] &&
                              item.days.November["week-1"].days &&
                              item.days.November["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.November["week-2"] &&
                              item.days.November["week-2"].days &&
                              item.days.November["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.November["week-3"] &&
                              item.days.November["week-3"].days &&
                              item.days.November["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.November["week-4"] &&
                              item.days.November["week-4"].days &&
                              item.days.November["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.November["week-5"] &&
                              item.days.November["week-5"].days &&
                              item.days.November["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.November["week-6"] &&
                            item.days.November["week-6"].days
                              ? item.days.November["week-6"].days.map((day) => {
                                  return <>[{day.date.substring(8, 10)}]</>;
                                })
                              : "[ ]"}
                          </td>
                          <td>
                            {item.days.November["week-1"] &&
                              item.days.November["week-1"].days &&
                              item.days.November["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.November["week-2"] &&
                              item.days.November["week-2"].days &&
                              item.days.November["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.November["week-3"] &&
                              item.days.November["week-3"].days &&
                              item.days.November["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.November["week-4"] &&
                              item.days.November["week-4"].days &&
                              item.days.November["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.November["week-5"] &&
                              item.days.November["week-5"].days &&
                              item.days.November["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.November["week-6"] &&
                            item.days.November["week-6"].days
                              ? item.days.November["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.November &&
                              item.days.November.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.December && (
                        <tr>
                          <td>
                            شهر ديسمبر
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.December["week-1"] &&
                              item.days.December["week-1"].days &&
                              item.days.December["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.December["week-2"] &&
                              item.days.December["week-2"].days &&
                              item.days.December["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.December["week-3"] &&
                              item.days.December["week-3"].days &&
                              item.days.December["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.December["week-4"] &&
                              item.days.December["week-4"].days &&
                              item.days.December["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.December["week-5"] &&
                              item.days.December["week-5"].days &&
                              item.days.December["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.December["week-6"] &&
                              item.days.December["week-6"].days &&
                              item.days.December["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.December["week-1"] &&
                              item.days.December["week-1"].days &&
                              item.days.December["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.December["week-2"] &&
                              item.days.December["week-2"].days &&
                              item.days.December["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.December["week-3"] &&
                              item.days.December["week-3"].days &&
                              item.days.December["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.December["week-4"] &&
                              item.days.December["week-4"].days &&
                              item.days.December["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.December["week-5"] &&
                              item.days.December["week-5"].days &&
                              item.days.December["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.December["week-6"] &&
                            item.days.December["week-6"].days
                              ? item.days.December["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}{" "}
                            <br />
                            المجموع:{" "}
                            {item.days.December &&
                              item.days.December.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.January && (
                        <tr>
                          <td>
                            شهر جانفي
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.January["week-1"] &&
                              item.days.January["week-1"].days &&
                              item.days.January["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.January["week-2"] &&
                              item.days.January["week-2"].days &&
                              item.days.January["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.January["week-3"] &&
                              item.days.January["week-3"].days &&
                              item.days.January["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.January["week-4"] &&
                              item.days.January["week-4"].days &&
                              item.days.January["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.January["week-5"] &&
                              item.days.January["week-5"].days &&
                              item.days.January["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.January["week-6"] &&
                            item.days.January["week-6"].days
                              ? item.days.January["week-6"].days.map((day) => {
                                  return <>[{day.date.substring(8, 10)}]</>;
                                })
                              : "[ ]"}{" "}
                            <br />
                          </td>
                          <td>
                            {item.days.January["week-1"] &&
                              item.days.January["week-1"].days &&
                              item.days.January["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.January["week-2"] &&
                              item.days.January["week-2"].days &&
                              item.days.January["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.January["week-3"] &&
                              item.days.January["week-3"].days &&
                              item.days.January["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.January["week-4"] &&
                              item.days.January["week-4"].days &&
                              item.days.January["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.January["week-5"] &&
                              item.days.January["week-5"].days &&
                              item.days.January["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.January["week-6"] &&
                            item.days.January["week-6"].days
                              ? item.days.January["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.January &&
                              item.days.January.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.February && (
                        <tr>
                          <td>
                            شهر فيفري
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.February["week-1"] &&
                              item.days.February["week-1"].days &&
                              item.days.February["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.February["week-2"] &&
                              item.days.February["week-2"].days &&
                              item.days.February["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.February["week-3"] &&
                              item.days.February["week-3"].days &&
                              item.days.February["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.February["week-4"] &&
                              item.days.February["week-4"].days &&
                              item.days.February["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.February["week-5"] &&
                              item.days.February["week-5"].days &&
                              item.days.February["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.February["week-6"] &&
                              item.days.February["week-6"].days &&
                              item.days.February["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}{" "}
                            <br />
                          </td>
                          <td>
                            {item.days.February["week-1"] &&
                              item.days.February["week-1"].days &&
                              item.days.February["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.February["week-2"] &&
                              item.days.February["week-2"].days &&
                              item.days.February["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.February["week-3"] &&
                              item.days.February["week-3"].days &&
                              item.days.February["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.February["week-4"] &&
                              item.days.February["week-4"].days &&
                              item.days.February["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.February["week-5"] &&
                              item.days.February["week-5"].days &&
                              item.days.February["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.February["week-6"] &&
                            item.days.February["week-6"].days
                              ? item.days.February["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.February &&
                              item.days.February.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.March && (
                        <tr>
                          <td>
                            شهر مارس
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.March["week-1"] &&
                              item.days.March["week-1"].days &&
                              item.days.March["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.March["week-2"] &&
                              item.days.March["week-2"].days &&
                              item.days.March["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.March["week-3"] &&
                              item.days.March["week-3"].days &&
                              item.days.March["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.March["week-4"] &&
                              item.days.March["week-4"].days &&
                              item.days.March["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.March["week-5"] &&
                              item.days.March["week-5"].days &&
                              item.days.March["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.March["week-6"] &&
                              item.days.March["week-6"].days &&
                              item.days.March["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.March["week-1"] &&
                              item.days.March["week-1"].days &&
                              item.days.March["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.March["week-2"] &&
                              item.days.March["week-2"].days &&
                              item.days.March["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.March["week-3"] &&
                              item.days.March["week-3"].days &&
                              item.days.March["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.March["week-4"] &&
                              item.days.March["week-4"].days &&
                              item.days.March["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.March["week-5"] &&
                              item.days.March["week-5"].days &&
                              item.days.March["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.March["week-6"] &&
                            item.days.March["week-6"].days
                              ? item.days.March["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.March &&
                              item.days.March.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.April && (
                        <tr>
                          <td>
                            شهر افريل
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.April["week-1"] &&
                              item.days.April["week-1"].days &&
                              item.days.April["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.April["week-2"] &&
                              item.days.April["week-2"].days &&
                              item.days.April["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.April["week-3"] &&
                              item.days.April["week-3"].days &&
                              item.days.April["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.April["week-4"] &&
                              item.days.April["week-4"].days &&
                              item.days.April["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.April["week-5"] &&
                              item.days.April["week-5"].days &&
                              item.days.April["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.April["week-6"] &&
                              item.days.April["week-6"].days &&
                              item.days.April["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.April["week-1"] &&
                              item.days.April["week-1"].days &&
                              item.days.April["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.April["week-2"] &&
                              item.days.April["week-2"].days &&
                              item.days.April["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.April["week-3"] &&
                              item.days.April["week-3"].days &&
                              item.days.April["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.April["week-4"] &&
                              item.days.April["week-4"].days &&
                              item.days.April["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.April["week-5"] &&
                              item.days.April["week-5"].days &&
                              item.days.April["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.April["week-6"] &&
                            item.days.April["week-6"].days
                              ? item.days.April["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.April &&
                              item.days.April.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      {item.days.May && (
                        <tr>
                          <td>
                            شهر ماي
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.May["week-1"] &&
                              item.days.May["week-1"].days &&
                              item.days.May["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.May["week-2"] &&
                              item.days.May["week-2"].days &&
                              item.days.May["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.May["week-3"] &&
                              item.days.May["week-3"].days &&
                              item.days.May["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.May["week-4"] &&
                              item.days.May["week-4"].days &&
                              item.days.May["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.May["week-5"] &&
                              item.days.May["week-5"].days &&
                              item.days.May["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.May["week-6"] &&
                              item.days.May["week-6"].days &&
                              item.days.May["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.May["week-1"] &&
                              item.days.May["week-1"].days &&
                              item.days.May["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.May["week-2"] &&
                              item.days.May["week-2"].days &&
                              item.days.May["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.May["week-3"] &&
                              item.days.May["week-3"].days &&
                              item.days.May["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.May["week-4"] &&
                              item.days.May["week-4"].days &&
                              item.days.May["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.May["week-5"] &&
                              item.days.May["week-5"].days &&
                              item.days.May["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.May["week-6"] &&
                            item.days.May["week-6"].days
                              ? item.days.May["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.May && item.days.May.totalHoursForMonth}
                          </td>
                        </tr>
                      )}
                      {item.days.June && (
                        <tr>
                          <td>
                            شهر جوان
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.June["week-1"] &&
                              item.days.June["week-1"].days &&
                              item.days.June["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.June["week-2"] &&
                              item.days.June["week-2"].days &&
                              item.days.June["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.June["week-3"] &&
                              item.days.June["week-3"].days &&
                              item.days.June["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.June["week-4"] &&
                              item.days.June["week-4"].days &&
                              item.days.June["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.June["week-5"] &&
                              item.days.June["week-5"].days &&
                              item.days.June["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.June["week-6"] &&
                              item.days.June["week-6"].days &&
                              item.days.June["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.June["week-1"] &&
                              item.days.June["week-1"].days &&
                              item.days.June["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.June["week-2"] &&
                              item.days.June["week-2"].days &&
                              item.days.June["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.June["week-3"] &&
                              item.days.June["week-3"].days &&
                              item.days.June["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.June["week-4"] &&
                              item.days.June["week-4"].days &&
                              item.days.June["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.June["week-5"] &&
                              item.days.June["week-5"].days &&
                              item.days.June["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.June["week-6"] &&
                            item.days.June["week-6"].days
                              ? item.days.June["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.June &&
                              item.days.June.totalHoursForMonth}
                          </td>
                        </tr>
                      )}
                      {item.days.July && (
                        <tr>
                          <td>
                            شهر جويلية
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.July["week-1"] &&
                              item.days.July["week-1"].days &&
                              item.days.July["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.July["week-2"] &&
                              item.days.July["week-2"].days &&
                              item.days.July["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.July["week-3"] &&
                              item.days.July["week-3"].days &&
                              item.days.July["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.July["week-4"] &&
                              item.days.July["week-4"].days &&
                              item.days.July["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.July["week-5"] &&
                              item.days.July["week-5"].days &&
                              item.days.July["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.July["week-6"] &&
                              item.days.July["week-6"].days &&
                              item.days.July["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                          </td>
                          <td>
                            {item.days.July["week-1"] &&
                              item.days.July["week-1"].days &&
                              item.days.July["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.July["week-2"] &&
                              item.days.July["week-2"].days &&
                              item.days.July["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.July["week-3"] &&
                              item.days.July["week-3"].days &&
                              item.days.July["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.July["week-4"] &&
                              item.days.July["week-4"].days &&
                              item.days.July["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.July["week-5"] &&
                              item.days.July["week-5"].days &&
                              item.days.July["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.July["week-6"] &&
                            item.days.July["week-6"].days
                              ? item.days.July["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.July &&
                              item.days.July.totalHoursForMonth}
                          </td>
                        </tr>
                      )}
                      {item.days.August && (
                        <tr>
                          <td>
                            شهر اوت
                            <br />
                            الأسبوع 1:{" "}
                            {item.days.August["week-1"] &&
                              item.days.August["week-1"].days &&
                              item.days.August["week-1"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 2:{" "}
                            {item.days.August["week-2"] &&
                              item.days.August["week-2"].days &&
                              item.days.August["week-2"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 3:{" "}
                            {item.days.August["week-3"] &&
                              item.days.August["week-3"].days &&
                              item.days.August["week-3"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 4:{" "}
                            {item.days.August["week-4"] &&
                              item.days.August["week-4"].days &&
                              item.days.August["week-4"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 5:{" "}
                            {item.days.August["week-5"] &&
                              item.days.August["week-5"].days &&
                              item.days.August["week-5"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}
                            <br />
                            الأسبوع 6:{" "}
                            {item.days.August["week-6"] &&
                              item.days.August["week-6"].days &&
                              item.days.August["week-6"].days.map((day) => {
                                return <>[{day.date.substring(8, 10)}]</>;
                              })}{" "}
                            <br />
                          </td>
                          <td>
                            {item.days.August["week-1"] &&
                              item.days.August["week-1"].days &&
                              item.days.August["week-1"].days.map((day) => {
                                return <>[{`${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.August["week-2"] &&
                              item.days.August["week-2"].days &&
                              item.days.August["week-2"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.August["week-3"] &&
                              item.days.August["week-3"].days &&
                              item.days.August["week-3"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.August["week-4"] &&
                              item.days.August["week-4"].days &&
                              item.days.August["week-4"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.August["week-5"] &&
                              item.days.August["week-5"].days &&
                              item.days.August["week-5"].days.map((day) => {
                                return <>[{` ${day.numberOfAddHours} سا `}]</>;
                              })}
                            <br />
                            {item.days.August["week-6"] &&
                            item.days.August["week-6"].days
                              ? item.days.August["week-6"].days.map((day) => {
                                  return <>[{` ${day.numberOfAddHours} سا`}]</>;
                                })
                              : "[ ]"}
                            <br />
                            المجموع:{" "}
                            {item.days.August &&
                              item.days.August.totalHoursForMonth}
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td>المجموع الكلي :</td>
                        <td>{` ${item.days.totalHoursForAllMonths} ساعة`}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
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
