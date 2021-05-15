import '../styles/globals.css'
import 'antd/dist/antd.css'
import App ,{ Container }from 'next/app'
import Layout from '../components/Layout'

// function MyApp({ Component, pageProps }) {
  
//   return <Component {...pageProps} />
// }
class MyApp extends App{
  static async getInitialProps({ Component , ctx }){
    console.log('App init')
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return{
      pageProps
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
        
    )
  }
}

export default MyApp
