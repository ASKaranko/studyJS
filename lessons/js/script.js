let money = 1000,
  income = "Фриланс",
  addExpenses = "продукты, транспорт, коммуналка, Интернет",
  deposit = true,
  mission = 6000,
  period = 6,
  budgetDay;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(", "));

budgetDay = money / 30;
console.log("budget per day", budgetDay);

// Ответы по уроку номер 3

money = +prompt("Какой ваш месячный доход?", "1000");
if (money !== money) {
  confirm("Введите ответ в виде числа");
  money = +prompt("Какой ваш месячный доход?", "1000");
}

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "Кварплата, проездной, кредит");

deposit = confirm("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов номер 1?", "Кварплата");
let amount1 = +prompt("Во сколько это обойдется?", "100");
let expenses2 = prompt("Введите обязательную статью расходов номер 2?", "Интернет");
let amount2 = +prompt("Во сколько это обойдется?", "50");

let budgetMonth = money - (amount1 + amount2);
console.log("Бюджет на месяц", budgetMonth);

period = Math.ceil(mission / budgetMonth);
console.log("Ваша цель будет достигнута через " + period + " месяцев");

budgetDay = Math.floor(budgetMonth / 30);
console.log("Ваш бюджет на день", budgetDay);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if(budgetDay < 1200 && budgetDay >=600) {
  console.log("У вас средний уровень дохода");
} else if(budgetDay < 600 && budgetDay >=0) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
}