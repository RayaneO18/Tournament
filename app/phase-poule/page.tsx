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
          
          const equipesTriees = [...poule.equipes].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;

            const diffA = a.bp - a.bc;
            const diffB = b.bp - b.bc;
            return diffB - diffA;
          });

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
                      
                      return (
                        <tr key={equipe.pays} className={styles.tr}>
                          <td className={styles.rank}>{index + 1}</td>
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
                                <span className={styles.name}>{equipe.pays}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}