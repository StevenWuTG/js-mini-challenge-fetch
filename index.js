
// element queries
const name = document.querySelector(".player h2")
const nickName = document.querySelector("em")
const likes = document.querySelector(".likes")
const heart = document.querySelector(".like-button")
const photo = document.querySelector("img")
const goalsUl = document.querySelector("ul")
const form = document.querySelector("form#new-goal-form")


//initial Fetch
function getData(){
    return fetch('http://localhost:3000/players/1')
    .then(response => response.json())
    .then(data => { loadData(data) }) 
    // console.log(data)
}
getData()


// player load
function loadData (player) {
    // debugger
    nickName.textContent = player.nickname
    name.textContent = player.name
    likes.textContent = player.likes
    photo.src = player.photo
    const goalsArray = player.goals
    goalsArray.forEach(element => {
        const li = document.createElement("li")
        const p = document.createElement("p")
        const a = document.createElement("a")
        
        p.textContent = element.description
        a.href = element.link
        a.textContent = element.link

        li.append(a)
        li.append(p)
        goalsUl.append(li)
    })
}


heart.addEventListener("click", function(e){
    fetch("http://localhost:3000/players/1", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: `${parseInt(likes.textContent) + 1}`
        })
    })
    .then(resp => resp.json())
    .then(updatedLikes => {
        
        likes.textContent = `${updatedLikes.likes} Likes` 
    })
})