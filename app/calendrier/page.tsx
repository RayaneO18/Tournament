"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { groupesBase, calendrierMatchs } from "../../data/data";

const Calendrier = () => {
  const [mounted, setMounted] = useState(false);

  // Correction de l'erreur d'hydratation et de removeChild
  useEffect(() => {
    setMounted(true);
  }, []);

  const getEquipeInfo = (nomPays: string) => {
    if (nomPays === "?" || !nomPays) return { flag: null, classe: "" };
    for (const groupe of groupesBase) {
      const found = groupe.equipes.find(e => e.pays === nomPays);
      if (found) return found;
    }
    return { flag: null, classe: "" };
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <header className="pt-32">
        <h1 className={styles.title}>Calendrier</h1>
      </header>

      <div className={styles.weeksGrid}>
        {calendrierMatchs.map((sem, idx) => (
          <div key={idx} className={styles.weekSection}>
            <h2 className={styles.weekTitle}>{sem.semaine}</h2>

            {sem.rencontres.map((match, mIdx) => {
              const info1 = getEquipeInfo(match.eq1);
              const info2 = getEquipeInfo(match.eq2);
              const isFerie = 
                match.date.toLowerCase().includes("férié") || 
                match.poule.toLowerCase().includes("férié");

              return (
                <div key={mIdx} className={`${styles.matchCard} ${isFerie ? styles.ferieCard : ""}`}>
                  <div className={styles.matchHeader}>
                    <span className={styles.dayInfo}>{match.jour}</span>
                    <span className={styles.dateInfo}>{match.date} 2026</span>
                  </div>

                  <div className={styles.matchBody}>
                    {isFerie ? (
                      <div className={styles.ferieLabelContainer}>
                        <span className={styles.ferieLabel}>Jour Férié</span>
                      </div>
                    ) : (
                      <>
                        {/* Équipe 1 */}
                        <div className={`${styles.teamSide} ${styles.leftSide}`}>
                          <div className={styles.teamTextWrapper}>
                            <span className={styles.calendarTeamName}>{match.eq1}</span>
                            <span className={styles.classSubtitle}>{info1.classe}</span>
                          </div>
                          {match.eq1 === "?" ? (
                            <div className={styles.unknownFlag}>?</div>
                          ) : (
                            <img src={`/flags/${info1.flag}`} className={styles.calendarFlag} alt="" />
                          )}
                        </div>

                        {/* VS ou Score */}
                        <div className={styles.scoreBlock}>
                          {match.score1 !== null && match.score2 !== null ? (
                            <>
                              <span className={styles.scoreValue}>{match.score1}</span>
                              <span className={styles.scoreDivider}>-</span>
                              <span className={styles.scoreValue}>{match.score2}</span>
                            </>
                          ) : (
                            <span className={styles.vsLabel}>VS</span>
                          )}
                        </div>

                        {/* Équipe 2 */}
                        <div className={`${styles.teamSide} ${styles.rightSide}`}>
                          {match.eq2 === "?" ? (
                            <div className={styles.unknownFlag}>?</div>
                          ) : (
                            <img src={`/flags/${info2.flag}`} className={styles.calendarFlag} alt="" />
                          )}
                          <div className={styles.teamTextWrapper}>
                            <span className={styles.calendarTeamName}>{match.eq2}</span>
                            <span className={styles.classSubtitle}>{info2.classe}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.matchFooter}>
                    <span className={styles.pouleIndicator}>
                      {isFerie ? "REPOS" : match.poule}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendrier;