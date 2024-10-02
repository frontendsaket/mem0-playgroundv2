import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("user", userSchema);
