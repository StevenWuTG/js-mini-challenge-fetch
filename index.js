// element queries
const name = document.querySelector(".player h2");
const nickName = document.querySelector("em");
const likes = document.querySelector(".likes");
const heart = document.querySelector(".like-button");
const photo = document.querySelector("img");
const goalsUl = document.querySelector("ul");
const form = document.querySelector("form#new-goal-form");
const player = document.querySelector(".player");

//initial Fetch
function getData() {
  return fetch("http://localhost:3000/players/1")
    .then((response) => response.json())
    .then((data) => {
      loadData(data);
    });
  // console.log(data)
}
getData();

function renderGoal(element) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const a = document.createElement("a");

  p.textContent = element.description;
  a.href = element.link;
  a.textContent = element.link;

  li.append(a);
  li.append(p);
  goalsUl.append(li);
}

// player load
function loadData(playerObj) {
  // debugger
  player.id = playerObj.id;

  nickName.textContent = playerObj.nickname;
  name.textContent = playerObj.name;
  likes.textContent = playerObj.likes;
  photo.src = playerObj.photo;
  const goalsArray = playerObj.goals;
  goalsArray.forEach((element) => {
    renderGoal(element);
    // const li = document.createElement("li");
    // const p = document.createElement("p");
    // const a = document.createElement("a");

    // p.textContent = element.description;
    // a.href = element.link;
    // a.textContent = element.link;

    // li.append(a);
    // li.append(p);
    // goalsUl.append(li);
  });
}

heart.addEventListener("click", function (e) {
  fetch("http://localhost:3000/players/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: `${parseInt(likes.textContent) + 1}`,
    }),
  })
    .then((resp) => resp.json())
    .then((updatedLikes) => {
      likes.textContent = `${updatedLikes.likes} Likes`;
    });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newGoal = {
    playerId: parseInt(player.id),
    link: e.target.link.value,
    description: e.target.description.value,
  };
  debugger;

  fetch("http://localhost:3000/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGoal),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
    });

  renderGoal(newGoal);
});
