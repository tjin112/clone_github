import { withRouter } from "next/router";
import { Row, Col, List, Pagination } from "antd";
import Link from "next/link";
import Router from "next/router";
import { memo , isValidElement} from "react";
import Repo from "../components/Repos";
const api = require("../lib/api");
/**
 * sort : 排序方式
 * lang: 项目开发住语言
 * order :排序顺序
 * page: 页面
 *
 */
const LANGUAGE = ["JavaScript", "HTML", "CSS", "Java", "TypeScript", "Python"];
const SORT_TYPES = [
  {
    name: "Best Match",
  },
  {
    name: "Most Stars",
    value: "stars",
    order: "desc",
  },
  {
    name: "Fewest Stars",
    value: "stars",
    order: "asc",
  },
  {
    name: "Most Forks",
    value: "forks",
    order: "desc",
  },
  {
    name: "Fewest Forks",
    value: "forks",
    order: "asc",
  },
];

function noop() {   
}
const per_page = 20
const selectedItemStyle = {
  borderLeft: "2px solid #e36209",
  fontWeight: "600",
};

const FillterLink = memo(({ name, query, lang, sort, order ,page }) => {
  let queryString = `?query=${query}`;
  if (lang) queryString += `&lang=${lang}`;
  if (sort) queryString += `&sort=${sort}&order=${order || "desc"}`;
  if (page) queryString += `&page=${page}`
  queryString +=`&per_page=${per_page}`
  return (
    <Link href={`/search${queryString}`}>
      {isValidElement(name) ? name:<a>{name}</a>} 
    </Link>
  );
});

const Search = ({ router, repos }) => {
  const { ...querys } = router.query;
  const { lang, sort, order ,page} = router.query;
  return (
    <div className="root">
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={<span className="list-header">Language</span>}
            style={{ marginBottom: 20 }}
            dataSource={LANGUAGE}
            renderItem={(item) => {
              const selected = lang === item;
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  {selected ? (
                    <span style={{ color: "#777" }}>{item}</span>
                  ) : (
                    <FillterLink {...querys} lang={item} name={item} />
                  )}
                </List.Item>
              );
            }}
          />
          <List
            bordered
            header={<span className="list-header">Sort</span>}
            dataSource={SORT_TYPES}
            renderItem={(item) => {
              let selected = false;
              if (item.name === "Best Match" && !sort) {
                selected = true;
              } else if (item.value === sort && item.order === order) {
                selected = true;
              }
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                  {selected ? (
                    <span style={{ color: "#777" }}>{item.name}</span>
                  ) : (
                    <FillterLink
                      {...querys}
                      sort={item.value}
                      order={item.order}
                      name={item.name}
                    />
                  )}

                  {/* <a
                    onClick={() =>
                      doSearch({
                        lang,
                        query,
                        sort: item.value || "",
                        order: item.order || "",
                      })
                    }
                  >
                    {item.name}
                  </a> */}
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={18}>
          {/* {repos.total_count} repositories */}
          <h3 className="repos-title">{repos.total_count} repositories</h3>
          {repos.items.map((repo) => (
            <Repo repo={repo} key={repo.id} />
          ))}
          <div class='pagination'>
          <Pagination
              pageSize={per_page}
              current={Number(page) || 1}
              total={1000}
              onChange={noop}
              itemRender={(page, type, ol) => {
                const p =
                  type === 'page' ? page : type === 'prev' ? page - 1 : page + 1
                const name = type === 'page' ? page : ol
                return <FillterLink {...querys} page={p} name={name} />
              }}
            />
          </div>
        </Col>
      </Row>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
        }
        .repos-title {
          border-bottom: 1px solid #eee;
          font-size: 24px;
          line-height: 50px;
        }
        .pagination{
            padding:20px;
            text-align:center;
        }
      `}</style>
    </div>
  );
};
Search.getInitialProps = async ({ ctx }) => {
  console.log(ctx);
  const { query, sort, lang, order, page } = ctx.query;
  if (!query) {
    return {
      repos: {
        total_count: 0,
      },
    };
  }
  // ?q=react+language:javascript&sort=stars&order=desc&page=2
  let queryString = `?q=${query}`;
  if (lang) queryString += `+language:${lang}`;
  if (sort) queryString += `&sort=${sort}&order=${order || "desc"}`;
  if (page) queryString += `&page=${page}`;

  const result = await api.request(
    {
      url: `/search/repositories${queryString}`,
    },
    ctx.req,
    ctx.res
  );
  return {
    repos: result.data,
  };
};
export default withRouter(Search);
