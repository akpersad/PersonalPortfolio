import { MetadataRoute } from 'next';
import { BASE_URL, getSitemapData } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData = getSitemapData();

  return sitemapData.map(item => ({
    url: `${BASE_URL}${item.url}`,
    lastModified: new Date(),
    changeFrequency:
      item.changefreq as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: item.priority,
  }));
}
