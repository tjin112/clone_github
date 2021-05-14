// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default function Index() {
  function goToA(){
    Router.push({
      pathname:'/a',
      query:{
        id:888
      }
    },'/a/2')
  }
  return (
   <div>
     <Link href = "/a?1" as='/a/1' title = 'AAA'>
     <Button>Index</Button>
     </Link>
     <Button onClick = {goToA}>testA</Button>
   </div>
  )
}
