import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateForm from "@/components/createForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreatePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
            <div className="pt-64 md:pt-72 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 2xl:mx-32 flex flex-col justify-center items-center">
                <CreateForm />
            </div>
        </>
    );
}
