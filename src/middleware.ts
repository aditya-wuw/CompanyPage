import { defineMiddleware } from "astro:middleware";

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

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  const { request, url, cookies } = context;

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

  SaveAnalytics(Analytics);
  return next();
});

function SaveAnalytics(Analytics: RequestAnalytics) {
  console.log(Analytics);
}
