async function getQuote() {
  const res = await fetch("https://zenquotes.io/api/random");
  const output = await res.json();
}

async function getData() {
  const res = await fetch("https://zenquotes.io/api/random");
  const output = await res.json();
}
