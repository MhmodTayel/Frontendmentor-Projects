const container = document.getElementById('container')
const search = document.getElementById('search')
const selectCountries = document.getElementById('select-countries')
const toggle = document.getElementById('toggle')
const body = document.querySelector('body');
// EventListeners

search.addEventListener('input',searchCountry)
selectCountries.addEventListener('change',searchRegion)
toggle.addEventListener('click',toggleMode)
getCountries()



// Functions

async function getCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const output =  await res.json()
  showCountries(output)
}

function showCountries(countries) {
  countries.forEach(countery => {
    container.innerHTML += `
    <div class="country">
    <div class="flag">
      <img src=${countery.flag} alt="" />
    </div>
    <div class="info">
      <h1>${countery.name}</h1>
      <div class="countery-info">
        <p>Population: <span id="population">${countery.population}</span></p>

        <p>Region: <span id="region">${countery.region}</span></p>

        <p>Capital: <span id="capital">${countery.capital}</span></p>
      </div>
    </div>
  </div>
    
    `
  });
}

async function searchCountry() {
 
  const name = search.value;
  if (name !== '') {
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    const output =  await res.json()
    container.innerHTML = ''
    showCountries(output)
  }
}

async function searchRegion() {
 
  const region = selectCountries.value;
  if (region !== 'All') {
    const res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    const output =  await res.json()
    container.innerHTML = ''
    showCountries(output)
  }
}

function toggleMode() {
  body.classList.toggle('dark')
  if (body.classList.contains('dark')) {
    toggle.innerHTML = `
    
    <i class="far fa-sun" style="color:#FDB813"></i> Light Mode
    
    `
  }else {
    toggle.innerHTML = `
    
    <i class="far fa-moon"></i> Dark Mode
    
    `
  }
} 




























