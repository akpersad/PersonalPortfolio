import { MetadataRoute } from 'next';
import { getSitemapData } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData = getSitemapData();

  return sitemapData.map(item => ({
    url: `https://andrewpersad.dev${item.url}`,
    lastModified: new Date(),
    changeFrequency:
      item.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: item.priority,
  }));
}
