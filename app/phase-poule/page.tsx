"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "../page.module.css";
import { getStatsEquipes } from "../../data/logic"; 

export const dynamic = "force-dynamic";

export default function GroupesPage() {
  const router = useRouter(); 
  const [groupesDynamiques, setGroupesDynamiques] = useState(getStatsEquipes());
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // 1. Gestion du scroll
    const handleScroll = () => {
      const newOpacity = Math.max(1 - window.scrollY / 80, 0);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);

    const intervalle = setInterval(() => {
      router.refresh();
      setGroupesDynamiques(getStatsEquipes());
    }, 180000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalle);
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Classement des Groupes</h1>

      <div className={styles.groupWrapper}>
        {groupesDynamiques.map((poule) => {
          
          // Tri prenant en compte la règle de départage par TAB
          const equipesTriees = [...poule.equipes].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;

            const diffA = a.bp - a.bc;
            const diffB = b.bp - b.bc;
            if (diffB !== diffA) return diffB - diffA;

            // Critère TAB de secours si les points et la diff de buts sont identiques
            if (a.gagnantTAB && !b.gagnantTAB) return -1;
            if (!a.gagnantTAB && b.gagnantTAB) return 1;

            return 0;
          });

          const nbEquipes = poule.equipes.length;
          const matchesAttendus = nbEquipes === 4 ? 12 : 6;

          // Somme des matchs réellement joués (G + N + P) déclarés pour cette poule
          const totalMatchsJoues = poule.equipes.reduce((acc, eq) => acc + eq.g + eq.n + eq.p, 0);
          const pouleTerminee = totalMatchsJoues >= matchesAttendus;

          return (
            <div key={poule.nom} className={styles.tableContainer}>
              <h2 className={styles.pouleHeader}>{poule.nom}</h2>
              <div className={styles.scrollContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.thLeft}>#</th>
                      <th className={styles.thLeft}>Équipe</th>
                      <th>G</th>
                      <th>N</th>
                      <th>P</th>
                      <th>BP</th>
                      <th>BC</th>
                      <th>+/-</th>
                      <th>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipesTriees.map((equipe, index) => {
                      const diffButs = equipe.bp - equipe.bc;
                      const estDansLesDeuxPremiers = index < 2;

                      // Le numéro (#) devient vert si la poule est finie ET que l'équipe est 1ère ou 2ème
                      const rankClassName = (pouleTerminee && estDansLesDeuxPremiers)
                        ? `${styles.rank} ${styles.qualifiedRank}`
                        : styles.rank;

                      return (
                        <tr key={equipe.pays} className={styles.tr}>
                          <td className={rankClassName}>{index + 1}</td>
                          <td className={styles.teamCell}>
                            <div className={styles.teamInfo}>
                              <div className={styles.flagWrapper}>
                                <img 
                                  src={`/flags/${equipe.flag}`} 
                                  alt={equipe.pays} 
                                  className={styles.flagImg} 
                                />
                              </div>
                              <div className={styles.nameWrapper}>
                                <div className={styles.nameRow}>
                                  <span className={styles.name}>{equipe.pays}</span>
                                  {equipe.gagnantTAB && (
                                    <span className={styles.badgeTab}>
                                      Gagnant TAB
                                    </span>
                                  )}
                                </div>
                                <span className={styles.subName}>{equipe.classe}</span>
                              </div>
                            </div>
                          </td>
                          <td>{equipe.g}</td>
                          <td>{equipe.n}</td>
                          <td>{equipe.p}</td>
                          <td>{equipe.bp}</td>
                          <td>{equipe.bc}</td>
                          <td className={diffButs > 0 ? styles.positiveDiff : ""}>
                            {diffButs > 0 ? `+${diffButs}` : diffButs}
                          </td>
                          <td className={styles.pts}>{equipe.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        <div className={styles.legendContainer}>
          <div className={styles.legendGrid}>
            <div className={styles.legendItem}><strong>G</strong> Gagné (4 pts)</div>
            <div className={styles.legendItem}><strong>N</strong> Nul (2 pts)</div>
            <div className={styles.legendItem}><strong>P</strong> Perdu (1 pt)</div>
            <div className={styles.legendItem}><strong>BP</strong> Buts Pour</div>
            <div className={styles.legendItem}><strong>BC</strong> Buts Contre</div>
            <div className={styles.legendItem}><strong>+/-</strong> Différence</div>
            <div className={`${styles.legendItem} ${styles.legendFullRow}`}>
              <span className={styles.badgeTabLegend}>GAGNANT TAB</span>
              Équipe devant au classement grâce à sa victoire aux tirs au but (en cas d'égalité parfaite).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}