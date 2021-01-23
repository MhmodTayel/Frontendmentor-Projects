// Get Elements
const input = document.getElementById("input");
const searchBtn = document.getElementById("search-btn");
const output = document.getElementById("output");
const mapEl = document.getElementById("map");

searchBtn.addEventListener("click", searchIP);

function searchIP(e) {
  const IP = input.value;
  getGEO(IP);
  e.preventDefault();
}

async function getGEO(IP) {
  const res = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_GFFIbsxct4sPdHp29PDcgNOFkMX20&ipAddress=${IP}`
  );

  const output = await res.json();
  const ip = output.ip;
  const region = output.location.region;
  const timezone = output.location.timezone;
  const provider = output.as.name;
  const country = output.location.country;
  const lat = output.location.lat;
  const lng = output.location.lng;

  showOutput(ip, region, timezone, provider, country);
  showMap(lat, lng, ip);
}

function showMap(lat, lng, ip) {
  mapEl.innerHTML = '<div id="mapid"></div>';
  let mymap = L.map("mapid").setView([lat, lng], 13);
  let marker = L.marker([lat, lng]).addTo(mymap);
  marker.bindPopup(ip).openPopup();

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoibWhtb2R0YXllbCIsImEiOiJja2s4dDFtd3kwcjF1MnBueDZ2ZTVjejlhIn0.LGV-zcABzaUSBOKYfWC0rA",
    }
  ).addTo(mymap);
}

function showOutput(ip, region, timezone, provider, country) {
  output.innerHTML = `
  
  <ul class="output-card">
        <li class="item">
          <h2>IP ADDRESS
          </h2>
          <p>${ip}

          </p>
        </li>
        <li class="item">
          <h2>LOCATION</h2>
          <p>${region}</p>
        </li>
        <li class="item">
          <h2>TIMEZONE</h2>
          <p>${timezone}

          </p>
        </li>
        <li class="item">
          <h2>Provider</h2>
          <p>${provider}</p>
        </li>
        <li class="item">
          <h2>Country</h2>
          <div class="country">

            <img src="./images/favicon-32x32.png" alt="">
          </div>
        </li>
      </ul>
  
  `;
}

// Display Map
