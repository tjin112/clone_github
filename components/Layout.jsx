import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Button,
  Layout,
  Icon,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from "antd";
import Router from "next/router";
import { GithubOutlined } from "@ant-design/icons";
import Container from "./Container";
const { Header, Content, Footer } = Layout;
// function goToA() {
//   Router.push(
//     {
//       pathname: "/a",
//       query: {
//         id: 888,
//       },
//     },
//     "/a/2"
//   );
// }

const Children = ({ children }) => {
  const githubIconStyle = {
    color: "white",
    fontSize: 40,
    display: "block",
    paddingTop: 10,
    marginRight: 20,
  };
  const footerStyle = {
    textAlign: "center",
  };
  const [search, setSearch] = useState("");
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);
  const handleOnSearch = useCallback(() => {}, []);
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <GithubOutlined style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              <Avatar size={40} icon="user" />
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer = {<div  />}>
          {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>
        <Button>123</Button>
        Developed by Taimin @
        <a href="mailto:heanqi0925@gmail.com">heanqi0925@gmail.com</a>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          height: 100%;
        }
        .ant-layout-header{
          padding-left:0;
          padding-right:0;
        }
      `}</style>
    </Layout>
  );
};
export default Children;
