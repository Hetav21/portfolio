'use client';

import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
});

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const { theme, resolvedTheme } = useTheme();
  const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'default';
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme,
    });

    // We render asynchronously
    mermaid
      .render(id, chart)
      .then((result) => setSvg(result.svg))
      .catch((e) => {
        console.error('Mermaid rendering error', e);
        setSvg(`<pre>${chart}</pre>`); // Fallback to raw text on error
      });
  }, [chart, id, resolvedTheme]);

  return <div className="my-6 flex justify-center" dangerouslySetInnerHTML={{ __html: svg }} />;
}
