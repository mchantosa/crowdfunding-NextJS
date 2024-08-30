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

export async function POST(request: Request) {
  try {
    const { to, contractAddress, network } = await request.json();

    if (!to || !contractAddress || !network) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Crowdfunding <no-reply@megan.chantosa.com>",
      to: [to],
      subject: "Your Smart Contract Address",
      react: EmailTemplate({ contractAddress, network }),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
