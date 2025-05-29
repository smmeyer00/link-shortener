"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// free tier limit = 5 (or 10?) short links
// since only free tier to start, no need for pagination - can load all owned links at once and filter view

import LinkTable from "@/components/linkTable";
import connectDB from "@/lib/database/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "@/lib/database/models/link";

// start with these fields for shortened link schema (+other required fields like owner objID, etc.)
// add more fields as needed
// analytics enabled will toggle whether click events w/ detailed info are logged
// use separate table to hold aggregate/summary analytics. ex: {numClicks: 5, regionData: {USClicks: 5, etc..}}
//
// show more of this info on large screens, priortize important info on other screens
const currDate = new Date();
const oneDayMs = 24 * 60 * 60 * 1000;
const testPreviewData = [
  {
    shortUrl: "abcdef",
    fullUrl: "https://google.com",
    numClicks: 5,
    status: "Active", // will be one of "active", "inactive", "archived?" (define enum w/ mongoose schema)
    dateCreated: new Date(currDate.getTime() - oneDayMs),
    dateExpires: new Date(currDate.getTime() + 30 * oneDayMs),
    analyticsEnabled: false, // use this to toggle detailed analytics (free vs paid user)
  },
  {
    shortUrl: "abcdef",
    fullUrl: "https://google.com",
    numClicks: 5,
    status: "Inactive", // will be one of "active", "inactive", "archived?" (define enum w/ mongoose schema)
    dateCreated: new Date(currDate.getTime() - 2 * oneDayMs),
    dateExpires: new Date(currDate.getTime() + 30 * oneDayMs),
    analyticsEnabled: false, // use this to toggle detailed analytics (free vs paid user)
  },
  {
    shortUrl: "abcdef",
    fullUrl: "https://google.com",
    numClicks: 5,
    status: "Archived", // will be one of "active", "inactive", "archived?" (define enum w/ mongoose schema)
    dateCreated: new Date(currDate.getTime() - 3 * oneDayMs),
    dateExpires: new Date(currDate.getTime() + 30 * oneDayMs),
    analyticsEnabled: true, // use this to toggle detailed analytics (free vs paid user)
  },
];

const getData = async (userId) => {
  await connectDB();
  const res = await Link.find({ userId: userId }).exec();
  return res.map((doc) => doc.toObject());
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default async function ViewPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className='flex-col justify-center space-y-6 md:space-y-10 mt-2'>
      <h1 className='text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-center'>
        Link Library
      </h1>
      <div className='mx-4 md:mx-6 lg:mx-12 xl:mx-24 2xl:mx-48'>
        <LinkTable
          tableData={JSON.parse(
            JSON.stringify(
              (await getData(session.user.id))
                .sort((a, b) => {
                  return b.dateCreated - a.dateCreated;
                })
                .map((item) => ({
                  ...item,
                  status: capitalizeFirstLetter(item.status),
                }))
            )
          )}
        />
        {
          // TODO: Sort by status first (active, inactive, archived) THEN by date (created or expired?)
        }
      </div>
    </div>
  );
}
