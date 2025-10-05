"use client"

import { useState, useEffect } from "react"
import { Card } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Calculator, TrendingUp, Sparkles } from "lucide-react"

export function PriceCalculator() {
  const [invites, setInvites] = useState<string>("50")
  const [duration, setDuration] = useState<string>("3")
  const [calculatedValue, setCalculatedValue] = useState<number>(0)

  useEffect(() => {
    calculatePrice()
  }, [invites, duration])

  const calculatePrice = () => {
    const invitesNum = Number(invites) || 0
    const durationNum = Number(duration) || 0

    const basePrice = 5000
    const inviteCost = Math.max(0, invitesNum) * 50
    const durationCost = Math.max(0, durationNum) * 1000
    const total = basePrice + inviteCost + durationCost
    setCalculatedValue(total)
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-accent/5 border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Calculator className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Event Price Calculator</h2>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Live calculation as you type
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Number of Invites */}
        <div className="space-y-3">
          <Label htmlFor="invites" className="text-foreground font-semibold text-base">
            Number of Invites
          </Label>
          <div className="relative">
            <Input
              id="invites"
              type="number"
              value={invites}
              onChange={(e) => setInvites(e.target.value)}
              min="0"
              max="1000"
              placeholder="Enter number of invites"
              className="text-lg h-14 bg-background border-2 border-border focus:border-primary transition-colors pl-4 pr-20 font-semibold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              guests
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 shadow-lg"
                style={{
                  width: `${Math.min(((Number(invites) || 0) / 1000) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-sm text-muted-foreground font-semibold min-w-[60px] text-right">
              {Number(invites) || 0}/1000
            </span>
          </div>
        </div>

        {/* Duration of Event */}
        <div className="space-y-3">
          <Label htmlFor="duration" className="text-foreground font-semibold text-base">
            Duration of Event (hours)
          </Label>
          <div className="relative">
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="0"
              max="24"
              placeholder="Enter event duration"
              className="text-lg h-14 bg-background border-2 border-border focus:border-primary transition-colors pl-4 pr-20 font-semibold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              hours
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 shadow-lg"
                style={{
                  width: `${Math.min(((Number(duration) || 0) / 24) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="text-sm text-muted-foreground font-semibold min-w-[60px] text-right">
              {Number(duration) || 0}/24
            </span>
          </div>
        </div>

        {/* Result Display */}
        {calculatedValue > 0 && (
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary/30 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2 font-medium flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Estimated Total Cost
              </p>
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                ${calculatedValue.toLocaleString()}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Base Price:</span>
                  <span className="font-semibold text-foreground">$5,000</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">
                    Invites Cost ({Number(invites) || 0} × $50):
                  </span>
                  <span className="font-semibold text-foreground">
                    ${(Number(invites) * 50).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">
                    Duration Cost ({Number(duration) || 0}h × $1,000):
                  </span>
                  <span className="font-semibold text-foreground">
                    ${(Number(duration) * 1000).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="p-4 rounded-lg bg-muted/50 border-2 border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">Pricing Formula:</span> Base ($5,000) + Invites ($50 each) +
            Duration ($1,000/hour)
          </p>
        </div>
      </div>
    </Card>
  )
}
