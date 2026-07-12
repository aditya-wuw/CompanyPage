import { defineMiddleware } from "astro:middleware";
import { supabase } from "../utils/supabase";

interface RequestAnalytics {
  user_identifier: string;
  country: string;
  device: "mobile" | "pc";
  details?: {
    model?: string;
    displaySize?: string;
  };
  browser: string;
  path: string;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, cookies } = context;
  const pathname = url.pathname;
  const isStaticAsset =
    pathname.includes(".") ||
    pathname.startsWith("/_astro") ||
    pathname.startsWith("/favicon");

  if (isStaticAsset) {
    return next();
  }
  const SavedAnalytics = cookies.get("Analytics")?.value;
  const fpCookie = cookies.get("fp_id")?.value;
  const displaysize = cookies.get("display_size")?.value;

  const user_identifier = fpCookie || "Unknown";
  const display = displaysize || "Detected via Client Only";

  const country = request.headers.get("x-vercel-ip-country") || "Unknown";

  const ua = request.headers.get("user-agent") || "";
  const isMobile = /mobile/i.test(ua);
  const agent_details = request.headers.get("user-agent") || "Unknown";

  let modelName = "PC";
  if (isMobile) {
    const match = ua.match(/\(([^;]+);/);
    modelName = match ? match[1] : "Unknown Mobile";
  }

  const pathSegments = url.pathname.split("/").filter(Boolean);
  const lastPath =
    pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "/";

  const Analytics: RequestAnalytics = {
    user_identifier,
    country,
    device: isMobile ? "mobile" : "pc",
    details: isMobile
      ? {
        model: modelName,
        displaySize: display,
      }
      : undefined,
    browser: agent_details,
    path: lastPath,
  };

  if (!SavedAnalytics && user_identifier != "Unknown") {
    await SaveAnalytics(Analytics);
    context.cookies.set("Analytics", "saved", {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  return next();
});

async function SaveAnalytics(Analytics: RequestAnalytics) {
  const { error } = await supabase.from("analytics").insert(Analytics).single();
  if (error) {
    console.error(
      "Something went wrong while saving Analytics data :",
      error.message,
      "\nerror code :",
      error.code,
    );
  }
}
