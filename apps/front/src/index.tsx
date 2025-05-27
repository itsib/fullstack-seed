import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ApplicationProvider } from '@app-context/application';
import { routeTree } from './route-tree.gen.ts';
import './i18n';
import './index.css';
import 'react-just-ui/theme/minimal.css';

const router = createRouter({
  routeTree,
  context: {},
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <ApplicationProvider>
        <RouterProvider router={router} />
      </ApplicationProvider>
    </StrictMode>,
  );
