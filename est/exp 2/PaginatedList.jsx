import React, { useState } from 'react';

const items = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Item ${index + 1}`,
  description: `Description for item ${index + 1}`,
}))

const ITEMS_PER_PAGE = 5

export default function PaginatedList() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Paginated List</h2>
      <div>
        {currentItems.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: 6,
              marginBottom: 10,
            }}
          >
            <strong>{item.title}</strong>
            <p style={{ margin: '6px 0 0' }}>{item.description}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
