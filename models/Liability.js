// models/Liability.js
const mongoose = require("mongoose");

const liabilitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // matches your frontend form
    type: { type: String, required: true }, // Loan / Credit Card
    name: { type: String, required: true },
    lender: { type: String },

    principal: { type: Number, required: true },    // principal amount
    interest: { type: Number, default: 0 },         // annual %
    tenure: { type: Number },                       // months
    emi: { type: Number },                          // optional

    startDate: { type: Date },
    statementDay: { type: String },
    dueDay: { type: String },

    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Liability", liabilitySchema);
