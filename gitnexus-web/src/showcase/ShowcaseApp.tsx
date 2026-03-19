import React from 'react';
import { InteractiveGraphDemo } from './InteractiveGraphDemo';

/**
 * GitNexus Web showcase entry.
 *
 * This page is intentionally standalone and demo-first so onboarding,
 * product preview, and empty-state review can happen without backend data.
 */
export const ShowcaseApp: React.FC = () => {
  return <InteractiveGraphDemo />;
};
