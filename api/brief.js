const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 200;
const MAX_PROJECT_LENGTH = 5000;

const cleanSingleLine = (value, maxLength) =>
  typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    return res.status(503).json({ error: "Email delivery is not configured yet. Please contact us directly by email." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid request." });
    }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid request." });
  }

  // Quietly accept honeypot submissions without sending them onward.
  if (typeof body.website === "string" && body.website.trim()) {
    return res.status(200).json({ ok: true });
  }

  const name = cleanSingleLine(body.name, MAX_NAME_LENGTH);
  const email = cleanSingleLine(body.email, MAX_EMAIL_LENGTH);
  const company = cleanSingleLine(body.company, MAX_COMPANY_LENGTH) || "Not provided";
  const budget = cleanSingleLine(body.budget, 80) || "Not specified";
  const project = typeof body.project === "string"
    ? body.project.replace(/\u0000/g, "").trim().slice(0, MAX_PROJECT_LENGTH)
    : "";

  if (!name || !email || !project || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid name, email, and project brief." });
  }

  const message = [
    "New CodeInCave project brief",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company / project: ${company}`,
    `Budget range: ${budget}`,
    "",
    "Project details:",
    project,
  ].join("\n");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL || "ngrethesh@gmail.com"],
        reply_to: email,
        subject: `Project brief from ${name}`,
        text: message,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Resend rejected a project brief with status", emailResponse.status);
      return res.status(502).json({ error: "We couldn't send your brief right now. Please try again shortly." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Project brief email request failed", error instanceof Error ? error.message : "Unknown error");
    return res.status(502).json({ error: "We couldn't send your brief right now. Please try again shortly." });
  }
}
