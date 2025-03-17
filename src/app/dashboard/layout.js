import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return <section className="md:pt-12 md:px-20 md:pb-2 xl:pt-16 xl:pb-3 xl:px-32 min-h-screen bg-[var(--Surface, #040C19)]">
    <DashboardNavbar/>
    {children}
  </section>;
}
