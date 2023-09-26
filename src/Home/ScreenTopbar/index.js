// TopBar.js

import React, { useState } from "react";
import "./style.css"; // Create a CSS file for styling
import Stack from 'react-bootstrap/Stack';

const ScreenTopBar = (title, link) => {

  return (
    <Stack className="topbar" direction="horizontal" gap={3}>
      <div>Title</div>
      <div className=" ms-auto">Second item</div>
      <div>Third item</div>
    </Stack>
  );
};

export default ScreenTopBar;
