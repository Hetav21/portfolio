import { posts } from '@/velite'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export default function BlogIndex() {
  const publishedPosts = posts.filter(post => post.published).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Writing</h1>
        <p className="text-muted-foreground">Thoughts on Software, AI, and Web.</p>
      </div>
      <div className="grid gap-4">
        {publishedPosts.map((post) => (
          <Link href={`/${post.slugAsParams}`} key={post.slug} className="group block">
            <article className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <time className="text-sm text-muted-foreground" dateTime={post.date}>
                    {format(parseISO(post.date), 'MMMM d, yyyy')}
                  </time>
                </div>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
                <div className="flex gap-2 mt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
