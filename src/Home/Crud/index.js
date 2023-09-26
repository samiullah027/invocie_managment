import React, { useEffect, useState } from "react";
import { Container, Table, FloatingLabel, Form, Button } from "react-bootstrap";
import { SearchWrapper, ListWrapper } from "./styles";

const Crud = () => {
  const [stateData, setStateData] = useState({
    itemName: "",
    quantity: 1,
    amount: 0,
    percentage: 0,
    discount: 0,
  });
  const [totalQty, setTotalQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getLocalData();
  }, []);

  const itemList = [
    {
      id: 1,
      name: "shirt",
      price: 10,
    },
    {
      id: 2,
      name: "pent",
      price: 20,
    },
    {
      id: 3,
      name: "coat",
      price: 30,
    },
    {
      id: 4,
      name: "jarsi",
      price: 40,
    },
    {
      id: 5,
      name: "sweatshirt",
      price: 50,
    },
    {
      id: 6,
      name: "jacket",
      price: 60,
    },
    {
      id: 7,
      name: "banyan",
      price: 70,
    },
    {
      id: 8,
      name: "socks",
      price: 80,
    },
    {
      id: 9,
      name: "trouser",
      price: 90,
    },
    {
      id: 10,
      name: "t-shirt",
      price: 100,
    },
  ];

  const itemData = (value) => {
    // const resultData = itemList.filter((item) => {
    //   return item.name === value;
    // });

    let searchRes = itemList.filter((e) => {
      let finalRes = e.name.toLowerCase();
      return finalRes.indexOf(value) !== -1;
    });

    setSearchResult(searchRes);

    console.log("result---", searchRes);

    // if (searchRes && searchRes[0]?.price) {
    //   setStateData((prevState) => ({
    //     ...prevState,
    //     ["amount"]: searchRes[0]?.price,
    //   }));
    // }
  };
  // const onIptClick = (e) => {
  //   searchResult(e.target.value)
      
  // };

  const getLocalData = () => {
    const storedData = localStorage.getItem("data");
    const dataArray = JSON.parse(storedData)||[];
    console.log("dataArray---", dataArray);
    if (dataArray && dataArray?.length) {
      setTableData(dataArray.splice(0, dataArray.length - 1));
      const calculatedData = dataArray[dataArray.length - 1];
      setTotalAmount(calculatedData.totalAmount);
      setTotalQty(calculatedData?.newTotalQty);
      console.log("getItem", dataArray[dataArray.length - 1]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stateData.itemName || !stateData.quantity || !stateData.amount) {
      alert("Please fill in all fields before adding.");
      return;
    }
    let newTotalQty = totalQty + parseFloat(stateData.quantity);
    setTotalQty(newTotalQty);
    let newTotalAmount =
      totalAmount + parseFloat(stateData.quantity * stateData.amount);
    setTotalAmount(newTotalAmount);
    // const newItem = { ...stateData };
    setTableData((prevData) => [...prevData, stateData]);
    localStorage.setItem(
      "data",
      JSON.stringify([
        ...tableData,
        stateData,
        { totalAmount: newTotalAmount, newTotalQty: newTotalQty },
      ])
    );
    setStateData({ itemName: "", quantity: "", amount: "" });
    // getLocalData();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "itemName") {
      itemData(value);
    }
    if (name === "percentage") {
      setStateData((prevState) => ({
        ...prevState,
        ["discount"]: (value / 100) * totalAmount,
      }));
    } else if (name === "discount") {
      setStateData((prevState) => ({
        ...prevState,
        ["percentage"]: (value / totalAmount) * 100,
      }));
    }
  };

  const handleRemove = (item, index) => {
    let copy = [...tableData];
    copy.splice(index, 1);
    setTableData(copy);
    let newTotalQty = totalQty - item.quantity;
    setTotalQty(newTotalQty);
    let newTotalAmount = totalAmount - parseFloat(item.quantity * item.amount);
    setTotalAmount(newTotalAmount);
    // localStorage.setItem("data", JSON.stringify(copy));
    localStorage.setItem(
      "data",
      JSON.stringify([
        ...copy,
        { totalAmount: totalAmount, newTotalQty: totalQty },
      ])
    );
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const copy = [...tableData];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      setTableData(copy);
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...copy,
          { totalAmount: totalAmount, newTotalQty: totalQty },
        ])
      );
    }
  };

  const handleMoveDown = (index) => {
    if (index < tableData.length - 1) {
      const copy = [...tableData];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      setTableData(copy);
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...copy,
          { totalAmount: totalAmount, newTotalQty: totalQty },
        ])
      );
    }
  };
  const setItemIntoField = (item) =>{
    stateData.amount = item.price
    stateData.itemName = item.name
    setStateData(stateData);
    setSearchResult([])
  }

  return (
    <Container fluid style={{padding:'0'}}>
      <Form onSubmit={handleSubmit}>
        <Table striped bordered hover className="m-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="itemName"
                    onChange={handleChange}
                    value={stateData.itemName}
                    autoComplete="off"
                  />
                </FloatingLabel>
                <SearchWrapper>
                  { searchResult && searchResult?.map((res) => {
                    return <ListWrapper key={res.id} onClick={()=>setItemIntoField(res)}>{res.name}</ListWrapper>;
                  })}
                </SearchWrapper>
              </td>
              <td>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Quantity"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="quantity"
                    onChange={handleChange}
                    value={stateData.quantity}
                  />
                </FloatingLabel>
              </td>
              <td>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Price"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="amount"
                    onChange={handleChange}
                    value={stateData.amount}
                  />
                </FloatingLabel>
              </td>
              <td></td>
              <td>
                <Button
                  style={{ padding: "10px 30px", fontSize: "20px" }}
                  type="submit"
                >
                  Add
                </Button>
              </td>
            </tr>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
                <td>{parseFloat(item.quantity) * parseFloat(item.amount)}</td>
                <td>
                  <Button
                    onClick={() => handleRemove(item, index)}
                    style={{ padding: "10px 30px" }}
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={() => handleMoveUp(index)}
                    style={{ padding: "10px 30px", margin: "0px 20px" }}
                  >
                    Up
                  </Button>
                  <Button
                    onClick={() => handleMoveDown(index)}
                    style={{ padding: "10px 30px" }}
                  >
                    Down
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>Total Quantity: {totalQty}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total Amount</td>
              <td>{totalAmount} </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Discount%</td>
              <td>
                <Form.Control
                  type="number"
                  name="percentage"
                  onChange={handleChange}
                  value={stateData.percentage}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Discount:</td>
              <td>
                <Form.Control
                  type="number"
                  name="discount"
                  onChange={handleChange}
                  value={stateData.discount}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Net Total</td>
              <td>
                <Form.Control
                  type="number"
                  value={totalAmount - stateData.discount}
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
    </Container>
  );
};

export default Crud;
