const historyList = document.getElementById('history-list');

function loadHistory() {
  const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];

  if (history.length === 0) {
    historyList.innerHTML = "<li>No conversion history available.</li>";
    return;
  }

  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.amount} ${entry.from} = ${entry.converted} ${entry.to} (on ${entry.date})`;
    historyList.appendChild(li);
  });
}

loadHistory();
