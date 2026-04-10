import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 },
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "onboarding@resend.dev", // free tier sender
      to: "benroberts67@hotmail.co.uk",
      subject: `Contact Form: ${subject}`,
      html: `<p><b>${name}</b> (${email}) wrote:</p><p>${message}</p>`,
    })

    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { message: "Failed to send email. Please try again later." },
      { status: 500 },
    )
  }
}
