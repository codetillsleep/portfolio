import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // swap once you verify a domain
      to: "saksham1864@gmail.com", // your inbox
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#0a0a0a;color:#e8fdf2;border-radius:12px;">
          <p style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#34d399;margin-bottom:24px;">
            Portfolio · New Message
          </p>
          <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:4px;color:#ffffff;">
            Name: ${name}
          </h2>
          <p style="font-size:0.85rem;color:#6ee7b7;margin-bottom:28px;">Email: ${email}</p>
          <p style="font-size:0.9rem;line-height:1.75;color:rgba(167,243,208,0.75);white-space:pre-wrap;">Message: ${message}</p>
          <hr style="border:none;border-top:1px solid rgba(52,211,153,0.12);margin:32px 0;" />
          <p style="font-size:0.72rem;color:rgba(52,211,153,0.3);">
            Sent via your portfolio contact form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
