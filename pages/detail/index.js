import withRepoBasic from '../../components/With-repo-basic'
import api from '../../lib/api'
import dynamic from 'next/dynamic'


const MDRendere = dynamic(
    ()=>import ('../../components/MarkdownRenderer'))

function Detail({readme}){
    return (
        <MDRendere content={readme.content} isBase64 = {true}/>
    )
}
Detail.getInitialProps = async ({ctx:{query:{owner,name}},req,res})=>{
    const readmeRes = await api.request({
        url: `/repos/${owner}/${name}/readme`
    },req,res)
    return {
        readme:readmeRes.data
    }
}

export default withRepoBasic(Detail,'index')