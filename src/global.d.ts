declare module '*.less'
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}
declare const src: string;

declare module '*.bmp' {
  export default src;
}

declare module '*.gif' {
  export default src;
}

declare module '*.jpg' {
  export default src;
}

declare module '*.jpeg' {
  export default src;
}

declare module '*.png' {
  export default src;
}

declare module '*.webp' {
  export default src;
}

declare module '*.mp3' {
  export default src;
}

declare module '*.mp4' {
  export default src;
}

declare module '*.ttf' {
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare const __NODE_ENV__: 'development' | 'production';
