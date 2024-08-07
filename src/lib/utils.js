import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const Link = require("@/lib/database/models/link");

const shortUrlCharSet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

async function _shortUrlExists(url) {
    try {
        const res = await Link.exists({ shortUrl: url }).exec();
        return Boolean(res);
    } catch (err) {
        console.error("Error checking if shortUrl exists: ", err);
        return true; // assume it exists to prevent possible collision on DB errors
    }
}

export async function shortUrlGenerator() {
    let url;
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
    static getEnvVariable(key) {
        return process.env[key] || null;
    }

    static isFeatureEnabled(feature) {
        const value = process.env[feature] || null;
        return value && value.toLowerCase() === "true";
    }

    static isLinkDetailPageAnalyticsEnabled() {
        return this.isFeatureEnabled("NEXT_PUBLIC_LINK_DETAIL_PAGE_ANALYTICS_ENABLED");
    }

    static isAnalyticRecoringEnabled() {
        return this.isFeatureEnabled("NEXT_PUBLIC_ANALYTIC_RECORDING_ENABLED");
    }
}
