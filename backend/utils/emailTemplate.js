const welcomeTemplate = (username, verifyEmailUrl) => {
  return `
    <h2>Welcome to Kibun, ${username}!</h2>
    <p>Thank you for signing up. We're excited to have you on board!</p>
    <p>Please verify your email to get started:</p>
    <a href="${verifyEmailUrl}">Verify Email</a>
    <p>${verifyEmailUrl}</p>
    <p>This link expires in 24 hours.</p>
    `;
};

module.exports = {
  welcomeTemplate,
};
