import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateForm from "@/components/createForm";
import { getServerSession } from "next-auth";

export default async function CreatePage() {
    const session = await getServerSession(authOptions);

    // TODO: possibly put create 'form' in its own component so that the outer page can be an rsc and access session obj faster
    //       Need to research if this will even help. (server components need )
    return (
        <>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <div className="py-80 px-8 sm:px-16 md:px-32 lg:px-64 xl:px-96 2xl:mx-32 flex flex-col justify-center items-center">
                <CreateForm />
            </div>
        </>
    );
}
