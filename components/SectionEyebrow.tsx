import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<"p">;

export function SectionEyebrow({ children, className, ...props }: Props) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-bold uppercase tracking-[0.2em]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
