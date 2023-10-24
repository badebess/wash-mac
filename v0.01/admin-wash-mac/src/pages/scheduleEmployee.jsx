import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import { authService } from "../configs/auth";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { APIEmployees } from "../apis/APIEmployees";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetEmployees, selectEmployees } from "../store/employees/indexEployeesSplice";
import { message } from "antd";


export default function ScheduleEmployee() {
  const [employees, setEmployees] = useState([]);
  const stateEmployees = useSelector(selectEmployees);
  const dispatch= useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetEmployees());
    const employeesData = setEmployees(stateEmployees.data)
    
  }, [dispatch.employeesData]);


  return (
    <>
      {console.log(employees)}
      <div className="wrapper d-flex align-items-stretch">
        <nav
          style={{
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
          }}
        >
          <CDBSidebar textColor="#FFFFFF" backgroundColor="#303841">
            <CDBSidebarHeader className="text-center">
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Admin Wash MAC
              </a>
            </CDBSidebarHeader>
            <CDBSidebarMenuItem className="my-0 py-0 fs-5 ms-0 mb-1">
              Employee
            </CDBSidebarMenuItem>
            <CDBSidebarContent className="sidebar-content my-0 py-0">
              <CDBSidebarMenu className="pt-0">
                <NavLink exact to="/" activeClassName="activeClicked">
                  <div
                    className="d-flex justify-content-between mb-0 navBar"
                  >
                    <CDBSidebarMenuItem>List</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>{">"}</CDBSidebarMenuItem>
                  </div>
                </NavLink>
                <NavLink exact to="/add-employee" activeClassName="activeClicked">
                  <div className="d-flex justify-content-between my-0 navBar"
                  >
                    <CDBSidebarMenuItem>Add</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>{">"}</CDBSidebarMenuItem>
                  </div>
                </NavLink>
                <NavLink exact to="/schedule-employee" activeClassName="activeClicked">
                  <div className="d-flex justify-content-between navBar"
                  style={{ backgroundColor: "#3A4750" }}>
                    <CDBSidebarMenuItem>Schedule</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>{">"}</CDBSidebarMenuItem>
                  </div>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>
            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <div
                className="sidebar-btn-wrapper"
                style={{
                  padding: "20px 5px",
                }}
              >
                <NavLink
                  activeClassName="activeClicked"
                  style={{ color: "white" }}
                  onClick={() => authService.logOut()}
                >
                  Log out
                </NavLink>
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </nav>

        {/* content */}
        <div
          className="px-3"
          style={{ backgroundColor: "#EEE", width: "100%" ,overflowY:"scroll"}}
        >
          <div style={{backgroundColor:"#D9D9D9", height: "100%", position:"fixed", width:"77%"}}> 
            <div className="ps-2 mb-3 py-1" >
              <h2 className="mb-1">Employee Schedule</h2>
            </div>
            {stateEmployees.status === "loading" && <p>Loading</p>}
            {stateEmployees.status === "success" && (
              <>
              {stateEmployees.data && stateEmployees.data.map((val,index) => 
                <div style={{backgroundColor:"rgba(238, 238, 238, 0.93)"}} className="mx-4 mt-1 border" key={index}>
                  <h5 key={index} className="ms-2">{val.name}</h5>
                  <h6 key={index} className="ms-4">Schedule :</h6>
                  <textarea key={index} className="ms-4 form-control" style={{width:"95%",height:"auto"}} value={val.schedule}></textarea>
                  <Link to={`/schedule-employee/edit/${val.id}`}>
                    <button className="btn btn-primary ms-4 mt-2">Edit</button>
                  </Link>
                </div>              
                
              )}
              </>
            )}
                
          </div>
              
        </div>
      </div>
    </>
  );
}
