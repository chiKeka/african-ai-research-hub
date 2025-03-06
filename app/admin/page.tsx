'use client'

import React, { useState, useEffect, Suspense } from 'react'
import ScheduleControl from '../components/admin/ScheduleControl'

interface Stats {
  totalPapers: number
  totalInstitutions: number
  totalCountries: number
  topCountries: Array<{ country: string, count: number }>
  topKeywords: Array<{ keyword: string, count: number }>
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/stats')
        if (!response.ok) {
          throw new Error('Failed to fetch statistics')
        }
        const data = await response.json()
        setStats(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching stats:', error)
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Placeholder component for loading state
  const LoadingPlaceholder = () => (
    <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-center h-80">
      <div className="text-gray-500">Loading chart data...</div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Scraper Controls</h2>
          <ScheduleControl />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Research Statistics</h2>
          
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Total Papers</p>
                <p className="text-2xl font-bold text-blue-600">{stats?.totalPapers || 0}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Institutions</p>
                <p className="text-2xl font-bold text-green-600">{stats?.totalInstitutions || 0}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-2xl font-bold text-purple-600">{stats?.totalCountries || 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Countries</h2>
          
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {stats?.topCountries.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.country}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {item.count} papers
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Research Topics</h2>
          
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2">
              {stats?.topKeywords.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.keyword}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {item.count} papers
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}