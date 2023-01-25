import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [members, setMembers] = useState([]);

  const getData = async () => {
    const res = await fetch("/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || res.status === 500 || !data) {
      return alert(data.error || data.message || "Data not found!");
    } else {
      setMembers(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteMember = async(id)=>{
    if(window.confirm("Do you really want to delete this member?")){
     
      const res = await fetch(`/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })
  
      const data = await res.json();
  
      if(res.status === 500 || !data){
        alert(data.error || data.message || "Couldn't delete the memeber.")
      }else{
        getData()
        
      }
     
    }
    }
  

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn my-2">
          <NavLink to="/register" className="btn btn-primary">
            Add Data
          </NavLink>
        </div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {members.map((member, index) => {
              const { name, email, age, phone, work, address, desc, _id } =
                member;

              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{work}</td>
                  <td>{phone}</td>
                  <td className="d-flex justify-content-end gap-2">
                    <NavLink
                      to={`/view/${_id}`}
                      className="btn btn-success"
                      state={{
                        name,
                        email,
                        age,
                        phone,
                        work,
                        address,
                        desc,
                        _id,
                      }}
                    >
                      <i class="fa-solid fa-eye"></i>
                    </NavLink>
                    <NavLink
                      to={`/edit/${_id}`}
                      state={{
                        name,
                        email,
                        age,
                        phone,
                        work,
                        address,
                        desc,
                        _id,
                      }}
                      className="btn btn-primary"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </NavLink>
                    <button onClick={()=>deleteMember(_id)} className="btn btn-danger">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
