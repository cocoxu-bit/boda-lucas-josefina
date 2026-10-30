import { Resend } from "resend";
import nodemailer from "nodemailer";
import { RSVPSubmission } from "./rsvpStorage";

export const NOTIFICATION_EMAILS = [
  "lawson.josefina@gmail.com",
  "lucasjimeneznavarro@gmail.com",
];

export async function sendRSVPNotification(submission: RSVPSubmission) {
  const isYes = submission.attendance === "yes";
  const statusEmoji = isYes ? "✅ SÍ ASISTE" : "❌ NO ASISTE";
  const subject = `💍 Nueva confirmación: ${submission.name} (${statusEmoji})`;

  const dietaryText =
    submission.dietary && submission.dietary.length > 0
      ? submission.dietary.join(", ")
      : "Cero restricciones";

  const cleanPhone = submission.phone.replace(/[^0-9]/g, "");
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e140f; color: #f3f7f2; margin: 0; padding: 24px; }
        .card { max-width: 580px; margin: 0 auto; background-color: #151c16; border: 1px solid rgba(124, 143, 115, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .header { background: linear-gradient(135deg, #1b261c 0%, #2b3b2c 100%); padding: 28px 24px; text-align: center; border-bottom: 1px solid rgba(124, 143, 115, 0.25); }
        .header h1 { font-family: Georgia, serif; font-style: italic; color: #ffffff; margin: 0 0 6px 0; font-size: 28px; font-weight: normal; }
        .header p { color: #a7ba9e; margin: 0; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; }
        .content { padding: 24px; }
        .status-badge { text-align: center; padding: 14px 20px; border-radius: 14px; font-weight: bold; font-size: 16px; margin-bottom: 24px; }
        .status-yes { background-color: #14331d; color: #86efac; border: 1px solid #22c55e; }
        .status-no { background-color: #27272a; color: #e4e4e7; border: 1px solid #71717a; }
        .field-group { margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #9cb097; margin-bottom: 4px; }
        .field-value { font-size: 16px; color: #ffffff; font-weight: 500; }
        .field-note { font-size: 13px; color: #fef08a; margin-top: 4px; font-style: italic; }
        .message-box { background-color: rgba(0,0,0,0.3); border-left: 3px solid #7c8f73; padding: 12px 16px; border-radius: 8px; font-style: italic; color: #e2e8f0; font-size: 14px; margin-top: 6px; }
        .footer { padding: 20px 24px; text-align: center; background-color: #111712; border-top: 1px solid rgba(255,255,255,0.06); }
        .btn-admin { display: inline-block; background-color: #7c8f73; color: #0e140f !important; font-weight: bold; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 30px; letter-spacing: 0.5px; }
        .btn-wa { display: inline-block; background-color: #25D366; color: #ffffff !important; font-size: 12px; font-weight: 600; text-decoration: none; padding: 4px 10px; border-radius: 6px; margin-left: 8px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>Josefina & Lucas</h1>
          <p>06 de Febrero de 2027 • Valencia</p>
        </div>

        <div class="content">
          <div class="status-badge ${isYes ? "status-yes" : "status-no"}">
            ${isYes ? "🎉 ¡CONFIRMADO! SÍ ASISTE A LA BODA" : "❌ HA INDICADO QUE NO PUEDE ASISTIR"}
          </div>

          <div class="field-group">
            <div class="field-label">Invitado/a</div>
            <div class="field-value">
              ${submission.name}
              ${
                whatsappUrl
                  ? `<a href="${whatsappUrl}" class="btn-wa" target="_blank">WhatsApp</a>`
                  : ""
              }
            </div>
            <div style="font-size: 13px; color: #9cb097; margin-top: 2px;">Teléfono: ${submission.phone}</div>
          </div>

          ${
            submission.companion
              ? `
            <div class="field-group">
              <div class="field-label">Acompañante</div>
              <div class="field-value">+ ${submission.companion}</div>
            </div>
          `
              : ""
          }

          <div class="field-group">
            <div class="field-label">Menú Especial / Intolerancias</div>
            <div class="field-value">${dietaryText}</div>
            ${
              submission.otherDietary
                ? `<div class="field-note">Nota adicional: ${submission.otherDietary}</div>`
                : ""
            }
          </div>

          ${
            submission.songTitle || submission.songArtist
              ? `
            <div class="field-group">
              <div class="field-label">Temazo propuesto para la fiesta en Veneno</div>
              <div class="field-value" style="color: #c084fc;">
                🎵 &ldquo;${submission.songTitle || "Sin título"}&rdquo; ${
                  submission.songArtist ? `— ${submission.songArtist}` : ""
                }
              </div>
            </div>
          `
              : ""
          }

          ${
            submission.message
              ? `
            <div class="field-group" style="border-bottom: none;">
              <div class="field-label">Mensaje para vosotros</div>
              <div class="message-box">&ldquo;${submission.message}&rdquo;</div>
            </div>
          `
              : ""
          }
        </div>

        <div class="footer">
          <a href="https://bodajosefinalucas.vercel.app/admin" class="btn-admin" target="_blank">
            Ver todas las respuestas en el Panel Admin →
          </a>
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Try Resend if configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.RESEND_FROM || "Boda Josefina y Lucas <onboarding@resend.dev>";
      const result = await resend.emails.send({
        from: fromEmail,
        to: NOTIFICATION_EMAILS,
        subject,
        html: htmlContent,
      });
      console.log("RSVP email sent via Resend:", result);
      return { success: true, provider: "resend" };
    } catch (err) {
      console.error("Error sending notification via Resend:", err);
    }
  }

  // 2. Try Gmail / SMTP if configured
  const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Boda Josefina & Lucas" <${smtpUser}>`,
        to: NOTIFICATION_EMAILS,
        subject,
        html: htmlContent,
      });

      console.log("RSVP email sent via Gmail SMTP");
      return { success: true, provider: "gmail" };
    } catch (err) {
      console.error("Error sending notification via Gmail SMTP:", err);
    }
  }

  console.warn(
    "No email service configured (RESEND_API_KEY or GMAIL_APP_PASSWORD not set). RSVP saved to database."
  );
  return { success: false, reason: "no_credentials" };
}
