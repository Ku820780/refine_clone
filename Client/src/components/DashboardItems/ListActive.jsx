import React from "react";
import { VscThreeBars } from "react-icons/vsc";

export const ListActive = () => {
  return (
    <div>
      <div className="bg-gray-100 p-4 ">
        <div className="bg-white shadow-md rounded-lg ">
          <div className="flex items-center  gap-4 bg-[#F7F8F9] h-20">
            <i className="fas fa-list mr-2 ml-4"><VscThreeBars /></i>
            <h2 className="text-lg font-semibold">Latest activities</h2>
          </div>
          <hr />
          <div className="space-y-4 mt-10">
            <div className="flex items-start space-x-4 ml-4">
              <img
                alt="Pepsi logo"
                className="w-10 h-10"
                height="40"
                src="https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/6.png"
                width="40"
              />
              <div>
                <p className="text-sm text-gray-500">a few seconds ago</p>
                <p>
                  Creed Bratton moved Modern Plastic Bacon deal to
                  <span className="font-semibold">WON.</span>
                </p>
              </div>
            </div>
            <hr/>
            <div className="flex items-start space-x-4 ml-4">
              <img
                alt="GE logo"
                className="w-10 h-10"
                height="40"
                src="https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/4.png"
                width="40"
              />
              <div>
                <p className="text-sm text-gray-500">a few seconds ago</p>
                <p>
                  Creed Bratton moved Rustic Bronze Pizza deal to
                  <span className="font-semibold">WON.</span>
                </p>
              </div>
            </div>
            <hr/>
            <div className="flex items-start space-x-4 ml-4">
              <img
                alt="PayPal logo"
                className="w-10 h-10"
                height="40"
                src="https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/16.png"
                width="40"
              />
              <div>
                <p className="text-sm text-gray-500">15 days ago</p>
                <p>
                  Toby Flenderson created Incredible Steel Ball deal in
                  <span className="font-semibold">UNDER REVIEW.</span>
                </p>
              </div>
            </div>
            <hr/>
            <div className="flex items-start space-x-4 ml-4">
              <img
                alt="Dunder Mifflin logo"
                className="w-10 h-10"
                height="40"
                src="https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/6.png"
                width="40"
              />
              <div>
                <p className="text-sm text-gray-500">15 days ago</p>
                <p>
                  Andy Bernard created Licensed Cotton Pizza deal in
                  <span className="font-semibold">WON.</span>
                </p>
              </div>
            </div>
            <hr/>
            <div className="flex items-start space-x-4 ml-4">
              <img
                alt="Dunder Mifflin logo"
                className="w-10 h-10"
                height="40"
                src="https://refine-crm.ams3.cdn.digitaloceanspaces.com/companies/6.png"
                width="40"
              />
              <div>
                <p className="text-sm text-gray-500">15 days ago</p>
                <p>
                  Toby Flenderson created deal in
                  <span className="font-semibold">Unassigned.</span>
                </p>
              </div>
            </div>
            <hr/>
          </div>
        </div>
      </div>
    </div>
  );
};
