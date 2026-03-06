import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ChevronRight } from "lucide-react";
import type { Category } from "@/data/products";

const CategoryCard = ({ category }: { category: Category }) => {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const firstOption = category.options[0];
  const optionCount = category.options.filter((o) => o.isAvailable !== false).length;
  const hasMultipleOptions = optionCount > 1;
  const firstPricedOption = category.options.find(
    (o) => o.isAvailable !== false && o.pricing && (o.pricing.value || o.pricing.factoryPrice),
  );
  const displayPrice = firstPricedOption?.pricing?.value || firstPricedOption?.pricing?.factoryPrice;
  const priceLabel = firstPricedOption?.pricing?.label || "Price";

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group hover:border-accent/40 transition-all duration-300">
      {/* Image area */}
      <div className="aspect-[4/3] bg-muted/60 flex items-center justify-center relative overflow-hidden">
        <img
          src={category.coverImage || firstOption.images[activeImage] || firstOption.image}
          alt={category.name}
          className="w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        />
        {hasMultipleOptions && (
          <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
            {optionCount} options
          </Badge>
        )}
      </div>

      {/* Thumbnail indicators */}
      <div className="flex justify-center gap-1.5 py-3 bg-card">
        {firstOption.images.slice(0, 2).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === activeImage ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground tracking-tight">{category.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
            {category.shortDescription || firstOption.description}
          </p>
        </div>

        {displayPrice && (
          <div>
            <p className="text-xs font-medium text-foreground">
              {priceLabel}: <span className="font-semibold">{displayPrice}</span>
            </p>
          </div>
        )}

        {/* Highlights */}
        {firstOption.highlights.length > 0 && (
          <ul className="space-y-1.5">
            {firstOption.highlights.map((h, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Quantity selector */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Qty</span>
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Minus size={13} />
            </button>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-11 text-center text-sm bg-transparent border-x border-border py-1.5 focus:outline-none"
            />
            <button
              onClick={() => setQty(qty + 1)}
              className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        <Button asChild variant="outline" className="w-full group/btn">
          <Link to={`/equipment/${category.id}`} className="inline-flex items-center gap-2">
            View Import Details
            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
