import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const { prefecture } = await req.json();
    if (!prefecture) {
      return Response.json({ error: "prefecture is required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY!;
    const baseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

    let collected = 0;
    let pageToken: string | undefined;

    for (let page = 0; page < 3; page++) {
      const params = new URLSearchParams({
        query: `学習塾 ${prefecture}`,
        language: "ja",
        key: apiKey,
        ...(pageToken ? { pagetoken: pageToken } : {}),
      });

      const res = await fetch(`${baseUrl}?${params}`);
      const data = await res.json();

      if (data.status !== "OK" && data.status !== "ZERO_RESULTS") break;

      const results: Array<{
        name: string;
        formatted_address: string;
        rating?: number;
        place_id: string;
      }> = data.results ?? [];

      if (results.length > 0) {
        const rows = results.map((place) => ({
          clinic_name: place.name,
          address: place.formatted_address,
          rating: place.rating ?? null,
          google_place_id: place.place_id,
          prefecture,
        }));

        const { error } = await supabase
          .from("manabi_prospects")
          .upsert(rows, { onConflict: "google_place_id" });

        if (!error) collected += rows.length;
      }

      pageToken = data.next_page_token;
      if (!pageToken) break;
      await sleep(2000);
    }

    return Response.json({ collected });
  } catch (error) {
    console.error("Collect error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
