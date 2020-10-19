'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 6000,
  period: 6,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0, 
  asking: function() {

    if (confirm("Есть ли у вас дополнительный заработок?")) {
      let itemIncome,
          cashIncome;
      do {
        itemIncome = prompt("Какой у вас есть дополнительный заработок?", 'Такси');
      }
      while (isNumber(itemIncome) || (itemIncome === null) || (itemIncome.trim() === ''));
      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", "150");
      }
      while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let expenses,
      amount,
      addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",  "Кварплата, проездной, кредит");

    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.addExpenses.forEach(function (item, i, arr) {
      arr[i] = item[0].toUpperCase() + item.substring(1);
    });
    
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    for (let i = 0; i < 2; i++) {

      do {
        expenses = prompt("Введите обязательную статью расходов");
      }
      while (isNumber(expenses) || (expenses === null) || (expenses.trim() === ''));
      do {
        amount = prompt("Во сколько это обойдется?");
      }
      while (!isNumber(amount));
      amount = parseFloat(amount);
      appData.expenses[expenses] = amount;
    }
  },
  getExpensesMonth: function () {
  
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if(appData.budgetDay < 1200 && appData.budgetDay >=600) {
      return "У вас средний уровень дохода";
    } else if(appData.budgetDay < 600 && appData.budgetDay >=0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", "10");
      }
      while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма депозита?", "1000");
      }
      while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }

};

let start = function () {
  do {
    appData.budget = prompt("Какой ваш месячный доход?");
  }
  while (!isNumber(appData.budget));
  appData.budget = parseFloat(appData.budget);
};

start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth(appData.mission, appData.budgetMonth);

console.log("Ваши обязательные расходы за месяц", appData.expensesMonth);
console.log("Ваши возможные расходы", appData.addExpenses.join(", "));
if (appData.period < 0) {
  console.log("Ваша цель не будет достигнута ");
} else {
  console.log("Ваша цель будет достигнута через " + appData.period + " месяцев");
  console.log(appData.getStatusIncome()); 
}

console.log("Наша программа включает в себя данные:");
for (let key in appData) {
  console.log("Свойство " + key + " Значение " + appData[key]);
}

appData.getInfoDeposit();