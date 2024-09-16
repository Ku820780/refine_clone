import React, { useState } from "react";
import CompaniesCard from "./CompaniesCard";
import CompanyHeader from "./SharedData/CompanyHeader";

const Companies = () => {
  return (
    <div className="mt-28 mb-10">
      <CompanyHeader />
      <div className="mt-20">
      <CompaniesCard  />
      </div>
    </div>
  );
};

export default Companies;
