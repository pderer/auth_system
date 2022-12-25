import { Button, Form, Input, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function UserLogin() {
  const navigate = useNavigate();
  const navigateToUserRegister = () => {
    navigate("/user/register");
  };
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const handleLogout = () => {
    removeCookie("id");
    navigate("/");
  };
  const navigateToUserPage = () => {
    navigate("/user");
  };
  const navigateToAdminLogin = () => {
    navigate("/admin/login");
  };
  const onFinish = (values) => {
    const user = {
      username: values.username,
      password: values.password,
      email: values.email,
    };
    axios
      .post("/auth/user/login/", user)
      .then((res) => {
        console.log(res);
        setCookie("id", res.data.token);
        navigate("/user");
      })
      .catch((err) => {
        alert("등록되지 않은 사용자입니다.");
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
        <h1>홈</h1>
        <p>홈페이지에 오신 것을 환영합니다.</p>
      </div>
      {cookies.id ? (
        <>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Button onClick={navigateToUserPage}>사용자 페이지로</Button>
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
      {cookies.id ? (
        <></>
      ) : (
        <>
          <div>아이디가 없다면?</div>
          <br />
          <Button onClick={navigateToUserRegister}>회원가입</Button>
          <Divider />
          <div>어드민이신가요?</div>
          <br />
          <Button onClick={navigateToAdminLogin}>어드민 로그인</Button>
        </>
      )}
    </>
  );
}

export default UserLogin;
