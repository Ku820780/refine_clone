import React from "react";

const ProgressChart = () => {
  return (
    <div >
      <div className="flex flex-col items-center justify-center  bg-gray-100" >
        <div className="bg-white rounded-lg shadow-md w-full">
          <div className="flex justify-between items-center  bg-[#F7F8F9] h-20">
            <div className="flex items-center">
              <i className="fas fa-tasks mr-2"></i>
              <span className="font-semibold">Tasks</span>
            </div>
            <button className="flex items-center text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 mr-4">
              <i className="fas fa-columns mr-1"></i>
              See kanban board
            </button>
          </div>
          <hr />
          <div className="flex justify-center mb-4 mt-6">
            <svg
              width="150"
              height="150"
              viewBox="0 0 36 36"
              className="inline-block"
            >
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="3.8"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="3.8"
                strokeDasharray="25, 100"
                strokeDashoffset="25"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                stroke="#60a5fa"
                strokeWidth="3.8"
                strokeDasharray="25, 100"
                strokeDashoffset="50"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                stroke="#93c5fd"
                strokeWidth="3.8"
                strokeDasharray="25, 100"
                strokeDashoffset="75"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                stroke="#bfdbfe"
                strokeWidth="3.8"
                strokeDasharray="25, 100"
                strokeDashoffset="100"
              ></circle>
            </svg>
          </div>
          <div className="flex flex-col ml-4" style={{marginBottom:'125px'}}>
            <div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 bg-blue-200 mr-2"></div>
                <span className="text-sm text-gray-600">Todo</span>
                <div className="flex items-center mb-1">
                 <div className="w-3 h-3 bg-blue-600 mr-2 ml-80"></div>
                <span className="text-sm text-gray-600">In Review</span>
            </div>
            </div>
              <div className=" flex items-center mb-1">
                <div className="w-3 h-3 bg-blue-400 mr-2"></div>
                <span className="text-sm text-gray-600">In Progress</span>
                <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-800 mr-2" style={{marginLeft:"278px"}}></div>
              <span className="text-sm text-gray-600">Done</span>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
