import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { useSelector } from "react-redux";

const UpcomingEvent = () => {    
  const {allEvent} = useSelector((store)=>store.companies)
console.log("event", allEvent)
  return (
    <div>
      <div className="bg-gray-100 p-4 gap-4 ">
        <div className="bg-white rounded-lg shadow ">
          <div className="flex justify-between items-center  p-4 bg-[#F7F8F9] h-20">
            <div className="flex items-center">
              <i className="fas fa-calendar-alt text-gray-500 mr-2"><CiCalendarDate size={24}/></i>
              <span className="font-semibold text-gray-700 ml-4">
                Upcoming events
              </span>
            </div>
            <button className="flex items-center text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-200">
            <i className="fas fa-eye mr-2"></i>
            See calendar
          </button>
          </div>
          <hr/>
          {
            allEvent?.map((item, index)=>
              <>
              <div className="space-y-4 mt-4 ml-2" key={index}>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2"></span>
              <div className="ml-4 flex gap-10">
                <div className="text-gray-500"><span style={{ fontWeight: "bold", fontSize: "20px" }}>Start:-</span>{item?.startDate.split("T")[0]}</div>
                <div className="font-semibold text-gray-700">
                  {item?.title}
                </div>
                <div className="text-gray-500"><span style={{ fontWeight: "bold", fontSize: "20px" }}>End:-</span>{item?.endDate.split("T")[0]}</div>
              </div>
            </div>
           
          </div>
              </>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
