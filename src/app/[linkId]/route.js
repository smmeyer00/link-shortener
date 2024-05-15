export async function GET(request, { params }) {
    return Response.json({
        message: "Future redirect route",
        linkId: `${params.linkId}`
    })
}