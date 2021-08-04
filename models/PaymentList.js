const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const paymentList = new mongoose.Schema({
  due_date: { type: Date, default: null, },
  date_paid: { type: Date, default: null, },
  student_id: { type: String, default: null, },
  plan_id: { type: String, default: null, },
  amount: { type: Number, default: null, },
  status: { type: String, default: 'Pending', },
  currency: { type: String, default: null, },
}, { timestamps: true }); 

paymentList.plugin(aggregatePaginate);

module.exports = mongoose.model('PaymentList', paymentList);