import Sidebar from "@/components/dashboard/sidebar";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen flex-col">
      <header className="flex-shrink-0"></header>

      <section className="flex flex-1 flex-row overflow-hidden">
        <Sidebar />
        <div className="w-full p-3 md:p-6">{children}</div>
      </section>

      <footer className="flex-shrink-0"></footer>
    </main>
  );
}
