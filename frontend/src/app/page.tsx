'use client' // Client side component. Necessary because of the use of useState and useEffect that require client-side execution

import { useState, useEffect } from 'react';

// Defines the expected structure of data coming from the backend.
// Ensuring type safety by specifing that responses should contain "message" and "status" fields as strings.
interface ApiResponse {
  message: string
  status: string
}

export default function Home() {
  // Captures the successful API response.
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  // Tracks whether the fetch operation is in progress.
  const [loading, setLoading] = useState(true)
  // Captures any error messages that occur during the API call.
  const [error, setError] = useState<string | null>(null)

  // Runs once when the component mounts.
  // Handles API communication.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get request from the env.
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: ApiResponse = await response.json()
        setApiData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Nijouzu - Japanese Learning</h1>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">API Connection Test</h2>

          {/* Displays loading state */}
          {loading && <p>Loading...</p>}
          {/* Displays error message if any */}
          {error && <p className="text-red-500">Error: {error}</p>}
          {/* Displays API data if available */}
          {apiData && (
            <div>
              <p className="text-green-600">Backend connected successfully!</p>
              <p><strong>Message:</strong> {apiData.message}</p>
              <p><strong>Status:</strong> {apiData.status}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
