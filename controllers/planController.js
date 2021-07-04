const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Plan = require('../models/Plan');

exports.index = async (req, res, next) => {
  try {
    const planAggregate = Plan.aggregate();
    const plan = await Plan.aggregatePaginate(planAggregate, { page: 1, limit: process.env.LIMIT });
    res.send(plan);
  }
  catch(err) {
    next(err);
  }
}

exports.create = async (req, res, next) => {
  const { amount, currency, quantity, resultName, recurrence } = req.body;
  try {
    const plan = await Plan.create({ 
      amount,
      currency,
      quantity,
      resultName,
      recurrence,
    });
    res.send(plan);
  }
  catch(err) {
    next(err);
  }
}

exports.edit = async (req, res, next) => {
  Plan.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    res.send(req.body);
  });
}