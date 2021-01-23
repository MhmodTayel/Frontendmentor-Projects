const output = document.getElementById("output");

async function getJobs() {
  const res = await fetch("https://jobs.github.com/positions");
  console.log(res);
  const output = await res.json();
  showJobs(output);
}

function showJobs(jobs) {
  jobs.forEach((job) => {
    const { created_at, type, location, title, company_logo, company } = job;
    console.log(created_at);
    output.innerHTML += `
    
    <div class="job" id="job">
    <div class="logo">
      <img src="assets/desktop/icon-location.svg" alt="" />
    </div>
    <p class="job-details">6h ago · Full Time</p>
    <p class="job-title">Software Engineer - Kuali Financials</p>
    <p class="job-company">Kuali.co</p>
    <p class="job-locations">Anywhere</p>
  </div>
    
    `;
  });
}
getJobs();
