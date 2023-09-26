import React from "react";
import "./style.css";
import SidebarItem from "./SidebarItem";
import items from "../data/sidebar.json";

const SideBar = () => {
  return (
    <div className="main">
      <div className="sidebar">
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
