import React from "react";
import UserNavbar from "./UserNavbar";
import { Outlet } from "react-router-dom";
import NavBarNew from "../../components/shared/NavbarNew";
import Footer from "../../components/home/footer";

const Profile = () => {
  return (
    <>
      <NavBarNew />
      <UserNavbar />
      <Outlet />
      <div className="acc--footer">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
