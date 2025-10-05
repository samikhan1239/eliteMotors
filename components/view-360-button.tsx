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

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const deltaX = e.touches[0].clientX - startX
    const sensitivity = 30
    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1
      setCurrentFrame((prev) => (prev + direction + totalFrames) % totalFrames)
      setStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (!show360View || !autoRotate) return
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames)
    }, 500)
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
        className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground hover:shadow-2xl text-lg px-10 py-7 rounded-2xl shadow-xl transition-all hover:scale-105 animate-luxury-glow font-bold relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
        <RotateCw className="w-6 h-6 mr-3 animate-spin-slow" />
        <span className="relative">Experience 360° View</span>
      </Button>

      {show360View && (
        <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-500">
          <Card className="relative w-full max-w-6xl bg-gradient-to-br from-card via-card to-muted border-2 border-primary/40 shadow-2xl shadow-primary/30 animate-scale-in">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
                    360° Interactive Experience
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {autoRotate ? "🔄 Auto-rotating" : "🎯 Manual control"} • Drag or use arrows
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
                  className="hover:bg-primary/20 hover:text-primary transition-all hover:scale-110 w-12 h-12"
                >
                  <X className="w-7 h-7" />
                </Button>
              </div>

              <div className="relative">
                <div
                  ref={containerRef}
                  className="relative aspect-video bg-gradient-to-br from-muted via-background to-muted rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border-2 border-primary/30 shadow-inner"
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
                    className="w-full h-full object-cover transition-opacity duration-200"
                    draggable={false}
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevFrame}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-effect flex items-center justify-center hover:bg-primary/30 transition-all hover:scale-110 group"
                  >
                    <ChevronLeft className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </button>
                  <button
                    onClick={nextFrame}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-effect flex items-center justify-center hover:bg-primary/30 transition-all hover:scale-110 group"
                  >
                    <ChevronRight className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </button>

                  {/* Instruction Overlay */}
                  {!isDragging && currentFrame === 0 && autoRotate && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center glass-effect p-10 rounded-3xl border-2 border-primary/40 shadow-2xl animate-slide-up backdrop-blur-xl">
                        <Move className="w-20 h-20 text-primary mx-auto mb-4 animate-pulse" />
                        <p className="text-foreground font-bold text-3xl mb-3">Drag to Explore</p>
                        <p className="text-muted-foreground text-lg">See every angle of this masterpiece</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-effect px-8 py-4 rounded-full border border-primary/30 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <RotateCw className="w-6 h-6 text-primary" />
                      <div className="text-center">
                        <div className="text-foreground font-bold text-xl">{frames[currentFrame].angle}°</div>
                        <div className="text-muted-foreground text-sm">{frames[currentFrame].label}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                  {frames.map((frame, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentFrame(index)
                        setAutoRotate(false)
                      }}
                      className={`px-4 py-2 rounded-lg transition-all font-semibold ${
                        currentFrame === index
                          ? "bg-primary text-primary-foreground shadow-lg scale-105"
                          : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
                      }`}
                    >
                      {frame.angle}°
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button
                  onClick={() => setAutoRotate(!autoRotate)}
                  variant="outline"
                  className="border-primary/40 hover:bg-primary/10 hover:border-primary font-semibold"
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
                  className="border-primary/40 hover:bg-primary/10 hover:border-primary font-semibold"
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
