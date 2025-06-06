import isURL from "validator/lib/isURL";
import mongoose from "mongoose";
/**
 * _id, shortUrl, fullUrl, dateCreated, numClicks (eventually move to aggregate stats), userId
 */

const Status = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  // ARCHIVED: "ARCHIVED" // TODO: add later
};
const statusValues = Object.values(Status);

const linkSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
    minLength: 1, // generator will start with 5, smaller min for paid custom links in future. // TODO: collision rate metrics
    maxLength: 8, // 62 ** 8 = 218,340,105,584,896: will never exhaust
    match: /^[a-zA-Z0-9]*$/,
    unique: true,
  },
  fullUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return isURL(v, {
          require_protocol: true,
        });
      },
    },
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateExpires: {
    type: Date,
    required: true,
  },
  numClicks: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  analyticsEnabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: false,
    maxlength: 128,
    default: function () {
      if (this.fullUrl) {
        try {
          let url = new URL(this.fullUrl);
          return url.hostname
            .split(".")
            .slice(-2)
            .join(".")
            .concat(" - Untitled");
        } catch (err) {
          console.log("Default title error: ", err);
        }
      }
      return "Untitled";
    },
  },
  description: {
    type: String,
    required: false,
    maxlength: 128,
    default: function () {
      return "No description...";
    },
  },
  status: {
    type: String,
    required: true,
    default: Status.ACTIVE,
    enum: statusValues,
  },
});
linkSchema.index({ userId: 1 });
linkSchema.index({ shortUrl: 1 });

const Link = mongoose.models?.Link || mongoose.model("Link", linkSchema);
export default Link;
