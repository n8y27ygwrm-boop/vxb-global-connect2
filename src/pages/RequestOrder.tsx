import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSelectableProductOptions } from "@/data/products";
import { toast } from "sonner";

const RequestOrder = () => {
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request submitted — this is a placeholder. No data was sent.");
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  return (
    <Layout>
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Request Order</h1>
          <p className="text-muted-foreground mb-12">
            Submit your equipment request and our team will coordinate sourcing and logistics.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company name</Label>
              <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact name</Label>
              <Input id="contact" value={form.contact} onChange={(e) => update("contact", e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product selection</Label>
              <Select value={form.product} onValueChange={(v) => update("product", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category and option" />
                </SelectTrigger>
                <SelectContent>
                  {getSelectableProductOptions().map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" min={1} value={form.quantity} onChange={(e) => update("quantity", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Additional details about your order..." />
            </div>

            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Submit Request
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default RequestOrder;
