import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group hover:border-accent/40 transition-all duration-300">
      {/* Image area */}
      <div className="aspect-[4/3] bg-muted/60 flex items-center justify-center relative overflow-hidden">
        <img
          src={product.images[activeImage] || product.image}
          alt={product.name}
          className="w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        />
      </div>

      {/* Thumbnail indicators */}
      <div className="flex justify-center gap-1.5 py-3 bg-card">
        {product.images.slice(0, 4).map((_, i) => (
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
          <h3 className="text-lg font-semibold text-foreground tracking-tight">{product.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{product.description}</p>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5">
          {product.highlights.map((h, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-accent mt-1.5 shrink-0" />
              {h}
            </li>
          ))}
        </ul>

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
          <Link to={`/equipment/${product.id}`} className="inline-flex items-center gap-2">
            View Import Details
            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
