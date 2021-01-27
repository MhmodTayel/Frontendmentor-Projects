const refresh = document.getElementById("refresh");
const quote = document.getElementById("quote");
const extraData = document.getElementById("extra-data");
const moreBtn = document.getElementById("more");
const blockquote = document.getElementById("blockquote");
const display = document.getElementById("display");
const container = document.getElementById("container");

// Loading Phase

const loader = document.querySelector(".loader-container");

setTimeout(() => {
  loader.style.display = "none";
}, 3000);

// EventListeners

moreBtn.addEventListener("click", toggle);
refresh.addEventListener("click", refreshQuote);
getQuote();
getTime();
// functions
function getQuote() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      showQuote(data);
    });
}
function getTime() {
  fetch("http://worldtimeapi.org/api/ip")
    .then((response) => response.json())
    .then((data) => {
      showTime(data);
    });
}
let locationData = {};
async function getLocation() {
  const res = await fetch("http://freegeoip.app/json/");
  const output = await res.json();
  locationData = output;
}
getLocation();
function refreshQuote() {
  refresh.classList.add("rotate");
  setTimeout(() => {
    refresh.classList.remove("rotate");
  }, 1000);
  getQuote();
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

  container.classList.toggle("shrink");
}

function showQuote(quoteData) {
  blockquote.innerHTML = `
  &ldquo;${quoteData.content}&rdquo; &mdash;
  <footer>${quoteData.author}</footer>
`;
}

function showTime(timeData) {
  let { time, amPm } = calculateTime(timeData.utc_datetime);

  display.innerHTML = `
  <div class="times-of-day">
  <img src="assets/desktop/icon-sun.svg" alt="" id="sun-moon" />
  <p><span id="am-pm"> Good ${
    amPm === "AM" ? "morning" : "evening"
  }, </span>IT’S CURRENTLY</p>
</div>
<div class="time">
  <p class="time-output">
    ${time} <span class="abbreviation">${timeData.abbreviation}</span>
  </p>
  <div class="location">
  in ${locationData.region_name}, ${locationData.country_name}
  </div>
</div>

  `;
  const sunMoon = document.getElementById("sun-moon");
  extraData.innerHTML = `
  
  <div class="timezone">
  <p>CURRENT TIMEZONE</p>
  <h2>${timeData.timezone}</h2>
</div>
<div class="day-year">
  <p>DAY OF THE YEAR</p>
  <h2>${timeData.day_of_year}</h2>
</div>
<div class="day-week">
  <p>DAY OF THE WEEK</p>
  <h2>${timeData.day_of_week + 2}</h2>
</div>
<div class="week-number">
  <p>WEEK NUMBER</p>
  <h2>${timeData.week_number}</h2>
</div>
  
  `;

  if (amPm === "AM") {
    sunMoon.src = "assets/desktop/icon-sun.svg";
    container.classList.remove("night");
  } else {
    container.classList.add("night");
    sunMoon.src = "assets/desktop/icon-moon.svg";
  }
}

function calculateTime(time) {
  var timeNow = new Date(time);
  var hours = timeNow.getHours();
  var minutes = timeNow.getMinutes();
  var seconds = timeNow.getSeconds();
  var timeString = "" + (hours > 12 ? hours - 12 : hours);
  timeString += (minutes < 10 ? ":0" : ":") + minutes;
  var amPm = hours >= 12 ? "PM" : "AM";
  return {
    time: timeString,
    amPm: amPm,
  };
}
setInterval(refreshQuote, 20000);

setInterval(getTime, 1000);
