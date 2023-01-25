/* eslint-disable no-unreachable */
import React, { useReducer } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
      break;
    case "email":
      return { ...state, email: action.payload };
      break;

    case "age":
      return { ...state, age: action.payload };
      break;
    case "phone":
      return { ...state, phone: action.payload };
      break;

    case "work":
      return { ...state, work: action.payload };
      break;
    case "address":
      return { ...state, address: action.payload };
      break;
    case "desc":
      return { ...state, desc: action.payload };
      break;

    default:
      return state;
      break;
  }
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formValues, dispatch] = useReducer(reducer, location.state);

  const { name, email, age, phone, work, address, desc } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !age || !phone || !work || !address || !desc) {
      return alert("Fill in all the fields of the form.");
    }

    const res = await fetch(`/edit/${formValues._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    const data = await res.json();

    if (res.status === 500 || !data) {
      alert(data.error || data.message || "Fill up the form correctly.");
    } else {
      alert("Data updated successfully");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <NavLink to="/" className="back fa-solid fa-angles-left mt-4"></NavLink>

      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-12 col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) =>
                dispatch({ type: "name", payload: e.target.value })
              }
            />
          </div>

          <div className="mb-3 col-12 col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
            />
          </div>

          <div className="mb-3 col-12 col-md-6">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              value={age}
              onChange={(e) =>
                dispatch({ type: "age", payload: e.target.value })
              }
            />
          </div>

          <div className="mb-3 col-12 col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) =>
                dispatch({ type: "phone", payload: e.target.value })
              }
            />
          </div>

          <div className="mb-3 col-12 col-md-6">
            <label htmlFor="work" className="form-label">
              Work
            </label>
            <input
              type="text"
              className="form-control"
              id="work"
              name="work"
              value={work}
              onChange={(e) =>
                dispatch({ type: "work", payload: e.target.value })
              }
            />
          </div>

          <div className="mb-3 col-12 col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={(e) =>
                dispatch({ type: "address", payload: e.target.value })
              }
            />
          </div>

          <div className="mb-3 col-12">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="desc"
              id="desc"
              cols="30"
              rows="5"
              value={desc}
              onChange={(e) =>
                dispatch({ type: "desc", payload: e.target.value })
              }
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
