const output = document.getElementById("output");
const filterDescription = document.getElementById("search-job");
const filterLocation = document.getElementById("filter-job");
const searchBtn = document.getElementById("submit");
const fullTimeCheck = document.getElementById("full");
const loadBtn = document.getElementById("load");
loadBtn.style.display = "none";
const API = "https://jobs.github.com/positions.json";
getJobs(API);
async function getJobs(api) {
  const res = await fetch(api);

  const data = await res.json();
  // data.setHeader("Access-Control-Allow-Origin", "*");
  showJobs(data);
}

function showJobs(jobs) {
  jobs.forEach((job, idx) => {
    const { created_at, type, location, title, company_logo, company } = job;
    output.innerHTML += `
   
    <div class="job" id="job" style="display: ${idx < 12 ? "block" : "none"}">
    <div class="logo">
      <img src="${company_logo}" alt="" />
    </div>
    <p class="job-details">${calculateDate(
      created_at
    )} ago <span class="big">.</span> ${type}</p>
    <p class="job-title">${title}</p>
    <p class="job-company">${company}</p>
    <p class="job-locations">${location}</p>
  </div>
   
    `;
    if (idx < 12) {
      loadBtn.style.display = "none";
    } else {
      loadBtn.style.display = "block";
    }
  });

  loadBtn.addEventListener("click", () => {
    document.querySelectorAll(".job").forEach((job) => {
      job.style.display = "block";
    });
    loadBtn.style.display = "none";
  });
}

function calculateDate(created_at) {
  var now = new Date();
  var createdAt = new Date(created_at);

  var seconds = Math.floor((now - createdAt) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  if (days > 1) {
    return `${days}d`;
  } else if (days < 1 && hours > 1) {
    return `${hours}h`;
  } else if (hours < 1 && minutes > 1) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

output.addEventListener("click", (e) => {
  const job = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("job");
    } else {
      return false;
    }
  });

  if (job) {
    console.log("job");
  }
});

searchBtn.addEventListener("click", filterJobs);

function filterJobs(e) {
  output.innerHTML = "";
  const description = filterDescription.value;
  const location = filterLocation.value;
  const fullTime = fullTimeCheck.checked;
  console.log(description, location, fullTime);
  getJobs(
    `https://jobs.github.com/positions.json?description=${description}&full_time=${fullTime}&location=${location}`
  );
  e.preventDefault();
}
