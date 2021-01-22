const container = document.getElementById('container')
const search = document.getElementById('search')
const selectCountries = document.getElementById('select-countries')
const toggle = document.getElementById('toggle')
const body = document.querySelector('body');
const form = document.getElementById('form');
const countrySection = document.getElementById('country')

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
  countries.forEach(country => {
    container.innerHTML += `
    <div class="country" data-alpha3Code="${country.alpha3Code}">
    
    <div class="flag">
      <img src=${country.flag} alt="" />
    </div>
    <div class="info">
      <h1>${country.name}</h1>
      <div class="countrey-info">
        <p>Population: <span id="population">${country.population}</span></p>

        <p>Region: <span id="region">${country.region}</span></p>

        <p>Capital: <span id="capital">${country.capital}</span></p>
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

function countryInfo(country) {
  container.style.display='none'
  form.style.display='none'
  console.log(country);
  getCountry(country)
 
}

async function getCountry(alpha3Code) {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)

  const output = await res.json()
  showCountry(output)
}


function showCountry(country) {

  countrySection.innerHTML = `
  
  <div class="back">
        <a href="" class="btn-back"><i class="fas fa-chevron-left"></i>Back</a>

      </div>
      <div class="country-info">
        <div class="photo">
          <img src="${country.flag}" alt="">
        </div>
        <div class="data">
          <div class="name">${country.name}</div>
          <div class="details">
            <p>Native Name:<span>${country.nativeName}</span></p>
            <p>Population:<span>${country.population}</span></p>
            <p>Region:<span>${country.region}</span></p>
            <p>SubRegion:<span>${country.subregion}</span></p>
            <p>Capital:<span>${country.capital}</span></p>
            <p>Top Level Domain: <span>${country.topLevelDomain}</span></p>
            <p>currencies: <span id="currencies" ></span></p>
            <p>Languages:<span id="languages"></span></p>
          </div>
          <div class="tags">
            <h2>Borders Countries:</h2>

          </div>
        </div>
      </div>
  
  `
  const borders = country.borders
  const currencies = country.currencies
  const languages = country.languages
  const currenciesEl = document.getElementById('currencies')
  const languagesEl = document.getElementById('languages')
  const tags = document.querySelector('.tags')
  currencies.forEach(item => {
    currenciesEl.innerHTML += `${item.name}, `
  })

  languages.forEach(item => {
    languagesEl.innerHTML += `${item.name}, `
  })
  borders.forEach(border => {
    tags.innerHTML += `<span class="borders">${border}</span>`
  })
}

container.addEventListener("click", (e) => {
  const country = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("country");
    } else {
      return false;
    }
  });

  if (country) {
    const alpha3Code = country.getAttribute("data-alpha3Code");
    countryInfo(alpha3Code);
  }
});







/*

<div class="back">
        <a href="" class="btn-back"><i class="fas fa-chevron-left"></i>Back</a>

      </div>
      <div class="country-info">
        <div class="photo">
          <img src="css/flag.png" alt="">
        </div>
        <div class="data">
          <div class="name">Egypt</div>
          <div class="details">
            <p>Native Name:<span>dd</span></p>
            <p>Population:<span>dd</span></p>
            <p>Region:<span>dd</span></p>
            <p>SubRegion:<span>dd</span></p>
            <p>Capital:<span>dd</span></p>
            <p>Top Level Domain: <span>dd</span></p>
            <p>currencies<span>dd</span></p>
            <p>Languages:<span>dd</span></p>
          </div>
          <div class="tags">
            <h2>Borders Countries:</h2>
            <span class="borders">ddd</span>
            <span class="borders">dddd</span>
            <span class="borders">ddd</span>
            <span class="borders">ddd</span>
            <span class="borders">ddd</span>
          </div>
        </div>
      </div>
*/
















