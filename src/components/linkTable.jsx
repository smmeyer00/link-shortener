"use client";

import { SquareCheck, SquareX, CircleCheck, CircleX } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

export default function LinkTable({ tableData }) {

    return (
        // <div className="mx-6 bg-destructive text-center">Table component</div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Short URL</TableHead>
                        <TableHead>Full URL</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Analytics</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((linkEntry) => (
                        <TableRow className="cursor-pointer" key={linkEntry.linkId}>
                            <TableCell className="font-medium">
                                {linkEntry.linkId}
                            </TableCell>
                            <TableCell>{linkEntry.url}</TableCell>
                            <TableCell>{linkEntry.numClicks}</TableCell>
                            <TableCell>{linkEntry.status}</TableCell>
                            <TableCell>{linkEntry.dateCreated.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                            <TableCell className="flex justify-end">
                                {linkEntry.analyticsEnabled ? 
                                    (<CircleCheck className="text-primary"/>) : (<CircleX className="text-destructive"/>)}
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
