import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Table } from "react-bootstrap";

const DATA = 'data2'
const RESET_INDEX = -1

const ItemList = ({ data }) => {
  const [mainData, setMainData] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [categoryName, setCategoryName] = useState();

  // useEffect(() => {

      // const storedData = localStorage.getItem(DATA) || [];
      // console.log("storedDatastoredDatastoredData",storedData);
      // const dataArray = JSON.parse(storedData);
      // setMainData(dataArray);
  // }, []);

  const handleDelete = (selectedIndex) => {
    const result = mainData.filter((_, dataIndex) => dataIndex !== selectedIndex);
    localStorage.setItem(DATA, JSON.stringify(result || []));
    setMainData(result);
  };


  const handleSave = (index) => {
    mainData[index] = categoryName;
    localStorage.setItem(DATA, JSON.stringify(mainData));
    setMainData(mainData);
    setEditIndex(RESET_INDEX);
  };

  const handleEdit = (index) => {
    setCategoryName(mainData[index])
    setEditIndex(index)
  }

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
                  onChange={event => setCategoryName(event.target.value)}
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

export default ItemList;
