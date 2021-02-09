const URLInput = document.getElementById("url-input");
const shortenBtn = document.getElementById("shorten");
const alert = document.getElementById("alert");
const output = document.getElementById("output");

async function getURL(URL) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${URL}`);
  const output = await res.json();
  showURL(output);
}

shortenBtn.addEventListener("click", shortenURL);

function shortenURL(e) {
  shortenBtn.innerHTML = `Shortening ... <i class="fas fa-cogs"></i>`;
  let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let regex = new RegExp(expression);
  let input = URLInput.value;
  if (input.match(regex)) {
    getURL(input);
  } else {
    URLInput.classList.add("wrong");
    alert.classList.add("active");
    setTimeout(() => {
      URLInput.classList.remove("wrong");
      alert.classList.remove("active");
      URLInput.value = "";
    }, 3000);
  }
  e.preventDefault();
}

function showURL(data) {
  shortenBtn.innerHTML = ` Shorten It! <i class="fas fa-link"></i>`;
  URLInput.value = "";
  if (data.ok) {
    output.innerHTML += `
    
    <div class="url-output">
    <div class="in"><span>${data.result.original_link}</span></div>
    <div class="out">
      <input class="shorten-url" value="${data.result.short_link}" readonly>  <i class="copy far fa-clipboard "></i>
    </div>
  </div>
    
    `;

    const copys = document.querySelectorAll(".copy");
    copys.forEach((copy) => {
      copy.addEventListener("click", (e) => {
        let test = e.target.parentElement.children[0];
        test.select();
        document.execCommand("copy");
      });
    });
  }
}
