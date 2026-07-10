// src/types/svg.d.ts (또는 src/types.d.ts)
declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  import { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
