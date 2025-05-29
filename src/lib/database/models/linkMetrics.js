import mongoose from "mongoose";

/**
 * Model for storing metrics collected during link redirects
 * Data is collected from request headers and user agent parsing
 */

const linkMetricsSchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
    required: true,
    index: true,
  },
  shortUrl: {
    type: String,
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // Browser information
  browser: {
    name: {
      type: String,
      required: false,
    },
    version: {
      type: String,
      required: false,
    },
  },
  // OS information
  os: {
    name: {
      type: String,
      required: false,
    },
    version: {
      type: String,
      required: false,
    },
  },
  // Device information
  device: {
    type: {
      type: String,
      required: false,
    },
    vendor: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
  },
  // Engine information
  engine: {
    name: {
      type: String,
      required: false,
    },
    version: {
      type: String,
      required: false,
    },
  },
  // Request headers information
  referrer: {
    type: String,
    required: false,
  },
  ip: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  // Time metrics
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6,
  },
  hourOfDay: {
    type: Number,
    required: true,
    min: 0,
    max: 23,
  },
});

// Create compound indexes for efficient querying
linkMetricsSchema.index({ linkId: 1, timestamp: 1 });
linkMetricsSchema.index({ shortUrl: 1, timestamp: 1 });

const LinkMetrics =
  mongoose.models?.LinkMetrics ||
  mongoose.model("LinkMetrics", linkMetricsSchema);
export default LinkMetrics;
