
export async function GET() {
    return Response.json({
        pingResponse: "ping",
        dotEnvTest: process.env.TEST_VAR
    })
}