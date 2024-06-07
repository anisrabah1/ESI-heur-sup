<div className="container-Cards">
{cards &&
  cards.map((item) => {
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
            <h4>{dayMappings2[item.seanceDay]}</h4>
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
          <Popconfirm
            title="Delete additional Hour?"
            description="Are you sure to delete this additional Hour?"
            okText="Yes"
            cancelText="No"
            onConfirm={deleteAddHour}
          >
            {item.addHour && (
              <Tooltip
                title={`contient ${item.numberOfAddHours} heures Sup`}
                color="#87d068"
              >
                <div
                  className="add-hour-Y"
                  onMouseEnter={() => {
                    handleMouseEnter(item._id);
                    setSeanceToPatch(item);
                  }}
                  onMouseLeave={() => handleMouseLeave(item._id)}
                >
                  {hoveredIcons[item._id] ? (
                    <img
                      src={require("./delete_hsupp.png")}
                      alt="Delete Icon"
                    />
                  ) : (
                    <img
                      src={require("./hsup_inthis_seance.png")}
                      alt="Hover Icon"
                    />
                  )}
                </div>
              </Tooltip>
            )}
          </Popconfirm>
        </div>
        <div className="c2-3-4lines-icon">
          <div className="c2-3-4lines">
            <div className="second-Line">
              {item.seanceType.seanceTypeName && (
                <h5>{item.seanceType.seanceTypeName}</h5>
              )}
              <p>{item.subject.subjectName} </p>
            </div>
            <div className="third-Line">
              <p>{item.level.levelName}</p>
              <p>{item.department.departmentName}</p>
            </div>
            <div className="foorth-Line">
              {item.section.sectionName && (
                <p>
                  <span>Section</span> {item.section.sectionName}
                </p>
              )}
              {item.group && <p>{item.group.groupName}</p>}
            </div>
            <div className="foorth-Line">
              <p>{item.room.roomName}</p>
            </div>
          </div>
          <div className="icons-card-seance">
            <div
              title="Add Hour Sup"
              className="lord-icon"
              onClick={() => {
                handleClickToAddHourSup(
                  item,
                  item.startHour,
                  item.endHour
                );
              }} //-------------------------------
            >
              <lord-icon //____________________________________Add Hour Supp
                src="https://cdn.lordicon.com/mwikjdwh.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "0px 0px 0px 10%",
                }}
              ></lord-icon>
            </div>
            <div className="lord-icon" style={{}}>
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{
                  width: "30px",
                  height: "30px",
                  margin: "0px 0px 0px 25%",
                }}
                techer
              ></lord-icon>
            </div>

            <div //____________________________________Supprimer
              className="lord-icon"
              style={{}}
            >
              <Popconfirm
                title="Delete the seance"
                description="Are you sure to delete this seance?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteSeance(item._id)}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/wpyrrmcq.json"
                  trigger="morph"
                  state="morph-trash-full"
                  colors="primary:#ffffff"
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "0px 0px 0px 25%",
                  }}
                ></lord-icon>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>