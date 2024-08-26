import { EmailTemplate } from "../../components/EmailTemplate";
import { Resend } from "resend";

/** TO-DO
 * This API needs to be secured, right now, anyone can send emails
 * Resend has a 2 email/second throttle
 * Vulnerability: anyone with postman or curl can burn through my
 *    100 email/day throttle and highjack this to send spam emails
 * Solution: create persistance for a successful contract, email based on that
 */

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Crowdfunding <no-reply@megan.chantosa.com>",
      to: ["meganemmamoore@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
