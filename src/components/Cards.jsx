import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../Firebase/Firebase";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const _data = await getDocs(moviesRef);
        _data.forEach((doc) => {
          setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-evenly px-2 mt-2">
      {loading ? (
        <div className=" w-full flex justify-center items-center h-96">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((currElm, index) => {
          return (
            <Link to={`/detail/${currElm.id}`}>
              <div
                key={index}
                className="card ml-2 p-2 font-medium shadow-lg mt-6 cursor-pointer hover:-translate-y-3  transition-all duration-500"
              >
                <img className=" w-45 h-60 md:h-72" src={currElm.image} alt="" />
                <h1>
                   {currElm.title}
                </h1>
                <h1>
                  <span className=" text-gray-500">Rating:</span>
                  <ReactStars size={20} value={currElm.rating/currElm.rated} edit={false} isHalf={true} />
                </h1>
                <h1>
                  <span className=" text-gray-500">Year: </span> {currElm.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
