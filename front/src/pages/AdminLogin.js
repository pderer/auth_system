import { Button, Form, Input, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function AdminLogin() {
  const navigate = useNavigate();
  const navigateToAdminRegister = () => {
    navigate("/admin/register");
  };
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
  const handleLogout = () => {
    removeCookie("admin");
    window.location.replace("/admin/login");
  };
  const navigateToAdminPage = () => {
    navigate("/admin");
  };
  const navigateToUserLogin = () => {
    navigate("/");
  };
  const onFinish = (values) => {
    const admin = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    axios
      .post("/auth/admin/login/", admin)
      .then((res) => {
        console.log(res);
        setCookie("admin", res.data.token);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        alert("등록되지 않은 어드민입니다.");
      });
    console.log("username:", values.username);
    console.log("password:", values.password);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
        <h1>어드민 로그인</h1>
      </div>
      {cookies.admin ? (
        <>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Button onClick={navigateToAdminPage}>어드민 페이지로</Button>
        </>
      ) : (
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
      )}
      <Divider />
      {cookies.admin ? (
        <></>
      ) : (
        <>
          <div>아이디가 없다면?</div>
          <br />
          <Button onClick={navigateToAdminRegister}>어드민 회원가입</Button>
          <Divider />
          <div>일반 유저이신가요?</div>
          <Button onClick={navigateToUserLogin}>유저 로그인</Button>
        </>
      )}
    </>
  );
}

export default AdminLogin;
