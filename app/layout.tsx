import "../app/globals.css";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Tournoi Vercingertorix 2026",
  description: "Calendrier et Poules",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* viewport-fit=cover permet au site de remplir tout l'écran (notch inclus) */}
        {/* user-scalable=0 évite les zooms accidentels qui créent des bandes blanches */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" 
        />
        {/* Définit la couleur de la barre d'état Safari pour matcher ton site */}
        <meta name="theme-color" content="#0f1b3d" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <Navbar />
        
        {/* Espacement sous la Navbar transparente */}
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