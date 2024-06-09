import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../ui/table";

export default function ClickTable({
    data,
    col1Name,
    col2Name,
    col1Index,
    col2Index,
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right">{col1Name}</TableHead>
                    <TableHead className="text-center border-l">
                        {col2Name}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((entry) => (
                    <TableRow key={entry[col1Index]} className="border-none">
                        <TableCell className="font-medium w-4 text-right">
                            {entry[col1Index]}
                        </TableCell>
                        <TableCell className="border-l text-center">
                            {entry[col2Index]}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
