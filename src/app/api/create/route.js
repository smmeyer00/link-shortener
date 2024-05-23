import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
const Link = require('@/lib/database/models/link')
import mongoose from "mongoose"
import connectDB from "@/lib/database/connectDB"
import isURL from "validator/lib/isURL"
import { shortUrlGenerator } from "@/lib/utils"
const Joi = require('joi');

// maybe in future if there are a lot of endpoints, can move all req schemas to separate folder or file for readability
const reqSchema = Joi.object({
    fullUrl: Joi.string().required(),
    shortUrl: Joi.string().min(1).max(8), // will not do anything rn, but will allow custom links later
    enableAnalytics: Joi.boolean()
})

// future api route to create shortened link @ /api/create
export async function POST(req) {

    const { error, value: requestJson } = reqSchema.validate(await req.json())
    console.log(JSON.stringify(requestJson, null, 2))
    if (error || !isURL(requestJson?.fullUrl)) { // isURL impler than creating custom Joi validator
        return Response.json({message: "Bad request"}, {status: 400})
    }

    const session = await getServerSession(authOptions)
    if (!session) {
        return Response.json({message: "Not authorized"}, {status: 401}) 
    }

    await connectDB()
    const link = new Link({
        shortUrl: await shortUrlGenerator(),
        fullUrl: requestJson.fullUrl,
        dateCreated: Date.now(),
        numClicks: 0,
        userId: new mongoose.Types.ObjectId(session.user.id)
    })

    let response
    await link.save()
        .then(result => {
            console.log(`Link Save Result: ${JSON.stringify(result, null, 2)}`)
            response = Response.json({message: "Succesfully saved link"}, {status: 200})
            // on success we need to redirect to something like a link detail page
        })
        .catch(err => {
            console.log("Error: ", err)
            response = Response.json({message: "Failed to save link"}, {status: 500})
        })
        
    return response

}