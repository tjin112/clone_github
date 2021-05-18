const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'
const client_id = "Iv1.642e392f27504560"
module.exports = {
  github: {
    request_token_url:'https://github.com/login/oauth/access_token',
    client_id,
    client_secret: "211b8fc2cf6750dfcbacd288be8341b56820c3a1",
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
};
