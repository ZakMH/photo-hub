import { signOut } from "next-auth/react";
import { Button } from "./ui";

export const Header = () => {
  const navs = ["All", "Animations", "Branding", "Illustrations", "Mobile", "Print"];
  return (
    <header className="container flex justify-between items-center p-4">
      <div className="text-xl font-medium">Popular</div>
      <nav className="">
        <ul className="flex items-center gap-4">
          {navs.map((item) => (
            <li
              key={item}
              className="rounded-md px-4 py-2 cursor-pointer bg-slate-50 hover:bg-slate-100 font-medium capitalize"
            >
              {item}
            </li>
          ))}
          <Button type="submit" variant="destructive" onClick={() => signOut()}>
            Sign out
          </Button>
        </ul>
      </nav>
    </header>
  );
};
