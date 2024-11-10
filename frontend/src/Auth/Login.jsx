import React from "react";

import Card from "antd/es/card/Card";
import { Alert, Button, Flex, Form, Spin, Typography } from "antd";
import Input from "antd/es/input/Input";
import { Link } from "react-router-dom";
import register from "../assets/register2.webp";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { error, loading, loginUser } = useLogin();
  const handleLogin = async (values) => {
    await loginUser(values);
  };
  return (
    <div>
      <Card className="form-container">
        <Flex gap={"large"} align="center">
          {/* Image */}
          <Flex flex={1}>
            <img src={register} alt="" className="auth-image" />
          </Flex>
          {/* Form */}
          <Flex vertical flex={1}>
            <Typography.Title level={3} strong className="title">
              Sign In
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
              Unlock Your World!
            </Typography.Text>
            <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
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
                  {loading ? <Spin /> : "Sign In"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to={"/"}>
                  <Button size="large" className="btn">
                    Create an account
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Login;
