import React from "react";
import Crud from "./Crud";
import SideBar from "./SideBar";
import TopBar from "./Topbar";
import AddCategory from "../Screens/ItemCategory/AddCategory";
import ScreenTopBar from "./ScreenTopbar";
// import ItemList from "../Screens/ItemCategory/ItemList";

const Home = () => {
  return (
    <>
      <ScreenTopBar/>
      <Crud />
      <AddCategory />
    </>
  );
};

export default Home;
