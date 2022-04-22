const cant = process.argv[2];
const random = {};
for (let i = 0; i < cant; i++) {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  if (random[randomNumber]) {
    random[randomNumber] += 1;
  } else {
    random[randomNumber] = 1;
  }
}
process.send(random);
process.exit(0);
