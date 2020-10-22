'use strict';

let calculate = document.getElementById('start'),
      plusIncome = document.getElementsByTagName('button')[0],
      plusExpenses = document.getElementsByTagName('button')[1],
      depositCheckbox = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-items .income-title'),
      expensesTitle = document.querySelector('.expenses-items .expenses-title'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      incomeItem = document.querySelectorAll('.income-items');

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  budget: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0, 
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', function () {
      appData.calcSavedMoney();
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
      plusIncome.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {

    incomeItem.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome.trim() !== '' && cashIncome.trim() !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
   
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
          item = item.trim();
          if (item !== '') {
            appData.addExpenses.push(item[0].toUpperCase() + item.substring(1));
          }
        });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
  
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    periodAmount.innerHTML = periodSelect.value; 
    return appData.budgetMonth * periodSelect.value;
  }

};

calculate.addEventListener('click', function () {
  if (salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
    calculate.disabled = true;
    return;
  }
  appData.start();
});

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)) {
    calculate.disabled = false;
  }
});

plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.calcSavedMoney);

// console.log("Ваши обязательные расходы за месяц", appData.expensesMonth);
// console.log("Ваши возможные расходы", appData.addExpenses.join(", "));
// if (targetMonthValue.value < 0) {
//   console.log("Ваша цель не будет достигнута ");
// } else {
//   console.log("Ваша цель будет достигнута через " + targetMonthValue.value + " месяцев");
//   // console.log(appData.getStatusIncome()); 
// }

// console.log("Наша программа включает в себя данные:");
// for (let key in appData) {
//   console.log("Свойство " + key + " Значение " + appData[key]);
// }
