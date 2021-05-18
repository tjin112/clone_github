// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from "next/link";
import Router from "next/router";
import { Button } from "antd";
import { connect } from "react-redux";
import { add } from  '../store/store'
import getConfig from 'next/config'
import { useEffect }  from 'react' 
import axios from 'axios'
const {publicRuntimeConfig} =getConfig()

const Index = function Index({ counter ,username,rename,add}) {
  useEffect(()=>{
    axios.get('api/user/info').then((res)=>[
      console.log(res.data)
    ])
  },[])
  return (
    <div>
      <span>Count: {counter}</span>
      <a>User Name:{username}</a>
      <input value = {username} onChange ={(e)=>rename(e.target.value)}/>
      <button onClick={()=>add(counter )}>do add</button>
      <a href={publicRuntimeConfig.OAUTH_URL}>Sign in</a>
    </div>
  );
};
Index.getInitialProps = async ({reduxStore})=>{
  reduxStore.dispatch(add(3))
  return {}
}
export default connect(function mapStateToProps(state) {
  return {
    counter: state.count.count,
    username: state.user.username,
  };
},function mapDispatchToPros(dispatch){
  return {
    add:(number)=>dispatch({type:"ADD",number}),
    rename:(name)=>dispatch({type:'UPDATE_USERNAME',name})
  }
})(Index);
