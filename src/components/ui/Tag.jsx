export default function Tag({ children, color = 'default' }) {
  const colors = {
    default: 'bg-white/5 text-white/60 border-white/10',
    green: 'bg-accent-primary/10 text-accent-primary border-accent-primary/20',
    cyan: 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-inter font-medium border ${colors[color] || colors.default}`}>
      {children}
    </span>
  );
}
