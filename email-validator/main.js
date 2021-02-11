const input = document.getElementById("input");
const inputBtn = document.getElementById("input-btn");
const outputData = document.getElementById("output-data");
const outputInfo = document.getElementById("output-info");
const loading = document.getElementById("loading");
inputBtn.addEventListener("click", () => {
  let email = input.value;
  if (!email) {
    Swal.fire({
      icon: "error",
      title: "Please, Enter an Email..",
    });
  } else {
    loading.classList.add("active");
    getData(email);
  }
});
async function getData(email) {
  const res = await fetch(
    `https://api.mailboxvalidator.com/v1/validation/single?email=${email}&key=1MA8C2LTZASZQGV6ZA78&format=json`
  );
  const output = await res.json();
  showOutput(output);
}

function showOutput(data) {
  loading.classList.remove("active");
  setTimeout(() => {
    outputData.innerHTML = "";
    outputInfo.innerHTML = "";
    input.value = "";
    Swal.fire({
      icon: "success",
      title: "Email has been checked",
      showConfirmButton: false,
      timer: 1500,
    });
  }, 200);
  setTimeout(() => {
    Object.keys(data)
      .filter((key) => key.includes("is"))
      .forEach((item) => {
        outputData.innerHTML += `
    <div class="output-data-item">
    <i class="fas fa-${
      data[item] == "True" ? "check" : "times"
    }-circle" style="color:${
          data[item] == "True" ? "#2ecc71" : "#e74c3c"
        } "></i>
    <p>${changeName(item.replace(/is_+|[_]+/g, ""))}</p>
  </div>
    
    `;
      });

    outputInfo.innerHTML = `
      
    <i class="far fa-${
      data["is_verified"] == "True" ? "check" : "times"
    }-circle" style="color:${
      data["is_verified"] == "True" ? "#2ecc71" : "#e74c3c"
    } "></i>
    <h2>This email address is <span class="state" style="color:${
      data["is_verified"] == "True" ? "#2ecc71" : "#e74c3c"
    } ">${data["is_verified"] == "True" ? "VALID" : "INVALID"}</span></h2>
    
    `;
  }, 1000);
}

function changeName(item) {
  if (item.includes("free")) {
    item = "Free Email";
  } else if (item.includes("role")) {
    item = "Role Email";
  } else if (item.includes("domain")) {
    item = "Domain Exist";
  } else if (item.includes("catch")) {
    item = "Catch-all";
  } else if (item.includes("down")) {
    item = "Server Status";
  } else if (item.includes("risk")) {
    item = " High risk";
  } else {
    item = item;
  }

  return item.charAt(0).toUpperCase() + item.slice(1);
}
