const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
let expenses = [];
expenseForm.addEventListener("submit", addExpense);
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
    console.log(expenses);
    displayExpenses();
    updateDashboard();
    expenseForm.reset();
    titleInput.focus();
}

const expenseContainer = document.getElementById("expenseContainer");
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


const totalExpenses = document.getElementById("totalExpenses");
const totalAmount = document.getElementById("totalAmount");
function updateDashboard() {
    totalExpenses.textContent = expenses.length;
    const total = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
    totalAmount.textContent = `Rs. ${total}`;
}



const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchExpenses);
function searchExpenses() {

    const searchValue = searchInput.value.trim().toLowerCase();

    const filteredExpenses = expenses.filter((expense) => {

        return expense.title.toLowerCase().includes(searchValue);

    });

    displayExpenses(filteredExpenses);

}