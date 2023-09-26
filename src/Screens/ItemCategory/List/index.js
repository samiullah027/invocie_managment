import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Table } from "react-bootstrap";

const DATA = "data2";
const RESET_INDEX = -1;

const List = ({ data }) => {
  const [mainData, setMainData] = useState([]);
  console.log("mainData", mainData);
  const [editIndex, setEditIndex] = useState(-1);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    let listData = data
    if(!listData) {
      listData = JSON.parse(localStorage.getItem("data2") || "[]");
    }
    setMainData(listData || []);
  }, [data]);


  const handleDelete = (selectedIndex) => {
    const result = mainData.filter((_, dataIndex) => dataIndex !== selectedIndex
    );
    localStorage.setItem(DATA, JSON.stringify(result));
    setMainData(result);

  };

  const handleSave = (index) => {
    mainData[index] = categoryName;
    localStorage.setItem(DATA, JSON.stringify(mainData));
    setMainData(mainData);
    setEditIndex(RESET_INDEX);
  };

  const handleEdit = (index) => {
    setCategoryName(mainData[index]);
    setEditIndex(index);
  };

  return (
    <Table striped bordered hover>
      <tbody>
        {mainData?.map((item, index) => (
          <tr key={index}>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                />
              ) : (
                item
              )}
            </td>
            <td>
              {editIndex === index ? (
                <Button
                  onClick={() => handleSave(index)}
                  style={{ marginRight: "10px" }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => handleEdit(index)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Button>
              )}
              <Button onClick={() => handleDelete(index)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default List;
