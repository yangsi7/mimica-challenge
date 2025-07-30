import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-text-primary">
          Mimica Analytics Platform
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Standardize business processes across multiple regions with data-driven insights 
          from task-mining analytics
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary-blue hover:bg-blue-600 rounded-lg transition-colors"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  )
}