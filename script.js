const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const expenseContainer = document.getElementById("expenseContainer");
const totalExpenses = document.getElementById("totalExpenses");
const totalAmount = document.getElementById("totalAmount");
let expenses = [];
expenseForm.addEventListener("submit", addExpense);
searchInput.addEventListener("input", renderExpenses);
filterCategory.addEventListener("change", renderExpenses);
expenseContainer.addEventListener("click", deleteExpense);
function addExpense(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    if (title === "" || amount <= 0 || category === "") {
        alert("Please fill all fields correctly.");
        return;
    }
    const expense = {
        id: Date.now(),
        title: title,
        amount: amount,
        category: category
    };
    expenses.push(expense);
    expenseForm.reset();
    titleInput.focus();
    renderExpenses();
}
function renderExpenses() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCategory = filterCategory.value;
    const filteredExpenses = expenses.filter(function (expense) {
        const matchTitle = expense.title
            .toLowerCase()
            .includes(searchValue);
        const matchCategory =
            selectedCategory === "All" ||
            expense.category === selectedCategory;
        return matchTitle && matchCategory;
    });
    displayExpenses(filteredExpenses);
    updateDashboard();
}
function displayExpenses(expenseArray) {
    expenseContainer.innerHTML = "";
    if (expenseArray.length === 0) {
        expenseContainer.innerHTML = `
            <p id="noData">No Data Found</p>
        `;
        return;
    }
    let html = "";
    expenseArray.forEach(function (expense) {
        html += `
        <div class="expense-card">
            <h3>${expense.title}</h3>
            <p><strong>Amount:</strong> Rs. ${expense.amount}</p>
            <p><strong>Category:</strong> ${expense.category}</p>
            <button class="delete-btn" data-id="${expense.id}">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </div>
        `;
    });
    expenseContainer.innerHTML = html;
}

function deleteExpense(event) {
    const button = event.target.closest(".delete-btn");
    if (!button) return;
    const id = Number(button.dataset.id);
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });
    renderExpenses();
}
function updateDashboard() {
    totalExpenses.textContent = expenses.length;
    const total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);
    totalAmount.textContent = `Rs. ${total}`;
}
renderExpenses();