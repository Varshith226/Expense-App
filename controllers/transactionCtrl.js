// controllers/transactionCtrl.js
const Transaction = require("../models/transactionModel");

// Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const { userid, amount, type, category, reference, description, date } = req.body;

    if (!userid || !amount || !type || !category || !description || !date) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const newTransaction = new Transaction({
      userid,
      amount,
      type,
      category,
      reference: reference || "",
      description,
      date
    });

    await newTransaction.save();
    res.status(201).json({ success: true, message: "Transaction Added Successfully", transaction: newTransaction });
  } catch (error) {
    console.error("Add Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Get all transactions for a user
const getAllTransaction = async (req, res) => {
  try {
    const { userid } = req.body;

    if (!userid) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const transactions = await Transaction.find({ userid }).sort({ date: -1 });
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Get Transactions Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Edit an existing transaction
const editTransaction = async (req, res) => {
  try {
    const { transactionId, payload } = req.body;

    if (!transactionId || !payload) {
      return res.status(400).json({ success: false, message: "Transaction ID and payload are required" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, payload, { new: true });

    if (!updatedTransaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, message: "Transaction Updated Successfully", transaction: updatedTransaction });
  } catch (error) {
    console.error("Edit Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({ success: false, message: "Transaction ID is required" });
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    res.status(200).json({ success: true, message: "Transaction Deleted Successfully" });
  } catch (error) {
    console.error("Delete Transaction Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

module.exports = {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction
};
