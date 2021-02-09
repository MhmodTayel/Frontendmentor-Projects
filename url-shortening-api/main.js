const URLInput = document.getElementById("url-input");
const shortenBtn = document.getElementById("shorten");
const alert = document.getElementById("alert");
const output = document.getElementById("output");
const wrapper = document.getElementById("wrapper");
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
    shortenBtn.disabled = true;
    shortenBtn.style.cursor = "not-allowed";
    wrapper.classList.add("active");
    getURL(input);
  } else {
    wrapper.classList.remove("active");
    shortenBtn.innerHTML = ' Shorten It! <i class="fas fa-link"></i>';
    Swal.fire({
      icon: "error",
      title: "Enter a valid URL",
    });
  }
  e.preventDefault();
}

function showURL(data) {
  wrapper.classList.remove("active");

  Swal.fire({
    icon: "success",
    title: "The URL has been shorten",
    showConfirmButton: false,
    timer: 1500,
  });
  shortenBtn.disabled = false;
  shortenBtn.style.cursor = "pointer";
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
