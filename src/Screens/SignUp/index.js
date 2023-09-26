import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { Container, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const options = {
    autoClose: 2000,
    className: "",
    position: toast.POSITION.TOP_RIGHT,
  };
  const toastSuccess = (message) => {
    toast.error(message, options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onFinish = () => {
    if (values.password === values.confirmPassword) {
      localStorage.setItem("users", JSON.stringify(values));
      navigate("/home");
    } else {
      toastSuccess("Passwords do not match");
    }
  };
  return (
    <Container className="p-5 d-flex justify-content-center align-items-center">
      <Form className="w-50" name="basic" onFinish={onFinish}>
        <h1 className="text-center">Sign Up</h1>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: values.password !== values.confirmPassword,
              message: "password is not same",
            },
          ]}
        >
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item className="d-flex justify-content-center">
          <Button type="primary" htmlType="submit">
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default SignUp;
