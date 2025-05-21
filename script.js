const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const resultDiv = document.getElementById('result');

function getFlagUrl(currencyCode) {
  const countryCodes = {
    USD: "us", INR: "in", EUR: "eu", GBP: "gb", JPY: "jp",
    AUD: "au", CAD: "ca", CNY: "cn", BRL: "br", RUB: "ru",
    ZAR: "za", MXN: "mx", CHF: "ch", SGD: "sg"
  };
  return countryCodes[currencyCode]
    ? `https://flagcdn.com/24x18/${countryCodes[currencyCode]}.png`
    : '';
}

async function populateCurrencies() {
  const res = await fetch('https://api.frankfurter.app/currencies');
  const data = await res.json();

  for (let code in data) {
    const flag = getFlagUrl(code);

    const optionText = `${code} - ${data[code]}`;
    const optionHTML = flag
      ? `🇺🇳 ${code} - ${data[code]}`
      : optionText;

    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = code;
    option1.innerHTML = optionHTML;
    option2.innerHTML = optionHTML;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  }

  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

function saveToLocalHistory(entry) {
  const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
  history.unshift(entry); // Add new on top
  localStorage.setItem('conversionHistory', JSON.stringify(history));
}

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (from === to) {
    resultDiv.textContent = "Please choose different currencies.";
    return;
  }

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
  const data = await res.json();

  const converted = data.rates[to];
  resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;

  const entry = {
    amount,
    from,
    to,
    converted,
    date: new Date().toLocaleString()
  };

  saveToLocalHistory(entry);
}

populateCurrencies();
