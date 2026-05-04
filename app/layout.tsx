import "../app/globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Tournoi Vercingetorix 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" 
        />
        {/* Couleur de la barre de status sur Android */}
        <meta name="theme-color" content="#0f1b3d" />
        {/* Permet au design de monter derrière la barre de status sur iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <Navbar />
        {/* On compense la hauteur de la Navbar fixe */}
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