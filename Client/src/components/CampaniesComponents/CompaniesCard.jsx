import React, { useState } from "react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../Hooks/useGetAllCompanies";
import { TextField, Button } from "@mui/material"; // Import MUI components

const CompaniesCard = () => {
  const [page, setPage] = useState(1); // Current page state
  const [limit, setLimit] = useState(5); // Items per page state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Fetch companies with pagination and search
  useGetAllCompanies(page, limit, searchQuery); // Pass searchQuery to the hook

  const { allCompany, totalPages } = useSelector((store) => store.companies);
  console.log("allcompany", allCompany);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page numbers
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const handleSearchSubmit = () => {
    setPage(1); // Reset to the first page when performing a new search
  };

  return (
    <div>
      {/* Search Input Field */}
      <div className="flex justify-center mb-4">
        <TextField
          label="Search Companies"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchSubmit}
          style={{ marginLeft: "10px" }}
        >
          Search
        </Button>
      </div>

      {/* Company Cards */}
      <div className="flex flex-wrap gap-4">
        {allCompany?.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 w-64">
            <div className="flex justify-between items-center mb-4 ml-20">
              <img
                src={`http://localhost:5400/Images/${item?.companyLogo}`}
                alt="Company logo"
                className="w-12 h-12 rounded"
              />
              <i className="fas fa-ellipsis-h text-gray-500"></i>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">{item?.companyName}</h2>
              <p className="text-gray-500">Open deals amount</p>
              <p className="text-xl font-bold">${item?.salary}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompaniesCard;
