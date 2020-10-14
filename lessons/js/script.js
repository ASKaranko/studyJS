'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = "Фриланс",
  addExpenses = "продукты, транспорт, коммуналка, Интернет",
  deposit = true,
  mission = 6000,
  period = 6,
  budgetDay;

console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(", "));

budgetDay = money / 30;
console.log("budget per day", budgetDay);

let start = function () {
  do {
    money = prompt("Какой ваш месячный доход?");
  }
  while (!isNumber(money));
  money = parseFloat(money);
};

start();

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "Кварплата, проездной, кредит").split(', ');

deposit = confirm("Есть ли у вас депозит в банке?");

let expenses = [],
  amount = [];

function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt("Введите обязательную статью расходов");
    do {
      amount[i] = prompt("Во сколько это обойдется?");
    }
    while (!isNumber(amount[i]));
    amount[i] = parseFloat(amount[i]);
    sum += amount[i];
  }
  console.log(expenses);
  return sum;
}

function getAccumulatedMonth(budget, expenses) {
  return (budget - expenses);
}

function getTargetMonth(mission, accumulated) {
  return Math.ceil(mission / accumulated);
}

let showTypeOf = function(data) {
  console.log(data, typeof data);
};
  
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expensesAmount = getExpensesMonth();
console.log("Ваши обязательные расходы за месяц", expensesAmount);
console.log("Ваши возможные расходы", addExpenses);
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
console.log("Бюджет на месяц", accumulatedMonth);

period = getTargetMonth(mission, accumulatedMonth);
if (period < 0) {
  console.log("Ваша цель не будет достигнута ");
} else {
  console.log("Ваша цель будет достигнута через " + period + " месяцев");

  budgetDay = Math.floor(accumulatedMonth / 30);
  console.log("Ваш бюджет на день", budgetDay);

  let getStatusIncome = function() {
    if (budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if(budgetDay < 1200 && budgetDay >=600) {
      return "У вас средний уровень дохода";
    } else if(budgetDay < 600 && budgetDay >=0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    }
  };
  console.log(getStatusIncome());
}


