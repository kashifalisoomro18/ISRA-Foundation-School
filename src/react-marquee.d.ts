interface HTMLMarqueeElement extends HTMLElement {
  behavior?: string;
  bgColor?: string;
  direction?: string;
  height?: string;
  hspace?: number;
  loop?: number;
  scrollAmount?: number;
  scrollDelay?: number;
  trueSpeed?: boolean;
  vspace?: number;
  width?: string;
  start(): void;
  stop(): void;
}

declare namespace JSX {
  interface IntrinsicElements {
    marquee: import('react').DetailedHTMLProps<
      import('react').HTMLAttributes<HTMLMarqueeElement> & {
        behavior?: 'scroll' | 'slide' | 'alternate';
        direction?: 'left' | 'right' | 'up' | 'down';
        scrollamount?: number | string;
        scrolldelay?: number | string;
        loop?: number | string;
      },
      HTMLMarqueeElement
    >;
  }
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      marquee: import('react').DetailedHTMLProps<
        import('react').HTMLAttributes<HTMLMarqueeElement> & {
          behavior?: 'scroll' | 'slide' | 'alternate';
          direction?: 'left' | 'right' | 'up' | 'down';
          scrollamount?: number | string;
          scrolldelay?: number | string;
          loop?: number | string;
        },
        HTMLMarqueeElement
      >;
    }
  }
}
