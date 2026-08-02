'use client';

import React, { useEffect, useState, useId } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
});

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/:/g, '')}`;

  useEffect(() => {
    let isMounted = true;
    const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'default';

    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme,
    });

    mermaid
      .render(id, chart)
      .then((result) => {
        if (isMounted) {
          setSvg(result.svg);
        }
      })
      .catch((e) => {
        console.error('Mermaid rendering error', e);
        if (isMounted) {
          setSvg(`<pre>${chart}</pre>`);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chart, id, resolvedTheme]);

  return <div className="my-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
}
