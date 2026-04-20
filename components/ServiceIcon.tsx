import {
  Armchair,
  Briefcase,
  Palette,
  RefreshCw,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  sofa: Armchair,
  briefcase: Briefcase,
  store: Store,
  refresh: RefreshCw,
  palette: Palette,
  truck: Truck,
};

export function ServiceIcon({
  name,
  className = "h-7 w-7",
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? Armchair;
  return <Icon className={className} aria-hidden />;
}
