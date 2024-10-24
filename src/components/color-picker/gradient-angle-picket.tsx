"use client"

import { useState, useRef, useEffect } from 'react'

export  function GradientAnglePicker({background, onChange}: { onChange: (angle:number) => void, background: string}) {
  const [angle, setAngle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateAngle(e)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateAngle(e)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const updateAngle = (e: MouseEvent | React.MouseEvent) => {
    if (pickerRef.current) {
      const rect = pickerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = e.clientX - centerX
      const y = e.clientY - centerY
      const rawAngle = Math.atan2(y, x) * (180 / Math.PI)
      const normalizedAngle = (rawAngle + 360) % 360
      setAngle(normalizedAngle)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const gradientStyle = {
    background: background,
  }

  const handleStyle = {
    transform: `rotate(${angle}deg) translateX(50px)`,
  }
  
  useEffect(() => {
    onChange(angle)

  },[angle, onChange])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div 
        ref={pickerRef}
        className="relative w-10 h-10 rounded-lg my-4  cursor-pointer"
        style={gradientStyle}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
        <div 
          className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 bg-white rounded-full shadow-md cursor-move"
          style={handleStyle}
        />
      </div>
  
    </div>
  )
}