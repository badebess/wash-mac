import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "../pages/signup";
import { Login } from "../pages/login";
import Home from "../pages/home";
import { PrivateRoute } from "./private.route";
import { ProtectedRoute } from "./protected.route";

export default function Routers() {
	return (
		<Routes>
			<Route path="/" element={<PrivateRoute/>}>
				<Route index element={<Home/>}></Route>
			</Route>
			<Route path="/" element={<ProtectedRoute/>}>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/signup" element={<SignUp/>}></Route>
			</Route>
		</Routes>
	);
}
