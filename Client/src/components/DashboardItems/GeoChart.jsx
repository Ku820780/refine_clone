import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const GeoChart = () => {
  const data = {
    labels: ['Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024', 'Aug 2024'],
    datasets: [
      {
        label: 'Won',
        data: [0, 200000, 150000, 300000, 200000, 400000, 600000, 1200000],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Lost',
        data: [0, 300000, 100000, 200000, 100000, 300000, 500000, 1000000],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '$' + value / 1000 + 'k';
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg " >
      <div className="bg-white rounded-lg shadow-md  h-full">
        <div className="flex justify-between items-center px-6  bg-[#F7F8F9] h-20">
          <h2 className="text-lg font-semibold text-gray-700">Deals</h2>
          <button className="flex items-center text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-200">
            <i className="fas fa-eye mr-2"></i>
            See sales pipeline
          </button>
        </div>
        <hr />
        <div className="flex items-center mt-4 pl-6">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Won</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Lost</span>
          </div>
        </div>
        <div className="relative h-full" style={{height:"300px"}}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GeoChart;
