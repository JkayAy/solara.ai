"use client"

import * as React from "react"

interface TabsProps {
 defaultValue?: string
 value?: string
 onValueChange?: (value: string) => void
 children: React.ReactNode
}

interface TabsListProps {
 children: React.ReactNode
 className?: string
}

interface TabsTriggerProps {
 value: string
 children: React.ReactNode
 className?: string
}

interface TabsContentProps {
 value: string
 children: React.ReactNode
 className?: string
}

const TabsContext = React.createContext<{
 value: string
 onValueChange: (value: string) => void
}>({
 value: "",
 onValueChange: () => { },
})

export function Tabs({ defaultValue, value, onValueChange, children }: TabsProps) {
 const [selectedValue, setSelectedValue] = React.useState(defaultValue || "")

 const handleValueChange = (newValue: string) => {
  setSelectedValue(newValue)
  onValueChange?.(newValue)
 }

 return (
  <TabsContext.Provider
   value={{
    value: value || selectedValue,
    onValueChange: handleValueChange,
   }}
  >
   {children}
  </TabsContext.Provider>
 )
}

export function TabsList({ children, className }: TabsListProps) {
 return (
  <div
   className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}
  >
   {children}
  </div>
 )
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
 const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
 const isSelected = selectedValue === value

 return (
  <button
   className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isSelected
     ? "bg-white text-gray-900 shadow-sm"
     : "text-gray-500 hover:text-gray-900"
    } ${className}`}
   onClick={() => onValueChange(value)}
  >
   {children}
  </button>
 )
}

export function TabsContent({ value, children, className }: TabsContentProps) {
 const { value: selectedValue } = React.useContext(TabsContext)
 const isSelected = selectedValue === value

 if (!isSelected) return null

 return (
  <div
   className={`mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${className}`}
  >
   {children}
  </div>
 )
} 