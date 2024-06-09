"use client";

import { CircleCheck, CircleX } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

export default function LinkTable({ tableData }) {
    const router = useRouter()
    return (
        // <div className="mx-6 bg-destructive text-center">Table component</div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Short URL</TableHead>
                        <TableHead>Full URL</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Analytics</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((linkEntry) => (
                        <TableRow
                            className="cursor-pointer"
                            key={linkEntry.shortUrl}
                            onClick={() => {router.push(`/app/view/${linkEntry.shortUrl}`)}}
                        >
                            <TableCell className="font-medium">
                                {linkEntry.shortUrl}
                            </TableCell>
                            <TableCell>{linkEntry.fullUrl}</TableCell>
                            <TableCell>{linkEntry.numClicks}</TableCell>
                            <TableCell>
                                {linkEntry.analyticsEnabled ? (
                                    <CircleCheck className="text-primary" />
                                ) : (
                                    <CircleX className="text-destructive" />
                                )}
                            </TableCell>
                            <TableCell>
                                {new Date(linkEntry.dateCreated).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </TableCell>
                            <TableCell>
                                {new Date(linkEntry.dateExpires).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </TableCell>
                            
                            <TableCell className="flex justify-end">
                                <Badge variant={
                                    {
                                        "Active": "",
                                        "Inactive": "destructive",
                                        "Archived": "secondary"
                                    }[linkEntry.status]
                                }> {linkEntry.status} </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
