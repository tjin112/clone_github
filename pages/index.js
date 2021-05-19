import { Button, Icon } from "antd";
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import { useEffect } from "react";
import getConfig from "next/config";
import { connect } from "react-redux";
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
const api = require("../lib/api");
const { publicRuntimeConfig } = getConfig();
const Index = function Index({ userRepos, userstaredRepos, user }) {
    console.log(userRepos,user)
  if (!user || !user.id) {
    return (
      <div className="root">
        <p>Please login! It's quick and simple</p>
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          Click and Login
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="email" style={{ marginRight: 10 }}></Icon>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
        <p> 
            <a href={user.html_url}>{user.html_url}</a>
        </p>
        <p>
            <HeartTwoTone />
            <a href={user.location}>{user.location}</a>
        </p>
      </div>
      <div className='user-repos'>
          <p>user-repos</p>
      </div>
      <style jsx>{`
          .root{
              display:flex;
              align-items:flex-start;
              padding:20px 0;
          }
          .user-info{
              width:200px;
              margin-right:40px;
              flex-shrink:0;
              display:flex;
              flex-direction:column;
          }
          .login {
              font-weight:800;
              font-size:20px;
              margin-top:20px;
          }
          .name{
              font-size:16px;
              color:#777;
          }
          .bio{
              margin-top:20px;
              color:#333;
          }
          .avatar{
              width:100%;
              border-radius:5px;
          }
          `}</style>
    </div>

  );
};
Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {
      isLogin: false,
    };
  }
  const userRepos = await api.request(
    {
      url: "/user/repos",
    },
    ctx.req,
    ctx.res
  );
  const userstaredRepos = await api.request(
    {
      url: "/user/starred",
    },
    ctx.req,
    ctx.res
  );
  return {
    isLogin: true,
    userRepos: userRepos.data,
    userstaredRepos: userstaredRepos.data,
  };
};
export default connect(function mapStateToProps(state) {
  return {
    user: state.user,
  };
})(Index);
