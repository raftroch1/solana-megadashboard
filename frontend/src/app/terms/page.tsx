"use client"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Platform Services</h2>
          <p>
            Our platform provides:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Cryptocurrency trading services</li>
            <li>Market analysis tools</li>
            <li>Wallet integration</li>
            <li>AI-powered insights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. User Obligations</h2>
          <p>
            Users must:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Provide accurate information</li>
            <li>Maintain the security of their account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not engage in any fraudulent or harmful activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Risk Disclosure</h2>
          <p>
            Trading cryptocurrencies involves significant risk. You should carefully consider whether trading is suitable for you in light of your financial condition.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p>
            We shall not be liable for any damages arising out of or in connection with the use or inability to use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">6. Contact Information</h2>
          <p>
            For any questions regarding these terms, please contact us at:
          </p>
          <p className="mt-2">
            Email: support@solanamega.com
          </p>
        </section>
      </div>
    </div>
  )
}
