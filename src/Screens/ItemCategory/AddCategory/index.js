import React, { useState ,useEffect} from "react";
import "./style.css";
import {
  Container,
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import ItemList from "../ItemList";

const AddCategory = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  console.log("value.---", value);
  console.log("data.---", data);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data2") || "[]");
    setData(storedData);
  }, []);

  const handleSubmit = () => {
    if (!value) {
      alert("Please fill in the field before adding.");
      return;
    }
    const storedData = JSON.parse(localStorage.getItem("data2") || "[]");
    const newData = [...storedData, value];
    setData(newData);
    localStorage.setItem("data2", JSON.stringify(newData));
    setValue('');
  };
 
  return (
    <Container>
      <Row className="addName">
        <Col md={1}>Name</Col>
        <Col md={4}>
          <FloatingLabel controlId="floatingInput">
            <Form.Control
              type="text"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="btn-save"
            style={{
              marginLeft: "10rem",
              marginTop: "2rem",
              marginBottom:"1rem",
              padding: "10px 20px",
              textAlign: "center",
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Col>
      </Row>
      <ItemList  data={data || []} />
    </Container>
  );
};

export default AddCategory;
