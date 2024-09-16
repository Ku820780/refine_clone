import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import useGetAllUsers from "../../Hooks/useGetAllUsers";
import Header from "./Header";

export default function ContactCards() {
  const { allUser, totalPages, currentPage } = useSelector((state) => state.auth);
  const { handlePageChange, handleSearch } = useGetAllUsers(currentPage);
  const [searchTerm, setSearchTerm] = useState(""); // Local state for search input

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(searchTerm); // Call handleSearch from the hook
  };

  return (
    <div className="mt-20">
      <Header />
      <div className="">
        <div className="flex justify-center mb-4" style={{width:"400px", marginLeft:"800px"}}>
          <TextField
            label="Search users by name"
            variant="outlined"
            value={searchTerm}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ maxWidth: 600 }} // Adjust maxWidth as needed
          />
          <button
            onClick={handleSearchClick}
            style={{
              marginLeft: 8,
              padding: "8px 16px",
              backgroundColor: "#3f51b5",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        <div className="grid gap-8 mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {allUser?.map((user) => (
            <div className="mt-10" style={{ width: "350px" }} key={user?._id}>
              <Box>
                <Card variant="outlined">
                  <CardContent>
                    <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                      <div
                        style={{
                          borderRadius: "50%",
                          width: "80px",
                          height: "80px",
                          overflow: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "100px",
                        }}
                      >
                        <img
                          src={`http://localhost:5400/Images/${user?.profile}`}
                          alt="User profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </Typography>
                    <Typography variant="h6" component="div" style={{ marginLeft: "80px" }}>
                      {user?.fullname}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", mb: 1.5, ml: 8 }}>
                      {user?.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <Stack spacing={2} alignItems="center" marginTop={4}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Stack>
      </div>
    </div>
  );
}
