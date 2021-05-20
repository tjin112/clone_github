import Link from "next/link";
import {  SmileTwoTone } from '@ant-design/icons'
import moment from 'moment'

function getLicense(license) {
  return license ? `${license.spdx_id} license` : "";
}
function getLastUpdated(time) {
    return moment(time).fromNow()
}
const Repos = ({repo}) => {
  return (
    <div className="root">
      <div className="basic-info">
        <h3 className="repo-title">
          <Link href={`/detail ?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.full_name}</a>
          </Link>
        </h3>
        <p className="repo-desc">{repo.description}</p>
        <p className="other-info">
          <span className="license">{getLicense(repo.license)}</span>
          <span className="last-updated">Updated: {getLastUpdated(repo.updated_at)}</span>
          <span className="open-issue">{repo.open_issues_count} open issues</span>
        </p>
      </div>
      <div className="lang-star">
        <span className="lang">{repo.language}</span>
        <span className="stars">{repo.stargazers_count} <SmileTwoTone twoToneColor="#eb2f96" /></span>
      </div>
      <style jsx>{`
          .root{
              display:flex;
              justify-content:space-between;
              flex-wrap:wrap;
          }
          .root+.root{
              border-top: 1px solid #eee;
               padding-top:20px;
               flex-wrap:wrap; 
          }
          .repo-title{
              font-size:20px;
          }
          .lang-star{
              display:flex;
              flex-wrap:wrap;
          }
          .lang{
            color:#777;
          }
          .lang-star>span{
            flex-wrap:wrap;
              width:120px;
              text-align:right;
          }
          .repo-description{
              width:400px;
          }
          .basic-info{
            width:500px;
          }
          .other-info >span +  span {
              margin-left:10px;
              color:#777
          }
          `}
      </style>
    </div>
  );
};
export default Repos;
