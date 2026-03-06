import { describe, it, expect } from "vitest";
import { categories } from "@/data/products";

const portableEvChargerCategory = categories.find(
  (c) => c.id === "portable-ev-charger",
)!;
const option1 = portableEvChargerCategory.options.find(
  (o) => o.optionId === "option-1",
)!;

describe("Portable EV Charger — Option 1", () => {
  it("has the correct name, supplier, and model number", () => {
    expect(option1.name).toBe(
      "Home Use 16A 32A Adjustable Electric Car Charger 7KW 11KW Type 2 CEE Plug Portable EV Charger",
    );
    expect(option1.supplier).toBe("TARY / OEM");
    expect(option1.modelNumber).toBe("PEV-Q-LJ1");
  });

  it("includes the expected highlights and specifications", () => {
    expect(option1.highlights).toEqual([
      "Adjustable 16A / 32A charging current",
      "Supports Type 2, GBT, and Type 1 interface standards",
      "Suitable for home use with customizable cable length",
    ]);

    expect(option1.specs).toContain("Output Power: 3.5-11kW");
    expect(option1.specs).toContain("Output Current: AC16A / AC32A");
    expect(option1.specs).toContain("Interface Standard: Type2 / GBT / Type1");
    expect(option1.specs).toContain("Wire Length: 5M (customizable)");
    expect(option1.specs).toContain("Model Number: PEV-Q-LJ1");
    expect(option1.specs.length).toBe(13);
  });

  it("correctly lists customization options", () => {
    expect(option1.customizationOptions).toBeDefined();
    expect(option1.customizationOptions).toEqual([
      "Custom logo",
      "Wire length customization",
      "Drawing-based customization",
    ]);
  });

  it("has the updated pricing structure with tiers", () => {
    expect(option1.pricing).toBeDefined();
    expect(option1.pricing!.label).toBe("Factory price range");
    expect(option1.pricing!.value).toBe("$88 - $110 / unit");

    expect(option1.pricing!.tiers).toBeDefined();
    expect(option1.pricing!.tiers).toEqual([
      { label: "1+ units", value: "$110 / unit" },
      { label: "50+ units", value: "$100 / unit" },
      { label: "100+ units", value: "$88 / unit" },
    ]);
  });
});
