import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PublicPagesLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
