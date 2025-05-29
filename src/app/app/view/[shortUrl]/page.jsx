import ClickBarChart from "@/components/linkDetailPage/ClickBarChart";
import ClickTable from "@/components/linkDetailPage/ClickTable";
import DeviceTypePieChart from "@/components/linkDetailPage/DeviceTypePieChart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import connectDB from "@/lib/database/connectDB";
import { FF } from "@/lib/utils";
import { ChevronsRight, Hammer } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import LinkModel from "@/lib/database/models/link";

const getData = async (shortUrl) => {
  await connectDB();
  const res = await LinkModel.findOne(
    { shortUrl: shortUrl },
    {
      shortUrl: 1,
      fullUrl: 1,
      title: 1,
      description: 1,
      dateCreated: 1,
      dateExpires: 1,
      title: 1,
      status: 1,
    }
  ).exec();

  if (!res) {
    console.log(JSON.stringify(res, null, 2));
    redirect("/app/view");
  }

  return res;
};

const dev_getData = async (shortUrl) => {
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
        os: "iOS",
        clicks: 4342,
      },
      {
        os: "Android",
        clicks: 3221,
      },
      {
        os: "MacOS",
        clicks: 2243,
      },
      {
        os: "Windows",
        clicks: 1297,
      },
    ],
    todBarChartData: [
      { hour: "0:00", clicks: 120 },
      { hour: "1:00", clicks: 90 },
      { hour: "2:00", clicks: 70 },
      { hour: "3:00", clicks: 60 },
      { hour: "4:00", clicks: 50 },
      { hour: "5:00", clicks: 65 },
      { hour: "6:00", clicks: 120 },
      { hour: "7:00", clicks: 250 },
      { hour: "8:00", clicks: 400 },
      { hour: "9:00", clicks: 600 },
      { hour: "10:00", clicks: 700 },
      { hour: "11:00", clicks: 800 },
      { hour: "12:00", clicks: 850 },
      { hour: "13:00", clicks: 900 },
      { hour: "14:00", clicks: 950 },
      { hour: "15:00", clicks: 1000 },
      { hour: "16:00", clicks: 950 },
      { hour: "17:00", clicks: 900 },
      { hour: "18:00", clicks: 850 },
      { hour: "19:00", clicks: 800 },
      { hour: "20:00", clicks: 750 },
      { hour: "21:00", clicks: 600 },
      { hour: "22:00", clicks: 400 },
      { hour: "23:00", clicks: 200 },
    ],
  };
};

const getAnalyticsWidgets = (data) => {
  return (
    <>
      {/** ROW 2: Quick view click metrics */}
      <div className='col-span-2 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>Total Clicks</h1>
        <p className='text-3xl'>
          <ChevronsRight className='inline w-8 h-8' />
          45 Million
        </p>
      </div>
      <div className='col-span-2 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>Unique Clicks</h1>
        <p className='text-3xl'>
          <ChevronsRight className='inline w-8 h-8' />
          40 Million
        </p>
      </div>
      <div className='col-span-2 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>Last 7 Days</h1>
        <p className='text-3xl'>
          <ChevronsRight className='inline w-8 h-8' />8 Million
        </p>
      </div>

      {/** ROW 3: Graphs */}
      <div className='col-span-3 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>Clicks Over Time</h1>
        <ClickBarChart
          data={data.barChartData._1d}
          height={200}
          xAxisKey={"hour"}
          barKey={"clicks"}
        />
      </div>
      <div className='col-span-3 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>By Device Type</h1>
        <DeviceTypePieChart
          data={data.pieChartData}
          height={200}
          dataKey={"clicks"}
          nameKey={"deviceType"}
        />
      </div>

      {/** ROW 4: Clicks by sources */}
      <div className='col-span-2 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>By Country</h1>
        <ClickTable
          data={data.clicksByCountry}
          col1Name={"CC"}
          col2Name={"Clicks"}
          col1Index={"cc"}
          col2Index={"clicks"}
        />
      </div>
      <div className='col-span-2 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>By Referrer</h1>
        <ClickTable
          data={data.clicksByReferrer}
          col1Name={"Ref"}
          col2Name={"Clicks"}
          col1Index={"ref"}
          col2Index={"clicks"}
        />
      </div>
      <div className='col-span-2 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter'>By Device Type</h1>
        <ClickTable
          data={data.clicksByOS}
          col1Name={"OS"}
          col2Name={"Clicks"}
          col1Index={"os"}
          col2Index={"clicks"}
        />
      </div>

      {/** ROW 5: Time of Day 'heatmap' */}
      <div className='col-span-6 rounded-md border p-4 space-y-2'>
        <h1 className='text-lg font-bold tracking-tighter text-center'>
          Time of Day Heatmap
        </h1>
        {
          // TODO: this chart should have 1 bar per hour on big screens
        }
        <ClickBarChart
          data={data.todBarChartData}
          height={200}
          xAxisKey={"hour"}
          barKey={"clicks"}
        />
      </div>
    </>
  );
};

const getAnalyticsComingSoonWidget = () => {
  return (
    <div className='rounded-md border p-4 col-span-6 flex justify-center items-center py-36'>
      <Hammer className='w-14 h-14 mr-4 text-primary' />
      <p className='text-4xl font-bold font-mono tracking-tighter'>
        ! Analytics Coming Soon !
      </p>
      <Hammer className='w-14 h-14 ml-4 text-primary scale-x-[-1]' />
    </div>
  );
};

// TODO: [p1 or p2 - dashboard support on  mobile not super important] optimize for mobile screens
export default async function LinkDetailPage({ params: { shortUrl } }) {
  const data =
    process.env.NODE_ENV === "development"
      ? await dev_getData(shortUrl)
      : await getData(shortUrl);

  return (
    <div className='flex justify-center'>
      <div className='w-8/12 grid grid-cols-6 gap-4'>
        {/** ROW 1: Header */}
        <div className='rounded-md border p-4 space-y-2 col-span-6'>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-4xl font-bold tracking-tighter'>
              {data.title}
            </h1>
            <Button size='sm' variant='secondary' asChild>
              <Link href={`/app/edit/${shortUrl}`}>Edit</Link>
            </Button>
          </div>
          <p className='text-muted-foreground'>{`lnkpal.co/${
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
          <div className='pr-8'>
            <Separator />
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
            quaerat, nam quasi officia nulla voluptates quae excepturi unde
            minima itaque neque consectetur vel magnam sit enim ad delectus,
            dolorem voluptas!
          </p>
        </div>

        {FF.isLinkDetailPageAnalyticsEnabled()
          ? getAnalyticsWidgets(data)
          : getAnalyticsComingSoonWidget()}
      </div>
    </div>
  );
}
