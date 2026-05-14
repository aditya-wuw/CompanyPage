import type { APIRoute } from "astro";
export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(`${import.meta.env.PUBLIC_ASSETS}/info`);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Not Found" }), {
        status: 404,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
    });
  }
};
