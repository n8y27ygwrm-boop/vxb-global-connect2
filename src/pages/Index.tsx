import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import WorldMap from "@/components/WorldMap";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/products";
import { Search, Ship, Package, ShieldCheck, ArrowRight } from "lucide-react";
import vxbLogo from "@/assets/vxb-logo.png";

const services = [
  { icon: Search, title: "Manufacturer sourcing", desc: "Service description placeholder — identifying and vetting global EV equipment manufacturers." },
  { icon: Ship, title: "Import coordination", desc: "Service description placeholder — managing logistics and customs documentation." },
  { icon: Package, title: "Order consolidation", desc: "Service description placeholder — combining orders for efficient shipping." },
  { icon: ShieldCheck, title: "Equipment verification", desc: "Service description placeholder — quality assurance and compliance checks." },
];

const steps = [
  { num: "01", title: "Select equipment", desc: "Browse verified EV equipment from the catalog." },
  { num: "02", title: "VXB identifies manufacturer", desc: "We match your order with verified manufacturers." },
  { num: "03", title: "Import coordination", desc: "We handle logistics, customs, and documentation." },
  { num: "04", title: "Delivery to business", desc: "Equipment delivered to your specified location." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background map on right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none opacity-60 hidden lg:flex">
        <WorldMap />
      </div>
      {/* Subtle watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <img src={vxbLogo} alt="" className="w-[600px] h-auto" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl space-y-6">
          <img src={vxbLogo} alt="VXB" className="h-20 md:h-28 w-auto" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Global EV Supply —{" "}
            <span className="text-accent">Simplified</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
            Access EV equipment directly from manufacturers and coordinate imports through a clean and transparent system.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/equipment">Browse Equipment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Services handled through VXB</h2>
        <p className="text-muted-foreground mb-10 max-w-lg">End-to-end sourcing and import coordination for EV equipment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <Link
              key={s.title}
              to="/services"
              className="group border border-border rounded-lg p-6 hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-200 bg-card"
            >
              <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                <s.icon size={20} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/services" className="inline-flex items-center gap-2">
              View All Services <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-24 px-6 bg-muted/30 relative overflow-hidden">
      {/* Subtle watermark */}
      <div className="absolute right-8 bottom-8 opacity-[0.03] pointer-events-none">
        <img src={vxbLogo} alt="" className="w-64 h-auto" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12">How VXB works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              <span className="text-4xl font-bold text-accent/15">{step.num}</span>
              <h3 className="font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 -right-4 text-border">
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Equipment Preview */}
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Equipment</h2>
            <p className="text-muted-foreground max-w-lg">Browse verified EV equipment available through VXB sourcing.</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/equipment" className="inline-flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
