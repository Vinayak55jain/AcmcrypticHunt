import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
  score: { type: Number, required: true, min: 1 },
  link: { type: String, trim: true },
  solved: { type: Boolean, default: false },
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