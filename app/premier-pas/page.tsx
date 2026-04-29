"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function CoupeCPPage() {
  const donneesEquipes = [
    { pays: "France", classe: "CPA", g: 0, n: 0, p: 0, bp: 0, bc: 0, flag: "france.png" },
    { pays: "Japon", classe: "CPB", g: 0, n: 0, p: 0, bp: 0, bc: 0, flag: "japon.png" },
    { pays: "Allemagne", classe: "CPC", g: 0, n: 0, p: 0, bp: 0, bc: 0, flag: "allemagne.png" },
  ];

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const newOpacity = Math.max(1 - window.scrollY / 80, 0);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const equipesCalculees = donneesEquipes.map(equipe => {
    const points = (equipe.g * 3) + (equipe.n * 2) + (equipe.p * 1);
    const diff = equipe.bp - equipe.bc;

    return {
      ...equipe,
      pts: points,
      diff: diff
    };
  });

  const equipesTriees = [...equipesCalculees].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts; // Priorité aux points
    return b.diff - a.diff;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title} style={{ opacity }}>Coupe des CP</h1>

      <div className={styles.groupWrapper}>
        <div className={styles.tableContainer}>
          <h2 className={styles.pouleHeader}>Classement</h2>
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
                {equipesTriees.map((equipe, index) => (
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
                    <td className={equipe.diff > 0 ? styles.positiveDiff : ""}>
                      {equipe.diff > 0 ? `+${equipe.diff}` : equipe.diff}
                    </td>
                    <td className={styles.pts}>{equipe.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.legendContainer}>
          <div className={styles.legendGrid}>
            <div className={styles.legendItem}><strong>G</strong> Gagné (3 pts)</div>
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