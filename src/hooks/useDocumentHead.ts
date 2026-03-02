import { useEffect } from 'react';

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface HeadConfig {
  title?: string;
  meta?: MetaTag[];
  canonical?: string;
  jsonLd?: object;
}

export function useDocumentHead(config: HeadConfig) {
  useEffect(() => {
    const cleanup: (() => void)[] = [];

    if (config.title) {
      const prev = document.title;
      document.title = config.title;
      cleanup.push(() => { document.title = prev; });
    }

    config.meta?.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const val = (name ?? property)!;
      const selector = `meta[${attr}="${val}"]`;

      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) {
        const prev = el.content;
        el.content = content;
        cleanup.push(() => { el!.content = prev; });
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, val);
        el.content = content;
        document.head.appendChild(el);
        cleanup.push(() => el!.remove());
      }
    });

    if (config.canonical) {
      let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (el) {
        const prev = el.href;
        el.href = config.canonical;
        cleanup.push(() => { el!.href = prev; });
      } else {
        el = document.createElement('link');
        el.rel = 'canonical';
        el.href = config.canonical;
        document.head.appendChild(el);
        cleanup.push(() => el!.remove());
      }
    }

    if (config.jsonLd) {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.textContent = JSON.stringify(config.jsonLd);
      document.head.appendChild(el);
      cleanup.push(() => el.remove());
    }

    return () => cleanup.forEach(fn => fn());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.title, config.canonical, JSON.stringify(config.meta), JSON.stringify(config.jsonLd)]);
}
