import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/DashboardItems/Dashboard";
import CalenderData from "./components/CalenderComponent/CalenderData";
import Companies from "./components/CampaniesComponents/Companis";
import CompanyTable from "./components/CampaniesComponents/CompanyTable";
import ContactTable from "./components/contacts/ContactTable";
import ContactCards from "./components/contacts/ContactCards";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Header from "./components/contacts/Header"; // Ensure this path is correct

function App() {
  return (
    <div className="bg-[#F7F8F9]">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<CalenderData />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companytable" element={<CompanyTable />} />
            <Route path="/contacts" element={<ContactTable />} />
            <Route path="/contactcards" element={<ContactCards />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
