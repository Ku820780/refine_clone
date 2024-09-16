import React, { useEffect, useState } from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoIosContacts } from "react-icons/io";
import { MdOutlineContactMail } from "react-icons/md";
import Watch from "./Watch";
import GeoChart from "./GeoChart";
import { ListActive } from "./ListActive";
import UpcomingEvent from "./UpcomingEvent";
import GlobalMap from "./GlobalMap";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/EndPoints";

const Dashboard = () => {
  const [companyCount, setCompanyCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch company count
    const fetchCompanyCount = async () => {
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/companies/count`);
        setCompanyCount(response.data.count); // Extract the count from the response
      } catch (err) {
        setError('Failed to fetch company count');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyCount();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  useEffect(() => {
    // Function to fetch company count
    const fetchContactCount = async () => {
      try {
        const response = await axios.get(`${COMPANY_API_END_POINT}/contact/count`);
        setContactCount(response.data.count); // Extract the count from the response
      } catch (err) {
        setError('Failed to fetch company count');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactCount();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="mb-20">
      {/* <Navbar /> */}

      <div className="p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-20">
          {/* Number of companies */}
          <div className="flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4 w-full">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <HiOutlineOfficeBuilding className="text-blue-500 text-xl" />
              </div>
              <div>
                <div className="text-gray-500">Number of companies</div>
                <div className="text-3xl font-semibold">{companyCount}</div>
              </div>
              <div className="flex-grow">
                <svg
                  className="w-full h-12"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 20 10, 40 15 T 100 10"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <path
                    d="M0 15 Q 20 10, 40 15 T 100 10 V 20 H 0 Z"
                    fill="url(#gradient)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Number of contacts */}
          <div className="flex items-center justify-center bg-gray-100 ">
            <div className="bg-white rounded-lg shadow p-2 flex items-center space-x-4 w-full">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <IoIosContacts className="text-green-500 text-xl" />
              </div>
              <div>
                <div className="text-gray-500 ">Number of contacts</div>
                <div className="text-3xl font-bold mb-4">{contactCount}</div>
              </div>
              <div className="flex-grow">
                <svg
                  className="w-full"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 25 5, 50 15 T 100 15"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <rect
                    x="10"
                    y="15"
                    width="100"
                    height="2"
                    fill="#22c55e"
                    fillOpacity="0.1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Watch and GeoChart section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8 mb-20">
          <div className="lg:col-span-4" style={{ height: "400px" }}>
            <Watch />
          </div>
          <div className="lg:col-span-8" style={{ height: "400px" }}>
            <GeoChart />
          </div>
        </div>
        {/* /**List Active */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8" style={{ height: "400px" }}>
            <ListActive />
          </div>
          <div className="lg:col-span-4" style={{ height: "400px" }}>
            <UpcomingEvent />
          </div>
        </div>

        <div className=" mt-40" >
        <GlobalMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
