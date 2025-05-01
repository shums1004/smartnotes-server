import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    summary: String,
    tags: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }, { timestamps: true });
  
const Note = mongoose.model("Note", noteSchema);
export default Note;