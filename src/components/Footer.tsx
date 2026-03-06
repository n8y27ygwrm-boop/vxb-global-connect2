import { Link } from "react-router-dom";
import vxbLogo from "@/assets/vxb-logo.png";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <img src={vxbLogo} alt="VXB" className="h-10 w-auto mb-4" />
          <p className="text-sm text-secondary-foreground/70 max-w-sm leading-relaxed">
            Global EV Supply — Simplified. Connecting businesses to verified EV equipment manufacturers with coordinated import logistics.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 text-secondary-foreground/50">Platform</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Equipment", to: "/equipment" },
              { label: "Services", to: "/services" },
              { label: "How It Works", to: "/how-it-works" },
              { label: "Request Order", to: "/request-order" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 text-secondary-foreground/50">Contact</h4>
          <ul className="space-y-2.5 text-sm text-secondary-foreground/70">
            <li>info@vxb.com</li>
            <li>+00 000 000 000</li>
          </ul>
          <h4 className="text-xs font-semibold uppercase tracking-wider mt-6 mb-4 text-secondary-foreground/50">Legal</h4>
          <ul className="space-y-2.5 text-sm text-secondary-foreground/70">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-xs text-secondary-foreground/40">
        © {new Date().getFullYear()} VXB. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
