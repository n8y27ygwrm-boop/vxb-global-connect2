const WorldMap = () => (
  <svg viewBox="0 0 800 400" className="w-full max-w-3xl mx-auto opacity-[0.07]" fill="none">
    {/* Simplified world outlines */}
    <ellipse cx="400" cy="200" rx="380" ry="180" stroke="currentColor" strokeWidth="1" className="text-primary" />
    <ellipse cx="400" cy="200" rx="250" ry="180" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
    <ellipse cx="400" cy="200" rx="120" ry="180" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
    <line x1="20" y1="200" x2="780" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
    <line x1="400" y1="20" x2="400" y2="380" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
    
    {/* Connection line: Asia to Europe */}
    <line x1="580" y1="160" x2="320" y2="150" stroke="currentColor" strokeWidth="2" className="text-accent" strokeDasharray="6 4" opacity="0.6" />
    <circle cx="580" cy="160" r="5" className="fill-accent" opacity="0.6" />
    <circle cx="320" cy="150" r="5" className="fill-accent" opacity="0.6" />
  </svg>
);

export default WorldMap;
