import { generateRssFeed } from '@/lib/feed';

export async function GET() {
  return new Response(generateRssFeed().trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
