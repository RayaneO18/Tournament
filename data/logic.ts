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

  // 2. On traite chaque match du calendrier
  calendrierMatchs.forEach(semaine => {
    semaine.rencontres.forEach(match => {
      // On ignore si une équipe est inconnue (?)
      if (match.eq1 === "?" || match.eq2 === "?") return;

// app/data/logic.ts
// ... début du fichier
      stats.forEach(poule => {
        const t1 = poule.equipes.find(e => e.pays === match.eq1);
        const t2 = poule.equipes.find(e => e.pays === match.eq2);

        // CONDITION CRUCIALE : On ne calcule que si les scores ne sont pas null
        if (t1 && t2 && match.score1 !== null && match.score2 !== null) {
          t1.bp += match.score1;
          t1.bc += match.score2;
          t2.bp += match.score2;
          t2.bc += match.score1;

          if (match.score1 > match.score2) {
            t1.g += 1; t1.pts += 3;
            t2.p += 1; t2.pts += 1;
          } else if (match.score1 < match.score2) {
            t2.g += 1; t2.pts += 3;
            t1.p += 1; t1.pts += 1;
          } else {
            t1.n += 1; t1.pts += 2;
            t2.n += 1; t2.pts += 2;
          }
        }
      });
// ... fin du fichier
    });
  });

  return stats;
};