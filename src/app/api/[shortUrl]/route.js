import connectDB from "@/lib/database/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Link from "@/lib/database/models/link";

const getLink = async (shortUrl) => {
  await connectDB();
  const res = await Link.findOne(
    { shortUrl: shortUrl },
    { _id: 1, fullUrl: 1 }
  ).exec();

  return res;
};

export async function GET(request, { params: { shortUrl } }) {
  await connectDB();
  const res = await Link.findOne(
    { shortUrl: shortUrl },
    { _id: 1, fullUrl: 1, title: 1, description: 1 }
  ).exec();

  if (!res) {
    return Response.json({ message: "error" }, { status: 500 });
  }

  return Response.json({
    message: "success",
    linkData: {
      fullUrl: res.fullUrl,
      title: res.title,
      description: res.description,
    },
  });
}

export async function PATCH(request, { params: { shortUrl } }) {
  const session = await getServerSession(authOptions);
  const { title, description } = await request.json();
  if (!session || !title || !description) {
    return Response.json({ message: "error" }, { status: 400 });
  }

  await connectDB();
  const res = await Link.findOneAndUpdate(
    {
      shortUrl: shortUrl,
      userId: session.user.id,
    },
    {
      title: title,
      description: description,
    },
    {
      new: true,
      includeResultMetadata: true,
    }
  );

  if (!res.ok) {
    return Response.json({ message: "error" }, { status: 400 });
  }

  return Response.json({ message: "success" }, { status: 200 });
}
