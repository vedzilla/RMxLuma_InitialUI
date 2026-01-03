// Intentionally a passthrough layout - the landing page has its own custom header/footer
// built into page.tsx, distinct from the shared app layout (Header/Footer components).
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
