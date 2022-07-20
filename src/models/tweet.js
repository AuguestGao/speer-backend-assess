const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    body: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(dot, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

tweetSchema.statics.build = (attrs) => {
  return new Tweet(attrs);
};

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
