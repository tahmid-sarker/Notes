import { getToken } from "next-auth/jwt";
const { NextResponse } = require("next/server");

export async function middleware(req) {
  const token = await getToken({ req });
  const isTokenOK = Boolean(token);
  const isAdminUser = token?.role === "admin";
  const isAdminSpecificPath = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminSpecificPath && !isAdminUser) {
    const callBackURL = encodeURIComponent(req.nextUrl.pathname); // Encode the original URL
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callBackURL}`, req.url));
  }
  return NextResponse.next();
}