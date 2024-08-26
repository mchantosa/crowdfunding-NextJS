import { Resend } from "resend";

const resend = new Resend("re_123456789");

await resend.emails.send({
  from: "Acme <onboarding@resend.dev>",
  to: ["meganemmamoore@gmail.com"],
  subject: "hello world",
  html: "<p>it works!</p>",
});