'use strict';

let calculate = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
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
    this.budget = +salaryAmount.value;

    console.log(this);

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
  },
  reset: function () {
    this.budget = 0;
    this.expenses = {};
    this.income = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.addIncome = [];
    this.budgetMonth = 0;
    this.budgetDay = 0;

    this.showResult();
    targetMonthValue.value = null;
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', function () {
      appData.calcSavedMoney();
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = null;
    cloneExpensesItem.querySelector('.expenses-amount').value = null;
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusExpenses.style.display = 'none';
    }
  },
  deleteExpensesBlock: function () {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function (item, i, arr) {
      if (i >= 1) {
        item.remove();
      }
    });
    expensesItems = document.querySelectorAll('.expenses-items');
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = null;
    cloneIncomeItem.querySelector('.income-amount').value = null;
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
      plusIncome.style.display = 'none';
    }
  },
  deleteIncomeBlock: function () {
    incomeItem = document.querySelectorAll('.income-items');
    incomeItem.forEach(function (item, i, arr) {
      if (i >= 1) {
        item.remove();
      }
    });
    incomeItem = document.querySelectorAll('.income-items');
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
   
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
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
  
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if(this.budgetDay < 1200 && this.budgetDay >=600) {
      return "У вас средний уровень дохода";
    } else if(this.budgetDay < 600 && this.budgetDay >=0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      
      do {
        this.percentDeposit = prompt("Какой годовой процент?", "10");
      }
      while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt("Какая сумма депозита?", "1000");
      }
      while (!isNumber(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    periodAmount.innerHTML = periodSelect.value; 
    return this.budgetMonth * periodSelect.value;
  }

};

calculate.addEventListener('click', function () {
  if (salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
    calculate.disabled = true;
    return;
  }
  appData.start();
  let inputTextData = document.querySelector('.data').querySelectorAll('input[type="text"]');
  inputTextData.forEach(function (item) {
    item.disabled = true;
  });
  calculate.style.display = 'none';
  cancelBtn.style.display = 'inline-block';
});

salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value.trim() !== '' && isNumber(salaryAmount.value)) {
    calculate.disabled = false;
  }
});

plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.calcSavedMoney);
cancelBtn.addEventListener('click', function () {
  appData.reset();
  let inputTextData = document.querySelector('.data').querySelectorAll('input[type="text"]');
  inputTextData.forEach(function (item) {
    item.disabled = false;
    item.value = null;
  });
  calculate.style.display = 'inline-block';
  cancelBtn.style.display = 'none';
  appData.deleteExpensesBlock();
  appData.deleteIncomeBlock();
});

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
