import { Button, Icon, Tabs } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { useEffect } from "react";
import getConfig from "next/config";
import { connect } from "react-redux";
import Repo from "../components/Repos";
import Router, { withRouter } from "next/router";
import LRU from "lru-cache";

// const cache = new LRU({
//   maxAge: 1000 * 10,
// });
const api = require("../lib/api");
const { publicRuntimeConfig } = getConfig();
let cachedUserRepos, cachedUserStaredRepos = ''

const isServer = typeof window === "undefined";
const Index = function Index({ userRepos, userstaredRepos, user, router }) {
  const tabKey = router.query.key || "1";
  const handleTabChange = (activeKey) => {
    Router.push(`/?key=${activeKey}`);
  };
  useEffect(() => {
    if (!isServer) {
        cachedUserRepos = userRepos;
        cachedUserStaredRepos = userstaredRepos;
    //   if (userRepos) {
    //     cache.set("userRepos", userRepos);
    //   }
    //   if (userstaredRepos) {
    //     cache.set("userstaredRepos", userstaredRepos);
    //   }
      const timeout = setTimeout(()=>{
          cachedUserRepos = null
          cachedUserStaredRepos = null
      },(1000*60*1))
    }
  }, [userRepos, userstaredRepos]);
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
      <div className="user-repos">
        <Tabs activeKey={tabKey} onChange={handleTabChange} animated={true}>
          <Tabs.TabPane tab="Your Repositories" key="1">
            {userRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="关注的reps" key="2">
            {userstaredRepos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-size: 16px;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 100px;
        }
        .user-repos {
          flex-grow: 1;
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
  if (!isServer) {
    //  if (cache.get('userRepos') && cache.get('userStaredRepos')) {
    //   return {
    //     userRepos: cache.get('userRepos'),
    //     userStaredRepos: cache.get('userStaredRepos'),
    //   }
    // }
       if (cachedUserRepos && cachedUserStaredRepos) {
      return {
        userRepos:cachedUserRepos,
        userstaredRepos: cachedUserStaredRepos,
      }
    }
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
export default withRouter(
  connect(function mapStateToProps(state) {
    return {
      user: state.user,
    };
  })(Index)
);
