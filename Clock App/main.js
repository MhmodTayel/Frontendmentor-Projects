const refresh = document.getElementById("refresh");
const quote = document.getElementById("quote");
const extraData = document.getElementById("extra-data");
const moreBtn = document.getElementById("more");
// EventListeners
refresh.addEventListener("click", refreshQuote);
moreBtn.addEventListener("click", toggle);

// functions
async function getQuote() {
  const res = await fetch("https://zenquotes.io/api/random");
  const output = await res.json();
}

async function getData() {
  const res = await fetch("https://zenquotes.io/api/random");
  const output = await res.json();
}

function refreshQuote() {
  refresh.classList.add("rotate");
  setTimeout(() => {
    refresh.classList.remove("rotate");
  }, 1000);
}

function toggle() {
  quote.classList.toggle("hide");
  extraData.classList.toggle("active");

  if (quote.classList.contains("hide")) {
    moreBtn.innerHTML =
      'Less  <img src="./assets/desktop/icon-arrow-up.svg" alt="" />';
    moreBtn.classList.add("down");
  } else {
    moreBtn.innerHTML =
      'More  <img src="./assets/desktop/icon-arrow-up.svg" alt="" />';
    moreBtn.classList.remove("down");
  }
}
