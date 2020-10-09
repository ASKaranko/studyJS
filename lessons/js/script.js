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
