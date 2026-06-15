import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";
import ScrollToTop from "./scrolltoTop";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />

      <Toaster />
    </div>
  );
}
/*
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from './ui/sonner';
import ScrollToTop from "./ScrolltoTop";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}*/
