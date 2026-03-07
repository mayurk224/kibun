const escapeHtml = (unsafe) => {
  if (typeof unsafe !== "string") return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const welcomeTemplate = (username, verifyEmailUrl) => {
  const safeUsername = escapeHtml(username);
  const safeUrl = escapeHtml(verifyEmailUrl);

  return `
    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F1F1F1; color: #0B1122;">
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F1F1F1; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(11, 17, 34, 0.08); overflow: hidden;">
          
          <tr>
            <td align="center" style="padding: 40px 20px 20px 20px;">
              <img src="https://ik.imagekit.io/m0no8ccps/Gemini_Generated_Image_trjtejtrjtejtrjt%20(1)s.png" alt="Kibun Logo" width="80" style="display: block; max-width: 80px; height: auto; border-radius: 16px;" />
              <h1 style="margin: 15px 0 0 0; font-size: 28px; color: #0B1122; letter-spacing: -0.5px;">Kibun</h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 10px 40px 40px 40px;">
              <h2 style="margin: 0 0 15px 0; font-size: 22px; color: #0B1122; font-weight: bold;">
                Welcome to Kibun, ${safeUsername}!
              </h2>
              <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #0B1122;">
                Thank you for signing up. We're incredibly excited to have you on board! Please verify your email address to get started.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                <tr>
                  <td align="center">
                    <a href="${safeUrl}" style="display: inline-block; background-color: #C1E45C; color: #0B1122; text-decoration: none; padding: 14px 32px; font-size: 16px; font-weight: bold; border-radius: 8px;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 5px 0; font-size: 14px; color: #0B1122;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 0 0 30px 0; font-size: 13px; color: #0B1122; word-break: break-all;">
                ${safeUrl}
              </p>

              <hr style="border: none; border-top: 2px solid #F1F1F1; margin: 0 0 20px 0;" />

              <p style="margin: 0; font-size: 13px; color: #0B1122; opacity: 0.8;">
                ⏳ This link expires in 24 hours. If you did not sign up for Kibun, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</div>
    `;
};

const resendVerifyEmailTemplate = (username, verifyEmailUrl) => {
  const safeUsername = escapeHtml(username);
  const safeUrl = escapeHtml(verifyEmailUrl);

  return `
    <h2>Resend Verify Email, ${safeUsername}!</h2>
    <p>Please verify your email to get started:</p>
    <a href="${safeUrl}">Verify Email</a>
    <p>${safeUrl}</p>
    <p>This link expires in 24 hours.</p>
    `;
};

module.exports = {
  welcomeTemplate,
  resendVerifyEmailTemplate,
};
