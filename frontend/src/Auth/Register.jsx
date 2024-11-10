import React from "react";
import Card from "antd/es/card/Card";
import { Alert, Button, Flex, Form, Spin, Typography } from "antd";
import Input from "antd/es/input/Input";
import { Link } from "react-router-dom";
import register from "../assets/register2.webp";
import userSignUp from "../hooks/userSignUp";

const Register = () => {
  const { loading, error, registerUser } = userSignUp();
  const handleRegister = (values) => {
    registerUser(values);
  };
  return (
    <>
      <Card className="form-container">
        <Flex gap={"large"} align="center">
          {/* Form */}
          <Flex vertical flex={1}>
            <Typography.Title level={3} strong className="title">
              Create an account
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
              Join for exclusive access!
            </Typography.Text>
            <Form
              layout="vertical"
              onFinish={handleRegister}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name={"name"}
                rules={[
                  { required: true, message: "Please input your full name" },
                ]}
              >
                <Input size="large" placeholder="Ente your full name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name={"email"}
                rules={[
                  { required: true, message: "Please input your email id" },
                  {
                    type: "email",
                    message: "The input is not valid email",
                  },
                ]}
              >
                <Input size="large" placeholder="Ente your email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name={"password"}
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Please input your password"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name={"passwordConfirm"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter your password"
                />
              </Form.Item>

              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="alert"
                />
              )}

              <Form.Item>
                <Button
                  type={`${loading ? "" : "primary"}`}
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  {loading ? <Spin /> : "Create Account"}
                  Create Account
                </Button>
              </Form.Item>
              {/* {`${!loading}` && (
                <Alert
                  message="account Created Successfully, kindly login!"
                  showIcon
                  closable
                  className="alert"
                />
              )} */}
              <Form.Item>
                <Link to={"/login"}>
                  <Button size="large" className="btn">
                    Sign In
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>
          {/* Image */}
          <Flex flex={1}>
            <img src={register} alt="" className="auth-image" />
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default Register;
