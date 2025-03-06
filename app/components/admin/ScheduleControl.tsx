'use client'

import React, { useState } from 'react'

export default function ScheduleControl() {
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const handleRunScraper = async () => {
    if (isRunning) return
    
    try {
      setIsRunning(true)
      setStatus('Starting scraper...')
      setError(null)
      
      const response = await fetch('/api/run-scraper', {
        method: 'POST'
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to run scraper')
      }
      
      const data = await response.json()
      setStatus(`Scraper completed successfully. Found ${data.papersScraped} papers.`)
    } catch (err) {
      console.error('Error running scraper:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setStatus(null)
    } finally {
      setIsRunning(false)
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Scheduled Scraping</span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Active
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Scraper runs automatically on the 1st of each month
        </p>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={handleRunScraper}
          disabled={isRunning}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isRunning ? 'Running...' : 'Run Scraper Now'}
        </button>
        
        {status && (
          <div className="mt-2 p-2 bg-blue-50 text-blue-700 text-sm rounded">
            {status}
          </div>
        )}
        
        {error && (
          <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
            Error: {error}
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Scraper Settings</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Rate Limiting</span>
            <span className="text-xs font-medium">5 requests / minute</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Max Papers per Run</span>
            <span className="text-xs font-medium">100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Last Run</span>
            <span className="text-xs font-medium">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}