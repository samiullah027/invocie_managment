import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      alert ('password not match')
    }
  };
console.log("required: values.password === values.confirmPasswordrequired: values.password === values.confirmPassword",values.password == values.confirmPassword);
  return (
    <Container className="p-4 d-flex justify-content-center align-items-center h-100">
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
        <Form.Item name="confirmPassword"
          rules={[{ required: values.password !== values.confirmPassword, message: "password is not same" }]}
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
