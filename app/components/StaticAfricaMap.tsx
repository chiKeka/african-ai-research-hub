'use client'

import React from 'react'

interface StaticAfricaMapProps {
  countryData: Array<{ country: string, papers: number }>
  onCountrySelect: (country: string) => void
  selectedCountry: string
}

// Map of country names to their positions on the image (more accurate)
const countryPositions = {
  "South Africa": { x: 53, y: 75 },
  "Egypt": { x: 56, y: 32 },
  "Kenya": { x: 60, y: 58 },
  "Nigeria": { x: 45, y: 47 },
  "Ghana": { x: 41, y: 47 },
  "Ethiopia": { x: 62, y: 50 },
  "Tunisia": { x: 44, y: 30 },
  "Tanzania": { x: 59, y: 65 },
  "Uganda": { x: 57, y: 57 },
  "Algeria": { x: 40, y: 37 },
  "Rwanda": { x: 56, y: 60 }
}

// Countries to hide from the map
const hiddenCountries = ["Senegal", "Morocco"]

export default function StaticAfricaMap({ countryData, onCountrySelect, selectedCountry }: StaticAfricaMapProps) {
  // Create a map of country to paper count for easier lookup
  const countryDataMap = countryData.reduce((acc, item) => {
    acc[item.country] = item.papers
    return acc
  }, {} as Record<string, number>)
  
  // Find the maximum number of papers for any country
  const maxPapers = Math.max(...countryData.map(item => item.papers), 1)
  
  // Function to determine circle size based on number of papers
  const getCircleSize = (papers: number) => {
    const minSize = 24
    const maxSize = 48
    const size = papers === 0 
      ? minSize 
      : minSize + ((papers / maxPapers) * (maxSize - minSize))
    return Math.round(size)
  }
  
  // Function to determine circle color based on selection state
  const getCircleColor = (country: string) => {
    if (country === selectedCountry) {
      return 'rgba(59, 130, 246, 0.9)' // blue-500 with high opacity
    }
    return 'rgba(59, 130, 246, 0.6)' // blue-500 with medium opacity
  }
  
  // Handle country click
  const handleCountryClick = (country: string) => {
    if (country === selectedCountry) {
      // If clicking the already selected country, clear the filter
      onCountrySelect('')
    } else {
      onCountrySelect(country)
    }
  }
  
  return (
    <div className="relative mb-8 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Research Papers Across Africa</h2>
      
      {/* Map container */}
      <div className="relative w-full h-[600px] bg-blue-50 rounded-lg overflow-hidden">
        {/* Africa map image */}
        <img 
          src="/africa-map-800px.png" 
          alt="Map of Africa" 
          className="w-full h-full object-contain opacity-90"
        />
        
        {/* Country circles with research paper counts */}
        <div className="absolute inset-0">
          {Object.entries(countryPositions)
            .filter(([country]) => !hiddenCountries.includes(country))
            .map(([country, position]) => {
            const papers = countryDataMap[country] || 0
            const size = getCircleSize(papers)
            const color = getCircleColor(country)
            
            // Convert percentage positions to pixel positions
            const pixelX = `${position.x}%`
            const pixelY = `${position.y}%`
            
            return (
              <div 
                key={country}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ 
                  left: pixelX, 
                  top: pixelY,
                }}
                onClick={() => handleCountryClick(country)}
              >
                <div 
                  className="flex items-center justify-center rounded-full shadow-md"
                  style={{ 
                    width: `${size}px`, 
                    height: `${size}px`,
                    backgroundColor: color,
                  }}
                >
                  <span 
                    className="text-white font-semibold"
                    style={{ 
                      fontSize: `${Math.max(10, size / 2.5)}px`,
                    }}
                  >
                    {papers}
                  </span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                  <span className="text-xs font-medium bg-white bg-opacity-75 px-1 py-0.5 rounded shadow-sm">
                    {country}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 opacity-60"></div>
          <span className="text-sm">Research papers count</span>
        </div>
        
        {selectedCountry && (
          <button 
            onClick={() => onCountrySelect('')}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
          >
            Clear Country Filter
          </button>
        )}
      </div>
    </div>
  )
}