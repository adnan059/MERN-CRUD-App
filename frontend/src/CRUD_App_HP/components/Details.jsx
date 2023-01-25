import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import person from "../images/person-1.jpeg";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { name, email, age, phone, work, address, desc, _id } = location.state;

  const deleteMember = async(id)=>{
    if(window.confirm("Do you really want to delete this member?")){
      const res = await fetch(`/delete/${id}`,{
        method : "DELETE",
        headers:{"Content-Type": "application/json"}
      })
      const data = await res.json();

      if(res.status === 500 || !data){
        alert(data.error || data.message || "Couldn't delete the member.")
      }else{
        
        navigate("/")
      }
    }
  }
  
  return (
    <div className="container mt-3 details">
      <NavLink to="/" className="back fa-solid fa-angles-left mt-4"></NavLink>

      <h2>Welcome {name}</h2>

      <div className="user-box">
        <div className="user-card-part-1">
          <div className="row">
            <div className="image col-12 col-sm-6">
              <img src={person} alt="" />
            </div>
            <div className="icons col-12 col-sm-4">
              <NavLink
                to={`/edit/${_id}`}
                className="btn btn-primary"
                state={{ name, email, age, phone, work, address, desc, _id }}
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </NavLink>
              <button onClick={()=>deleteMember(_id)} className="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="user-card-part-2">
          <div className="row">
            <div className="left col-12 col-md-6">
              <div>
                <h3>Name:</h3>
                <span>{name}</span>
              </div>
              <div>
                <h3>Age:</h3>
                <span>{age}</span>
              </div>
              <div>
                <h3>Email:</h3>
                <span>{email}</span>
              </div>
              <div>
                <h3>Occupation:</h3>
                <span>{work}</span>
              </div>
            </div>
            <div className="right col-12 col-md-6">
              <div>
                <h3>Phone:</h3> <span>{phone}</span>
              </div>
              <div>
                <h3>Location:</h3>
                <span>{address}</span>
              </div>
              <div>
                <h3>Description:</h3>
                <span>{desc}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
