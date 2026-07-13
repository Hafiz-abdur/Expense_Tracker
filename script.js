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
        title: title,
        amount: amount,
        category: category
    };
    expenses.push(expense);
    console.log(expenses);
    expenseForm.reset();
    titleInput.focus();    
}