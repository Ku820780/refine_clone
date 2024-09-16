import React from "react";
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { Button } from "@mui/material";
import CompanyModal from "../CompanyModal";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { PiSquaresFourDuotone } from "react-icons/pi";

const CompanyHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className="flex">
        <div>
          <Button
            className=""
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "240px",
              borderRadius: "5px",
            }}
            onClick={handleOpen}
          >
            <CiCirclePlus
              className=" mr-4"
              size={30}
              style={{ color: "white" }}
            />
            Add new company
          </Button>
          <div>
            <CompanyModal isOpen={isOpen} onClose={handleClose}></CompanyModal>
          </div>
        </div>
        
        <div className="flex items-center justify-center bg-gray-100 ml-4" style={{marginLeft:"1000px"}}>
          <div className="flex border rounded-lg overflow-hidden">
            <Link to="/companytable">
              <button className="flex items-center justify-center w-10 h-10 border-r hover:bg-gray-200">
                <i className="fas fa-list text-gray-600">
                  <PiSquaresFourDuotone size={20} />
                </i>
              </button>
            </Link>
            <Link to="/companies">
              <button className="flex items-center justify-center w-10 h-10 border-l hover:bg-gray-200">
                <i className="fas fa-th text-blue-500">
                  <FaBars size={20} />
                </i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
