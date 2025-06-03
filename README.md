# ⭐ Astro + Sanity Multi-Page Starter

This starter combines [**Astro**](https://astro.build/), [**Sanity**](https://www.sanity.io/), and [**Turborepo**](https://turborepo.com/) for building SEO-friendly multi-page websites featuring dedicated service and blog pages, along with modern features and content management.

## Configuration

Create a `.env` file in the root of the project with your environment variables:

- `SANITY_PROJECT_ID`: Your Sanity project ID.
- `SANITY_API_TOKEN`: Your Sanity API token.
- `RESEND_API_KEY`: Your RESEND API key.

Then, update project-specific values with your project details in the following files:

- `/apps/sanity/constants.ts`
- `/apps/astro/src/global/constants.ts`

Also, make sure to modify `/apps/astro/src/pages/api/contact.ts` with the correct email addresses or endpoints used for handling contact form submissions.
