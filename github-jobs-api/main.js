const output = document.getElementById("output");

async function getJobs() {
  const res = await fetch(
    "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"
  );

  const output = await res.json();
  // output.setHeader("Access-Control-Allow-Origin", "*");
  showJobs(output);
}

function showJobs(jobs) {
  jobs.forEach((job) => {
    const { created_at, type, location, title, company_logo, company } = job;
    output.innerHTML += `
   
    <div class="job" id="job">
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
  });
}
getJobs();

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
