import React from "react";
import { useState,useEffect } from "react";
import AddRoomModal from "../../components/AddRoomModel/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getAllRooms } from "../../http";
import styles from "./Rooms.module.css";

// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile1.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile1.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile1.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile1.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile1.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile1.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile1.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile1.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile1.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile1.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/profile1.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/profile1.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {
  const[showModal,setShowModal] = useState(false); 
  const[rooms,setRooms] = useState([]);
  useEffect(()=>{
    const fetchRooms = async() => {
      const {data} = await getAllRooms();
      setRooms(data);
    }
    fetchRooms();
  },[]);
  const openModal = async() => {
    setShowModal(true);
  } 
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.search}>
              <img src="/images/search-icon.png" alt=""></img>
              <input type="text" className={styles.searchInput}></input>
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={styles.startRoomButton}>
              <span>Start a room</span>
            </button>
          </div>
        </div>
        <div className={styles.roomList}>
          {rooms.map((room) => {
            return <RoomCard room={room} key={room.id} />;
          })}
        </div>
      </div>
      {showModal && <AddRoomModal onClose={() => setShowModal(false)}/>}
    </>
  );
};

export default Rooms;
