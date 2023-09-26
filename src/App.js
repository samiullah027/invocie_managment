

import { Routes, Route,useLocation } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { ToastContainer } from "react-toastify";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Add from "./Screens/ItemCategory/Add";
import List from "./Screens/ItemCategory/List";
import Crud from "./Home/Crud";
import SideBar from "./Home/SideBar";
import TopBar from "./Home/Topbar";
import SignUp from "./Screens/SignUp";

function App() {
  const location = useLocation();

  // Check if the current location is the "SignUp" page
  const isSignUpPage = location.pathname === "/";
  return (
    <Container fluid >
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
        {!isSignUpPage && (
      <TopBar />
        )}
      <Row>
      {!isSignUpPage && (
        <Col md='2' lg='2' style={{width:'13.66%'}}>
          <SideBar />
        </Col>
      )}
        <Col md='10' lg='10'>
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="category" element={<Add />} />
            <Route path="item-list" element={<List />} />
            <Route path="crud" element={<Crud />} />
          </Routes>
          <ToastContainer /> 
        </Col>
      </Row>
    </Container>
  );
}


export default App;
