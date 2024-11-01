export function UpdatesSection() {
  const updates = [
    {
      title: 'Live Network Stats',
      description: 'Track TPS, block time, and network performance metrics'
    },
    {
      title: 'Price Analytics',
      description: 'Real-time price feeds from Pyth Network and CoinGecko'
    },
    {
      title: 'Portfolio Tracking',
      description: 'Monitor your positions and trading performance'
    }
  ]

  return (
    <section>
      <h2 className="text-3xl font-semibold text-purple-300 mb-4">Platform Updates</h2>
      <div className="space-y-4">
        {updates.map((update, i) => (
          <div key={i} className="p-4 rounded-md bg-purple-900/10 border-l-4 border-purple-500">
            <h3 className="text-lg font-medium text-purple-200 mb-1">{update.title}</h3>
            <p className="text-purple-100/70">{update.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
