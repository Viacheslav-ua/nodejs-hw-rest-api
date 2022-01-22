const getMsg = (req, verificationToken) => {
  const { email } = req.body
  return {
    to: email,
    from: process.env.SENDER_SENDGRID,
    subject: "E-mail confirmation",
    text: `Go to the confirmation link ${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}`,
    html: `<strong>Go to the confirmation link <a href="${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}">CONFIRM</a> </strong>`,
  }
}

export default getMsg