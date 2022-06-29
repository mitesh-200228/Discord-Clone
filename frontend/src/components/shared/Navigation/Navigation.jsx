import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http/index";
import styles from "./Navigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignitems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  const { isAuth, user } = useSelector((state) => state.auth);
  console.log(user);
  const logoutuser = async () => {
    try {
      const { data } = await logout();
      console.log(data);
      dispatch(setAuth(data));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/github.png" alt="logo" />
        <span style={logoText}>Mitesh Bediya</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              src={user.avatar ? user.avatar : '/images/profile1.png'}
              className={styles.profile}
              width="40"
              height="20"
              alt="avatar"
            />
          </Link>
          <button className={styles.logoutButton} onClick={logoutuser}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
