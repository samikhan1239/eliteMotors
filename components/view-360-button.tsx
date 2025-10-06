"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { RotateCw, X, Move, ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "./ui/card"

export function View360Button() {
  const [show360View, setShow360View] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const frames = [
    { angle: 0, label: "Front", image: "/car-360-front.jpg" },
    { angle: 45, label: "Front Right", image: "/car-360-front-right.jpg" },
    { angle: 90, label: "Right Side", image: "/car-360-right.jpg" },
    { angle: 135, label: "Back Right", image: "/car-360-back-right.jpg" },
    { angle: 180, label: "Back", image: "/car-360-back.jpg" },
    { angle: 225, label: "Back Left", image: "/car-360-back-left.jpg" },
    { angle: 270, label: "Left Side", image: "/car-360-left.jpg" },
    { angle: 315, label: "Front Left", image: "/car-360-front-left.jpg" },
  ]

  const totalFrames = frames.length

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - startX
    const sensitivity = 30
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1
      setCurrentFrame((prev) => (prev + direction + totalFrames) % totalFrames)
      setStartX(e.clientX)
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const deltaX = e.touches[0].clientX - startX
    const sensitivity = 25
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1
      setCurrentFrame((prev) => (prev + direction + totalFrames) % totalFrames)
      setStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => setIsDragging(false)

  useEffect(() => {
    if (!show360View || !autoRotate) return
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames)
    }, 1200) // slowed down rotation
    return () => clearInterval(interval)
  }, [show360View, autoRotate, totalFrames])

  const nextFrame = () => {
    setAutoRotate(false)
    setCurrentFrame((prev) => (prev + 1) % totalFrames)
  }

  const prevFrame = () => {
    setAutoRotate(false)
    setCurrentFrame((prev) => (prev - 1 + totalFrames) % totalFrames)
  }

  return (
    <>
      <Button
        onClick={() => setShow360View(true)}
        size="lg"
        className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground hover:shadow-2xl text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-7 rounded-xl sm:rounded-2xl shadow-xl transition-all hover:scale-105 font-bold relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
        <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-spin-slow" />
        <span className="relative">Experience 360° View</span>
      </Button>

      {show360View && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4">
          <Card className="relative w-full max-w-6xl bg-gradient-to-br from-card via-card to-muted border border-primary/30 shadow-2xl rounded-xl sm:rounded-2xl">
            <div className="p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0 text-center sm:text-left">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-1 sm:mb-2">
                    360° Interactive Experience
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-lg">
                    {autoRotate ? "🔄 Auto-rotating" : "🎯 Manual control"} • Drag or tap arrows
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setShow360View(false)
                    setCurrentFrame(0)
                    setAutoRotate(true)
                  }}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/20 hover:text-primary transition-all hover:scale-110 w-10 h-10 sm:w-12 sm:h-12"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7" />
                </Button>
              </div>

              <div className="relative">
                <div
                  ref={containerRef}
                  className="relative aspect-video bg-gradient-to-br from-muted via-background to-muted rounded-xl sm:rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-primary/20 shadow-inner"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={frames[currentFrame].image || "/placeholder.svg"}
                    alt={`Car ${frames[currentFrame].label} View`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    draggable={false}
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevFrame}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-primary/40 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </button>
                  <button
                    onClick={nextFrame}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-primary/40 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </button>

                  {/* Instruction Overlay */}
                  {!isDragging && currentFrame === 0 && autoRotate && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center bg-background/60 p-6 sm:p-10 rounded-xl sm:rounded-3xl border border-primary/30 backdrop-blur-xl shadow-lg">
                        <Move className="w-10 h-10 sm:w-20 sm:h-20 text-primary mx-auto mb-3 sm:mb-4 animate-pulse" />
                        <p className="text-foreground font-bold text-xl sm:text-3xl mb-1 sm:mb-3">Drag to Explore</p>
                        <p className="text-muted-foreground text-sm sm:text-lg">See every angle of this masterpiece</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 bg-background/50 px-4 sm:px-8 py-2 sm:py-4 rounded-full border border-primary/20 backdrop-blur-xl">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <RotateCw className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                      <div className="text-center">
                        <div className="text-foreground font-bold text-base sm:text-xl">{frames[currentFrame].angle}°</div>
                        <div className="text-muted-foreground text-xs sm:text-sm">{frames[currentFrame].label}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frame Buttons */}
                <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 flex-wrap">
                  {frames.map((frame, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentFrame(index)
                        setAutoRotate(false)
                      }}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base transition-all font-semibold ${
                        currentFrame === index
                          ? "bg-primary text-primary-foreground shadow-md sm:shadow-lg scale-105"
                          : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
                      }`}
                    >
                      {frame.angle}°
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <Button
                  onClick={() => setAutoRotate(!autoRotate)}
                  variant="outline"
                  className="border-primary/40 hover:bg-primary/10 hover:border-primary font-semibold w-full sm:w-auto"
                >
                  {autoRotate ? "⏸ Pause" : "▶ Auto-Rotate"}
                </Button>

                <div className="text-muted-foreground text-sm font-medium">
                  Frame {currentFrame + 1} of {totalFrames}
                </div>

                <Button
                  onClick={() => {
                    setCurrentFrame(0)
                    setAutoRotate(true)
                  }}
                  variant="outline"
                  className="border-primary/40 hover:bg-primary/10 hover:border-primary font-semibold w-full sm:w-auto"
                >
                  🔄 Reset View
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
