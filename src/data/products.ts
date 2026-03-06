/**
 * Tier entry for optional tiered pricing per product option.
 * Example: "100–499 units" / "$120 per unit".
 */
export interface PricingTier {
  label: string;
  value: string;
}

/**
 * Pricing structure for a product option.
 * Supports a single primary label/value and optional tiered pricing,
 * while still allowing a service breakdown for imports.
 */
export interface ProductOptionPricing {
  /** Primary price label, e.g. "Price" or "Factory price" */
  label?: string;
  /** Primary price value, e.g. "$120 / unit" or "Price on request" */
  value?: string;

  /** Optional tiered pricing details */
  tiers?: PricingTier[];

  /** Legacy service breakdown fields kept for backwards compatibility */
  factoryPrice?: string;
  importCoordination?: string;
  platformService?: string;
  totalEstimate?: string;
}

/**
 * Product option within a category.
 * Each option can have different specs, images, supplier, and pricing.
 */
export interface ProductOption {
  optionId: string;
  name: string;
  supplier?: string;
  modelNumber?: string;
  description: string;
  highlights: string[];
  specs: string[];
  certifications?: string[];
  customizationOptions?: string[];
  qualityTraceability?: string[];
  images: string[];
  /** Main image for cards and previews */
  image: string;
  /** Pricing configuration for this option */
  pricing?: ProductOptionPricing;
  /** Label for the primary buy/request CTA */
  buyButtonLabel?: string;
  /** If true, this option is request-only instead of instant purchase */
  requestOnly?: boolean;
  /** Stripe payment link (opens in new tab) */
  stripeLink?: string;
  /** Mark options as inactive while keeping the structure ready */
  isAvailable?: boolean;
}

/**
 * Category containing one or more product options.
 * Each category can support up to 3 options (different suppliers/models).
 */
export interface Category {
  id: string;
  name: string;
  shortDescription: string;
  /** Cover image used on the catalog/category cards */
  coverImage: string;
  options: ProductOption[];
}

/** @deprecated Use Category + ProductOption. Kept for backwards compatibility. */
export interface Product {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  specs: string[];
  images: string[];
  image: string;
}

