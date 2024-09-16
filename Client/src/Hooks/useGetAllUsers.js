import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/EndPoints';
import { setAllUser, setTotalPages, setCurrentPage } from '../Redux/authSlice';

const useGetAllUsers = (page = 1, limit = 3) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.auth.currentPage);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/get`, {
          params: { page: currentPage, limit, fullname: searchQuery }, // Send searchQuery to the backend
          withCredentials: true,
        });
        
        if (res.data) {
          dispatch(setAllUser(res.data.users));
          dispatch(setTotalPages(res.data.totalPages));
        } else {
          console.error('Failed to fetch users:');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllUsers();
  }, [dispatch, currentPage, limit, searchQuery]); // Add searchQuery to the dependencies

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  // Function to update search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    dispatch(setCurrentPage(1)); // Reset to first page when searching
  };

  return { handlePageChange, handleSearch, searchQuery };
};

export default useGetAllUsers;
