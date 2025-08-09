const express = require("express");
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require("../controllers/transactionctrl");

//router object
const router = express.Router();

//routes
//add transaction POST Method
router.post('/add-transaction',addTransaction)
//Edit transaction POST Method
router.post('/edit-transaction',editTransaction)
//Delete transaction POST Method
router.post('/delete-transaction',deleteTransaction)

//get transaction
router.post('/get-transaction', getAllTransaction);
module.exports = router;