export function FeaturesSection() {
  const features = [
    {
      title: 'Real-time Trading',
      description: 'Advanced trading interface with TradingView charts and professional tools'
    },
    {
      title: 'Token Swaps',
      description: 'Seamless token swaps with Jupiter integration for best rates'
    },
    {
      title: 'Whale Tracking',
      description: 'Monitor large transactions and whale activity in real-time'
    },
    {
      title: 'AI Insights',
      description: 'AI-powered market analysis and trading insights'
    }
  ]

  return (
    <section>
      <h2 className="text-3xl font-semibold text-purple-300 mb-4">Platform Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="p-6 rounded-lg bg-purple-900/20 border border-purple-500/30">
            <h3 className="text-xl font-medium text-purple-200 mb-2">{feature.title}</h3>
            <p className="text-purple-100/80">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
