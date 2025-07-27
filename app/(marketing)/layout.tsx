export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <h1>marketing layout</h1>
      {children}
    </div>
  )
}
