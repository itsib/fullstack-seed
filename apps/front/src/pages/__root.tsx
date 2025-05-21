import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ReactRouterDevtools } from '@app-components/react-router-devtools/react-router-devtools';
import { Error500 } from '@app-components/error-500/error-500';
import { Header } from '@app-components/header/header';

export const Route = createRootRoute({
  component: Component,
  errorComponent: Error500,
});

function Component() {
  return (
    <>
      <Header />
      <Outlet />
      <ReactRouterDevtools />
    </>
  );
}