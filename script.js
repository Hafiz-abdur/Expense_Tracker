// ================= DOM ELEMENTS =================

const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

const expenseContainer = document.getElementById("expenseContainer");

const totalExpenses = document.getElementById("totalExpenses");
const totalAmount = document.getElementById("totalAmount");

const searchInput = document.getElementById("searchInput");

const filterCategory = document.getElementById("filterCategory");


// ================= ARRAY =================

let expenses = [];

// ================= EVENT LISTENERS =================

expenseForm.addEventListener("submit", addExpense);
searchInput.addEventListener("input", searchExpenses);
filterCategory.addEventListener("change", filterExpenses);
// ================= ADD EXPENSE =================

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
        title,
        amount,
        category
    };

    expenses.push(expense);

    displayExpenses();
    updateDashboard();

    expenseForm.reset();
    titleInput.focus();
}

// ================= DISPLAY EXPENSES =================

function displayExpenses(expenseArray = expenses) {

    expenseContainer.innerHTML = "";

    expenseArray.forEach((expense) => {

        expenseContainer.innerHTML += `

        <div class="expense-card">

            <h3>${expense.title}</h3>

            <p><strong>Amount:</strong> Rs. ${expense.amount}</p>

            <p><strong>Category:</strong> ${expense.category}</p>

            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>

        </div>

        `;

    });

}

// ================= DASHBOARD =================

function updateDashboard() {

    totalExpenses.textContent = expenses.length;

    const total = expenses.reduce((sum, expense) => {

        return sum + expense.amount;

    }, 0);

    totalAmount.textContent = `Rs. ${total}`;

}

// ================= SEARCH =================

function searchExpenses() {

    const searchValue = searchInput.value.trim().toLowerCase();

    const filteredExpenses = expenses.filter((expense) => {

        return expense.title.toLowerCase().includes(searchValue);

    });

    displayExpenses(filteredExpenses);

}

function filterExpenses() {

    const selectedCategory = filterCategory.value;

    if (selectedCategory === "All") {

        displayExpenses();

        return;

    }

    const filteredExpenses = expenses.filter((expense) => {

        return expense.category === selectedCategory;

    });

    displayExpenses(filteredExpenses);

}