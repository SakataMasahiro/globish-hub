import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const SYSTEM_PROMPT =
  "あなたは歯科医院向けSaaSのセールス担当です。クリニック名を使って自然な日本語で簡潔な営業メールを書いてください。件名と本文を返してください。件名は「件名: 」で始め、本文は改行後に記載してください。";

type Prospect = {
  id: string;
  clinic_name: string;
  email: string;
};

async function generateEmail(clinicName: string): Promise<{ subject: string; body: string }> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `クリニック名: ${clinicName}`,
      },
    ],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const lines = text.split("\n").filter((l) => l.trim());
  const subjectLine = lines.find((l) => l.startsWith("件名:")) ?? "件名: Tascal Dentalのご案内";
  const subject = subjectLine.replace(/^件名:\s*/, "").trim();
  const bodyLines = lines.filter((l) => !l.startsWith("件名:"));
  const body = bodyLines.join("\n").trim();

  return { subject, body };
}

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const { data: prospects, error: fetchError } = await supabase
      .from("dental_prospects")
      .select("id, clinic_name, email")
      .eq("status", "new")
      .not("email", "is", null)
      .neq("email", "")
      .limit(10);

    if (fetchError) {
      return Response.json({ error: fetchError.message }, { status: 500 });
    }

    if (!prospects || prospects.length === 0) {
      return Response.json({ sent: 0 });
    }

    let sent = 0;

    for (const prospect of prospects as Prospect[]) {
      try {
        const { subject, body } = await generateEmail(prospect.clinic_name);

        await resend.emails.send({
          from: "masahiro1945@globish-intl.com",
          to: [prospect.email],
          subject,
          text: body,
        });

        await supabase
          .from("dental_prospects")
          .update({ status: "emailed", email_sent_at: new Date().toISOString() })
          .eq("id", prospect.id);

        sent++;
      } catch (err) {
        console.error(`Failed to send email for ${prospect.clinic_name}:`, err);
      }
    }

    return Response.json({ sent });
  } catch (error) {
    console.error("Send email error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
