import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Header } from '@app-components/header/header.tsx';

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({ to: '/auth/login' });
    }
    return true;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <div className="pt-(--header-height) min-w-[100vw] min-h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
}
