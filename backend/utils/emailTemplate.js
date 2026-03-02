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
    <h2>Welcome to Kibun, ${safeUsername}!</h2>
    <p>Thank you for signing up. We're excited to have you on board!</p>
    <p>Please verify your email to get started:</p>
    <a href="${safeUrl}">Verify Email</a>
    <p>${safeUrl}</p>
    <p>This link expires in 24 hours.</p>
    `;
};

module.exports = {
  welcomeTemplate,
};
