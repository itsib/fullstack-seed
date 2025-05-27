import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: Component,
});

function Component() {
  return (
    <section className="container mx-auto px-3">
      <h1>Home Page</h1>
    </section>
  );
}