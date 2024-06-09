import ClickBarChart from "@/components/linkDetailPage/ClickBarChart";
import ClickTable from "@/components/linkDetailPage/ClickTable";
import DeviceTypePieChart from "@/components/linkDetailPage/DeviceTypePieChart";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronsRight } from "lucide-react";
import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

const getData = async (shortUrl) => {
    // return dummy data for now
    return {
        shortUrl: "382OxJ1",
        fullUrl: "https://google.com",
        dateCreated: new Date(Date.now()),
        dateExpires: new Date(Date.now()),
        numClicks: 5,
        analyticsEnabled: true,
        userId: "dummy.userId",
        title: "google.com - Untitled",
        status: "Active",
        barChartData: {
            _1d: [
                {
                    hour: "0:00",
                    clicks: 2300,
                },
                {
                    hour: "3:00",
                    clicks: 1200,
                },
                {
                    hour: "6:00",
                    clicks: 1000,
                },
                {
                    hour: "9:00",
                    clicks: 950,
                },
                {
                    hour: "12:00",
                    clicks: 1200,
                },
                {
                    hour: "15:00",
                    clicks: 1350,
                },
                {
                    hour: "18:00",
                    clicks: 1400,
                },
                {
                    hour: "21:00",
                    clicks: 1700,
                },
                {
                    hour: "24:00",
                    clicks: 1650,
                },
            ],
        },
        pieChartData: [
            {
                deviceType: "Mobile",
                clicks: 4000,
            },
            {
                deviceType: "Desktop",
                clicks: 3400,
            },
            {
                deviceType: "Other",
                clicks: 600,
            },
        ], // needs to be length 3 or will cause color problems
        clicksByCountry: [
            {
                cc: "US",
                clicks: 3423,
            },
            {
                cc: "MX",
                clicks: 1723,
            },
            {
                cc: "JP",
                clicks: 1698,
            },
            {
                cc: "Other",
                clicks: 650,
            },
        ],
        clicksByReferrer: [
            {
                ref: "Insta",
                clicks: 3442,
            },
            {
                ref: "YouTube",
                clicks: 2344,
            },
            {
                ref: "Facebook",
                clicks: 2196,
            },
            {
                ref: "Other",
                clicks: 348,
            },
        ],
        clicksByOS: [
            {
                os: 'iOS',
                clicks: 4342
            },
            {
                os: 'Android',
                clicks: 3221
            },
            {
                os: 'MacOS',
                clicks: 2243
            },
            {
                os: 'Windows',
                clicks: 1297
            },
        ]
    };
};

export default async function LinkDetailPage({ params: { shortUrl } }) {
    const data = await getData();
    return (
        <div className="flex justify-center">
            <div className="w-8/12 grid grid-cols-6 gap-4">
                {/** ROW 1: Header */}
                <div className="rounded-md border p-4 space-y-2 col-span-6">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        {data.title}
                    </h1>
                    <p className="text-muted-foreground">{`lnkpal.co/${
                        data.shortUrl
                    } | ${data.dateCreated.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })} - ${data.dateExpires.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}`}</p>
                    <div className="pr-8">
                        <Separator />
                    </div>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Alias quaerat, nam quasi officia nulla voluptates
                        quae excepturi unde minima itaque neque consectetur vel
                        magnam sit enim ad delectus, dolorem voluptas!
                    </p>
                </div>

                {/** ROW 2: Quick view click metrics */}
                <div className="col-span-2 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        Total Clicks
                    </h1>
                    <p className="text-3xl">
                        <ChevronsRight className="inline w-8 h-8" />
                        45 Million
                    </p>
                </div>
                <div className="col-span-2 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        Unique Clicks
                    </h1>
                    <p className="text-3xl">
                        <ChevronsRight className="inline w-8 h-8" />
                        40 Million
                    </p>
                </div>
                <div className="col-span-2 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        Last 7 Days
                    </h1>
                    <p className="text-3xl">
                        <ChevronsRight className="inline w-8 h-8" />8 Million
                    </p>
                </div>

                {/** ROW 3: Graphs */}
                <div className="col-span-3 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        Clicks Over Time
                    </h1>
                    <ClickBarChart
                        data={data.barChartData._1d}
                        height={200}
                        xAxisKey={"hour"}
                        barKey={"clicks"}
                    />
                </div>
                <div className="col-span-3 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        By Device Type
                    </h1>
                    <DeviceTypePieChart
                        data={data.pieChartData}
                        height={200}
                        dataKey={"clicks"}
                        nameKey={"deviceType"}
                    />
                </div>

                {/** ROW 4: Clicks by sources */}
                <div className="col-span-2 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        By Country
                    </h1>
                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">
                                    CC
                                </TableHead>
                                <TableHead className="text-center border-l">
                                    Clicks
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.clicksByCountry.map(ccData => (
                                <TableRow key={ccData.cc} className="border-none">
                                <TableCell className="font-medium w-4">{ccData.cc}</TableCell>
                                <TableCell className="border-l text-center">{ccData.clicks}</TableCell>
                            </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table> */}
                    <ClickTable
                        data={data.clicksByCountry}
                        col1Name={"CC"}
                        col2Name={"Clicks"}
                        col1Index={"cc"}
                        col2Index={"clicks"}
                    />
                </div>
                <div className="col-span-2 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        By Referrer
                    </h1>
                    <ClickTable
                        data={data.clicksByReferrer}
                        col1Name={"Ref"}
                        col2Name={"Clicks"}
                        col1Index={"ref"}
                        col2Index={"clicks"}
                    />
                </div>
                <div className="col-span-2 rounded-md border p-4 space-y-2">
                    <h1 className="text-lg font-bold tracking-tighter">
                        By Device Type
                    </h1>
                    <ClickTable
                        data={data.clicksByOS}
                        col1Name={"OS"}
                        col2Name={"Clicks"}
                        col1Index={"os"}
                        col2Index={"clicks"}
                    />
                </div>
            </div>
        </div>
    );
}
