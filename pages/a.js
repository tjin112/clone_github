import { withRouter } from 'next/router'
import styled from 'styled-components'
// import moment from 'moment'
import dynamic from 'next/dynamic'
const Title = styled.h1`
  color:yellow;
  front-size:40px;
`
const Comp = dynamic(import('../components/comp'))

function A({ stars , router,time}) {
  return <>
        <Title>This is a Title {time}</Title>
        <Comp />
        <div className='abc'>Next stars: {stars},,,{router.query.id} </div>
          <style jsx>
            {`.abc{
              color:blue;
            }`
          }</style>
  
  </>
    
}
  
  A.getInitialProps = async () => {
    // 异步加载moment模块，不会让moment 成为公共模块，webpack 会在完全执行加载代码时，才会加载
    const moment = await import('moment')
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    const time = moment.default(Date.now()-6000*1000).fromNow()

    return { stars: json.stargazers_count,time}
  }
  
  export default withRouter(A)