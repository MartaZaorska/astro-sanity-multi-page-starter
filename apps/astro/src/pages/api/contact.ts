export const prerender = false;

import { REGEX } from '@/global/constants';
import { htmlToString } from '@/utils/html-to-string';
import type { APIRoute } from 'astro';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;

type Props = {
  email: string;
  message: string;
  legal: boolean;
};

class HTTPError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const { email, message, legal } = (await request.json()) as Props;

  try {
    if (!REGEX.email.test(email) || !message || !legal) throw new HTTPError('Missing required fields');

    const HTMLTemplate = `
      <p>Adres e-mail: <b>${email}</b></p>
      <br />
      <p>${message.trim().replace(/\n/g, '<br />')}</p>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Acme <onboarding@resend.dev>', //'Formularz kontaktowy NAZWA <formularz@sending.nazwa.pl>'
        to: 'marta.zaorska2@gmail.com', //'admin@nazwa.pl'
        reply_to: email,
        subject: 'Wiadomość z formularza kontaktowego NAZWA',
        html: HTMLTemplate,
        text: htmlToString(HTMLTemplate),
      }),
    });

    if (res.status !== 200) throw new HTTPError('Something went wrong');

    const userConfirmationHTMLTemplate = `
      <p>Witaj!</p>
      <p>Dziękujemy za skontaktowanie się z NAZWA. Otrzymaliśmy Twoją wiadomość i wkrótce się z Tobą skontaktujemy.</p>
      <br />
      <p>Z poważaniem,</p>
      <p>Zespół <b>NAZWA</b></p>    
    `;

    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Acme <onboarding@resend.dev>', //'Formularz kontaktowy NAZWA <formularz@sending.nazwa.pl>'
        to: email,
        subject: 'Dziękujemy za kontakt z NAZWA',
        html: userConfirmationHTMLTemplate,
        text: htmlToString(userConfirmationHTMLTemplate),
      }),
    });

    if (userRes.status !== 200) throw new HTTPError('Failed to send confirmation email to user');

    return new Response(
      JSON.stringify({
        message: 'Successfully sent message and confirmation email',
        success: true,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: err instanceof Error ? err.message : 'An error occurred while sending message',
        success: false,
      }),
      { status: err instanceof HTTPError ? err.status : 400 }
    );
  }
};
