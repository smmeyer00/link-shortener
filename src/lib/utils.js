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
        console.log("Search for short url: ", JSON.stringify(res, null, 2));
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
