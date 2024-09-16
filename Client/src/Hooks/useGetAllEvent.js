import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { EVENT_API_END_POINT } from '../utils/EndPoints';
import { setAllEvent } from '../Redux/companySlice';

const useGetAllEvent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllEvent = async () => {
      try {
        const res = await axios.get(`${EVENT_API_END_POINT}/get`, { withCredentials: true });

        if (res.status === 200 && Array.isArray(res.data)) {
          const formattedEvents = res.data.map(event => ({
            title: event.title,
            allDay: event.allDay || false,
            startDate: new Date(event.startDate).toISOString(),
            endDate: new Date(event.endDate).toISOString(),
            id: event._id
          }));

          dispatch(setAllEvent(formattedEvents));
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchAllEvent();
  }, [dispatch]);
};

export default useGetAllEvent;
