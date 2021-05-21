import withRepoBasic from '../../components/With-repo-basic'

function Issues({test}){
    return (
        <>
            <span>Issues/index  {test}</span>
        </>
    )
}
Issues.getInitialProps = async ()=>{
    return {
        test:123
    }
}

export default withRepoBasic(Issues,'issues')