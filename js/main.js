// Основна логіка калькулятора
document.addEventListener('DOMContentLoaded', function(){
  const amountEl = document.getElementById('amount');
  const rateEl = document.getElementById('rate');
  const monthsEl = document.getElementById('months');
  const commissionEl = document.getElementById('commission');
  const taxEl = document.getElementById('taxPercent');

  const calcBtn = document.getElementById('calcBtn');
  const clearBtn = document.getElementById('clearBtn');

  const resultsBox = document.getElementById('results');
  const monthlyOut = document.getElementById('monthly');
  const overpayOut = document.getElementById('overpay');
  const totalOut = document.getElementById('totalPay');

  function formatUAH(val){
    return new Intl.NumberFormat('uk-UA', {style:'currency', currency:'UAH', maximumFractionDigits:2}).format(val);
  }

  function calc(){
    const P = parseFloat(amountEl.value) || 0;
    const annual = parseFloat(rateEl.value) || 0;
    const n = parseInt(monthsEl.value) || 0;
    const commission = parseFloat(commissionEl.value) || 0;
    const taxPercent = parseFloat(taxEl.value) || 0;

    if(P <= 0 || n <= 0){
      alert('Будь ласка, введіть коректну суму та термін.');
      return;
    }

    // Податок на комісію
    const taxOnCommission = commission * (taxPercent/100);
    
    // Комісія і податок - це одноразові платежі, НЕ входять у тіло кредиту
    const oneTimePayments = commission + taxOnCommission;

    const r = annual/12/100; // місячна ставка

    let monthlyPayment = 0;
    if(r === 0){
      monthlyPayment = P / n;
    } else {
      // Розраховуємо ануїтет тільки від суми кредиту P
      monthlyPayment = P * r / (1 - Math.pow(1 + r, -n));
    }

    // Загальна виплата за кредитом (без комісій)
    const totalCreditPayments = monthlyPayment * n;
    
    // Переплата = тільки відсотки по кредиту
    const overpay = totalCreditPayments - P;
    
    // Загальна сума до виплати = кредитні платежі + одноразові платежі
    const totalToPay = totalCreditPayments + oneTimePayments;

    monthlyOut.textContent = formatUAH(monthlyPayment);
    overpayOut.textContent = formatUAH(overpay);
    totalOut.textContent = formatUAH(totalToPay);

    resultsBox.classList.remove('hidden');
  }

  calcBtn.addEventListener('click', calc);
  clearBtn.addEventListener('click', function(){
    amountEl.value = '';
    rateEl.value = '';
    monthsEl.value = '';
    commissionEl.value = '';
    taxEl.value = '';
    resultsBox.classList.add('hidden');
  });
});// Основна логіка калькулятора
document.addEventListener('DOMContentLoaded', function(){
  const amountEl = document.getElementById('amount');
  const rateEl = document.getElementById('rate');
  const monthsEl = document.getElementById('months');
  const commissionEl = document.getElementById('commission');
  const taxEl = document.getElementById('taxPercent');

  const calcBtn = document.getElementById('calcBtn');
  const clearBtn = document.getElementById('clearBtn');

  const resultsBox = document.getElementById('results');
  const monthlyOut = document.getElementById('monthly');
  const overpayOut = document.getElementById('overpay');
  const totalOut = document.getElementById('totalPay');

  function formatUAH(val){
    return new Intl.NumberFormat('uk-UA', {style:'currency', currency:'UAH', maximumFractionDigits:2}).format(val);
  }

  function calc(){
    const P = parseFloat(amountEl.value) || 0;
    const annual = parseFloat(rateEl.value) || 0;
    const n = parseInt(monthsEl.value) || 0;
    const commission = parseFloat(commissionEl.value) || 0;
    const taxPercent = parseFloat(taxEl.value) || 0;

    if(P <= 0 || n <= 0){
      alert('Будь ласка, введіть коректну суму та термін.');
      return;
    }

    // Податок на комісію (вважаємо як % від комісії)
    const taxOnCommission = commission * (taxPercent/100);
    // Додаємо комісію + податок як одноразові платежі, які "увійдуть" в основну суму для розрахунку ануїтетного платежу
    const principal = P + commission + taxOnCommission;

    const r = annual/12/100; // місячна ставка

    let monthlyPayment = 0;
    if(r === 0){
      monthlyPayment = principal / n;
    } else {
      monthlyPayment = principal * r / (1 - Math.pow(1 + r, -n));
    }

    // Загальна виплата і переплата
    const totalToPay = monthlyPayment * n;  
    const overpay = totalToPay - P;

  
    monthlyOut.textContent = formatUAH(monthlyPayment);
    totalOut.textContent = formatUAH(totalToPay);
    overpayOut.textContent = formatUAH(overpay);

    resultsBox.classList.remove('hidden');
  }

  calcBtn.addEventListener('click', calc);
  clearBtn.addEventListener('click', function(){
    amountEl.value = '';
    rateEl.value = '';
    monthsEl.value = '';
    commissionEl.value = '';
    taxEl.value = '';
    resultsBox.classList.add('hidden');
  });
});
