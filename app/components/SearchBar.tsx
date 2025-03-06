'use client'

import React, { useState, FormEvent } from 'react'

interface SearchBarProps {
  onSearch: (term: string) => void
  onCountrySelect: (country: string) => void
  onTopicSelect: (topic: string) => void
  countries: string[]
  topics: string[]
  selectedCountry: string
  selectedTopic: string
}

export default function SearchBar({ 
  onSearch, 
  onCountrySelect, 
  onTopicSelect, 
  countries, 
  topics,
  selectedCountry,
  selectedTopic
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Papers
          </label>
          <div className="flex">
            <input
              type="text"
              id="search"
              placeholder="Search by title, abstract, author, or institution"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Country
            </label>
            <select
              id="country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedCountry}
              onChange={(e) => onCountrySelect(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Topic
            </label>
            <select
              id="topic"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={selectedTopic}
              onChange={(e) => onTopicSelect(e.target.value)}
            >
              <option value="">All Topics</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}