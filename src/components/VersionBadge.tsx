interface VersionBadgeProps {
  version: string;
  date: string;
  className?: string;
}

const VersionBadge = ({ version, date, className = "" }: VersionBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="font-mono text-[9px] tracking-widest text-gold/80 bg-gold/5 border border-gold/10 px-2 py-0.5 rounded">
        {version}
      </span>
      <span className="font-mono text-[9px] text-muted-foreground tracking-wider">
        Revisão: {date}
      </span>
    </div>
  );
};

export default VersionBadge;
