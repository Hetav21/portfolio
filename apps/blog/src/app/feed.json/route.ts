import { generateJsonFeed } from '@/lib/feed';

export async function GET() {
  return new Response(generateJsonFeed().trim(), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
    },
  });
}
