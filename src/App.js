

import { Routes, Route,useLocation } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddCategory from "./Screens/ItemCategory/AddCategory";
import ItemList from "./Screens/ItemCategory/ItemList";
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
            <Route path="category" element={<AddCategory />} />
            <Route path="item-list" element={<ItemList />} />
            <Route path="crud" element={<Crud />} />
            {/* <Route path="*" element={<p>no data</p>} /> */}

          </Routes>
        </Col>
      </Row>
    </Container>
  );
}


export default App;
