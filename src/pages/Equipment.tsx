import Layout from "@/components/Layout";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/products";

const Equipment = () => (
  <Layout>
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Equipment</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Browse verified EV equipment available through VXB sourcing. Select a product to view import details and request an order.
          </p>
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

export default Equipment;
