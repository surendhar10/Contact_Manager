import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  return <Contacts />;
};

const Contacts = () => {
  const [name, changename] = useState("");
  const [num, setnum] = useState("");
  const [lst, changelst] = useState([]);

  const newname = event => {
    changename(event.target.value);
  };
  const newnum = e => {
    setnum(e.target.value);
  };

  const handleSubmit = () => {
    if (name != "" && num != "")
      axios
        .post("http://localhost:8080/contact", { name: name, num: num })
        .then(success => {
          console.log(success.data);
          changelst([...lst, success.data]);
          changename("");
          setnum("");
        });
    else {
      alert("Contact cannot empty");
    }
  };

  const handleUpdate = updateid => {
    var updateName = prompt("Enter your Name");

    var updatePhone = prompt("Enter your Phone");
    axios
      .put("http://localhost:8080/contact/" + updateid, {
        name: updateName,
        num: updatePhone
      })
      .then(success => {
        changelst(
          lst.map(i =>
            i.id === updateid ? { name: updateName, num: updatePhone } : i
          )
        );
      });
  };
  const handleDelete = deleteid => {
    axios.delete("http://localhost:8080/contact/" + deleteid).then(success => {
      changelst(lst.filter(i => i.id !== deleteid));
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/contact")
      .then(success => {
        changelst(success.data);
      })
      .catch(error => {
        console.log("error");
      });
  }, []);

  return (
    <div style={{backgroundColor: "orange" }}>
      <h1 style={{ textAlign: "center", color: "white" }}>
        Contact Manager
      </h1>
      <div className="input-group mb-2">
        <div className="input-group-text" >Name</div>
        <input
          type="text"
          id="t1"
          value={name}
          onChange={newname}
          style={{}}
        ></input>
      </div>
      <div className="input-group mb-2">
        <div className="input-group-text">Phone</div>
        <input type="text" onChange={newnum} value={num}></input>
      </div>

      {/* <input type='submit' id='b1' value='submit' onClick={fun}></input>  */}
      <button
        className="btn btn-success"
        onClick={handleSubmit}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Save Contact
      </button>

      <table className="table table-primary">
        <thead>
          <th>Name</th>
          <th>Phone</th>
        </thead>
        <tbody>
          {lst.map(i => {
            return (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>
                  {i.num}
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdate(i.id)}
                    style={{ float: "right" }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(i.id)}
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginLeft: "100px"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
