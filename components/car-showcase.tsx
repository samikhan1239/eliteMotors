"use client"

import { useState, useEffect } from "react"
import { CarCarousel } from "./car-carousel"
import { CarOverview } from "./car-overview"
import { PriceCalculator } from "./price-calculator"
import { View360Button } from "./view-360-button"
import { Button } from "./ui/button"
import { Menu, X, Sparkles, Crown, Car, Calculator } from "lucide-react"

export function CarShowcase() {
  const [showCalculator, setShowCalculator] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 🔹 Handle scroll — hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down
        setShowHeader(false)
      } else {
        // scrolling up
        setShowHeader(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* 🔹 Header with hide/show animation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 glass-effect border-b border-primary/30 shadow-xl transform transition-transform duration-500 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 animate-luxury-glow">
                <Crown className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Elite
                </span>
                <span className="text-foreground">Motors</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#showcase"
                className="text-foreground hover:text-primary transition-colors font-bold relative group text-lg"
              >
                Showcase
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full rounded-full"></span>
              </a>
              <a
                href="#overview"
                className="text-foreground hover:text-primary transition-colors font-bold relative group text-lg"
              >
                Details
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full rounded-full"></span>
              </a>
              <a
                href="#calculator"
                className="text-foreground hover:text-primary transition-colors font-bold relative group text-lg"
              >
                Calculator
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full rounded-full"></span>
              </a>
              <Button className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105 font-bold text-base px-6 py-6 rounded-xl">
                Contact Us
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 animate-slide-up">
              <a
                href="#showcase"
                className="text-foreground hover:text-primary transition-colors font-semibold text-lg"
              >
                Showcase
              </a>
              <a
                href="#overview"
                className="text-foreground hover:text-primary transition-colors font-semibold text-lg"
              >
                Details
              </a>
              <a
                href="#calculator"
                className="text-foreground hover:text-primary transition-colors font-semibold text-lg"
              >
                Calculator
              </a>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full font-bold">
                Contact Us
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* 🔹 Hero Section */}
      <section className="pt-36 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              <span className="text-base font-bold text-primary uppercase tracking-widest">
                Premium Collection
              </span>
              <Sparkles className="w-10 h-10 text-accent animate-pulse" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-balance leading-tight">
              <span className="text-foreground">Redefine </span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Luxury
              </span>
              <br />
              <span className="text-foreground">On Wheels</span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed font-medium">
              Experience automotive excellence with cutting-edge technology and unparalleled craftsmanship
            </p>
          </div>

          {/* Car Details Section */}
          <div id="showcase" className="mb-32">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30">
                <Car className="w-9 h-9 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Car Details
                </h2>
                <p className="text-muted-foreground text-lg font-medium mt-1">
                  Explore every angle and specification
                </p>
              </div>
            </div>

            <div className="glass-effect rounded-3xl p-8 md:p-12 border-2 border-primary/30 shadow-2xl shadow-primary/10 animate-scale-in">
              <div className="mb-10">
                <CarCarousel />
              </div>
              <div className="flex justify-center mb-12">
                <View360Button />
              </div>
              <div id="overview">
                <CarOverview />
              </div>
            </div>
          </div>

          {/* Price Calculator Section */}
          <div id="calculator" className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center shadow-xl shadow-accent/30">
                <Calculator className="w-9 h-9 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Event Price Calculator
                </h2>
                <p className="text-muted-foreground text-lg font-medium mt-1">
                  Calculate your event pricing instantly
                </p>
              </div>
            </div>

            <div className="glass-effect rounded-3xl p-8 md:p-12 border-2 border-accent/30 shadow-2xl shadow-accent/10 animate-slide-up max-w-4xl mx-auto">
              <PriceCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-effect border-t border-primary/30 py-10 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EliteMotors
            </span>
          </div>
          <p className="text-muted-foreground font-medium">
            © 2025 EliteMotors. Crafted for Excellence.
          </p>
        </div>
      </footer>
    </div>
  )
}
