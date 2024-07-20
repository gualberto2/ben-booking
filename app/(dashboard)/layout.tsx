export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {/* Nav */}
      <body>{children}</body>
      {/* Footer */}
    </main>
  );
}
