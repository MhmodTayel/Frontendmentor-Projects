const container = document.getElementById('container')




getCountries()









// Functions




async function getCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const output =  await res.json()
  showCountries(output)
  console.log(output);
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


































/* 
      <div class="country">
        <div class="flag">
          <img src="css/flag.png" alt="" />
        </div>
        <div class="info">
          <h1>Country Name</h1>
          <div class="countery-info">
            <p>Population: <span id="population">40,400,000</span></p>

            <p>Region: <span id="region">Africa</span></p>

            <p>Capital: <span id="capital">Algiers</span></p>
          </div>
        </div>
      </div>

*/