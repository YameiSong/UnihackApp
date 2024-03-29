import Link from "next/link";

import { cn } from "@/lib/utils";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-lg text-white font-bold transition-colors hover:text-primary"
      >
        Home
      </Link>
    </nav>
  );
};

export default MainNav;
