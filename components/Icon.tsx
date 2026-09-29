import {
  Cog,
  Database,
  LayoutGrid,
  Megaphone,
  PenLine,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wallet,
  Workflow,
  type LucideProps,
} from "lucide-react";

const icons = {
  all: LayoutGrid,
  sparkles: Sparkles,
  trending: TrendingUp,
  workflow: Workflow,
  pen: PenLine,
  megaphone: Megaphone,
  phone: Smartphone,
  wallet: Wallet,
  cog: Cog,
  database: Database,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as keyof typeof icons] ?? Sparkles;
  return <Cmp strokeWidth={1.8} {...props} />;
}
