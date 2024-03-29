const information = {
    income: 0,
    expense: 0,
    total_balance: 0,
    transactions: [],
}

const form = document.querySelector("#transaction-form");

let isUpdate = false;
let tranId;

// Function definitions

function displayData() {
    let transactionInfo = document.querySelector(".transactions");
    let totalBalanceEl = document.querySelector("#total-balance");
    // let incomeEl = document.querySelector("#income");
    // let expenseEl = document.querySelector("#expense");

    const transactions = information.transactions;
    let income = 0;
    let exp = 0;
    let totalBalance = 0;

    transactionInfo.innerHTML = "";

    transactions.forEach((transaction) => {
        const { tId, title, amount, type } = transaction;
        const isCredit = type === "credit" ? true : false;
        const sign = isCredit ? "+" : "-";


        const transactionEl = `<div class="transaction ${type}" id="${tId}">
                                    <p>${title}</p>
                                    <p><small>${isCredit ? "Cr" : "Dr"} </small>${isCredit ? "+" : "-"} ₹${amount}</p>
                                    <div class="icons">
                                        <i class="fa-solid fa-pen-to-square" onclick="updateBtn(${tId})"></i>
                                        <i class="fa-solid fa-trash" onclick="deleteBtn(${tId})"></i>
                                    </div>
                                </div>`;

        income += isCredit ? amount : 0;
        exp += !isCredit ? amount : 0;
        totalBalance = income - exp;

        transactionInfo.insertAdjacentHTML("afterbegin", transactionEl);
    });

    totalBalanceEl.innerHTML = `₹ ${totalBalance}`;
    // incomeEl.innerHTML = `₹ ${income}`;
    // expenseEl.innerHTML = `₹ ${exp}`;
}

const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const dataObj = {}; // store user input in  key : value 
    const isIncome = e.submitter.id === "income" ? true : false;

    formData.forEach((value, key) => { // form input on foreach loop for get data and store it
        dataObj[key] = value;
    });

    const { title, amount } = dataObj;
    const transaction = {
        tId: isUpdate ? tranId : Math.floor(Math.random() * 1000),
        title: title,
        amount: +amount, // "+" is used to convert  string into number
        type: isIncome ? "credit" : "debit"
    }

    if (isUpdate) {
        const tranIndex = information.transactions.findIndex((t) => t.tId === tranId);
        information.transactions[tranIndex] = transaction;
        isUpdate = false;
        tranId = null;
        console.log(transaction);
    } else {
        information.transactions.push(transaction);
    }
    displayData();
    form.reset();
}


function updateBtn(id) {
    const transaction = information.transactions.find((t) => t.tId === id);
    const { title, amount } = transaction;

    let titleInput = document.getElementById("title");
    let amountInput = document.getElementById("amount");

    titleInput.value = title;
    amountInput.value = amount;

    isUpdate = true;
    tranId = id;
    // console.log({ title, amount });
    // console.log(id)
}

function deleteBtn(id) {
    let filterTran = information.transactions.filter((t) => t.tId !== id)
    information.transactions = filterTran;
    displayData();
}

displayData();
form.addEventListener("submit", submitForm);

// console.log(isIncome);