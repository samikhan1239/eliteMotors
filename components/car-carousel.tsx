"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "./ui/card"

const carImages = [
  {
    url: "/luxury-sports-car-front-view-red.jpg",
    alt: "Luxury Sports Car - Front View",
  },
  {
    url: "/luxury-sports-car-side-view-red.jpg",
    alt: "Luxury Sports Car - Side View",
  },
  {
    url: "/luxury-sports-car-interior-dashboard.jpg",
    alt: "Luxury Sports Car - Interior",
  },
  {
    url: "/luxury-sports-car-rear-view-red.jpg",
    alt: "Luxury Sports Car - Rear View",
  },
  {
    url: "/luxury-sports-car-engine-bay.png",
    alt: "Luxury Sports Car - Engine",
  },
]

export function CarCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carImages.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carImages.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <Card className="relative overflow-hidden bg-card border-2 border-border shadow-2xl">
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={carImages[currentIndex].url || "/placeholder.svg"}
          alt={carImages[currentIndex].alt}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent pointer-events-none" />

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            onClick={goToPrevious}
            variant="secondary"
            size="icon"
            className="w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary border-2 border-border shadow-lg transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={goToNext}
            variant="secondary"
            size="icon"
            className="w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-secondary border-2 border-border shadow-lg transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
          <span className="text-sm font-medium text-white">
            {currentIndex + 1} / {carImages.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 p-4 bg-card overflow-x-auto">
        {carImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex
                ? "border-primary scale-105 shadow-lg"
                : "border-border hover:border-primary/50 hover:scale-105"
            }`}
          >
            <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            {index === currentIndex && <div className="absolute inset-0 bg-primary/20 pointer-events-none" />}
          </button>
        ))}
      </div>
    </Card>
  )
}
