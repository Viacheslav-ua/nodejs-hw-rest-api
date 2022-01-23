import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendVerify = async (req, verificationToken) => {
  const msg = {
    to: req.body.email,
    from: process.env.SENDER_SENDGRID,
    subject: "E-mail confirmation",
    text: `Go to the confirmation link ${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}`,
    html: `<strong>Go to the confirmation link <a href="${req.protocol}://${req.get('host')}/api/users/verify/${verificationToken}">CONFIRM</a> </strong>`,
  }

  const sending = await sgMail.send(msg)
  return sending
}

export default sendVerify