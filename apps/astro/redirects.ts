import type { ValidRedirectStatus } from 'astro';
import sanityFetch from './src/utils/sanity.fetch';

type RedirectData = {
  source: string;
  target: {
    destination: string;
    status: ValidRedirectStatus;
  };
};

const data = await sanityFetch<RedirectData[]>({
  query: `
    coalesce(*[_type == "redirects"][0].redirects {
      "source": source.current,
      "target": {
        "destination": destination.current,
        "status": select(isPermanent => 301, 302),
      }
    }[], [])
  `,
});

const redirects = Object.fromEntries(data.map(({ source, target }) => [source, target]));

const permanentRedirects = data.filter(r => r.target.status === 301).length;
const temporaryRedirects = data.length - permanentRedirects;
console.log(
  '\x1b[32m%s\x1b[0m',
  `✅ \x1b[1m${data.length}\x1b[0m\x1b[32m redirects added from Sanity (\x1b[1m${permanentRedirects}\x1b[0m\x1b[32m permanent and \x1b[1m${temporaryRedirects}\x1b[0m\x1b[32m temporary)`
);

export default redirects;
