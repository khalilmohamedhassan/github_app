
let repos_result = document.querySelector("#repos");




function getreponame(){
    let qurStr = document.location.search;
    let repoName = qurStr.split("=")[1];

    if(repos_result){
        getIssues(repoName);
    }


}

function getIssues(repoName){
    let api_urll = "https://api.github.com/repos/" + repoName + "/issues";
    fetch(api_urll)
    .then(res => res.json())
    .then(data => display_Issues(data))
    .catch(err => alert("sometheing went wrong !!"));
}

function display_Issues(issues){
    if(issues.length == 0){
        search_term_p.innerHTML = "No Repos..!";
        return;
    }
    // search_term_p.innerHTML = serchterm;
    issues.forEach(issue => {
        repos_result.innerHTML += `
        <a href="${issue.html_url}" class="repo-item">
        <span>${issue.title}</span>
    </a>
        `
    });

  
}
getreponame();