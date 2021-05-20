import { useState, useCallback } from "react";
import { connect } from "react-redux";
import getConfig from "next/config";

import { logout } from "../store/store";
import { withRouter } from "next/router";

import axios from "axios";

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
import { GithubOutlined } from "@ant-design/icons";
import Container from "./Container";

const { Header, Content, Footer } = Layout;
// login
const { publicRuntimeConfig } = getConfig();

const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: "block",
  paddingTop: 10,
  marginRight: 20,
};

const footerStyle = {
  textAlign: "center"
};
const Index = function Index({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query
  const [search, setSearch] = useState(urlQuery || '');
  const handleSearchChange = useCallback(
    (event) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search]);
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  const handleGoToOAuth = useCallback((e) => {
    try {
      e.preventDefault();
      axios.get(`/prepare-auth?url=${router.asPath}`)
      .then((res) => {
        if (res.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL;
        } else {
          console.log("prepare autho failed", res);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          Log out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <GithubOutlined type="github" style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Input.Search 
              placeholder="Search:" 
              value={search}
              onChange={handleSearchChange}
              onSearch = {handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="javascript:void(0)">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="Click to login">
                  <a
                    href={`/prepare-auth?url=${router.asPath}`}
                    
                  >
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Taimin @
        <a href="mailto:heanqi0925@gmail.com">heanqi0925@gmail.com</a>
      </Footer>
      <style jsx>{`
        .content {
          color: red;
        }
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
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  );
};

export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      logout: () => dispatch(logout()),
    };
  }
)(withRouter(Index));
