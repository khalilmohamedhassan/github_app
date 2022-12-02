
// select element by js DOM
let user_form = document.querySelector(".user-form");
let user_input = document.querySelector("#username");
let languge = document.querySelector(".languages");
let search_term_p = document.querySelector("#search-term");
let repos_result = document.querySelector("#repos");



//events
user_form.addEventListener("submit" , formSubmitHandel);
languge.addEventListener("click" , handelClick)


// functions 

//get repos by userName
function formSubmitHandel(e){
    e.preventDefault();
    let user = user_input.value.trim();
    repos_result.innerHTML = "";
    if(user_input.value !== "" ){
        get_user_repos(user);

    }else{
        alert(" hallo user , wornnaing empty string ");
    }
};

function get_user_repos(user){

    let api_url = "https://api.github.com/users/" + user + "/repos";
    fetch(api_url)
    .then(response => response.json())
    .then(data => display_repos(data,user))
    .catch(error => alert("you can a solving problem"));
}

function display_repos(repos,serchterm){
    if(repos.length == 0){
        search_term_p.innerHTML = "No Repos..!";
        return;
    }
    search_term_p.innerHTML = serchterm;
    repos.forEach(repo => {
        let name = repo.owner.login + '/' + repo.name;
        repos_result.innerHTML += `
        <a href="./repo.html?repo=${name}" class="repo-item">
        <span>${repo.owner.login} / ${repo.name}</span>
        <span>${repo.open_issues_count > 0 ? "<i class = 'fas fa-times'></i>" : "<i class = 'fas fa-check-square'></i>"}</span>
    </a>
        `
    });

    user_input.value = "";
  
}

//get repos by languges

function handelClick(e){
    let lang = e.target.getAttribute("data-lang");
    if(lang)
    {
        repos_result.innerHTML = "";
        getLangRepos(lang);
    }

  
}
function getLangRepos(lang){
  let api_url = "https://api.github.com/search/repositories?q=" + lang;
    fetch(api_url)
    .then(res => res.json())
    .then(data => display_repos(data.items,lang))
    .catch(err => alert("sometheing went wrong"))
}


// 