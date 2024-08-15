document.addEventListener('DOMContentLoaded', function(){

  const balanceEl = document.querySelector('.balance h2');
  const transactionsEl = document.querySelector('. transactions');
  const descriptionInput = document.querySelector('input[type="text"]');
  const amountInput = document.querySelector('input[type="number"]');
  const earnBtn = document.getElementById('earnBtn');
  const expBtn = document.getElementById('expBtn');



  // accumulator while using the reduce function in js
  
   //parse converts string into object
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  function updateBalance(){
     const total =  transactions.reduce((acc, transaction) => acc + transaction.amount, 0 );
     balanceEl.textContent =  `₹${total.toFixed(2)}`;

     function addTransactionDOM(transaction){
      const transactionEl = document.createElement('div');
      transactionEl.classList.add('transaction');


      const isCredit = transaction.amount > 0;

      transactionEl.innerHTML = `
                    <div class="left">
                    <p>${transaction.description}</p>
                    <p>${isCredit ? '+' : '-'} ₹${Math.abs(transaction.amount).toFixed(2)}</p>
                    </div>
                    
                    <div class="status ${isCredit ? 'credit' : 'debit'}">${isCredit ? 'C' : 'D'}</div>`;
                    
                    transactionsEl.insertBefore(transactionEl, transactionsEl.firstChild);
     

                    function addTransaction(isEarning){


                      const description = descriptionInput.value.trim();
                      const amount = parseFloat(amountInput.value);   //parsefloat convert string into floating number

//here NaN returns an value in form of validation
                      if (description === '' || isNaN(amount) || amount <= 0 ){
                        alert("Enter valid description and amount");
                        return;
                      }

                      const transaction = {
                        id: Date.now(), description,
                        amount: isEarning ? amount : -amount,
                       
                      };

                      transactions.push(transaction);
                      addTransactionDOM(transaction);
                      updateBalance();
                      updateLocalStorage();
                      
                      descriptionInput.value = '';
                      amountInput.value = '';

                    }


                    // function generateID(){
                    //   return Math.floor(Math.random() * 1000000000);
                    // }

                    function updateLocalStorage(){
                      //converting value to json
                      localStorage.setItem('transactions', JSON.stringify(transactions));
                    }

                    //deleting any transaction 

                    function init(){
                      transactionEl.innerHTML='';
                      // this foreach calls each element present in the array
                      transactions.forEach(addTransactionDOM);
                      updateBalance();
                    }

                    earnBtn.addEventListener('click' ,() => addTransaction(true));
                    expBtn.addEventListener('click' , () => addTransaction(false));

                    init();

                  }
                }



                   




});



