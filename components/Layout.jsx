import Link from 'next/link'
import { Button } from 'antd'
import Router from 'next/router'
function goToA(){
    Router.push({
      pathname:'/a',
      query:{
        id:888
      }
    },'/a/2')
  }

const Layout = ({ children }) => (
  <>
    <header>
      <Link href="/a?id=1" as="/a/1">
        <Button>A</Button>
      </Link>
      <Button onClick={goToA}>B</Button>
    </header>
    {children}
  </>
)
export default(Layout)