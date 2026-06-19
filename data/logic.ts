import { groupesBase, calendrierMatchs, Match, matchCoupeCP } from "./data";

// Tableau centralisé des équipes avec correction stricte des chaînes
export const donneesEquipes = [
  { pays: "France", flag: "France.png", classe: "CPA" },
  { pays: "Japon", flag: "Japon.png", classe: "CPB" },
  { pays: "Allemagne", flag: "Allemagne.png", classe: "CPC" },
  { pays: "Maroc", flag: "Maroc.png", classe: "ULIS" },
  { pays: "Espagne", flag: "Espagne.png", classe: "CE1A" },
  { pays: "Argentine", flag: "Argentine.png", classe: "CE1B" },
  { pays: "Brésil", flag: "Bresil.png", classe: "CE2A" },
  { pays: "Nouvelle-Zélande", flag: "Nouvelle-zelande.png", classe: "CE2B" },
  { pays: "Etats-Unis", flag: "usa.png", classe: "CE2C" },
  { pays: "Algérie", flag: "Algerie.png", classe: "CM1A" },
  { pays: "Panama", flag: "Panama.png", classe: "CM1B" },
  { pays: "Angleterre", flag: "Angleterre.png", classe: "CM2A" },
  { pays: "Portugal", flag: "Portugal.png", classe: "CM2B" },
  { pays: "Animateurs", flag: "", classe: "" },
  { pays: "Parents", flag: "", classe: "" }
];

export const getStatsEquipes = () => {
  const stats = groupesBase.map(poule => ({
    ...poule,
    equipes: poule.equipes.map(e => ({
      ...e,
      g: 0, n: 0, p: 0, bp: 0, bc: 0, pts: 0,
      gagnantTAB: false
    }))
  }));

  calendrierMatchs.forEach(semaine => {
    semaine.rencontres.forEach(rencontre => {
      if (!rencontre.matchs || rencontre.matchs.length === 0) return;

      rencontre.matchs.forEach(match => {
        if (match.eq1 === "?" || match.eq2 === "?") return;

        stats.forEach(poule => {
          const t1 = poule.equipes.find(e => e.pays === match.eq1);
          const t2 = poule.equipes.find(e => e.pays === match.eq2);

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

  stats.forEach(poule => {
    poule.equipes.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const diffA = a.bp - a.bc;
      const diffB = b.bp - b.bc;
      if (diffB !== diffA) return diffB - diffA;

      if (a.gagnantTAB && !b.gagnantTAB) return -1;
      if (!a.gagnantTAB && b.gagnantTAB) return 1;

      return 0;
    });
  });

  return stats;
};

export const trouverEquipe = (nom: string) => {
  return donneesEquipes.find(e => e.pays.trim().toLowerCase() === nom.trim().toLowerCase());
};

export const getWinner = (m: Match): string | null => {
  if (!m || !m.eq1 || !m.eq2) return null;
  if (m.score1 === null || m.score2 === null) return null;

  if (m.score1 > m.score2) return m.eq1;
  if (m.score2 > m.score1) return m.eq2;
  
  if (m.tab1 !== undefined && m.tab1 !== null && m.tab2 !== undefined && m.tab2 !== null) {
    if (Number(m.tab1) > Number(m.tab2)) return m.eq1;
    if (Number(m.tab2) > Number(m.tab1)) return m.eq2;
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

// --- LOGIQUE SPÉCIFIQUE COUPE DES CP ---
export const getStatsCoupeCP = () => {
  const statsCP = [
    { pays: "France", classe: "CPA", flag: "France.png", g: 0, n: 0, p: 0, bp: 0, bc: 0, pts: 0 },
    { pays: "Japon", classe: "CPB", flag: "Japon.png", g: 0, n: 0, p: 0, bp: 0, bc: 0, pts: 0 },
    { pays: "Allemagne", classe: "CPC", flag: "Allemagne.png", g: 0, n: 0, p: 0, bp: 0, bc: 0, pts: 0 },
  ];

  matchCoupeCP.forEach(match => {
    const t1 = statsCP.find(e => e.pays === match.eq1);
    const t2 = statsCP.find(e => e.pays === match.eq2);

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

  return statsCP.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const diffA = a.bp - a.bc;
    const diffB = b.bp - b.bc;
    return diffB - diffA;
  });
};