import { Redirect } from '@app-components/redirect/redirect';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Redirect to="/auth/login"  />;
}
