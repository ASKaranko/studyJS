let money = 1000,
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

// Ответы по уроку номер 3

money = +prompt("Какой ваш месячный доход?", "1000");
if (money !== money) {
  confirm("Введите ответ в виде числа");
  money = +prompt("Какой ваш месячный доход?", "1000");
}

addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "Кварплата, проездной, кредит").split(', ');

deposit = confirm("Есть ли у вас депозит в банке?");

let expenses1 = prompt("Введите обязательную статью расходов номер 1?", "Кварплата");
let amount1 = +prompt("Во сколько это обойдется?", "100");
let expenses2 = prompt("Введите обязательную статью расходов номер 2?", "Интернет");
let amount2 = +prompt("Во сколько это обойдется?", "50");

function getExpensesMonth(a, b) {
  return (a + b);
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

let sumExpenses = getExpensesMonth(amount1, amount2);
console.log("Ваши обязательные расходы за месяц", sumExpenses);
console.log("Ваши возможные расходы", addExpenses);
let accumulatedMonth = getAccumulatedMonth(money, sumExpenses);
console.log("Бюджет на месяц", accumulatedMonth);

period = getTargetMonth(mission, accumulatedMonth);
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