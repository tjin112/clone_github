// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";
import { connect } from "react-redux";
import getConfig from 'next/config'
import { useEffect }  from 'react' 
import axios from 'axios'
const {publicRuntimeConfig} =getConfig()
const Index = function Index({ user }) {
  return (
    <div>
      <button>do add</button>
      <a href={publicRuntimeConfig.OAUTH_URL}>Sign in</a>
    </div>
  );
};
export default connect(function mapStateToProps(state) {
  return {
    user:state.user
  };
})(Index);
