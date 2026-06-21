import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "discount" | "soldout" | "new";

const variants: Record<BadgeVariant, string> = {
  default: "bg-[#F8F8F8] text-[#0A0A0A] border border-[#E5E7EB]",
  discount: "bg-[#E63946] text-white",
  soldout: "bg-[#9CA3AF] text-white",
  new: "bg-[#0A0A0A] text-white",
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
