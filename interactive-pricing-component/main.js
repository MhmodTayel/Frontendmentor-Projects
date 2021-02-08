const slider = document.getElementById("slider");
const priceEl = document.querySelector(".price");
const pageViewsEl = document.querySelector(".page-views");

let pageViewToPrice = [
  {
    pageViews: "10K",
    price: 8.00,
  },
  {
    pageViews: "50K",
    price: 12.00,
  },
  {
    pageViews: "100K",
    price: 16.00,
  },
  {
    pageViews: "500K",
    price: 24.00,
  },
  {
    pageViews: "1M",
    price: 35.00,
  },
];

slider.addEventListener("input", () => {
  let value = slider.value;
  slider.style.background = `linear-gradient(to right, #10d5c2 ${value}%, #ebf2fc ${value}% 100%)`;

  if (slider.value == 0) {
    pageViewsEl.innerHTML = pageViewToPrice[0].pageViews;
    priceEl.innerHTML = pageViewToPrice[0].price;
  }

  if (slider.value == 25) {
    pageViewsEl.innerHTML = pageViewToPrice[1].pageViews;
    priceEl.innerHTML = pageViewToPrice[1].price;
  }

  if (slider.value == 50) {
    pageViewsEl.innerHTML = pageViewToPrice[2].pageViews;
    priceEl.innerHTML = pageViewToPrice[2].price;
  }

  if (slider.value == 75) {
    pageViewsEl.innerHTML = pageViewToPrice[3].pageViews;
    priceEl.innerHTML = pageViewToPrice[3].price;
  }

  if (slider.value == 100) {
    pageViewsEl.innerHTML = pageViewToPrice[4].pageViews;
    priceEl.innerHTML = pageViewToPrice[4].price;
  }
});
