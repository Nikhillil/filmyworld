import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";
import { useContext } from "react";

const Header = () => {
  const useAppstate = useContext(Appstate);

  return (
    <div className="sticky z-10 bg-black header top-0 text-3xl font-bold flex justify-between items-center border-b-2 border-gray-100 p-3">
      <Link to={"/"}>
        <span className="text-red-500">
          Filmy<span className="text-white">World</span>
        </span>
      </Link>
      {useAppstate.login ? (
        <Link to={"/addmovie"}>
          <h1 className="text-lg flex items-center cursor-pointer">
            <Button>
              <AddIcon className="mr-1" color="secondary" />
              <span className="text-white">Add New</span>
            </Button>
          </h1>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h1 className="text-lg bg-green-500 flex items-center cursor-pointer">
            <Button>
              <span className="text-white font-medium capitalize">Login</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
