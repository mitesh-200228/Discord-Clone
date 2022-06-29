import React from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { useHistory } from "react-router-dom";
import { createRoom as create } from "../../http";

const AddRoomModal = ({ onClose }) => {
  const history = useHistory();
  const [roomType, setRoomType] = React.useState("open");
  const [topic, setTopic] = React.useState("");
  async function createRoom() {
    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType });
      history.push(`/room/${data.id}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.texts}>Enter the topic to be discussed</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.texts}>Room types</h2>
          <div className={styles.roomType}>
            <div onClick={() => setRoomType("open")} className={styles.typeBox}>
              <img className={styles.images} src="/images/globe.png" alt="" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={styles.typeBox}
            >
              <img className={styles.images} src="/images/users.png" alt="" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={styles.typeBox}
            >
              <img className={styles.images} src="/images/lock.png" alt="" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Selected room type : {roomType}</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <span>Start a room</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
