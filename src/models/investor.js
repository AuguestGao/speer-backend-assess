const mongoose = require("mongoose");
const Hash = require("../utils/hash");

const investorSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 3 },
    password: { type: String, required: true, min: 6 },
    balance: { type: Number, required: true, min: 0 },
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

investorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await Hash.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }

  next();
});

investorSchema.statics.build = (attrs) => {
  return new Investor({ ...attrs, balance: 0 });
};

const Investor = mongoose.model("Investor", investorSchema);

module.exports = Investor;
