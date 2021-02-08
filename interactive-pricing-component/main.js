const slider = document.getElementById("slider");
const checkbox = document.getElementById("checkbox");
const priceEl = document.querySelector(".price");
const pageViewsEl = document.querySelector(".page-views");

let pageViewToPrice = [
  {
    pageViews: "10K",
    price: 8.0,
  },
  {
    pageViews: "50K",
    price: 12.0,
  },
  {
    pageViews: "100K",
    price: 16.0,
  },
  {
    pageViews: "500K",
    price: 24.0,
  },
  {
    pageViews: "1M",
    price: 35.0,
  },
];

slider.addEventListener("input", () => {
  let value = slider.value;
  slider.style.background = `linear-gradient(to right, #10d5c2 ${value}%, #ebf2fc ${value}% 100%)`;

  if (slider.value == 0) {
    pageViewsEl.innerHTML = pageViewToPrice[0].pageViews;
    priceEl.innerHTML = pageViewToPrice[0].price.toFixed(2);
  }

  if (slider.value == 25) {
    pageViewsEl.innerHTML = pageViewToPrice[1].pageViews;
    priceEl.innerHTML = pageViewToPrice[1].price.toFixed(2);
  }

  if (slider.value == 50) {
    pageViewsEl.innerHTML = pageViewToPrice[2].pageViews;
    priceEl.innerHTML = pageViewToPrice[2].price.toFixed(2);
  }

  if (slider.value == 75) {
    pageViewsEl.innerHTML = pageViewToPrice[3].pageViews;
    priceEl.innerHTML = pageViewToPrice[3].price.toFixed(2);
  }

  if (slider.value == 100) {
    pageViewsEl.innerHTML = pageViewToPrice[4].pageViews;
    priceEl.innerHTML = pageViewToPrice[4].price.toFixed(2);
  }
});

checkbox.addEventListener("input", () => {
  let temp = priceEl.innerHTML;
  if (checkbox.checked) {
    priceEl.innerHTML = (+priceEl.innerHTML * 0.75).toFixed(2);
  } else {
    priceEl.innerHTML = pageViewToPrice[slider.value / 25].price.toFixed(2);
  }
});
