import { lazy } from 'react';

export const ReactRouterDevtools =
  import.meta.env.MODE === 'development' && !1
    ? lazy(() =>
        import('@tanstack/react-router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
        })),
      )
    : () => null;
