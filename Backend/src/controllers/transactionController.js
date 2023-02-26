import { ObjectId } from 'mongodb';
import db from '../db/db.js';
import transactionSchema from '../schemas/transactionSchema.js';

async function getTransactions(req, res) {
  const { userId } = res.locals.session;

  try {
    const transactions = await db
      .collection('transactions')
      .find({ userId })
      .toArray();

    return res.status(200).send(transactions);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function createTransaction(req, res) {
  const { userId } = res.locals.session;

  const { description, value, type } = req.body;

  const validation = transactionSchema.validate({
    description,
    value,
    type,
    userId
  });

  if (validation.error) {
    return res.status(400).send('Invalid body');
  }

  try {
    await db.collection('transactions').insertOne({
      description,
      value,
      type,
      userId,
      date: new Date()
    });

    return res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateTransaction(req, res) {
  const { userId } = res.locals.session;

  const { description, value, type, transactionId } = req.body;

  if (!transactionId) {
    return res.status(400).send('Invalid body');
  }

  const validation = transactionSchema.validate({
    description,
    value,
    type,
    userId,
    transactionId
  });

  if (validation.error) {
    return res.status(400).send('Invalid body');
  }

  try {
    const updatedTransaction = await db.collection('transactions').updateOne(
      { _id: new ObjectId(transactionId) },
      {
        $set: {
          description,
          value,
          type,
          userId,
          date: new Date()
        }
      }
    );

    if (updatedTransaction.modifiedCount === 0) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteTransaction(req, res) {
  const { transactionId } = req.params;

  if (!transactionId) {
    return res.status(400).send('Invalid body');
  }

  try {
    const deletedTransaction = await db.collection('transactions').deleteOne({
      _id: new ObjectId(transactionId)
    });

    if (deletedTransaction.deletedCount === 0) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
