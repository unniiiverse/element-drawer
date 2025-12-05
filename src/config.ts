import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export const IsDevelopment = process.env.NODE_ENV === 'development';
export const IsProduction = process.env.NODE_ENV === 'production';

export const CONSTS = {
  siteName: 'next-boilerplate'
};

export const cfg = {

};

/** Site metadata */
export const metaObject = (payload: {
  title?: string,
  description?: string,
  keywords?: string[],
  openGraph?: OpenGraph,
  robots?: ('all' | 'noindex' | 'nofollow')[],
}): Metadata => {
  const defaultKeywords = [];

  const title = payload.title !== undefined ? `${payload.title} ― ${CONSTS.siteName}` : CONSTS.siteName;
  const description = payload.description ?? `${CONSTS.siteName} description...`;
  const keywords = payload.keywords?.length ? [...payload.keywords, ...defaultKeywords] : defaultKeywords;
  const siteName = CONSTS.siteName;
  const robots: string = payload.robots?.length ? payload.robots?.join(',') : 'all';

  return {
    title,
    description,
    keywords,
    applicationName: siteName,
    robots,
    openGraph: payload.openGraph ?? {
      title,
      description,
      siteName,
    }
  };
};