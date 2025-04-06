import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id : { type: Number, required: true, unique: true },
  text: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true,select: false },
  score: { type: Number, required: true, min: 1 },
  link: { type: String, trim: true ,select: false},
  solved: { type: Boolean, default: false, select: false },
  createdAt: { type: Date, default: Date.now }
}, { 
  toJSON: { 
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.answer;
    }
  }
});
const Question = mongoose.model("Question", questionSchema);
export default Question;