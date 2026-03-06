import Layout from "@/components/Layout";
import { Search, Ship, Package, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Search,
    title: "Manufacturer sourcing",
    desc: "Service description placeholder — We identify and vet EV equipment manufacturers across global markets, ensuring they meet quality and compliance standards. Our network spans Asia, Europe, and emerging manufacturing regions.",
  },
  {
    icon: Ship,
    title: "Import coordination",
    desc: "Service description placeholder — Full import logistics management including freight, customs documentation, compliance verification, and delivery scheduling. We handle complexity so you don't have to.",
  },
  {
    icon: Package,
    title: "Order consolidation",
    desc: "Service description placeholder — Combine multiple product orders into consolidated shipments to reduce costs and simplify logistics. Ideal for businesses sourcing multiple equipment types.",
  },
  {
    icon: ShieldCheck,
    title: "Equipment verification",
    desc: "Service description placeholder — Pre-shipment quality assurance, specification validation, and compliance checks to ensure every product meets your requirements before it leaves the manufacturer.",
  },
];

const Services = () => (
  <Layout>
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">VXB Services</h1>
        <p className="text-muted-foreground mb-16 max-w-xl">
          End-to-end sourcing and logistics coordination for EV equipment.
        </p>

        <div className="space-y-16">
          {services.map((s) => (
            <div key={s.title} className="flex gap-6">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <s.icon size={22} className="text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
