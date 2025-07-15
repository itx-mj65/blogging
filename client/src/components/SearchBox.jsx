import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router'
import { RouteSearch } from '@/helpers/RouteName'

const SearchBox = () => {
  const navigate=useNavigate()
  const [query, setquery] = useState("")
  const getinput = (e) => {
    setquery(e.target.value)
  }
  const handlesubmit = (e) => {
    e.preventDefault()
    navigate(RouteSearch(query))
  }
  return (
    <form onSubmit={handlesubmit}>
      <Input name="q" onInput={getinput} placeholder="Search here..." className="h-9 rounded-full bg-gray-100" />
    </form>
  )
}

export default SearchBox