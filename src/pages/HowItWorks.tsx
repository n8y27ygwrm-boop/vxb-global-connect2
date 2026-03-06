import Layout from "@/components/Layout";

const steps = [
  {
    num: "01",
    title: "Equipment selection",
    desc: "Browse the VXB equipment catalog and select the products your business needs. Each listing includes technical specifications and import structure details. You can request any quantity and combine multiple products into a single order.",
  },
  {
    num: "02",
    title: "Manufacturer sourcing",
    desc: "VXB identifies verified manufacturers that match your equipment requirements. We assess production capacity, quality certifications, and track record to ensure reliable supply. Description placeholder for additional sourcing details.",
  },
  {
    num: "03",
    title: "Import coordination",
    desc: "We manage the full import logistics — freight booking, customs documentation, compliance checks, and shipment tracking. You receive transparent updates throughout the process. Description placeholder for additional logistics details.",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "Equipment is delivered to your specified business location. We coordinate last-mile logistics and provide delivery confirmation. Description placeholder for additional delivery and post-delivery support details.",
  },
];

const HowItWorks = () => (
  <Layout>
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h1>
        <p className="text-muted-foreground mb-16 max-w-xl">
          From equipment selection to delivery — a transparent, structured process.
        </p>

        <div className="space-y-16">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-6">
              <span className="text-4xl font-bold text-accent/20 shrink-0 w-16">{step.num}</span>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">{step.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default HowItWorks;
