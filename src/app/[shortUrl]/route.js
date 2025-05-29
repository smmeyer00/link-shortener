import connectDB from "@/lib/database/connectDB";
import { FF } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UAParser } from "ua-parser-js";
import Link from "@/lib/database/models/link";
import LinkMetrics from "@/lib/database/models/linkMetrics";

const emitMetrics = async (link, headersJson) => {
  // Parse user agent data
  const uaResult = new UAParser(headers().get("user-agent")).getResult();

  // Get current date for time metrics
  const now = new Date();

  // Create metrics record
  const metrics = new LinkMetrics({
    linkId: link._id,
    shortUrl: link.shortUrl,
    timestamp: now,
    browser: {
      name: uaResult.browser.name,
      version: uaResult.browser.version,
    },
    os: {
      name: uaResult.os.name,
      version: uaResult.os.version,
    },
    device: {
      type: uaResult.device.type,
      vendor: uaResult.device.vendor,
      model: uaResult.device.model,
    },
    engine: {
      name: uaResult.engine.name,
      version: uaResult.engine.version,
    },
    referrer: headersJson.referer || "",
    ip: headersJson["x-forwarded-for"] || headersJson["x-real-ip"] || "",
    language: headersJson["accept-language"] || "",
    dayOfWeek: now.getDay(),
    hourOfDay: now.getHours(),
  });

  try {
    // Save metrics to database
    await metrics.save();

    // Update click count on the link
    await Link.findByIdAndUpdate(link._id, { $inc: { numClicks: 1 } });

    // Log for debugging purposes during development
    if (process.env.NODE_ENV === "development") {
      console.log("Metrics saved for link:", link.shortUrl);
    }
  } catch (error) {
    console.error("Error saving metrics:", error);
  }
};

const getLink = async (shortUrl) => {
  await connectDB();
  const res = await Link.findOne(
    { shortUrl: shortUrl },
    { _id: 1, fullUrl: 1, shortUrl: 1 }
  ).exec();

  return res;
};

export async function GET(request, { params: { shortUrl } }) {
  const headersJson = Object.fromEntries(headers().entries());
  const link = await getLink(shortUrl);

  if (!link) {
    console.log("Link not found");
    redirect("/");
  }

  if (FF.isAnalyticRecoringEnabled()) {
    emitMetrics(link, headersJson);
  }
  redirect(link.fullUrl);
}
