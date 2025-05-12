import { defineCliConfig } from 'sanity/cli';
import { PROJECT_ID, STUDIO_HOST, DATASET } from './constants';

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: DATASET,
  },
  studioHost: STUDIO_HOST,
});
