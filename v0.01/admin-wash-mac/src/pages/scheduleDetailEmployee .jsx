import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
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
import { message } from "antd";
import { fetchGetEmployeeById, selectEmployee } from "../store/employee/indexEployeeSplice";

const MIN_TEXTAREA_HEIGHT = 32;

export default function ScheduleDetailEmployee() {

  const stateEmployee = useSelector(selectEmployee);
  const dispatch= useDispatch();
  const {id}= useParams();
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  
  
  useEffect(() => {
    dispatch(fetchGetEmployeeById(id));
  }, [dispatch,id]);
  
  const [nama, setNama] = useState(stateEmployee.data.name);
  const [alamat, setAlamat] = useState(stateEmployee.data.address);
  const [noHp, setNoHp] = useState(stateEmployee.data.phoneNumber);
  const [portofolio, setPortofolio] = useState(stateEmployee.data.portofolio);
  const [schedule, setSchedule] = useState(stateEmployee.data.schedule);

  function UpdateData(e) {
    e.preventDefault();
    try {
      APIEmployees.updateEmployee(id,{name: nama, address: alamat,phoneNumber: noHp,portofolio:portofolio,schedule: schedule});
      message.success('Data berhasil di update !').then(()=>navigate(`/schedule-employee`));
      
      
    } catch (error) {
      console.log(error);
      message.error('Ada yang tidak benar !')
    }
  }

  React.useLayoutEffect(() => {
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = "inherit";
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [schedule]);

  return (
    <>
    {console.log(stateEmployee)}
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
                  <div className="d-flex justify-content-between navBar">
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
            {stateEmployee.status === "loading" && <p>Loading</p>}
            {stateEmployee.status === "success" && (
              <>
                <div style={{backgroundColor:"rgba(238, 238, 238, 0.93)"}} className="mx-4 mt-1 border">
                  <h5 className="ms-2">{nama}</h5>
                  <h6 className="ms-4">Schedule :</h6>
                  <textarea className="ms-4 form-control" ref={textareaRef} style={{width:"95%"}} value={schedule} onChange={(e)=>setSchedule(e.target.value)}></textarea>
                  <button className="btn btn-primary ms-4 mt-2" onClick={(e)=>UpdateData(e)}>Save</button>
                  <Link to={'/schedule-employee'}>
                    <button className="btn btn-primary ms-2 mt-2">Back</button>
                  </Link>
                </div>              
              </>
            )}
                
          </div>
              
        </div>
      </div>
    </>
  );
}
