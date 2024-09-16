import React from 'react';

const Watch = () => {
  return (
    <div className="h-full flex mt-3 items-center justify-center" style={{ height: '440px' }}>
      <div className="bg-white  rounded-lg  w-96" style={{ width: '700px', height: '100%' }}>
        <div className="flex items-center  bg-[#F7F8F9] h-20">
          <i className="fas fa-info-circle text-gray-500 mr-2"></i>
          <span className="text-gray-700 font-medium">Total revenue (yearly)</span>
        </div>
        <hr />
        <div className="flex justify-center items-center mb-4 mt-10">
          <div className="relative">
            <svg className="w-48 h-48">
              <circle cx="96" cy="96" r="90" stroke="#e5e7eb" strokeWidth="12" fill="none" />
              <circle
                cx="96"
                cy="96"
                r="90"
                stroke="#10b981"
                strokeWidth="12"
                fill="none"
                strokeDasharray="565.48"
                strokeDashoffset="423.48"
              />
              <line
                x1="96"
                y1="96"
                x2="96"
                y2="20"
                stroke="#6b7280"
                strokeWidth="2"
                transform="rotate(91.62 96 96)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center ">
              <span className="text-2xl font-semibold text-gray-700">25.45%</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-gray-700 mt-10 px-6">
          <div className="text-center">
            <div className="text-sm">Expected</div>
            <div className="font-semibold">$9,707,198.00</div>
          </div>
          <div className="text-center">
            <div className="text-sm">Realized</div>
            <div className="font-semibold">$2,470,064.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
