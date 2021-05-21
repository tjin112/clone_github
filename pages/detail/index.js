import withRepoBasic from '../../components/With-repo-basic'

function Detail({test}){
    return (
        <>
            <span>Detail/index  {test}</span>
        </>
    )
}
Detail.getInitialProps = async ()=>{
    return {
        test:123
    }
}

export default withRepoBasic(Detail,'index')