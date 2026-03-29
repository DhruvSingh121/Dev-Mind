import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
});
export default mongoose.model("User", userSchema);
