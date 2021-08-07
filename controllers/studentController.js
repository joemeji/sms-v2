const Student = require('../models/Student')
const PaymentList = require('../models/PaymentList')
const Deposit = require('../models/Deposit')

exports.index = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const studentAgregate = Student.aggregate([
      {
        $lookup: {
          from: 'plans',
          localField: 'plan',
          foreignField: '_id',
          as: 'plan'
        },
      },
    ]);
    const student = await Student.aggregatePaginate(studentAgregate, { page, limit: process.env.LIMIT });
    res.send(student);
  }
  catch(err) {
    next(err);
  }
}

exports.store = async (req, res, next) => {
  try {
    const payload = req.body;
    const { paymentLists, deposit } = req.body;
    const _studentDetails = {...payload}
    delete _studentDetails.paymentLists;
    delete _studentDetails.deposit;
    const student = await Student.create({ 
      ..._studentDetails,
      currency: deposit[0].currency
    });
    if (student) {
      const depositPayloadMap = deposit.map(item => ({ ...item, student: student._id }))
      const breakdownLists = paymentLists.map( item => ({ ...item, student_id: student._id }) )
      const depositResult = await Deposit.insertMany(depositPayloadMap)
      const _paymentLists = await PaymentList.insertMany(breakdownLists)
      res.send({ 
        student, 
        paymentLists: _paymentLists, 
        deposits: depositResult 
      }); 
    }
  }
  catch(err) {
    next(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    let student = await Student.findByIdAndUpdate(req.params.studentId, { ...req.body })
    if (student) {
      student = await Student.findById(req.params.studentId).populate('plan')
      res.send(student)
    }
  }
  catch(err) {
    next(err)
  }
}

exports.get = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('plan')
    res.send(student);
  }
  catch(err) {
    next(err)
  }
} 

exports.getDeposits = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const deposit = await Deposit.find({ student: studentId })
    res.send(deposit);
  }
  catch(err) {
    next(err)
  }
} 

exports.updateDeposit = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { amount, currency, date, _id: depositId } = req.body;
    let deposit = await Deposit.findByIdAndUpdate(depositId, { amount, currency, date, });
    deposit = await Deposit.findById(depositId)
    res.send(deposit) 
  }
  catch(err) {
    next(err)
  }
} 

exports.addDeposit = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const { amount, date, currency } = req.body;
    let deposit = await Deposit.create({ amount, date, currency, student: studentId })
    res.send(deposit)
  }
  catch(err) {
    next(err)
  }
} 

exports.deleteDeposit = async (req, res, next) => {
  try {
    const { studentId, depositId } = req.params;
    const deposit = await Deposit.findByIdAndDelete(depositId)
    if (deposit) {
      res.send({ success: true })
    }
  }
  catch(err) {
    next(err)
  }
} 