import React from "react";
import Events from "./Events";
import ReactBigCalendar from "../reactBigCalendar/ReactBigCalendar";
import AddCalendarModal from "./AddCalendarModal";
import useGetAllEvent from "../../Hooks/useGetAllEvent";
import { useDispatch } from 'react-redux';
import { setAllEvent } from '../../Redux/companySlice';

const CalenderData = () => {
  const dispatch = useDispatch();
  
  // Fetch events initially
  useGetAllEvent();

  // Refresh events after adding a new event
  const handleEventAdded = async () => {
    await useGetAllEvent(); // Re-fetch events
    // Alternatively, you can dispatch a refresh event action here
  };

  return (
    <div className="bg-[#F7F8F9] mb-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{ marginTop: "100px" }}>
        <div className="lg:col-span-4" style={{ height: "400px" }}>
          <AddCalendarModal onEventAdded={handleEventAdded} />
          <Events />
        </div>
        <div className="lg:col-span-8 mb-20" style={{ height: "400px", width: "1000px" }}>
          <ReactBigCalendar />
        </div>
      </div>
    </div>
  );
};

export default CalenderData;
