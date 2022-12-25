import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRegister() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    const admin = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    axios
      .post("/auth/admin/register/", admin)
      .then((res) => {
        navigate("/admin/login");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert("username이 중복됩니다.");
        } else {
          alert("username, password, email을 제대로 입력해주세요.");
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
        <h1>어드민 회원가입</h1>
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AdminRegister;
