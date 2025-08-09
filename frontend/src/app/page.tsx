'use client'

import { useState, useEffect } from 'react';

interface ApiResponse {
  message: string
  status: string
}

export default function Home() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL
        if (!base) throw new Error('NEXT_PUBLIC_API_URL is not set')
        const res = await fetch(`${base}/`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data: ApiResponse = await res.json()
        setApiData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">🗾 Nijouzu</h1>
            <p className="text-xl text-base-content/80 mb-2">Learn Japanese</p>
            <p className="text-sm text-base-content/80">
              Designed with traditional Japanese colors: 赤 (aka), 黒 (kuro), 白 (shiro), 青 (ao)
            </p>
          </div>

          {/* API Status */}
          <div className="card bg-base-100 border border-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">System Status</h2>

              {loading && (
                <div className="flex items-center gap-3">
                  <span className="loading loading-spinner loading-sm" />
                  <p className="text-base-content/80">Connecting to backend...</p>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 text-error">
                  <span className="text-xl">❌</span>
                  <p>Connection Error: {error}</p>
                </div>
              )}

              {apiData && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-success">
                    <span className="text-xl">✅</span>
                    <p className="font-medium">Backend Connected Successfully!</p>
                  </div>
                  <div className="bg-base-200/40 p-4 rounded border border-base-200">
                    <p className="text-sm text-base-content/80 mb-1">API Response:</p>
                    <p><strong>Message:</strong> {apiData.message}</p>
                    <p><strong>Status:</strong> {apiData.status}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Color Palette Preview */}
          <div className="mt-8 card bg-base-100 border border-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">Traditional Japanese Color Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-black rounded-lg mx-auto mb-2 border border-base-content"></div>
                  <p className="text-sm text-base-content/80">Kuro (黒)</p>
                  <p className="text-xs text-base-content/80">#1C1917</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-white rounded-lg mx-auto mb-2 border border-base-content"></div>
                  <p className="text-sm text-base-content/80">Shiro (白)</p>
                  <p className="text-xs text-base-content/80">#FCFAF2</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-blue rounded-lg mx-auto mb-2 border border-base-content"></div>
                  <p className="text-sm text-base-content/80">Ao (青)</p>
                  <p className="text-xs text-base-content/80">#113285</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-red rounded-lg mx-auto mb-2 border border-base-content"></div>
                  <p className="text-sm text-base-content/80">Aka (赤)</p>
                  <p className="text-xs text-base-content/80">#B7282E</p>
                </div>
              </div>
            </div>
          </div>

          {/* UI Components */}
          <div className="mt-8 card bg-base-100 border border-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">UI Components</h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="btn rounded-field btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Primary</button>
                <button className="btn rounded-field btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Secondary</button>
                <button className="btn rounded-field btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg">Accent</button>
                <button className="btn rounded-field btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg">Neutral</button>
                <button className="btn rounded-field btn-info btn-xs sm:btn-sm md:btn-md lg:btn-lg">Info</button>
                <button className="btn rounded-field btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg">Success</button>
                <button className="btn rounded-field btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-lg">Warning</button>
                <button className="btn rounded-field btn-error btn-xs sm:btn-sm md:btn-md lg:btn-lg">Error</button>
              </div>
              <div className="flex flex-wrap flex-col gap-8 items-center justify-center mt-10">
                <div>
                  <input className="input validator" type="email" required placeholder="mail@site.com" />
                  <div className="validator-hint">Enter valid email address</div>
                </div>
                <div>
                  <input type="password" className="input validator" required placeholder="Password" minLength={8}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                  <p className="validator-hint">
                    Must be more than 8 characters, including
                    <br />At least one number
                    <br />At least one lowercase letter
                    <br />At least one uppercase letter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}
