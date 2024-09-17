import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/EndPoints';
import { setAllCompany, setTotalPages } from '../Redux/companySlice'; // Import the new action

const useGetAllCompanies = (page = 1, limit = 10, searchQuery = '') => { // Added searchQuery parameter
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/pagination`, {
          params: { page, limit, search: searchQuery }, // Added search query
          withCredentials: true
        });
        
        console.log("Response:", res.data);
        
        if (res.data) {
          dispatch(setAllCompany(res.data.companies)); // Update with company data
          dispatch(setTotalPages(res.data.totalPages)); // Update with total pages
        } else {
          console.error('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchAllCompany();
  }, [dispatch,page, limit, searchQuery]); // Added searchQuery as a dependency
};

export default useGetAllCompanies;
