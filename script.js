// variable for toggle button
const menuButton = document.querySelector('.menu-toggle')

// variable for the nav element
const nav = document.querySelector('nav')

console.log(nav)
console.log(menuButton)

// function, which listens for user clicking menu

// when user clicks, add open class to nav element

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open')
})

// github fetch request

fetch('https://api.github.com/users/justuscolby/repos')
  .then((response) => response.json())
  .then((data) => {
    // sort by date
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    //   limit # of repos to 6
    const limitedData = data.slice(0, 6)

    // repositories container variable, where they will be held on page
    const reposContainer = document.getElementById('reposContainer')

    // loop through the repos, grap properties
    for (let i = 0; i < limitedData.length; i++) {
      const repo = limitedData[i]

      const repoInfoDiv = document.createElement('div')
      // add class
      repoInfoDiv.classList.add('repo-info')
      // add html
      repoInfoDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p class="desc">${repo.description || ''}</p>
        <ul id="language-${repo.name}"></ul>
        <a href="${repo.html_url}" target="_blank">View on Github &rarr;</a>

      `

      reposContainer.appendChild(repoInfoDiv)

      fetch(repo.languages_url)
        .then((response) => response.json())
        .then((languagesData) => {
          const languagesList = document.getElementById(`language-${repo.name}`)

          Object.keys(languagesData).forEach((language) => {
            const newLanguageEl = document.createElement('li')
            newLanguageEl.textContent = language
            languagesList.appendChild(newLanguageEl)
          })
        })
    }
  })
  .catch((error) => {
    console.error(error)
  })
