import { TriangleAlert } from "lucide-react";


export default async function NotFound() {
    return (
        <div className="flex justify-center items-center mt-60">
            <TriangleAlert className="w-14 h-14 mr-4 text-destructive"/>
            <p className="text-6xl font-mono font-bold text-center">Uh oh! Page not found</p>
            <TriangleAlert className="w-14 h-14 ml-4 text-destructive"/>
        </div>
    )
}