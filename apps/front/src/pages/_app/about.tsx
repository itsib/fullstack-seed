import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/about')({
  component: Component,
});

function Component() {
  return (
    <section className="container mx-auto px-3">
      <h1>About</h1>
    </section>
  );
}