import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { compile } from 'svelte/compiler';
import { describe, expect, it } from 'vitest';
import { EVENTS, wtActivity, type ActivityEvent } from './index.js';

describe('wtActivity (svelte)', () => {
  it('renders the element with attributes, updates and cleans up', () => {
    const node = document.createElement('div');
    const a = wtActivity(node, { session: 'tok1', theme: 'dark', verify: true });
    const el = node.querySelector('wt-activity')!;
    expect(el).toBe(a.element);
    expect(el.getAttribute('session')).toBe('tok1');
    expect(el.getAttribute('theme')).toBe('dark');
    expect(el.getAttribute('verify')).toBe('');
    a.update({ session: 'tok2' });
    expect(el.getAttribute('session')).toBe('tok2');
    expect(el.hasAttribute('verify')).toBe(false);
    a.destroy();
    expect(node.querySelector('wt-activity')).toBeNull();
  });

  it('calls the latest callbacks with the event detail', () => {
    const node = document.createElement('div');
    const seen: string[] = [];
    const a = wtActivity(node, { session: 't', onOpen: () => seen.push('old') });
    a.update({ session: 't', onOpen: (e: ActivityEvent) => seen.push(e.id), onLoad: (d) => seen.push(`load ${d.count}`) });
    a.element.dispatchEvent(new CustomEvent(EVENTS.open, { detail: { event: { id: 'e1', account_id: 'a', action: 'x', occurred_at: '' } } }));
    a.element.dispatchEvent(new CustomEvent(EVENTS.load, { detail: { count: 25, hasMore: true } }));
    expect(seen).toEqual(['e1', 'load 25']);
  });

  it('the component compiles with Svelte 5', () => {
    const src = readFileSync(join(process.cwd(), 'src', 'ActivityLog.svelte'), 'utf8');
    const out = compile(src, { filename: 'ActivityLog.svelte', generate: 'client' });
    expect(out.js.code).toContain('wtActivity');
    expect(out.warnings).toEqual([]);
  });
});
