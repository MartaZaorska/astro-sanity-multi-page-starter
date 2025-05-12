import { media } from 'sanity-plugin-media';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { structure } from './structure';
import { schemaTypes, singletonActions, singletonTypes } from './structure/schema-types';
import { TITLE, PROJECT_ID, DATASET, API_VERSION } from './constants';

export default defineConfig({
  name: 'default',
  title: TITLE,
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  plugins: [
    structureTool({ structure }),
    media(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: templates => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
