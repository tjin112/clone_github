import { withRouter } from 'next/router'

const A = ({ router })=> <div>A {router.query.id}</div>

export default withRouter(A)