import { posts } from '@/velite'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/mdx-content'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = posts.find((post) => post.slugAsParams === slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none pb-20">
      <div className="mb-8 not-prose border-b border-border pb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to list
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <time dateTime={post.date}>{format(parseISO(post.date), 'MMMM d, yyyy')}</time>
          <span>•</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <MDXContent code={post.body} />
    </article>
  )
}
