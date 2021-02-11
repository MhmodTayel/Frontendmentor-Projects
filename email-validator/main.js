async function getData() {
  const res = await fetch(
    `https://api.mailboxvalidator.com/v1/validation/single?email=${email}&key=1MA8C2LTZASZQGV6ZA78&format=json`
  );
  const output = await res.json();
  showOutput(output);
}
