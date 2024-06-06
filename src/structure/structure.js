import { useState, useEffect } from "react";
import Tamplate from "../tamplate/tamplate";
import Departement from "./cards/departement";
import "./structure.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Add from "./add";
import { toaster } from "evergreen-ui";
import Cookies from "js-cookie";
import ApiUrls from "../APIs";
import Room from "./cards/room";
import Level from "./cards/level";
import Section from "./cards/section";
import Semestre from "./cards/semestre";
import Speciality from "./cards/speciality";
import Groupe from "./cards/groupe";
import Subject from "./cards/subject";
import AddPopup from "./addPopup";

const Structure = () => {
  const [showContent, set_showContent] = useState(1);
  const [data, set_data] = useState([]);
  const [dataPlus, set_dataPlus] = useState([]);
  const [dataPlus2, set_dataPlus2] = useState([]);
  const [dataFifo, set_dataFifo] = useState([]);
  const [dataFifoItem, set_dataFifoItem] = useState();
  const [isAdding, set_isAdding] = useState(false);
  const [AddURL, set_AddURL] = useState();
  const [AddSubURL, set_AddSubURL] = useState();

  const pushdata = async () => {
    await set_dataFifo((dataFifo) => [
      data,
      dataPlus,
      dataPlus2,
      showContent,
      ...dataFifo,
    ]);
    await console.log("this is the fifo");
    await console.log(dataFifo);
  };
  const unpushdata = async () => {
    await set_showContent(dataFifo[0]);
    await set_dataFifo(dataFifo.slice(1));
    await set_dataPlus2(dataFifo[0]);
    await set_dataFifo(dataFifo.slice(1));
    await set_dataPlus(dataFifo[0]);
    await set_dataFifo(dataFifo.slice(1));
    await set_data(dataFifo[0]);
    await set_dataFifo(dataFifo.slice(1));
  };

  const apiUrls = new ApiUrls();
  window.departments = set_showContent;

  const fetchdepartments = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(`${apiUrls.getUrl("getDepartments")}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      toaster.notify(data.message);

      set_data(data.departments);
    } catch (error) {
      toaster.notify(error);
    }
  };

  useEffect(() => {
    if (showContent === 1) {
      fetchdepartments();
      set_AddURL(apiUrls.getUrl("getDepartments"));
    }

    console.log(data);
    console.log(dataPlus);
    console.log(dataPlus2);
  }, [showContent]);

  return (
    <div>
      <Tamplate />
      <div className="  content">
        <div className="structure_set">
          {/* ------------------------------------------------- */}
          {showContent === 1 && (
            <div>
              <div className="structure-label">Departement</div>
              <div className="structure">
                {data &&
                  data.map((m) => (
                    <Departement
                      delURL={AddURL}
                      AddURL={set_AddURL}
                      pushdata={pushdata}
                      dataGlobal={m}
                      setdata={set_data}
                      set_dataPlus={set_dataPlus}
                      setShow={set_showContent}
                    />
                  ))}

                <Add
                  AddSubURL={set_AddSubURL}
                  content={1}
                  create={set_isAdding}
                />
              </div>
            </div>
          )}

          {/* ------------------------------------------------- */}
          {showContent === 2 && (
            <div>
              <div className="structure-label">Rooms</div>
              <div className="structure">
                {data &&
                  data.map((m) => <Room delURL={AddURL} dataGlobal={m} />)}

                <Add
                  AddSubURL={set_AddSubURL}
                  content={2}
                  create={set_isAdding}
                />
              </div>
            </div>
          )}
          {/* ------------------------------------------------- */}
          {showContent === 2 && (
            <div>
              <div className="structure-label">levels</div>
              <div className="structure">
                {dataPlus &&
                  dataPlus.map((m) => (
                    <Level
                      delURL={AddURL}
                      AddURL={set_AddURL}
                      pushdata={pushdata}
                      dataGlobal={m}
                      setdata={set_data}
                      set_dataPlus={set_dataPlus}
                      set_dataPlus2={set_dataPlus2}
                      setShow={set_showContent}
                    />
                  ))}

                <Add
                  AddSubURL={set_AddSubURL}
                  content={3}
                  create={set_isAdding}
                />
              </div>
            </div>
          )}
          {/* ------------------------------------------------- */}
          {dataPlus2.length === 0 &&
            (!(dataPlus.length === 0) ||
              !(data.length === 0) ||
              (dataPlus2.length === 0 &&
                dataPlus.length === 0 &&
                data.length === 0)) &&
            showContent === 3 && (
              <div>
                <div className="structure-label">Semesters</div>
                <div className="structure">
                  {dataPlus &&
                    dataPlus.map((m) => (
                      <Semestre
                        delURL={AddURL}
                        AddURL={set_AddURL}
                        pushdata={pushdata}
                        dataGlobal={m}
                        setdata={set_data}
                        setShow={set_showContent}
                      />
                    ))}

                  <Add
                    AddSubURL={set_AddSubURL}
                    content={4}
                    create={set_isAdding}
                  />
                </div>
              </div>
            )}
          {/* ------------------------------------------------- */}
          {showContent === 4 && (
            <div>
              <div className="structure-label">Semestre</div>
              <div className="structure">
                {dataPlus &&
                  dataPlus.map((m) => (
                    <Semestre
                      delURL={AddURL}
                      AddURL={set_AddURL}
                      pushdata={pushdata}
                      dataGlobal={m}
                      setdata={set_data}
                      setShow={set_showContent}
                    />
                  ))}

                <Add
                  AddSubURL={set_AddSubURL}
                  content={5}
                  create={set_isAdding}
                />
              </div>
            </div>
          )}
          {/* ------------------------------------------------- */}
          {showContent === 4 && (
            <div>
              <div className="structure-label">Section</div>
              <div className="structure">
                {data &&
                  data.map((m) => (
                    <Section
                      delURL={AddURL}
                      AddURL={set_AddURL}
                      pushdata={pushdata}
                      dataGlobal={m}
                      setdata={set_data}
                      setShow={set_showContent}
                    />
                  ))}
                <Add
                  AddSubURL={set_AddSubURL}
                  content={6}
                  create={set_isAdding}
                />
              </div>
            </div>
          )}
          {/* ------------------------------------------------- */}
          {/* ------------------------------------------------- */}
          {showContent === 6 && (
            <div>
              <div className="structure-label">Groupes</div>
              <div className="structure">
                {data &&
                  data.map((m) => (
                    <Groupe
                      delURL={AddURL}
                      pushdata={pushdata}
                      dataGlobal={m}
                    />
                  ))}
                <Add
                  AddSubURL={set_AddSubURL}
                  content={7}
                  create={set_isAdding}
                />
              </div>
            </div>
          )}
          {/* ------------------------------------------------- */}
          {(!(dataPlus2.length === 0) ||
            (dataPlus2.length === 0 &&
              dataPlus.length === 0 &&
              data.length === 0)) &&
            showContent === 3 && (
              <div>
                <div className="structure-label">Speciality</div>
                <div className="structure">
                  {dataPlus2 &&
                    dataPlus2.map((m) => (
                      <Speciality
                        delURL={AddURL}
                        AddURL={set_AddURL}
                        pushdata={pushdata}
                        dataGlobal={m}
                        setdata={set_data}
                        set_dataPlus={set_dataPlus}
                        set_dataPlus2={set_dataPlus2}
                        setShow={set_showContent}
                      />
                    ))}

                  <Add
                    AddSubURL={set_AddSubURL}
                    content={8}
                    create={set_isAdding}
                  />
                </div>
              </div>
            )}

          {/* ------------------------------------------------- */}
          {dataPlus2.length === 0 &&
            (!(dataPlus.length === 0) ||
              !(data.length === 0) ||
              (dataPlus2.length === 0 &&
                dataPlus.length === 0 &&
                data.length === 0)) &&
            showContent === 3 && (
              <div>
                <div className="structure-label">Sections</div>
                <div className="structure">
                  {data &&
                    data.map((m) => (
                      <Section
                        delURL={AddURL}
                        AddURL={set_AddURL}
                        pushdata={pushdata}
                        dataGlobal={m}
                        setdata={set_data}
                        setShow={set_showContent}
                      />
                    ))}

                  <Add
                    AddSubURL={set_AddSubURL}
                    content={9}
                    create={set_isAdding}
                  />
                </div>
              </div>
            )}
          {/* ------------------------------------------------- */}
          {showContent === 5 && (
            <div>
              <div className="structure-label">Subjects</div>
              <div className="structure">
                {data &&
                  data.map((m) => (
                    <Subject
                      delURL={AddURL}
                      pushdata={pushdata}
                      dataGlobal={m}
                    />
                  ))}

                <Add
                  create={set_isAdding}
                  AddSubURL={set_AddSubURL}
                  content={10}
                />
              </div>{" "}
            </div>
          )}
        </div>

        {isAdding && (
          <AddPopup
            addURL={AddURL}
            AddSubURL={AddSubURL}
            set_close={set_isAdding}
            dataIn={data}
            set_data={set_data}
            dataPlus={dataPlus}
            set_dataPlus={set_dataPlus}
            set_dataPlus2={set_dataPlus2}
            dataPlus2={dataPlus2}
          />
        )}
        {!(showContent === 1) && (
          <div>
            <button
              className="floating-button"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Structure;
