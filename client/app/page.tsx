'use client'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ emotion: string; confidence: number } | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getEmotionColor = (emotion: string) => {
    const colors = {
      happy: 'from-yellow-400 to-orange-500',
      sad: 'from-blue-400 to-blue-600',
      angry: 'from-red-400 to-red-600',
      fear: 'from-purple-400 to-purple-600',
      surprise: 'from-pink-400 to-pink-600',
      disgust: 'from-green-400 to-green-600',
      neutral: 'from-gray-400 to-gray-600'
    }
    return colors[emotion.toLowerCase() as keyof typeof colors] || 'from-indigo-400 to-indigo-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 space-y-6 border border-white/20 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mb-4 transform transition-transform duration-300 hover:rotate-12">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Emotion Reflection Tool
            </h1>
            <p className="text-gray-300 text-sm">Discover the emotions within your thoughts</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                className="w-full h-32 bg-white/5 border border-white/20 rounded-2xl p-4 text-white placeholder-gray-400 focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none backdrop-blur-sm"
                placeholder="Share your thoughts and feelings here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {text.length}/500
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
              <span className={`transition-opacity duration-200 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                {loading ? 'Analyzing...' : 'Analyze Emotions'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </form>

          {result && (
            <div className={`mt-6 p-6 bg-gradient-to-r ${getEmotionColor(result.emotion)} rounded-2xl transform transition-all duration-500 animate-in slide-in-from-bottom-4`}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm font-medium">Detected Emotion</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/60">Live Analysis</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white capitalize">{result.emotion}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Confidence</span>
                      <span className="text-white font-medium">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white rounded-full h-2 transition-all duration-1000 ease-out"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm transform transition-all duration-300 animate-in slide-in-from-bottom-2">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        
      </div>
    </div>
  )
}