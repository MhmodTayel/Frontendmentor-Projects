const output = document.getElementById("output");
const filterDescription = document.getElementById("search-job");
const filterLocation = document.getElementById("filter-job");
const searchBtn = document.getElementById("submit");
const fullTimeCheck = document.getElementById("full");
const loadBtn = document.getElementById("load");
loadBtn.style.display = "none";
const animated_bgs = document.querySelectorAll(".animated-bg");
const animated_bg_texts = document.querySelectorAll(".animated-bg-text");
const toggle = document.getElementById("toggle");
const container = document.querySelector(".container");
const singleJob = document.getElementById("single-job");
const API = "https://jobs.github.com/positions.json";
getJobs(API);
async function getJobs(api) {
  const res = await fetch(api);
  const data = await res.json();
  // data.setHeader("Access-Control-Allow-Origin", "*");
  output.innerHTML = "";
  showJobs(data);
}

function showJobs(jobs) {
  jobs.forEach((job, idx) => {
    const {
      created_at,
      type,
      location,
      title,
      company_logo,
      company,
      id,
    } = job;
    output.innerHTML += `
   
    <div class="job" id="job" style="display: ${idx < 12 ? "block" : "none"}"
    data-id="${id}">
    <div class="logo" >
      <img src="${company_logo}" alt="" />
    </div>
    <p class="job-details">${calculateDate(
      created_at
    )} ago <span class="big">.</span> ${type}
    
    </p>
    <p class="job-title">${title}
    
    </p>
    <p class="job-company">${company}
    
    </p>
    <p class="job-locations">${location}
    
    </p>
  </div>
   
    `;
    animated_bgs.forEach((bg) => {
      bg.classList.remove("animated-bg");
    });
    animated_bg_texts.forEach((bg) => {
      bg.classList.remove("animated-bg-text");
    });
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
    let jobId = job.getAttribute("data-id");
    getJobDetails(jobId);
  }
});

async function getJobDetails(jobId) {
  container.innerHTML = "";
  const res = await fetch(`https://jobs.github.com/positions/${jobId}.json`);
  const output = await res.json();
  showJobDetails(output);
}

function showJobDetails(output) {
  const {
    type,
    url,
    created_at,
    company,
    company_url,
    location,
    title,
    description,
    how_to_apply,
    company_logo,
  } = output;

  singleJob.innerHTML = `
  
  <div class="single-heading">
        <div class="logo">
          <img src="${company_logo}" alt="" />
        </div>
        <div class="details">
          <h2>${company}</h2>
          <p>${location}</p>
        </div>
        <div class="site">
          <a href="${company_url}" class="apply" target="_blank">Company Site</a>
        </div>
      </div>
      <div class="single-output">
        <div class="output-header">

          <div class="job-data">
            
            
              <p class="job-details">${calculateDate(
                created_at
              )} ago <span class="big">.</span> ${type}
    
    </p>
            
            <p class="job-title">
            ${title}
              
            </p>
            <p class="job-locations">
            ${location}
              
            </p>
          </div>
          <a class="apply" href="${url}" target="_blank">Apply Now</a>
        </div>
        <div class="description">${description}</div>
        <div class="how-to-apply">${how_to_apply}</div>
      </div>

  `;

  document
    .querySelector(".description")
    .querySelectorAll("p")
    .forEach((text) => {
      if (text.innerText.length < 40) {
        text.classList.add("text-header");
      }
    });
}

searchBtn.addEventListener("click", filterJobs);

const template = `
<div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>
<div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>       <div class="job" id="job">
<div class="logo animated-bg" >
  <img src="" alt="" />
</div>
<p class="job-details">

<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-title">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-company">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
<p class="job-locations">
<span class="animated-bg animated-bg-text">&nbsp;</span>
</p>
</div>
`;
function filterJobs(e) {
  console.log(template);
  output.innerHTML = template;

  const description = filterDescription.value;
  const location = filterLocation.value;
  const fullTime = fullTimeCheck.checked;
  console.log(description, location, fullTime);
  getJobs(
    `https://jobs.github.com/positions.json?description=${description}&full_time=${fullTime}&location=${location}`
  );
  e.preventDefault();
}

toggle.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("dark");
});
