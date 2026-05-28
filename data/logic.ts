import { groupesBase, calendrierMatchs, Match } from "./data";

// 1. On définit le tableau directement ici : cela casse définitivement la dépendance circulaire
// et empêche le bug du "undefined (reading 'find')" au démarrage de Next.js !
export const donneesEquipes = [
  { pays: "France", flag: "France.png", classe: "CPA" },
  { pays: "Japon", flag: "Japon.png", classe: "CPB" },
  { pays: "Allemagne", flag: "Allemagne.png", classe: "CPC" },
  { pays: "Maroc", flag: "Maroc.png", classe: "ULISS" },
  { pays: "Espagne", flag: "Espagne.png", classe: "CE1A" },
  { pays: "Argentine", flag: "Argentine.png", classe: "CE1B" },
  { pays: "Brésil", flag: "Bresil.png", classe: "CE2A" },
  { pays: "Nouvelle-Zélande", flag: "Nouvelle-zelande.png", classe: "CE2B" },
  { pays: "Etats-Unis", flag: "Etats-Unis.png", classe: "CE2C" },
  { pays: "Algérie", flag: "Algerie.png", classe: "CM1A" },
  { pays: "Panama", flag: "Panama.png", classe: "CM1B" },
  { pays: "Angleterre", flag: "Angleterre.png", classe: "CM2A" },
  { pays: "Portugal", flag: "Portugal.png", classe: "CM2B" },
  { pays: "Animateurs" },
  { pays: "Parents" }
];

export const getStatsEquipes = () => {
  // 1. On prépare la structure avec des compteurs à zéro et l'état gagnantTAB
  const stats = groupesBase.map(poule => ({
    ...poule,
    equipes: poule.equipes.map(e => ({
      ...e,
      g: 0, n: 0, p: 0, bp: 0, bc: 0, pts: 0,
      gagnantTAB: false // Par défaut, faux pour tout le monde
    }))
  }));

  // 2. On traite chaque semaine du calendrier
  calendrierMatchs.forEach(semaine => {
    // 3. On traite chaque jour (rencontre)
    semaine.rencontres.forEach(rencontre => {
      
      // Sécurité : on vérifie que le tableau de matchs existe et n'est pas vide
      if (!rencontre.matchs || rencontre.matchs.length === 0) return;

      // 4. On traite chaque match individuel du jour
      rencontre.matchs.forEach(match => {
        
        // On ignore si une équipe est inconnue (?)
        if (match.eq1 === "?" || match.eq2 === "?") return;

        // On cherche les équipes dans nos stats
        stats.forEach(poule => {
          const t1 = poule.equipes.find(e => e.pays === match.eq1);
          const t2 = poule.equipes.find(e => e.pays === match.eq2);

          // Calcul uniquement si les deux équipes existent dans cette poule ET que le score est saisi
          if (t1 && t2 && match.score1 !== null && match.score2 !== null) {
            t1.bp += match.score1;
            t1.bc += match.score2;
            t2.bp += match.score2;
            t2.bc += match.score1;

            if (match.score1 > match.score2) {
              t1.g += 1; t1.pts += 4;
              t2.p += 1; t2.pts += 1;
            } else if (match.score1 < match.score2) {
              t2.g += 1; t2.pts += 4;
              t1.p += 1; t1.pts += 1;
            } else {
              t1.n += 1; t1.pts += 2;
              t2.n += 1; t2.pts += 2;

              // Si le match s'est soldé par une séance de Tirs au But enregistrée
              if (match.gagnantTAB) {
                if (t1.pays === match.gagnantTAB) t1.gagnantTAB = true;
                if (t2.pays === match.gagnantTAB) t2.gagnantTAB = true;
              }
            }
          }
        });
      });
    });
  });

  // 5. Tri des équipes par points, puis différence de buts, puis Tirs au But
  stats.forEach(poule => {
    poule.equipes.sort((a, b) => {
      // Critère 1 : Les points
      if (b.pts !== a.pts) return b.pts - a.pts;

      // Critère 2 : La différence de buts (si points égaux)
      const diffA = a.bp - a.bc;
      const diffB = b.bp - b.bc;
      if (diffB !== diffA) return diffB - diffA;

      // Critère 3 : Les Tirs au But (uniquement si points ET différence de buts égaux)
      if (a.gagnantTAB && !b.gagnantTAB) return -1; // 'a' a le titre et passe devant 'b'
      if (!a.gagnantTAB && b.gagnantTAB) return 1;  // 'b' a le titre et passe devant 'a'

      return 0;
    });
  });

  return stats;
};

export const trouverEquipe = (nom: string) => {
  return donneesEquipes.find(e => e.pays === nom);
};

export const getWinner = (m: Match): string | null => {
  if (!m || !m.eq1 || !m.eq2) return null;
  if (m.score1 === null || m.score2 === null) return null;

  if (m.score1 > m.score2) return m.eq1;
  if (m.score2 > m.score1) return m.eq2;
  
  // Gestion alternative avec vérification stricte (non null, non undefined)
  if (m.tab1 !== undefined && m.tab1 !== null && m.tab2 !== undefined && m.tab2 !== null) {
    if (m.tab1 > m.tab2) return m.eq1;
    if (m.tab2 > m.tab1) return m.eq2;
  }

  if (m.gagnantTAB) return m.gagnantTAB;
  return null;
};

export const getLoser = (m: Match): string | null => {
  if (!m || !m.eq1 || !m.eq2) return null;
  const winner = getWinner(m);
  if (!winner) return null;
  return winner === m.eq1 ? m.eq2 : m.eq1;
};