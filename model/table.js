const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true }, // link to restaurant
  tableid: { type: String, required: true }, // unique within restaurant scope
  status: { type: String, enum: ["available", "occupied", "reserved"], default: "available" },
  numberOfPeople: { type: Number },
  customerId: { type: Number },
  customerName: { type: String },
  customerPhone: { type: String },
  reservationDate: { type: Date },
  reservationTime: { type: String }
});

tableSchema.index({ restaurantName: 1, tableid: 1 }, { unique: true });

module.exports = mongoose.model('Table', tableSchema);
