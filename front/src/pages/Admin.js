import React, { useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
function Admin() {
  const [auth, setAuth] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/admin/login");
  };
  const [data, setData] = useState("");
  const onClickAPI = () => {
    axios
      .get("/token/check/admin/", {
        headers: { Authorization: `${cookies.admin}` },
      })
      .then((res) => {
        console.log(res);
        setAuth(true);
      })
      .catch((err) => {
        console.log(err);
        alert("유효하지 않은 토큰입니다. 로그인 하세요.");
        navigate("/admin/login");
      });
    if (auth !== null) {
      axios
        .get("/api/admin/userlist/")
        .then((res) => {
          console.log(res.data);
          setData(JSON.parse(res.data));
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleDelete = (record) => {
    console.log(record);
    axios
      .get("/token/check/admin/", {
        headers: { Authorization: `${cookies.admin}` },
      })
      .catch((err) => {
        console.log(err);
        alert("유효하지 않은 토큰입니다. 로그인 하세요.");
        setAuth(null);
        navigate("/admin/login");
      });
    if (auth !== null) {
      axios
        .delete("/api/admin/userlist/", { data: { name: record } })
        .catch((err) => {
          console.log(err);
        })
        .then();
    }
  };
  return (
    <>
      <div>
        <h1>어드민 페이지</h1>
        <p>API를 사용해보세요</p>
      </div>
      <Button onClick={navigateToHome}>홈페이지로 이동</Button>
      <div>
        <Button onClick={onClickAPI}>유저 관리 API를 사용해보세요</Button>
      </div>
      {auth ? (
        <Table dataSource={data}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Action"
            dataIndex="name"
            key="name"
            render={(record) => (
              <Space size="middle">
                <Button
                  onClick={() => {
                    handleDelete(record);
                  }}
                >
                  Delete
                </Button>
              </Space>
            )}
          />
        </Table>
      ) : (
        <></>
      )}
    </>
  );
}

export default Admin;
