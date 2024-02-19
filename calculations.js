// Функція для отримання поточної дати та часу у форматі "день.місяць.рік година:хвилина:секунда"
function getCurrentDateTime() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
const startTime = new Date();

console.log("Початок виконання:", getCurrentDateTime());
// ########## Початок обчислень ##########

const fs = require("fs");
const fileName = "10m.txt";
const data = fs.readFileSync(fileName, "utf8").split("\n").map(Number);
console.log(data);

// ########## Кінець обчислень ##########
const endTime = new Date();
const executionTime = (endTime - startTime) / 1000;

console.log("Завершення виконання:", getCurrentDateTime());
console.log("Час виконання (секунди):", executionTime);
