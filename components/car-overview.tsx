import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar, Gauge, DollarSign, Award, Zap, Shield } from "lucide-react"

export function CarOverview() {
  const specs = [
    { icon: Calendar, label: "Year", value: "2024", color: "text-primary" },
    { icon: Gauge, label: "Mileage", value: "2,500 km", color: "text-primary" },
    { icon: DollarSign, label: "Price", value: "$89,999", color: "text-primary" },
    { icon: Zap, label: "Power", value: "450 HP", color: "text-primary" },
    { icon: Shield, label: "Warranty", value: "5 Years", color: "text-primary" },
    { icon: Award, label: "Rating", value: "5.0/5.0", color: "text-primary" },
  ]

  return (
    <Card className="p-6 bg-card border-2 border-border shadow-xl hover:shadow-2xl transition-all">
      <div className="mb-6">
        <Badge className="mb-3 bg-primary text-primary-foreground px-3 py-1 text-sm">Premium Collection</Badge>
        <h2 className="text-3xl font-bold text-foreground mb-2">Tesla Model S Plaid</h2>
        <p className="text-muted-foreground text-lg">The pinnacle of electric performance and luxury</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:scale-105 border border-border"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <spec.icon className={`w-5 h-5 ${spec.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{spec.label}</p>
              <p className="text-lg font-bold text-foreground">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Key Features</h3>
          <ul className="space-y-2">
            {[
              "Tri-Motor All-Wheel Drive",
              "Autopilot Advanced Safety",
              "Premium Interior with Vegan Leather",
              '17" Cinematic Display',
              "Over-the-Air Updates",
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
