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

const AppData = function () {
  this.budget = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;

  AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
  };
  AppData.prototype.reset = function () {
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
  };
  AppData.prototype.showResult = function () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = _this.calcSavedMoney();
    });
  };
  AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = null;
    cloneExpensesItem.querySelector('.expenses-amount').value = null;
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusExpenses.style.display = 'none';
    }
  };
  AppData.prototype.deleteExpensesBlock = function () {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function (item, i, arr) {
      if (i >= 1) {
        item.remove();
      }
    });
    expensesItems = document.querySelectorAll('.expenses-items');
  };
  AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = null;
    cloneIncomeItem.querySelector('.income-amount').value = null;
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
      plusIncome.style.display = 'none';
    }
  };
  AppData.prototype.deleteIncomeBlock = function () {
    incomeItem = document.querySelectorAll('.income-items');
    incomeItem.forEach(function (item, i, arr) {
      if (i >= 1) {
        item.remove();
      }
    });
    incomeItem = document.querySelectorAll('.income-items');
  };
  AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  };
  AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItem.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome.trim() !== '' && cashIncome.trim() !== '') {
        _this.income[itemIncome] = cashIncome;
      }
    });
   
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };
  AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
          item = item.trim();
          if (item !== '') {
            _this.addExpenses.push(item[0].toUpperCase() + item.substring(1));
          }
        });
  };
  AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  };
  AppData.prototype.getExpensesMonth = function () {
  
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  
  };
  AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };
  AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  };
  AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if(this.budgetDay < 1200 && this.budgetDay >=600) {
      return "У вас средний уровень дохода";
    } else if(this.budgetDay < 600 && this.budgetDay >=0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    }
  };
  AppData.prototype.getInfoDeposit = function () {
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
  };
  AppData.prototype.calcSavedMoney = function () {
    periodAmount.innerHTML = periodSelect.value; 
    return this.budgetMonth * periodSelect.value;
  };
  AppData.prototype.eventsListeners = function () {
    
    const _this = this;
    calculate.addEventListener('click', function () {
      if (salaryAmount.value.trim() === '' || !isNumber(salaryAmount.value)) {
        calculate.disabled = true;
        return;
      }
      _this.start();
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
    
    plusExpenses.addEventListener('click', this.addExpensesBlock);
    plusIncome.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.calcSavedMoney);
    cancelBtn.addEventListener('click', function () {
      _this.reset();
      let inputTextData = document.querySelector('.data').querySelectorAll('input[type="text"]');
      inputTextData.forEach(function (item) {
        item.disabled = false;
        item.value = null;
      });
      calculate.style.display = 'inline-block';
      cancelBtn.style.display = 'none';
      _this.deleteExpensesBlock();
      _this.deleteIncomeBlock();
    });
  };
};

const appData = new AppData ();
appData.eventsListeners();

console.log(appData);


