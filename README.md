### Configuration

Create a `.env` file in the root of the project with your environment variables:

- `SANITY_PROJECT_ID`: Your Sanity project ID.
- `SANITY_API_TOKEN`: Your Sanity API token.
- `RESEND_API_KEY`: Your RESEND API key.

Then, update project-specific values with your project details in the following files:

- `/apps/sanity/constants.ts`
- `/apps/astro/src/global/constants.ts`
- `/apps/astro/src/pages/api/contact.ts`
