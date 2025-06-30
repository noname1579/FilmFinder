'use client'
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-gradient-to-r from-blue-950 to-blue-900 min-h-screen">
      <Header />

      <SearchInput 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />
    </div>
  )
}