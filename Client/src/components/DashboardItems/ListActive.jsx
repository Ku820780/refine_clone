import React from "react";
import { VscThreeBars } from "react-icons/vsc";
import { useSelector } from "react-redux";

export const ListActive = () => {
  const {allCompany} = useSelector((store)=>store.companies)
  return (
    <div>
      <div className="bg-gray-100 p-4 ">
        <div className="bg-white shadow-md rounded-lg ">
          <div className="flex items-center  gap-4 bg-[#F7F8F9] h-20">
            <i className="fas fa-list mr-2 ml-4"><VscThreeBars /></i>
            <h2 className="text-lg font-semibold">Latest activities</h2>
          </div>
          <hr />
          {
            allCompany?.map((item,index)=>
              <div className="space-y-4 mt-10" key={index._id}>
            <div className="flex items-start space-x-4 ml-4">
              <img
                alt="Pepsi logo"
                className="w-10 h-10"
                height="40"
                src={`http://localhost:5400/Images/${item?.companyLogo}`}
                width="40"
              />
              <div>
                <p>
                  {item?.companyName}
                </p>
              </div>
            </div>
            </div>
            )
          }
         
        </div>
      </div>
    </div>
  );
};
