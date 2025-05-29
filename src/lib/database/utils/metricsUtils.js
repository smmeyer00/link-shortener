import LinkMetrics from "../models/linkMetrics";
import connectDB from "../connectDB";

/**
 * Utility functions for retrieving and analyzing metrics data
 */

/**
 * Get all metrics for a specific link
 * @param {string} shortUrl - The short URL identifier
 * @param {Object} options - Query options
 * @param {Date} options.startDate - Start date for filtering
 * @param {Date} options.endDate - End date for filtering
 * @param {number} options.limit - Maximum number of records to return
 * @returns {Promise<Array>} Array of metric records
 */
export async function getLinkMetrics(shortUrl, options = {}) {
  await connectDB();

  const query = { shortUrl };

  // Add date range filtering if provided
  if (options.startDate || options.endDate) {
    query.timestamp = {};
    if (options.startDate) query.timestamp.$gte = options.startDate;
    if (options.endDate) query.timestamp.$lte = options.endDate;
  }

  let metricsQuery = LinkMetrics.find(query).sort({ timestamp: -1 });

  // Apply limit if provided
  if (options.limit) metricsQuery = metricsQuery.limit(options.limit);

  return await metricsQuery.exec();
}

/**
 * Get aggregated browser statistics for a link
 * @param {string} shortUrl - The short URL identifier
 * @param {Object} options - Query options with startDate and endDate
 * @returns {Promise<Array>} Array of browser stats with counts
 */
export async function getBrowserStats(shortUrl, options = {}) {
  await connectDB();

  const matchStage = { shortUrl };

  // Add date range filtering if provided
  if (options.startDate || options.endDate) {
    matchStage.timestamp = {};
    if (options.startDate) matchStage.timestamp.$gte = options.startDate;
    if (options.endDate) matchStage.timestamp.$lte = options.endDate;
  }

  return await LinkMetrics.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$browser.name",
        count: { $sum: 1 },
        versions: {
          $push: {
            version: "$browser.version",
            timestamp: "$timestamp",
          },
        },
      },
    },
    { $sort: { count: -1 } },
  ]).exec();
}

/**
 * Get aggregated OS statistics for a link
 * @param {string} shortUrl - The short URL identifier
 * @param {Object} options - Query options with startDate and endDate
 * @returns {Promise<Array>} Array of OS stats with counts
 */
export async function getOSStats(shortUrl, options = {}) {
  await connectDB();

  const matchStage = { shortUrl };

  // Add date range filtering if provided
  if (options.startDate || options.endDate) {
    matchStage.timestamp = {};
    if (options.startDate) matchStage.timestamp.$gte = options.startDate;
    if (options.endDate) matchStage.timestamp.$lte = options.endDate;
  }

  return await LinkMetrics.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$os.name",
        count: { $sum: 1 },
        versions: {
          $addToSet: "$os.version",
        },
      },
    },
    { $sort: { count: -1 } },
  ]).exec();
}

/**
 * Get time-of-day distribution for clicks
 * @param {string} shortUrl - The short URL identifier
 * @param {Object} options - Query options with startDate and endDate
 * @returns {Promise<Array>} Array with hourly distribution
 */
export async function getHourlyDistribution(shortUrl, options = {}) {
  await connectDB();

  const matchStage = { shortUrl };

  // Add date range filtering if provided
  if (options.startDate || options.endDate) {
    matchStage.timestamp = {};
    if (options.startDate) matchStage.timestamp.$gte = options.startDate;
    if (options.endDate) matchStage.timestamp.$lte = options.endDate;
  }

  return await LinkMetrics.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$hourOfDay",
        clicks: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        hour: "$_id",
        clicks: 1,
        _id: 0,
      },
    },
  ]).exec();
}

/**
 * Get day-of-week distribution for clicks
 * @param {string} shortUrl - The short URL identifier
 * @param {Object} options - Query options with startDate and endDate
 * @returns {Promise<Array>} Array with daily distribution
 */
export async function getDailyDistribution(shortUrl, options = {}) {
  await connectDB();

  const matchStage = { shortUrl };

  // Add date range filtering if provided
  if (options.startDate || options.endDate) {
    matchStage.timestamp = {};
    if (options.startDate) matchStage.timestamp.$gte = options.startDate;
    if (options.endDate) matchStage.timestamp.$lte = options.endDate;
  }

  return await LinkMetrics.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$dayOfWeek",
        clicks: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        day: "$_id",
        clicks: 1,
        _id: 0,
      },
    },
  ]).exec();
}

/**
 * Get referrer statistics for a link
 * @param {string} shortUrl - The short URL identifier
 * @param {Object} options - Query options with startDate and endDate
 * @returns {Promise<Array>} Array of referrer stats with counts
 */
export async function getReferrerStats(shortUrl, options = {}) {
  await connectDB();

  const matchStage = { shortUrl };

  // Add date range filtering if provided
  if (options.startDate || options.endDate) {
    matchStage.timestamp = {};
    if (options.startDate) matchStage.timestamp.$gte = options.startDate;
    if (options.endDate) matchStage.timestamp.$lte = options.endDate;
  }

  return await LinkMetrics.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$referrer",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    {
      $project: {
        referrer: { $ifNull: ["$_id", "Direct/Unknown"] },
        count: 1,
        _id: 0,
      },
    },
  ]).exec();
}

/**
 * Get unique visitor count (approximation based on IP)
 * @param {string} shortUrl - The short URL identifier
 * @param {Object} options - Query options with startDate and endDate
 * @returns {Promise<number>} Count of unique visitors
 */
export async function getUniqueVisitorCount(shortUrl, options = {}) {
  await connectDB();

  const matchStage = { shortUrl };

  // Add date range filtering if provided
  if (options.startDate || options.endDate) {
    matchStage.timestamp = {};
    if (options.startDate) matchStage.timestamp.$gte = options.startDate;
    if (options.endDate) matchStage.timestamp.$lte = options.endDate;
  }

  const result = await LinkMetrics.aggregate([
    { $match: matchStage },
    { $group: { _id: "$ip" } },
    { $count: "uniqueCount" },
  ]).exec();

  return result.length > 0 ? result[0].uniqueCount : 0;
}
