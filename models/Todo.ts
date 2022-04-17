import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
  email: string;
  title: string;
  isCompleted: boolean;
}

const TodoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export const Todo: mongoose.Model<ITodo> =
  mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

// module.exports = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
