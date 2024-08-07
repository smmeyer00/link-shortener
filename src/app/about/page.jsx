import { TriangleAlert } from "lucide-react";



// under construction
export default async function About() {
    return (
        <div className="flex justify-center items-center mt-60">
            <TriangleAlert className="w-14 h-14 mr-4 text-destructive"/>
            <p className="text-6xl font-mono font-bold text-center">Under Construction</p>
            <TriangleAlert className="w-14 h-14 ml-4 text-destructive"/>
        </div>
    )
}