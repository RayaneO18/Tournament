"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "../page.module.css";

import { 
  initialQuarts, 
  initialDemis, 
  initialFinale, 
  initialPetiteFinale, 
  initialMatchsSpeciaux 
} from "../../data/data";

import { trouverEquipe, getWinner, getLoser } from "../../data/logic";

export default function PhaseFinale() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); 

  const [quarts] = useState(initialQuarts);
  const [demis] = useState(initialDemis);
  const [finale] = useState(initialFinale);
  const [petiteFinale] = useState(initialPetiteFinale);
  const [matchsSpeciaux] = useState(initialMatchsSpeciaux);

  useEffect(() => { 
    setMounted(true); 

    const intervalle = setInterval(() => {
      router.refresh();
    }, 180000);

    return () => clearInterval(intervalle);
  }, [router]); 

  if (!mounted) return null;

  // --- RENDU ÉQUIPE ---
  const Team = ({ name }: { name: string }) => {
    const info = trouverEquipe(name);
    
    if (!name || !info) return (
      <div className={styles.teamContainer}>
        <div className={styles.nameAndClass}>
          <span className={`${styles.teamNameSmall} ${styles.teamNameWaiting}`}>En attente</span>
        </div>
      </div>
    );

    if (name === "Animateurs" || name === "Parents") {
      return (
        <div className={`${styles.teamContainer} ${styles.teamContainerStaff}`}>
          <div className={styles.nameAndClass}>
            <span className={`${styles.teamNameSmall} ${styles.teamNameStaff}`}>{info.pays}</span>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.teamContainer}>
        <div className={styles.flagWrapper}>
          <img src={`/flags/${info.flag}`} alt="" className={styles.flagImg} />
        </div>
        <div className={styles.nameAndClass}>
          <span className={styles.teamNameSmall}>{info.pays}</span>
          {info.classe && (
            <span className={styles.groupBadge}>
              {info.classe}
            </span>
          )}
        </div>
      </div>
    );
  };

  // --- RENDU LIGNE SCORE ---
  const TeamRow = ({ 
    teamName, 
    score, 
    tab, 
    isWinner, 
    isBold
  }: { 
    teamName: string; 
    score: number | null; 
    tab?: number | null; 
    isWinner: boolean; 
    isBold?: boolean;
  }) => {
    const showTab = score !== null && tab !== undefined && tab !== null;

    return (
      <div className={styles.teamRow}>
        <Team name={teamName} />
        <div className={styles.scoreSection}>
          {showTab && (
            <span className={`${styles.scoreCyan} ${styles.scoreTab}`}>({tab})</span>
          )}
          <span className={isBold ? styles.teamNameBold : styles.teamNameSmall}>
            {score !== null ? score : "-"}
          </span>
          <div className={isWinner ? styles.dotCyan : styles.dot}></div>
        </div>
      </div>
    );
  };

  // --- LOGIQUE BRACKET ---
  const qWinner = quarts.map(m => getWinner(m));
  const d1_t1 = demis[0]?.eq1 || qWinner[0] || "";
  const d1_t2 = demis[0]?.eq2 || qWinner[1] || "";
  const d2_t1 = demis[1]?.eq1 || qWinner[2] || "";
  const d2_t2 = demis[1]?.eq2 || qWinner[3] || "";

  const currentDemi1 = { ...demis[0], eq1: d1_t1, eq2: d1_t2 };
  const currentDemi2 = { ...demis[1], eq1: d2_t1, eq2: d2_t2 };

  const dWinner = [getWinner(currentDemi1), getWinner(currentDemi2)];
  const dLoser = [getLoser(currentDemi1), getLoser(currentDemi2)];

  const f_t1 = finale.eq1 || dWinner[0] || "";
  const f_t2 = finale.eq2 || dWinner[1] || "";
  const currentFinal = { ...finale, eq1: f_t1, eq2: f_t2 };

  const pf_t1 = petiteFinale.eq1 || dLoser[0] || "";
  const pf_t2 = petiteFinale.eq2 || dLoser[1] || "";
  const currentPetiteFinal = { ...petiteFinale, eq1: pf_t1, eq2: pf_t2 };

  const fairPlayMatch = matchsSpeciaux.find(m => m.label === "COUPE DU FAIR-PLAY");
  const autresMatchsSpeciaux = matchsSpeciaux.filter(m => m.label !== "COUPE DU FAIR-PLAY");

  return (
    <div className={styles.container}>
      <header className={styles.finalHeader}>
        <h1 className={styles.title}>PHASE FINALE</h1>
      </header>

      {/* ENVELOPPE DE SCROLL UNIQUE POUR SYNCHRONISER LES TITRES ET LES MATCHS */}
      <div className={styles.bracketWrapperScroll}>
        
        {/* 1. LIGNE DES TITRES ALIGNÉS EN HAUT */}
        <div className={styles.bracketHeaders}>
          <div className={styles.columnHeaderWrapper}>
            <h2 className={`${styles.rowLabel} ${styles.labelCyan}`}>Quarts de finale</h2>
          </div>
          <div className={styles.columnHeaderWrapper}>
            <h2 className={`${styles.rowLabel} ${styles.labelPurple}`}>Demi-finales</h2>
          </div>
          <div className={styles.columnHeaderWrapper}>
            <h2 className={`${styles.rowLabel} ${styles.labelYellow}`}>Finales</h2>
          </div>
        </div>

        {/* 2. L'ARBRE (BRACKET CHRONOLOGIQUE ET GÉOMÉTRIQUE) */}
        <div className={styles.bracketContainer}>
          
          {/* COLONNE 1 : QUARTS */}
          <div className={styles.bracketColumn}>
            {quarts.map((m, i) => (
              <div key={i} className={styles.matchSlot}>
                <div className={styles.matchWrapper}>
                  {m.date && <span className={styles.matchDateCyan}>{m.date}</span>}
                  <div className={styles.matchCard}>
                    <TeamRow teamName={m.eq1} score={m.score1} tab={m.tab1} isWinner={getWinner(m) === m.eq1} />
                    <TeamRow teamName={m.eq2} score={m.score2} tab={m.tab2} isWinner={getWinner(m) === m.eq2} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COLONNE 2 : DEMIS */}
          <div className={styles.bracketColumn}>
            {/* Demi 1 */}
            <div className={styles.matchSlotDemi}>
              <div className={styles.matchWrapper}>
                {demis[0]?.date && <span className={styles.matchDatePurple}>{demis[0].date}</span>}
                <div className={styles.matchCard}>
                  <TeamRow teamName={d1_t1} score={demis[0]?.score1 ?? null} tab={demis[0]?.tab1} isWinner={getWinner(currentDemi1) === d1_t1} />
                  <TeamRow teamName={d1_t2} score={demis[0]?.score2 ?? null} tab={demis[0]?.tab2} isWinner={getWinner(currentDemi1) === d1_t2} />
                </div>
              </div>
            </div>

            {/* Demi 2 */}
            <div className={styles.matchSlotDemi}>
              <div className={styles.matchWrapper}>
                {demis[1]?.date && <span className={styles.matchDatePurple}>{demis[1].date}</span>}
                <div className={styles.matchCard}>
                  <TeamRow teamName={d2_t1} score={demis[1]?.score1 ?? null} tab={demis[1]?.tab1} isWinner={getWinner(currentDemi2) === d2_t1} />
                  <TeamRow teamName={d2_t2} score={demis[1]?.score2 ?? null} tab={demis[1]?.tab2} isWinner={getWinner(currentDemi2) === d2_t2} />
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE 3 : FINALE ET 3ÈME PLACE */}
          <div className={styles.bracketColumn}>
            <div className={styles.matchSlotFinale}>
              
              {/* GRANDE FINALE */}
              <div className={styles.matchWrapper} style={{ marginBottom: "40px" }}>
                {finale.date && <span className={styles.matchDateYellow}>{finale.date}</span>}
                <div className={`${styles.matchCard} ${styles.featured}`}>
                  <div className={styles.finalGlow}></div>
                  <div className={styles.miniLabelCyan}>GRANDE FINALE</div>
                  <TeamRow teamName={f_t1} score={finale.score1} tab={finale.tab1} isWinner={getWinner(currentFinal) === f_t1} isBold />
                  <div className={styles.vsDivider}>VS</div>
                  <TeamRow teamName={f_t2} score={finale.score2} tab={finale.tab2} isWinner={getWinner(currentFinal) === f_t2} isBold />
                  <div className={styles.trophyIcon}>🏆</div>
                </div>
              </div>

              {/* 3ÈME PLACE */}
              <div className={styles.matchWrapper}>
                {petiteFinale.date && <span className={styles.matchDateCyan}>{petiteFinale.date}</span>}
                <div className={`${styles.matchCard} ${styles.cardDimmed}`}>
                  <div className={styles.miniLabel}>3ÈME PLACE</div>
                  <TeamRow teamName={pf_t1} score={petiteFinale.score1} tab={petiteFinale.tab1} isWinner={getWinner(currentPetiteFinal) === pf_t1} />
                  <div className={styles.vsDivider}>VS</div>
                  <TeamRow teamName={pf_t2} score={petiteFinale.score2} tab={petiteFinale.tab2} isWinner={getWinner(currentPetiteFinal) === pf_t2} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* SECTIONS ANNEXES TRAINANTES EN BAS (RESTENT EN COMPORTEMENT NORMAL) */}
      <div className={styles.extraSectionWrapper}>
        {fairPlayMatch && (
          <section className={styles.stageRow}>
            <h2 className={`${styles.rowLabel} ${styles.labelYellow}`}>Récompense Spéciale</h2>
            <div className={styles.matchGrid}>
              <div className={styles.matchWrapper} style={{ width: "280px" }}>
                <br></br>
                {fairPlayMatch.date && <span className={styles.matchDateYellow}>{fairPlayMatch.date}</span>}
                <div className={`${styles.matchCard} ${styles.fairPlayCard}`}>
                  <div className={`${styles.miniLabel} ${styles.miniLabelYellow}`}>{fairPlayMatch.label}</div>
                  <TeamRow teamName={fairPlayMatch.eq1} score={fairPlayMatch.score1} tab={fairPlayMatch.tab1} isWinner={getWinner(fairPlayMatch) === fairPlayMatch.eq1} />
                  <TeamRow teamName={fairPlayMatch.eq2} score={fairPlayMatch.score2} tab={fairPlayMatch.tab2} isWinner={getWinner(fairPlayMatch) === fairPlayMatch.eq2} />
                </div>
              </div>
            </div>
          </section>
        )}

        {autresMatchsSpeciaux.length > 0 && (
          <section className={styles.stageRow}>
            <h2 className={`${styles.rowLabel} ${styles.labelPurple}`}>Matchs Événements</h2>
            <div className={styles.matchGrid}>
              {autresMatchsSpeciaux.map((m, i) => (
                <div key={i} className={styles.matchWrapper} style={{ width: "260px" }}>
                  <br></br>
                  {m.date && <span className={styles.matchDatePurple}>{m.date}</span>}
                  <div className={`${styles.matchCard} ${styles.specialCard}`}>
                    <div className={`${styles.miniLabel} ${styles.miniLabelPurple}`}>{m.label}</div>
                    <TeamRow teamName={m.eq1} score={m.score1} tab={m.tab1} isWinner={getWinner(m) === m.eq1} />
                    <TeamRow teamName={m.eq2} score={m.score2} tab={m.tab2} isWinner={getWinner(m) === m.eq2} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}