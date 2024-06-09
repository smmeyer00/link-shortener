import connectDB from "@/lib/database/connectDB"
import { redirect } from "next/navigation"
const Link = require("@/lib/database/models/link");
import { headers } from "next/headers";

const emitMetrics = async () => {
    // TODO: need to define a click event and emit here
    setTimeout(() => {
        console.log('metrics emitted')
    }, 5000)
}

// add logic for inactive links later (inactive will not redirect or record metrics)
const getFullUrl = async (shortUrl) => {
    console.log
    await connectDB()
    const res = await Link.findOne({shortUrl: shortUrl}, {_id: 1, fullUrl: 1}).exec()

    emitMetrics()
    return res.fullUrl
}

export default async function RedirectPage({ params: {shortUrl: shortUrl} }) {
    const headersList = headers()
    console.log(JSON.stringify(headersList, null, 2))
    redirect(await getFullUrl(shortUrl))
    return (
        <div>{shortUrl}</div>
    )
}