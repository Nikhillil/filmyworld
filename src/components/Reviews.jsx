import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { reviewsRef, db } from "../Firebase/Firebase";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {

  const useAppstate = useContext(Appstate);

  const naigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [thought, setThought] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);


  const sendReview = async () => {
    setLoading(true);
    try {
      if(useAppstate.login){
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppstate.userName,
          rating: rating,
          thought: thought,
          timestamp: new Date().getTime(),
        });
  
        const docRef = doc(db, "movies", id);
        await updateDoc(docRef, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });
        setRating(0);
        setNewAdded(newAdded + 1);
        setThought("");
  
        swal({
          title: "Review Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      }else{
         naigate("/login");
      }
      
    } catch (error) {
      swal({
        title: "error.message",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setLoader(true);
      setData([]);
      const quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setLoader(false);
    }
    getData();
  }, [newAdded]);
  return (
    <div className=" mt-4 border-t-2 border-gray-700 w-full">
      <ReactStars
        size={35}
        isHalf={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        type="text"
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Enter Your thoughts..."
        className=" p-2 w-full header outline-none"
      />
      <button
        onClick={sendReview}
        className=" mt-2 p-2 w-full flex justify-center bg-green-600"
      >
        {loading ? <TailSpin height={30} color="white" /> : "Share"}
      </button>

      {loader ? (
        <div className=" mt-6 flex justify-center ">
          <ThreeDots height={15} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div className=" border-b border-gray-600 p-2 w-full mt-2" key={i}>
                <div className="flex items-center">
                  <p className=" text-blue-500">{e.name}</p>
                  <p className=" ml-2 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={20}
                  isHalf={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
