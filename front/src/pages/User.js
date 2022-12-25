import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function User() {
  const [auth, setAuth] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const onClickAPI = () => {
    axios
      .get("/token/check/user/", {
        headers: { Authorization: `${cookies.id}` },
      })
      .then((res) => {
        console.log(res);
        setAuth(true);
      })
      .catch((err) => {
        console.log(err);
        alert("유효하지 않은 토큰입니다. 로그인 하세요.");
        navigate("/");
      });
  };
  return (
    <>
      <div>
        <h1>사용자 페이지</h1>
        <p>API를 사용해보세요</p>
      </div>
      <Button onClick={navigateToHome}>홈페이지로 이동</Button>
      <div>
        <Button onClick={onClickAPI}>사용자의 API를 사용해보세요</Button>
      </div>
      {auth ? <div>API 사용 완료!</div> : <></>}
    </>
  );
}

export default User;
