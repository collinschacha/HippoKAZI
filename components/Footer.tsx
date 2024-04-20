import Link from "next/link";
import { Icons } from "./Icons";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Icons.logo className="w-10 h-10" />
        </Link>
      </div>
      <p className="text-muted-foreground">
        2024 HippoKAZI. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
