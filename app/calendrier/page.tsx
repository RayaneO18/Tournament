"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
// On importe bien les interfaces exportées
import { groupesBase, calendrierMatchs, Rencontre, Match, Semaine } from "../../data/data";

const Calendrier = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getEquipeInfo = (nomPays: string) => {
    if (nomPays === "?" || !nomPays) return { flag: null, classe: "" };
    return groupesBase.flatMap(g => g.equipes).find(e => e.pays === nomPays) || { flag: null, classe: "" };
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <header className="pt-32">
        <h1 className={styles.title}>Calendrier</h1>
      </header>

      <div className={styles.weeksGrid}>
        {/* On vérifie que calendrierMatchs existe avant de map */}
        {calendrierMatchs?.map((sem: Semaine, idx: number) => (
          <div key={idx} className={styles.weekSection}>
            <h2 className={styles.weekTitle}>{sem.semaine}</h2>

            {/* On vérifie que sem.rencontres existe */}
            {sem.rencontres?.map((jour: Rencontre, jIdx: number) => (
              ((jour.matchs && jour.matchs.length > 0) || jour.isFerie) && (
                <div key={jIdx} className={`${styles.matchCard} ${jour.isFerie ? styles.ferieCard : ""}`}>
                  
                  <div className={styles.matchHeader}>
                    <span className={styles.dayInfo}>{jour.jour}</span>
                    <span className={styles.dateInfo}>{jour.date} 2026</span>
                  </div>

                  {jour.isFerie ? (
                    <div className={styles.matchBody}>
                      <div className={styles.ferieLabelContainer}>
                        <span className={styles.ferieLabel}>Jour Férié</span>
                      </div>
                    </div>
                  ) : (
                    jour.matchs.map((m: Match, mIdx: number) => {
                      const info1 = getEquipeInfo(m.eq1);
                      const info2 = getEquipeInfo(m.eq2);

                      return (
                        <div key={mIdx}>
                          {/* Trait de séparation bleu si c'est le second match du jour */}
                          {mIdx > 0 && (
                            <div style={{ margin: "15px 35px", borderTop: "1px solid rgba(34, 211, 238, 0.4)", height: "0px" }} />
                          )}

                          <div className={styles.matchBody}>
                            <div className={`${styles.teamSide} ${styles.leftSide}`}>
                              <div className={styles.teamTextWrapper}>
                                <span className={styles.calendarTeamName}>{m.eq1}</span>
                                <span className={styles.classSubtitle}>{info1.classe}</span>
                              </div>
                              {m.eq1 === "?" ? (
                                <div className={styles.unknownFlag}>?</div>
                              ) : (
                                <img src={`/flags/${info1.flag}`} className={styles.calendarFlag} alt="" />
                              )}
                            </div>

                            <div className={styles.scoreBlock}>
                              {m.score1 !== null ? (
                                <>
                                  <span className={styles.scoreValue}>{m.score1}</span>
                                  <span className={styles.scoreDivider}>-</span>
                                  <span className={styles.scoreValue}>{m.score2}</span>
                                </>
                              ) : (
                                <span className={styles.vsLabel}>VS</span>
                              )}
                            </div>

                            <div className={`${styles.teamSide} ${styles.rightSide}`}>
                              {m.eq2 === "?" ? (
                                <div className={styles.unknownFlag}>?</div>
                              ) : (
                                <img src={`/flags/${info2.flag}`} className={styles.calendarFlag} alt="" />
                              )}
                              <div className={styles.teamTextWrapper}>
                                <span className={styles.calendarTeamName}>{m.eq2}</span>
                                <span className={styles.classSubtitle}>{info2.classe}</span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.matchFooter}>
                            <span className={styles.pouleIndicator}>{m.poule}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {jour.isFerie && (
                    <div className={styles.matchFooter}>
                      <span className={styles.pouleIndicator}>REPOS</span>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendrier;