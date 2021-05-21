import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import withRepoBasic from "../../components/With-repo-basic";
import api from "../../lib/api";
import { Avatar, Button, Select } from "antd";
import moment from 'moment'
import SearchUser from '../../components/SeacherUser'
function getLastUpdated(time) {
    return moment(time).fromNow()
}
const MDRenderer = dynamic(() => import("../../components/MarkdownRenderer"));
function IssueDetail({ issue }) {
  return (
    <div className="root">
      <MDRenderer content={issue.body} />
      <div className="actions">
        <Button href={issue.html_url} target="_blank">
          open issue
        </Button>
      </div>
      <style jsx>{`
        .root {
          background: #fafafa;
          padding: 20px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  );
}

function IssueItem({ issue }) {
  const [showDetail, setShowDetail] = useState(false);
  const toggleShowDetail = useCallback(() => {
    setShowDetail((detail) => !detail);
  }, []);

  return (
    <div>
      <div className="issue">
        <Button
          type="primary"
          size="small"
          style={{ position: "absolute", right: 10, top: 25 }}
          onClick={toggleShowDetail}
        >
          {showDetail ? "hide" : "view"}
        </Button>
        <div className="avatar">
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </div>
        <div className="main-info">
          <h6>
            <span>{issue.title}</span>
          </h6>
          <p className="sub-info">
            <span>Updated at {getLastUpdated(issue.updated_at)}</span>
          </p>
        </div>

        <style jsx>{`
          .issue {
            display: flex;
            position: relative;
            padding: 10px;
          }
          .issue:hover {
            background: #fafafa;
          }
          .issue + .issue {
            border-top: 1px solid #eee;
          }
          .main-info > h6 {
            max-width: 600px;
            font-size: 16px;
            padding-right: 40px;
          }
          .avatar {
            margin-right: 20px;
          }
          .sub-info {
            margin-bottom: 0;
          }
          .sub-info > span {
            display: inline-block;

            font-size: 12px;
            color: #777;
          }
        `}</style>
      </div>
      {showDetail ? <IssueDetail issue={issue} /> : null}
    </div>
  );
}

const Option = Select.Option
function Issues({ issues,labels}) {
  console.log(labels)
  const [creator,setCreator] = useState()
  const handleCreatorChange  =useCallback((value) =>{
    setCreator(value)
  },[])

  const [state,setState] = useState()
  const handleStateChange  =useCallback((value) =>{
    setState(value)
  },[])

  const [label,setLabel] = useState([])
  const handleLabelChange  =useCallback((value) =>{
    setState(setLabel)
  },[])
     
  return (
    <>
      <div className="root">
        <SearchUser onChange={handleCreatorChange} value={creator}/>
        <Select placeholder="status" onChange={handleStateChange} value={state} style={{width:200}}>
          <Option value='all'>all</Option>
          <Option value='open'>open</Option>
          <Option value='close'>closed</Option>
        </Select>
        <Select placeholder="label" onChange={handleLabelChange} value={label} style={{width:200}}>
          <Option value='all'>all</Option>
          <Option value='open'>open</Option>
          <Option value='close'>closed</Option>
        </Select>
        <div className="issues">
          {issues.map((issue) => (
            <IssueItem issue={issue} key={issue.id} />
          ))}
        </div>
        <style jsx>{`
          .issues {
            border: 1px solid #eee;
            border-radius: 5px;
            margin-bottom: 20px;
            margin-top: 20px;
          }
        `}</style>
      </div>
    </>
  );
}
Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;

  const issuesRes = await api.request(
    {
      url: `/repos/${owner}/${name}/issues`,
    },
    ctx.req,
    ctx.res
  );
  // const labelsRes = await api.request({
  //   url:`/repos/${owner}/${name}/labels`
  // },ctx.req,ctx.res)
  return {
    issues: issuesRes.data,
    // labels: labelsRes.data
  };
};

export default withRepoBasic(Issues, "issues");
