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

  if (arrayLength % 2 === 0) {
    const index1 = arrayLength / 2 - 1;
    const index2 = arrayLength / 2;
    return (dataSort[index1] + dataSort[index2]) / 2;
  } else {
    const index = Math.floor(arrayLength / 2);
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

//5. Пошук найбільшої послідовністі чисел в файлі, яка збільшується
// Послідовність чисел - це порядок чисел у файлі, що йдуть один за одним.
// Навіть випадкові генеровані набори даних можуть мати досить довгі послідовності.
// Наприклад, зростаюча послідовність може виглядати так: -4390, -503, 3, 16, 5032
const findIncSequence = (data) => {
  let maxSequence = [];
  let currentSequence = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0 || data[i] > data[i - 1]) {
      currentSequence.push(data[i]);
    } else {
      if (currentSequence.length > maxSequence.length) {
        maxSequence = currentSequence.slice();
      }
      currentSequence = [data[i]];
    }
  }
  if (currentSequence.length > maxSequence.length) {
    maxSequence = currentSequence;
  }
  return maxSequence;
};

//6. Пошук найбільшої послідовністі чисел в файлі, яка зменьшується
const findDecSequence = (data) => {
  let maxSequence = [];
  let currentSequence = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0 || data[i] < data[i - 1]) {
      currentSequence.push(data[i]);
    } else {
      if (currentSequence.length > maxSequence.length) {
        maxSequence = currentSequence.slice();
      }
      currentSequence = [data[i]];
    }
  }
  if (currentSequence.length > maxSequence.length) {
    maxSequence = currentSequence;
  }
  return maxSequence;
};

console.log("Найбільше число : ", findMaxNumber(data));
console.log("Найменше число : ", findMinNumber(data));
console.log("Медіана чисел : ", findMedian(data));
console.log("Середнє арифметичне значення чисел : ", calculateAverage(data));
console.log(
  "Найбільша послідовність чисел в файлі, яка збільшується : ",
  findIncSequence(data)
);
console.log(
  "Найбільша послідовність чисел в файлі, яка зменьшується : ",
  findDecSequence(data)
);

// ########## Кінець обчислень ##########
const endTime = new Date();
const executionTime = (endTime - startTime) / 1000;

console.log("Завершення виконання:", getCurrentDateTime());
console.log("Час виконання (секунди):", executionTime);
