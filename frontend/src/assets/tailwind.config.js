import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import CitizenDashboard from "./components/Dashboard/CitizenDashboard.js";
import LawyerDashboard from "./components/lawyerDashboard/LawyerDashboard.js";
import NGODashboard from "./components/Dashboard/NGODashboard.js";
import AdminDashboard from "./components/adminDashbaord/AdminDashboard.js";
import { getProfile } from "./api/auth.js";

export default function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setUser(res.data);
            } catch {
                setUser(null);
            }
        };
        fetchProfile();
    }, []);

    const onLogin = (userData) => {
        setUser(userData);
        if (userData.role === "CITIZEN") navigate("/dashboard/citizen");
        else if (userData.role === "LAWYER") navigate("/dashboard/lawyer");
        else if (userData.role === "NGO") navigate("/dashboard/ngo");
        else if (userData.role === "ADMIN") navigate("/dashboard/admin");
        else navigate("/");
    };

    return (
        <div className="min-h-screen">
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/login" element={<Login onLogin={onLogin} />} />
                <Route path="/register" element={<Register onRegister={onLogin} />} />

                <Route element={<ProtectedRoute user={user} />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
                    <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
                    <Route path="/dashboard/ngo" element={<NGODashboard />} />
                    <Route path="/dashboard/admin" element={<AdminDashboard />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}
