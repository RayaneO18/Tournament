// app/data/logic.ts
import { groupesBase, calendrierMatchs } from "./data";

export const getStatsEquipes = () => {
  // 1. On prépare la structure avec des compteurs à zéro
  const stats = groupesBase.map(poule => ({
    ...poule,
    equipes: poule.equipes.map(e => ({
      ...e,
      g: 0, n: 0, p: 0, bp: 0, bc: 0, pts: 0
    }))
  }));

  // 2. On traite chaque semaine du calendrier
  calendrierMatchs.forEach(semaine => {
    // 3. On traite chaque jour (rencontre)
    semaine.rencontres.forEach(rencontre => {
      
      // Sécurité : on vérifie que le tableau de matchs existe et n'est pas vide
      if (!rencontre.matchs || rencontre.matchs.length === 0) return;

      // 4. NOUVELLE BOUCLE : On traite chaque match individuel du jour
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
            }
          }
        });
      });
    });
  });

  // 5. Tri optionnel des équipes par points puis différence de buts (BP - BC)
  stats.forEach(poule => {
    poule.equipes.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return (b.bp - b.bc) - (a.bp - a.bc);
    });
  });

  return stats;
};