import "../styles/globals.css";
import "antd/dist/antd.css";
import App, { Container } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import testHoc from '../lib/with-redux'
// function MyApp({ Component, pageProps }) {

//   return <Component {...pageProps} />
// }
class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component} = ctx
    console.log("App init");
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
    };
  }
  render() {
    const { Component, pageProps,reduxStore } = this.props;
    return (
      <Layout>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    );
  }
  
}

export default testHoc(MyApp);
