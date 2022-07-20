const mongoose = require("mongoose");
const Hash = require("../utils/hash");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 3 },
    password: { type: String, required: true, min: 6 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(dot, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await Hash.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }

  next();
});

userSchema.statics.build = (attrs) => {
  return new User(attrs);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
