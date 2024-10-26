import getUser from "@/utils/getUserFromCookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
  }

  (await cookies().get("token")?.value) ? cookies().delete("token") : null;
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
};
