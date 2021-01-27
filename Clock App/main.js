async function getData() {
  const res = await fetch("http://worldtimeapi.org/api/ip");
  const output = await res.json();
  console.log(output);
}
getData();
