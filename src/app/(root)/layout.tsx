import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
