import "./globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar"; // Importe ta nouvelle Navbar

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        
        <div style={{ height: "80px" }}></div> 

        <Container>
          <main>
            {children}
          </main>
        </Container>
      </body>
    </html>
  );
}