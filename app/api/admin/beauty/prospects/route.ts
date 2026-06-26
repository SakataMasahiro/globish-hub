import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("beauty_prospects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return Response.json({ error: error.message }, { status: 500 });

    return Response.json({ prospects: data });
  } catch (error) {
    console.error("Admin prospects error:", error);
    return Response.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
