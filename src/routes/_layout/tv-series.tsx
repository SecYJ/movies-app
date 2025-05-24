import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/tv-series')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/tv-series"!</div>
}
