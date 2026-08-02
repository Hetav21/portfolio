'use client';

import React, { useMemo } from 'react';
import * as runtime from 'react/jsx-runtime';
import { Mermaid } from './mermaid';

const sharedComponents = {
  Mermaid,
};

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MDXProps) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={{ ...sharedComponents, ...components }} />;
}
