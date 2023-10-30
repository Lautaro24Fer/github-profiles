const API_URL = 'https://api.github.com/users/'

const mainEl = document.querySelector('#main')
const formEl = document.querySelector('#form')
const searchEl = document.querySelector('#seatch')

async function getUser(){

  try{
    const response = await fetch(API_URL + username)

    if(response.status === 404){
    createErrorCard("No encountradou") 
      return;
    }
    if(response.ok){
      const data = response.json()

      console.log(data)
      getRepos(username)
    }
  }
  catch(err){
    createErrorCard("Problem fetching user")
  }

}

async function getRepos(username){
  try {
    const response = await fetch(`${API_URL + username}/repos?sort=created`)
    const data = await response.json()

    console.log(data)
    addReposToCard(data)

  } catch (error) {
    createErrorCard("Problem fetching repos") 
  }
}

function createErrorCard(msg){
  const cardHtml = `+
    <div class="card">
      <h1>${msg}</h1>
    </div>
  `;
  mainEl.innerHTML = cardHtml;
}

function createUserCard0(user){
  const userId =  user?.name || user?.login
  const userBio = user.bio ? `<p>${user.bio}</p>` : ''

  const cardHtml = `
    <div class="card">
      <section>
        <img src="${user?.avatar_url} alt="${user?.name} class="avatar"/>
      </section>
      <section class="user-info">
        <h2>${userId}</h2>
        ${userBio}
        <ul>
          <li>${user?.followers}</li><strong>Followers</strong>
          <li>${user?.following}</li><strong>Following</strong>
          <li>${user?.public_repos}</li><strong>Repos</strong>
        </ul>
        <div id="repos"></div>
      </section>
    </div>
  `;

  mainEl.innerHTML = cardHtml;
}

function addReposToCard(repos){
  const reposEl = document.getElementById('repos')

  repos.slice(0, 5).forEach(repo => {
    const repoEl = document.createElement("a")
    repoEl.classList.add('repo')
    repoEl.href = repo.html_url
    repoEl.target = '_blank'
    repoEl.innerText = repo.name

    reposEl.appendChild(repoEl)

  });
}

formEl.addEventListener("submit", (e) =>{
  e.preventDefault()

  const user = searchEl.value

  if(user){
    getUser(user)
    searchEl.value = ''
    createUserCard0(data)
  }
})


getUser('facebook')