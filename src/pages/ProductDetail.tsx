import { useParams, useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/data/products";
import { Minus, Plus, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductOption } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categories.find((c) => c.id === id);
  const optionParam = searchParams.get("option") || "option-1";
  const availableOptions = category?.options.filter((o) => o.isAvailable !== false) ?? [];
  const selectedOption =
    availableOptions.find((o) => o.optionId === optionParam) ?? availableOptions[0] ?? null;
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (selectedOption) setActiveImage(0);
  }, [selectedOption?.optionId]);

  const handleOptionChange = (value: string) => {
    setSearchParams({ option: value });
  };

  const currentIndex = availableOptions.findIndex((o) => o.optionId === optionParam);
  const canCycle = availableOptions.length > 1 && currentIndex !== -1;

  const goToIndex = (index: number) => {
    const target = availableOptions[index];
    if (!target) return;
    setSearchParams({ option: target.optionId });
  };

  const handlePrevOption = () => {
    if (!canCycle) return;
    const nextIndex =
      (currentIndex - 1 + availableOptions.length) % availableOptions.length;
    goToIndex(nextIndex);
  };

  const handleNextOption = () => {
    if (!canCycle) return;
    const nextIndex = (currentIndex + 1) % availableOptions.length;
    goToIndex(nextIndex);
  };

  if (!category) {
    return (
      <Layout>
        <div className="py-24 px-6 text-center">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </Layout>
    );
  }

  const option = selectedOption;
  const hasMultipleOptions = availableOptions.length > 1;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <nav className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Link to="/equipment" className="hover:text-foreground transition-colors">Equipment</Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
          {hasMultipleOptions && option && (
            <>
              <span>/</span>
              <span className="text-foreground">{option.name}</span>
            </>
          )}
        </nav>
      </div>

      {/* Option selector (tabs + arrows) — only when multiple options */}
      {hasMultipleOptions && (
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={handlePrevOption}
              disabled={!canCycle}
            >
              <ChevronLeft size={16} />
            </Button>
            <div className="flex-1">
              <Tabs value={optionParam} onValueChange={handleOptionChange}>
                <TabsList className="mb-2 w-full justify-center">
                  {availableOptions.map((opt) => (
                    <TabsTrigger key={opt.optionId} value={opt.optionId}>
                      {opt.optionId === "option-1"
                        ? "Option 1"
                        : opt.optionId === "option-2"
                        ? "Option 2"
                        : "Option 3"}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              {option && (
                <p className="text-xs text-muted-foreground text-center">
                  Switching between suppliers and configurations for{" "}
                  <span className="text-foreground font-medium">{category.name}</span>.
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              onClick={handleNextOption}
              disabled={!canCycle}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {!option ? (
        <div className="py-12 px-6 text-center">
          <p className="text-muted-foreground">No option selected.</p>
        </div>
      ) : (
        <ProductOptionDetail option={option} categoryName={category.name} qty={qty} setQty={setQty} activeImage={activeImage} setActiveImage={setActiveImage} />
      )}
    </Layout>
  );
};

interface ProductOptionDetailProps {
  option: ProductOption;
  categoryName: string;
  qty: number;
  setQty: (n: number) => void;
  activeImage: number;
  setActiveImage: (n: number) => void;
}

const ProductOptionDetail = ({
  option,
  categoryName,
  qty,
  setQty,
  activeImage,
  setActiveImage,
}: ProductOptionDetailProps) => {
  const buyLabel =
    option.buyButtonLabel || (option.requestOnly ? "Order via Stripe" : "Buy via Stripe");
  const canBuy = !!option.stripeLink;

  const handleStripeClick = () => {
    if (!option.stripeLink) return;
    if (typeof window !== "undefined") {
      window.open(option.stripeLink, "_blank", "noopener,noreferrer");
    }
  };

  const pricingRows =
    option.pricing &&
    (option.pricing.factoryPrice ||
      option.pricing.importCoordination ||
      option.pricing.platformService)
      ? [
          {
            label: "Factory price",
            value: option.pricing.factoryPrice ?? "Price placeholder",
          },
          {
            label: "Import coordination",
            value: option.pricing.importCoordination ?? "Fee placeholder",
          },
          {
            label: "Platform service",
            value: option.pricing.platformService ?? "Fee placeholder",
          },
        ]
      : option.pricing && (option.pricing.label || option.pricing.value)
      ? [
          {
            label: option.pricing.label ?? "Price",
            value: option.pricing.value ?? "Price on request",
          },
        ]
      : [
          {
            label: "Price",
            value: "Price placeholder",
          },
        ];

  const hasTiers = !!option.pricing?.tiers && option.pricing.tiers.length > 0;
  const primaryPrice = option.pricing?.value || option.pricing?.factoryPrice;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => setIsVisible(true), 20);
    return () => clearTimeout(timeout);
  }, [option.optionId]);

  const images = option.images.slice(0, 3);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Hero: 2-column product section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted/40 rounded-lg flex items-center justify-center border border-border">
                <img
                  src={images[activeImage] || option.image}
                  alt={option.name}
                  className="w-28 h-28 opacity-20"
                />
              </div>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-md bg-muted/40 border flex items-center justify-center transition-all ${
                      i === activeImage
                        ? "border-accent ring-1 ring-accent/30"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <img src={img} alt="" className="w-6 h-6 opacity-20" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right — Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{option.name}</h1>
                {(option.supplier || option.modelNumber) && (
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    {option.supplier && <span>Supplier: {option.supplier}</span>}
                    {option.modelNumber && <span>Model: {option.modelNumber}</span>}
                  </div>
                )}
                <p className="text-muted-foreground leading-relaxed mt-3">{option.description}</p>
              </div>

              <Separator />

              {/* Technical highlights */}
              {option.highlights.length > 0 && (
                <>
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Technical highlights
                    </h3>
                    <ul className="space-y-2.5">
                      {option.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                          <CheckCircle2 size={15} className="text-accent mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                </>
              )}

              {/* Quantity + CTA */}
              <div className="space-y-5">
                {primaryPrice && (
                  <div className="text-sm font-medium text-foreground">
                    {option.pricing?.label ? `${option.pricing.label}: ` : "Price: "}
                    <span className="font-semibold">{primaryPrice}</span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground font-medium">Quantity</span>
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 text-center text-sm bg-transparent border-x border-border py-2.5 focus:outline-none"
                    />
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="px-3 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 flex-1"
                    onClick={handleStripeClick}
                    disabled={!canBuy}
                  >
                    {buyLabel}
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1">
                    <Link to="/services">View Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content blocks */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto space-y-0">
          {/* A. Product Overview */}
          <div className="py-12 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Product Overview</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {option.description}
            </p>
          </div>

          {/* B. Technical Specifications */}
          {option.specs.length > 0 && (
            <div className="py-12 border-t border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Technical Specifications</h2>
              <div className="max-w-2xl">
                {option.specs.map((spec, i) => {
                  const [label, value] = spec.includes(":")
                    ? spec.split(":").map((s) => s.trim())
                    : [spec, "—"];
                  return (
                    <div
                      key={i}
                      className={`flex justify-between py-3 text-sm ${
                        i < option.specs.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-foreground font-medium">{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Certifications */}
          {option.certifications && option.certifications.length > 0 && (
            <div className="py-12 border-t border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Certifications</h2>
              <ul className="flex flex-wrap gap-2">
                {option.certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="px-3 py-1.5 rounded-md bg-muted/50 text-sm text-foreground border border-border"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* C. Customization Options */}
          {option.customizationOptions && option.customizationOptions.length > 0 && (
            <div className="py-12 border-t border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Customization Options</h2>
              <ul className="flex flex-wrap gap-2">
                {option.customizationOptions.map((item, i) => (
                  <li
                    key={i}
                    className="px-3 py-1.5 rounded-md bg-muted/50 text-sm text-foreground border border-border"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* D. Quality / Traceability */}
          {option.qualityTraceability && option.qualityTraceability.length > 0 && (
            <div className="py-12 border-t border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Quality / Traceability</h2>
              <ul className="space-y-2">
                {option.qualityTraceability.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* E. Import Overview */}
          <div className="py-12 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Import Overview</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              VXB coordinates sourcing and logistics for this product. We work directly with verified
              manufacturers to ensure quality standards and manage the full import process including
              customs, documentation, and delivery coordination.
            </p>
          </div>

          {/* F. Service Breakdown / Pricing */}
          <div className="py-12 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-6">Service Breakdown</h2>
            <div className="bg-muted/30 rounded-lg p-8 max-w-md border border-border">
              <div className="space-y-4">
                {pricingRows.map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="text-foreground font-medium">{row.value}</span>
                  </div>
                ))}
                {hasTiers && option.pricing?.tiers && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      {option.pricing.tiers.map((tier) => (
                        <div key={tier.label} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{tier.label}</span>
                          <span className="text-foreground font-medium">{tier.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-foreground">Total estimate</span>
                  <span className="text-foreground">
                    {option.pricing?.totalEstimate ??
                      option.pricing?.value ??
                      "Total placeholder"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* G. Additional Details */}
          <div className="py-12 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Additional Details</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Additional details placeholder — packaging information, lead times, minimum order
              quantities, warranty terms, and other relevant import details will be displayed here.
            </p>
          </div>

          {/* Final CTA */}
          <div className="pt-4 border-t border-border">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleStripeClick}
              disabled={!canBuy}
            >
              {buyLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
