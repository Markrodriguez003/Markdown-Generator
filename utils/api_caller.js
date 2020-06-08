const mdGenerator = require(`./markdownGenerator.js`);

const axios = require(`axios`);
/* CREATE FUNCTION THAT CALLS GITHUB API AND GRABS DATA AND RETURNS IT */

/* api_caller(username){
    url = github + username
    return appropriate data
} */

function api_request(user_github){
    const BASE_URL = "https://api.github.com/users/";
    const USER_ACCT = user_github.githubEmail;
    axios({
        url: `${BASE_URL}${USER_ACCT}`, 
        method: "GET"
    }).then((response)=>{
        
        console.log(`API CALL SUCCESSFUL @--> ${BASE_URL+USER_ACCT}`);
        
        
        user_github.profilePic = response.data.avatar_url;
        user_github.profileUrl = response.data.html_url;
  
        mdGenerator.generate(user_github);


    }).catch((err)=>{
        console.log(`GITHUB USER INVALID --> ${BASE_URL + USER_ACCT } --> ${err} -- > Please reconfigure your .md file.`);

    })
}

/* EXPORT FUNCS HERE */
exports.api_request = api_request;