export const categories: Category[] = [
  {
    id: "portable-ev-charger",
    name: "Portable EV Charger",
    shortDescription: "Portable EV charging units for flexible, depot and on-site use.",
    coverImage: "/products/portable-ev-charger/cover.jpg",
    options: [
      {
        optionId: "option-1",
        name: "Portable EV Charger — Option 1",
        description: "Portable charging solution for electric vehicles. Flexible deployment for fleets, depots, and site work.",
        highlights: [
          "Compact and lightweight design",
          "Compatible with multiple EV models",
          "Built-in safety protection systems",
        ],
        specs: [
          "Power output: Specification placeholder",
          "Input voltage: Specification placeholder",
          "Cable length: Specification placeholder",
          "Connector type: Specification placeholder",
          "Weight: Specification placeholder",
          "Certifications: Specification placeholder",
        ],
        images: [
          "/products/portable-ev-charger/option-1/main.jpg",
          "/products/portable-ev-charger/option-1/detail-1.jpg",
          "/products/portable-ev-charger/option-1/detail-2.jpg",
        ],
        image: "/products/portable-ev-charger/option-1/main.jpg",
        pricing: {
          label: "Price",
          value: "Price on request",
        },
        buyButtonLabel: "Buy Portable EV Charger",
        stripeLink: "",
        isAvailable: true,
      },
      {
        optionId: "option-2",
        name: "Portable EV Charger — 7kW Type 2 (IEC62196-6)",
        supplier: "Shanghai Xundao New Energy Technology Co., Ltd.",
        modelNumber: "XD-T2GBT-37",
        description:
          "Portable EV charger compatible with IEC62196 standards designed for home and outdoor charging applications with adjustable current and multiple connector options.",
        highlights: [
          "7kW portable charger for home and outdoor use",
          "Alibaba Verified Supplier — 8 years, 5.0 / 5.0 rating (20 reviews)",
          "Multiple connector variants (Basic / App / Bluetooth)",
        ],
        specs: [
          "Output Power: 7 kW",
          "Output Current: 16A / 32A",
          "Input Voltage: 240VA ±20% (Level 2)",
          "Interface Standard: Type 1",
          "Connector Type: Basic / App / Bluetooth",
          "Plug Type Car Side: Type 2 / Type 1 / GBT",
          "Application: Electric vehicle portable charging",
          "Purpose: Replacement / repair / portable EV charging",
          "Place of Origin: Shanghai, China",
        ],
        certifications: ["CE", "CB", "TUV", "UKCA", "SASO"],
        customizationOptions: ["logo", "cable length", "graphic", "package"],
        qualityTraceability: ["Raw material identification and traceability", "Finished product inspection"],
        images: [
          "/products/portable-ev-charger/option-2/main.jpg",
          "/products/portable-ev-charger/option-2/detail-1.jpg",
          "/products/portable-ev-charger/option-2/detail-2.jpg",
        ],
        image: "/products/portable-ev-charger/option-2/main.jpg",
        pricing: {
          label: "Tiered pricing",
          value: "$88–$68 / unit",
          tiers: [
            { label: "2–19 units", value: "$88 / unit" },
            { label: "20–99 units", value: "$85 / unit" },
            { label: "100–499 units", value: "$79 / unit" },
            { label: "500+ units", value: "$68 / unit" },
          ],
        },
        buyButtonLabel: "Buy Portable EV Charger — 7kW Type 2",
        stripeLink: "",
        isAvailable: true,
      },
      {
        optionId: "option-3",
        name: "Portable EV Charger — Multi-Standard 3.5–22kW",
        supplier: "Shenzhen Yuanchuangli Electronic Co., Ltd.",
        modelNumber: "YCL-P03-11",
        description:
          "Multi-standard portable EV charger supporting Type 1, Type 2 and GBT connectors with adjustable current and multiple voltage compatibility.",
        highlights: [
          "Supports Type 1, Type 2 and GBT connectors",
          "Adjustable current with multi-voltage compatibility",
          "Portable form factor for flexible deployment",
        ],
        specs: [
          "Output Power: 3.5kW / 7kW / 11kW / 22kW",
          "Output Current: 16A / 32A adjustable",
          "Input Voltage: 110V / 120V / 200–220V / 220V / 230V / 380V / 400V",
          "Interface Standard: Type 1 / Type 2 / GBT",
          "Gross weight: 3 kg",
          "Package size: 38 × 38 × 17 cm",
          "Selling unit: Single item",
        ],
        customizationOptions: ["cable length", "drawing-based customization"],
        qualityTraceability: ["Raw material identification and traceability", "Finished product inspection"],
        images: [
          "/products/portable-ev-charger/option-3/main.jpg",
          "/products/portable-ev-charger/option-3/detail-1.jpg",
          "/products/portable-ev-charger/option-3/detail-2.jpg",
        ],
        image: "/products/portable-ev-charger/option-3/main.jpg",
        pricing: {
          label: "Starting price",
          value: "$63 / unit",
        },
        buyButtonLabel: "Buy Portable EV Charger — Option 3",
        stripeLink: "",
        isAvailable: true,
      },
    ],
  },
  {
    id: "charging-cable",
    name: "Charging Cable",
    shortDescription: "Type 2 and other EV charging cables for AC charging infrastructure.",
    coverImage: "/products/charging-cable/cover.jpg",
    options: [
      {
        optionId: "option-1",
        name: "Charging Cable — Option 1",
        description: "Standard Type 2 connector charging cable suitable for public and private AC charging.",
        highlights: [
          "IEC 62196-2 compliant",
          "Weather-resistant construction",
          "High-conductivity copper core",
        ],
        specs: [
          "Connector: Specification placeholder",
          "Max current: Specification placeholder",
          "Cable length: Specification placeholder",
          "Insulation rating: Specification placeholder",
          "Operating temp: Specification placeholder",
          "Certifications: Specification placeholder",
        ],
        images: [
          "/products/charging-cable/option-1/main.jpg",
          "/products/charging-cable/option-1/detail-1.jpg",
          "/products/charging-cable/option-1/detail-2.jpg",
        ],
        image: "/products/charging-cable/option-1/main.jpg",
        pricing: {
          label: "Price",
          value: "Price on request",
        },
        buyButtonLabel: "Buy Charging Cable — Option 1",
        stripeLink: "",
        isAvailable: true,
      },
      {
        optionId: "option-2",
        name: "Charging Cable — Option 2",
        description: "Placeholder for future Charging Cable Option 2.",
        highlights: [],
        specs: [],
        images: [
          "/products/charging-cable/option-2/main.jpg",
          "/products/charging-cable/option-2/detail-1.jpg",
          "/products/charging-cable/option-2/detail-2.jpg",
        ],
        image: "/products/charging-cable/option-2/main.jpg",
        pricing: {
          label: "Price",
          value: "To be confirmed",
        },
        buyButtonLabel: "Buy Charging Cable — Option 2",
        stripeLink: "",
        isAvailable: false,
      },
      {
        optionId: "option-3",
        name: "Charging Cable — Option 3",
        description: "Placeholder for future Charging Cable Option 3.",
        highlights: [],
        specs: [],
        images: [
          "/products/charging-cable/option-3/main.jpg",
          "/products/charging-cable/option-3/detail-1.jpg",
          "/products/charging-cable/option-3/detail-2.jpg",
        ],
        image: "/products/charging-cable/option-3/main.jpg",
        pricing: {
          label: "Price",
          value: "To be confirmed",
        },
        buyButtonLabel: "Buy Charging Cable — Option 3",
        stripeLink: "",
        isAvailable: false,
      },
    ],
  },
  {
    id: "portable-tyre-inflator",
    name: "Portable Tyre Inflator",
    shortDescription: "Compact digital tyre inflators suitable for EV fleets and roadside kits.",
    coverImage: "/products/portable-tyre-inflator/cover.jpg",
    options: [
      {
        optionId: "option-1",
        name: "Portable Tyre Inflator — Option 1",
        description: "Compact digital tyre inflator for EVs with automatic shut-off at target pressure.",
        highlights: [
          "Digital pressure display",
          "Auto-stop at target pressure",
          "USB-C rechargeable battery",
        ],
        specs: [
          "Max pressure: Specification placeholder",
          "Power source: Specification placeholder",
          "Display: Specification placeholder",
          "Inflation speed: Specification placeholder",
          "Noise level: Specification placeholder",
          "Weight: Specification placeholder",
        ],
        images: [
          "/products/portable-tyre-inflator/option-1/main.jpg",
          "/products/portable-tyre-inflator/option-1/detail-1.jpg",
          "/products/portable-tyre-inflator/option-1/detail-2.jpg",
        ],
        image: "/products/portable-tyre-inflator/option-1/main.jpg",
        pricing: {
          label: "Price",
          value: "Price on request",
        },
        buyButtonLabel: "Buy Portable Tyre Inflator — Option 1",
        stripeLink: "",
        isAvailable: true,
      },
      {
        optionId: "option-2",
        name: "Portable Tyre Inflator — Option 2",
        description: "Placeholder for future Portable Tyre Inflator Option 2.",
        highlights: [],
        specs: [],
        images: [
          "/products/portable-tyre-inflator/option-2/main.jpg",
          "/products/portable-tyre-inflator/option-2/detail-1.jpg",
          "/products/portable-tyre-inflator/option-2/detail-2.jpg",
        ],
        image: "/products/portable-tyre-inflator/option-2/main.jpg",
        pricing: {
          label: "Price",
          value: "To be confirmed",
        },
        buyButtonLabel: "Buy Portable Tyre Inflator — Option 2",
        stripeLink: "",
        isAvailable: false,
      },
      {
        optionId: "option-3",
        name: "Portable Tyre Inflator — Option 3",
        description: "Placeholder for future Portable Tyre Inflator Option 3.",
        highlights: [],
        specs: [],
        images: [
          "/products/portable-tyre-inflator/option-3/main.jpg",
          "/products/portable-tyre-inflator/option-3/detail-1.jpg",
          "/products/portable-tyre-inflator/option-3/detail-2.jpg",
        ],
        image: "/products/portable-tyre-inflator/option-3/main.jpg",
        pricing: {
          label: "Price",
          value: "To be confirmed",
        },
        buyButtonLabel: "Buy Portable Tyre Inflator — Option 3",
        stripeLink: "",
        isAvailable: false,
      },
    ],
  },
];

/**
 * Flattened list of selectable product options for forms (e.g. Request Order dropdown).
 * Multi-option categories include each option; single-option categories use category id.
 */
export function getSelectableProductOptions(): { id: string; name: string }[] {
  return categories.flatMap((cat) =>
    cat.options
      .filter((opt) => opt.isAvailable !== false)
      .map((opt) => {
        const optionLabel =
          opt.optionId === "option-1"
            ? "Option 1"
            : opt.optionId === "option-2"
            ? "Option 2"
            : opt.optionId === "option-3"
            ? "Option 3"
            : opt.name;

        return {
          id: `${cat.id}--${opt.optionId}`,
          name: `${cat.name} — ${optionLabel}`,
        };
      }),
  );
}
