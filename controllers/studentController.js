const Student = require('../models/Student')
const PaymentList = require('../models/PaymentList')

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
        }
      }
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
    const studentDetails = req.body;
    const { paymentLists } = req.body;
    delete studentDetails.paymentLists;
    const student = await Student.create({ 
      ...studentDetails,
    });
    if (student) {
      const breakdownLists = paymentLists.map( item => ({ ...item, student_id: student._id }) )
      const _paymentLists = await PaymentList.insertMany(breakdownLists)
      res.send({ student, paymentLists: _paymentLists }); 
    }
  }
  catch(err) {
    next(err)
  }
}