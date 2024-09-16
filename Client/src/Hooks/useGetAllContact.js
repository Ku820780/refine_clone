import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/EndPoints';
import { setAllContact } from '../Redux/companySlice';

const useGetAllContact = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/newcontact`, { withCredentials: true });
        if (res.data) {
          dispatch(setAllContact(res.data)); // Update Redux store with fetched data
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAllCompany();
  }, [dispatch]); // Make sure to include dispatch in dependency array
};

export default useGetAllContact;
