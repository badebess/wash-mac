import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/signup";
import { Login } from "../pages/login";
import Home from "../pages/home";
import { PrivateRoute } from "./private.route";
import { ProtectedRoute } from "./protected.route";
import AddEmployee from "../pages/addEmployee";
import DetailEmployee from "../pages/detailEmployee";
import ScheduleEmployee from "../pages/scheduleEmployee";
import ScheduleDetailEmployee from "../pages/scheduleDetailEmployee ";
import AIPage from "../pages/AIPage";



export default function Routers() {
	return (
		<Routes>
			<Route path="/" element={<PrivateRoute/>}>
				<Route index element={<Home/>}></Route>
				<Route path="/add-employee" element={<AddEmployee />} />
				<Route path="/employee/:id" element={<DetailEmployee />} />
				<Route path="/schedule-employee" element={<ScheduleEmployee />} />
				<Route path="/schedule-employee/edit/:id" element={<ScheduleDetailEmployee />} />
				<Route path="/Wash-MAC-AI" element={<AIPage />} />
			</Route>
			<Route path="/" element={<ProtectedRoute/>}>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/signup" element={<SignUp/>}></Route>
			</Route>
		</Routes>
	);
}
