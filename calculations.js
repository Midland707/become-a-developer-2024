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
const data = fs
  .readFileSync(fileName, "utf8")
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map(Number);

//1. Пошук максимального числа в файлі
const findMaxNumber = (data) => {
  let maxNumber = 0;
  data.forEach((number) => {
    if (number > maxNumber) {
      maxNumber = number;
    }
  });
  return maxNumber;
};

//2. Пошук мінімального числа в файлі
const findMinNumber = (data) => {
  let minNumber = data[0];
  data.forEach((number) => {
    if (number < minNumber) {
      minNumber = number;
    }
  });
  return minNumber;
};

//3. Пошук медіани файлу
// Необхідно відсортувати масив за зростанням - wikipedia.org.
// Якщо парна кількість елементів то шукаємо середній елемент набору чисел.
// Якщо в наборі чисел парна кількість елементів, то для визначення медіани повинна використовуватися півсума двох сусідніх значень.
// Тобто наприклад, у наборі { 1, 8, 14, 19 } медіаною буде 11(бо 0.5 * (8 + 14)=11).
const findMedian = (data) => {
  const dataSort = [...data];
  dataSort.sort((prev, next) => prev - next);

  const arrayLength = dataSort.length;
  console.log("Кількість елементів в масиві =", arrayLength);
  if (arrayLength % 2 === 0) {
    const index1 = arrayLength / 2 - 1;
    const index2 = arrayLength / 2;
    console.log("Середнє число 1 =", dataSort[index1]);
    console.log("Середнє число 2 =", dataSort[index2]);
    return (dataSort[index1] + dataSort[index2]) / 2;
  } else {
    const index = Math.floor(arrayLength / 2);
    console.log("Середнє число =", dataSort[index]);
    return dataSort[index];
  }
};

//4. Пошук середнього арифметичного в файлі
const calculateAverage = (data) => {
  let sum = 0;
  data.forEach((number) => {
    sum += number;
  });
  const averageNumber = sum / data.length;
  return averageNumber;
};

console.log("Найбільше число : ", findMaxNumber(data));
console.log("Найменше число : ", findMinNumber(data));
console.log("Медіана чисел : ", findMedian(data));
console.log("Середнє арифметичне значення чисел : ", calculateAverage(data));

// ########## Кінець обчислень ##########
const endTime = new Date();
const executionTime = (endTime - startTime) / 1000;

console.log("Завершення виконання:", getCurrentDateTime());
console.log("Час виконання (секунди):", executionTime);
