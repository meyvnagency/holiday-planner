import React, { useState, useEffect } from "react";
import axios from "axios";

import { BiPlusCircle, BiFilter } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import {
  FaSearch,
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaTrash,
  FaUserAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUserShield,
} from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

function dashboardUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userForEdit, setUserForEdit] = useState(null);

  const openModal = (user) => {
    // console.log("User date for edit: ", user);
    setModalOpen(true);
    setUserForEdit(user); //pre-fill user data in input fields
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // Fetch the list of registered users from the API
    axios
      .get("https://holiday-api-zj3a.onrender.com/api/v1/auth/users")
      .then((response) => {
        setUsers(response.data); // Assuming the data is an array of users
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    // Send a DELETE request to the API to delete the user
    axios
      .delete(
        `https://holiday-api-zj3a.onrender.com/api/v1/auth/users/delete/{email}`
      )
      .then(() => {
        // Filter out the deleted user from the list of users
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== email)
        );
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="dashboard-main">
      <div className="dashboard-user-sec">
        <div className="container">
          <div className="row">
            <div className="dashboard-user-header">
              <div className="row">
                <div className="section-title">
                  <h2>user list</h2>
                  <p className="section-subtitle">manage the system users</p>
                </div>
                <div className="dashboard-button">
                  <a className="btn add-user">
                    <BiPlusCircle style={{ fontSize: "21px" }} />{" "}
                    <span>add user</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="dashboard-user-main">
              <div className="user-container">
                <div className="row">
                  <div className="user-main-header">
                    <div className="row">
                      <div className="left-side">
                        <div className="filter-icon" title="filter">
                          <BiFilter style={{ fontSize: "28px" }} />
                        </div>
                        <div className="input-box no-arrow">
                          <span className="icon">
                            <FaSearch />
                          </span>
                          <input
                            type="search"
                            name=""
                            placeholder="Search user ..."
                            className="form-input"
                          />
                        </div>
                      </div>
                      <div className="right-side">
                        <div className="topdf-icon" title="pdf">
                          <FaFilePdf />
                        </div>
                        <div className="toexcel-icon" title="excel">
                          <FaFileExcel />
                        </div>
                        <div className="print-icon" title="print">
                          <FaPrint />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isModalOpen && (
                    <div className="model-overlay">
                      <div
                        className="modal"
                        style={{
                          position: "fixed",
                          width: "100%",
                          top: "0",
                          left: "0",
                          background: "#2b2b2b80",
                        }}
                      >
                        <div className="edit-user">
                          <div className="dashboard-edit-user">
                            <form className="edit-user-form">
                              <h3>
                                Edit @<span className="username">iwm</span>
                              </h3>
                              <span className="input-box no-arrow">
                                <span className="icon">
                                  <FaUserAlt />
                                </span>
                                <input
                                  type="text"
                                  placeholder="fullname"
                                  className="form-input"
                                  value={
                                    userForEdit ? userForEdit.fullNames : ""
                                  }
                                  onChange={(e) => {
                                    // Update the userForEdit state when the input changes
                                    setUserForEdit({
                                      ...userForEdit,
                                      fullNames: e.target.value,
                                    });
                                  }}
                                />
                              </span>
                              <span className="input-box no-arrow">
                                <span className="icon">
                                  <FaEnvelope />
                                </span>
                                <input
                                  type="email"
                                  placeholder=" email address"
                                  className="form-input"
                                  value={userForEdit ? userForEdit.email : ""}
                                  onChange={(e) => {
                                    // Update the userForEdit state when the input changes
                                    setUserForEdit({
                                      ...userForEdit,
                                      email: e.target.value,
                                    });
                                  }}
                                />
                              </span>
                              <span className="input-box no-arrow">
                                <span className="icon">
                                  <FaPhoneAlt />
                                </span>
                                <input
                                  type="number"
                                  placeholder=" phone number"
                                  className="form-input"
                                  value={
                                    userForEdit ? userForEdit.phoneNumber : ""
                                  }
                                  onChange={(e) => {
                                    // Update the userForEdit state when the input changes
                                    setUserForEdit({
                                      ...userForEdit,
                                      phoneNumber: e.target.value,
                                    });
                                  }}
                                />
                              </span>
                              <span className="input-box no-arrow">
                                <span className="icon">
                                  <IoLocation />
                                </span>
                                <input
                                  type="text"
                                  placeholder=" location"
                                  className="form-input"
                                  value={
                                    userForEdit ? userForEdit.location : ""
                                  }
                                  onChange={(e) => {
                                    // Update the userForEdit state when the input changes
                                    setUserForEdit({
                                      ...userForEdit,
                                      location: e.target.value,
                                    });
                                  }}
                                />
                              </span>
                              <span className="input-box no-arrow">
                                <span className="icon">
                                  <FaUserShield />
                                </span>
                                <input
                                  type="text"
                                  placeholder="Role[status]"
                                  className="form-input"
                                  value={userForEdit ? userForEdit.role : ""}
                                  onChange={(e) => {
                                    // Update the userForEdit state when the input changes
                                    setUserForEdit({
                                      ...userForEdit,
                                      role: e.target.value,
                                    });
                                  }}
                                />
                              </span>
                              <span className="edit-form-button">
                                <button className="cancel-edit-btn btn">
                                  cancel
                                </button>
                                <button className="confirm-edit-btn btn">
                                  confirm
                                </button>
                              </span>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="user-main-content">
                    <div className="row">
                      <div className="user-list-header">
                        <div className="row">
                          <div className="user-check-box input-box col-1">
                            <input type="checkbox" className="form-input" />
                          </div>
                          <div className="user-fullname-header col-3">
                            <h4>Full name</h4>
                          </div>
                          <div className="user-email-header col-2">
                            <h4>Email</h4>
                          </div>
                          <div className="user-phone-header col-2">
                            <h4>Phone Number</h4>
                          </div>
                          <div className="user-location-header col-1">
                            <h4>Location</h4>
                          </div>
                          <div className="user-role-header col-1">
                            <h4>Status</h4>
                          </div>
                          <div className="user-action-header col-2">
                            <h4>Actions</h4>
                          </div>
                        </div>
                      </div>
                      <div className="user-list">
                        {/* <div className="user-detail">
                          <div className="row col-12">
                            <div className="user-check-box input-box col-1">
                              <input type="checkbox" className="form-input" />
                            </div>
                            <div className="user-fullname col-3">
                              <span className="userName">iman gadzhi</span>
                            </div>
                            <div className="user-email col-2">
                              <span className="userEmail">iman@gmail.com</span>
                            </div>
                            <div className="user-phone col-2">
                              <span className="userPhone">250781222994</span>
                            </div>
                            <div className="user-location col-1">
                              <span className="userLocation">Rwanda</span>
                            </div>
                            <div className="user-status col-1">
                              <span className="userStatus">user</span>
                            </div>
                            <div className="user-action col-2">
                              <button className="table-action-btn">
                                <BsPencilFill />
                              </button>
                              <button className="table-action-btn">
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="user-detail">
                          <div className="row col-12">
                            <div className="user-check-box input-box col-1">
                              <input type="checkbox" className="form-input" />
                            </div>
                            <div className="user-fullname col-3">
                              <span className="userName">vusi thembakutu</span>
                            </div>
                            <div className="user-email col-2">
                              <span className="userEmail">vusi@gmail.com</span>
                            </div>
                            <div className="user-phone col-2">
                              <span className="userPhone">250781222994</span>
                            </div>
                            <div className="user-location col-1">
                              <span className="userLocation">kenya</span>
                            </div>
                            <div className="user-status col-1">
                              <span className="userStatus">user</span>
                            </div>
                            <div className="user-action col-2">
                              <button className="table-action-btn">
                                <BsPencilFill />
                              </button>
                              <button className="table-action-btn">
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>  */}

                        {users.map((user) => (
                          <div className="user-detail" key={user._id}>
                            <div className="row col-12">
                              <div className="user-check-box input-box col-1">
                                <input type="checkbox" className="form-input" />
                              </div>
                              <div className="user-fullname col-3">
                                <span className="userName">
                                  {user.fullNames}
                                </span>
                              </div>
                              <div className="user-email col-2">
                                <span className="userEmail">{user.email}</span>
                              </div>
                              <div className="user-phone col-2">
                                <span className="userPhone">
                                  {user.phoneNumber}
                                </span>
                              </div>
                              <div className="user-location col-1">
                                <span className="userLocation">
                                  {user.location}
                                </span>
                              </div>
                              <div className="user-status col-1">
                                <span className="userStatus">{user.role}</span>
                              </div>
                              <div className="user-action col-2">
                                <button
                                  className="table-action-btn"
                                  onClick={() => openModal(user)}
                                >
                                  <BsPencilFill />
                                </button>

                                <button
                                  className="table-action-btn"
                                  onClick={() => handleDeleteUser(user.email)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default dashboardUser;
