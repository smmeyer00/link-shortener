import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

// We'll need to import the Link model in a type-safe way
// This is just a placeholder - we'll update when converting the actual model
const Link = require("@/lib/database/models/link");

const shortUrlCharSet: string =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

async function _shortUrlExists(url: string): Promise<boolean> {
  try {
    const res = await Link.exists({ shortUrl: url }).exec();
    return Boolean(res);
  } catch (err) {
    console.error("Error checking if shortUrl exists: ", err);
    return true; // assume it exists to prevent possible collision on DB errors
  }
}

export async function shortUrlGenerator(): Promise<string> {
  let url: string;
  do {
    url = "";
    for (let _ = 0; _ < 7; _++) {
      url += shortUrlCharSet.charAt(
        Math.floor(Math.random() * shortUrlCharSet.length)
      );
    }
  } while (await _shortUrlExists(url));

  return url;
}

export class FF {
  static getEnvVariable(key: string): string | null {
    return process.env[key] || null;
  }

  static isFeatureEnabled(feature: string): boolean {
    const value = process.env[feature] || null;
    return value !== null && value.toLowerCase() === "true";
  }

  static isLinkDetailPageAnalyticsEnabled(): boolean {
    return this.isFeatureEnabled(
      "NEXT_PUBLIC_LINK_DETAIL_PAGE_ANALYTICS_ENABLED"
    );
  }

  static isAnalyticRecoringEnabled(): boolean {
    return this.isFeatureEnabled("NEXT_PUBLIC_ANALYTIC_RECORDING_ENABLED");
  }
}
