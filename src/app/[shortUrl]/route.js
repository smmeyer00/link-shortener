import connectDB from "@/lib/database/connectDB";
import { FF } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UAParser } from "ua-parser-js";
const Link = require("@/lib/database/models/link");

const emitMetrics = async (link, headersJson) => {
    // TODO: implement real metrics system
    const uaResult = new UAParser(headersList.get("user-agent")).getResult();

    console.log("Link: " + JSON.stringify(link, null, 2));
    console.log("User Agent: " + headersJson["user-agent"]);
    console.log("Full headers: " + JSON.stringify(headersJson, null, 2));
    console.log("uaResult: " + JSON.stringify(uaResult, null, 2));
};

const getLink = async (shortUrl) => {
    await connectDB();
    const res = await Link.findOne(
        { shortUrl: shortUrl },
        { _id: 1, fullUrl: 1 }
    ).exec();

    return res;
};

export async function GET(request, { params: { shortUrl } }) {
    const headersJson = Object.fromEntries(headers().entries());
    const link = await getLink(shortUrl);

    if (!link) {
        redirect('/')
    }

    if (FF.isAnalyticRecoringEnabled()) {
        emitMetrics(link, headersJson);
    }
    redirect(link.fullUrl);
}
