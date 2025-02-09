const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Your phone number is required"],
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  wishlists: [{type: Schema.Types.ObjectId, ref: "Wishlists"}],
  orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
  holdings: [{ type: Schema.Types.ObjectId, ref: "Holding" }],
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};
const UserModel = model("User", userSchema);

module.exports = { UserModel };