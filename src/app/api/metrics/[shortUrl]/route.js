import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/database/connectDB";
import Link from "@/lib/database/models/link";
import {
  getLinkMetrics,
  getBrowserStats,
  getOSStats,
  getHourlyDistribution,
  getDailyDistribution,
  getReferrerStats,
  getUniqueVisitorCount,
} from "@/lib/database/utils/metricsUtils";

/**
 * Verify the user has access to the link's metrics
 */
const verifyLinkAccess = async (shortUrl, userId) => {
  await connectDB();
  const link = await Link.findOne({ shortUrl, userId }, { _id: 1 }).exec();

  return !!link;
};

/**
 * API endpoint to get metrics for a specific short URL
 */
export async function GET(request, { params: { shortUrl } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  // Verify the user has access to this link's metrics
  const hasAccess = await verifyLinkAccess(shortUrl, session.user.id);
  if (!hasAccess) {
    return Response.json({ message: "Not authorized" }, { status: 403 });
  }

  // Parse query parameters for date filtering
  const { searchParams } = new URL(request.url);
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const options = {};
  if (startDateParam) options.startDate = new Date(startDateParam);
  if (endDateParam) options.endDate = new Date(endDateParam);

  try {
    // Get metrics data
    const [
      recentMetrics,
      browserStats,
      osStats,
      hourlyDistribution,
      dailyDistribution,
      referrerStats,
      uniqueVisitorCount,
    ] = await Promise.all([
      getLinkMetrics(shortUrl, { ...options, limit: 100 }),
      getBrowserStats(shortUrl, options),
      getOSStats(shortUrl, options),
      getHourlyDistribution(shortUrl, options),
      getDailyDistribution(shortUrl, options),
      getReferrerStats(shortUrl, options),
      getUniqueVisitorCount(shortUrl, options),
    ]);

    // Get total click count
    const link = await Link.findOne({ shortUrl }, { numClicks: 1 }).exec();

    return Response.json({
      message: "success",
      metrics: {
        totalClicks: link?.numClicks || 0,
        uniqueVisitors: uniqueVisitorCount,
        recentMetrics,
        browserStats,
        osStats,
        hourlyDistribution,
        dailyDistribution,
        referrerStats,
      },
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return Response.json(
      { message: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
}
