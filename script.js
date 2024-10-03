let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const form = document.getElementById('transactionForm');
const table = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
const totalAmountSpan = document.getElementById('totalAmount');

function updateTotal() {
    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    totalAmountSpan.textContent = total.toFixed(2);
}

function addTransaction(amount) {
    const transaction = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        amount: parseFloat(amount)
    };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
    updateTotal();
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
    updateTotal();
}

function displayTransactions() {
    table.innerHTML = '';
    transactions.forEach(transaction => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>R$ ${transaction.amount.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeTransaction(${transaction.id})"><i class="fa-solid fa-trash"></i></button></td>
        `;
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    if (amount) {
        addTransaction(amount);
        form.reset();
    }
});

displayTransactions();
updateTotal();