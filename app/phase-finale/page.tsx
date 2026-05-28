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

  // --- COMPOSANTS DE RENDU INTERNES ---
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

 const TeamRow = ({ 
    teamName, 
    score, 
    tab, 
    isWinner, 
    isBold
  }: { 
    teamName: string; 
    score: number | null; 
    tab?: number | null; // <-- Ajout de "| null" ici pour accepter tes données initiales
    isWinner: boolean; 
    isBold?: boolean;
  }) => {
    const showTab = score !== null && tab !== undefined && tab !== null;

    return (
      <div className={styles.teamRow}>
        <Team name={teamName} />
        <div className={styles.scoreSection}>
          
          {/* Les tirs au but s'affichent toujours de la même manière, juste devant le score principal */}
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

  // --- CALCUL DES QUALIFIÉS ET GAGNANTS ---
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

  // Filtrer la Coupe du Fair-Play pour ne pas l'afficher en double en bas
  const fairPlayMatch = matchsSpeciaux.find(m => m.label === "COUPE DU FAIR-PLAY");
  const autresMatchsSpeciaux = matchsSpeciaux.filter(m => m.label !== "COUPE DU FAIR-PLAY");

  return (
    <div className={styles.container}>
      <header className={styles.finalHeader}>
        <h1 className={styles.title}>PHASE FINALE</h1>
      </header>

      <div className={styles.rowsWrapper}>
        
        {/* QUARTS */}
        <section className={styles.stageRow}>
          <h2 className={styles.rowLabel}>Quarts de finale</h2>
          <div className={styles.matchGrid}>
            {quarts.map((m, i) => (
              <div key={i} className={styles.matchWrapper}>
                {m.date && (
                  <span className={styles.matchDateCyan}>
                    📅 {m.date}
                  </span>
                )}
                <div className={styles.matchCard}>
                  <TeamRow teamName={m.eq1} score={m.score1} tab={m.tab1} isWinner={getWinner(m) === m.eq1} />
                  <TeamRow teamName={m.eq2} score={m.score2} tab={m.tab2} isWinner={getWinner(m) === m.eq2} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMIS */}
        <section className={styles.stageRow}>
          <h2 className={styles.rowLabel}>Demi-finales</h2>
          <div className={styles.matchGrid}>
            {demis.map((m, i) => (
              <div key={i} className={styles.matchWrapper}>
                {m.date && (
                  <span className={styles.matchDateCyan}>
                    📅 {m.date}
                  </span>
                )}
                <div className={styles.matchCard}>
                  {i === 0 ? (
                    <>
                      <TeamRow teamName={d1_t1} score={demis[0].score1} tab={demis[0].tab1} isWinner={getWinner(currentDemi1) === d1_t1} />
                      <TeamRow teamName={d1_t2} score={demis[0].score2} tab={demis[0].tab2} isWinner={getWinner(currentDemi1) === d1_t2} />
                    </>
                  ) : (
                    <>
                      <TeamRow teamName={d2_t1} score={demis[1].score1} tab={demis[1].tab1} isWinner={getWinner(currentDemi2) === d2_t1} />
                      <TeamRow teamName={d2_t2} score={demis[1].score2} tab={demis[1].tab2} isWinner={getWinner(currentDemi2) === d2_t2} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLASSEMENT & FINALE */}
        <section className={styles.stageRow}>
          <h2 className={`${styles.rowLabel} ${styles.labelCyan}`}>Matchs pour les Titres</h2>
          <div className={styles.matchGrid}>
            
            {/* COUPE DU FAIR-PLAY */}
            {fairPlayMatch && (
              <div className={styles.matchWrapper}>
                {fairPlayMatch.date && (
                  <span className={styles.matchDateYellow}>
                    📅 {fairPlayMatch.date}
                  </span>
                )}
                <div className={`${styles.matchCard} ${styles.fairPlayCard}`}>
                  <div className={`${styles.miniLabel} ${styles.miniLabelYellow}`}>
                    {fairPlayMatch.label}
                  </div>
                  <TeamRow teamName={fairPlayMatch.eq1} score={fairPlayMatch.score1} tab={fairPlayMatch.tab1} isWinner={getWinner(fairPlayMatch) === fairPlayMatch.eq1} />
                  <TeamRow teamName={fairPlayMatch.eq2} score={fairPlayMatch.score2} tab={fairPlayMatch.tab2} isWinner={getWinner(fairPlayMatch) === fairPlayMatch.eq2} />
                </div>
              </div>
            )}

            {/* 3ÈME PLACE */}
            <div className={styles.matchWrapper}>
              {petiteFinale.date && (
                <span className={styles.matchDateCyan}>
                  📅 {petiteFinale.date}
                </span>
              )}
              <div className={`${styles.matchCard} ${styles.cardDimmed}`}>
                <div className={styles.miniLabel}>3ÈME PLACE</div>
                <TeamRow teamName={pf_t1} score={petiteFinale.score1} tab={petiteFinale.tab1} isWinner={getWinner(currentPetiteFinal) === pf_t1} />
                <TeamRow teamName={pf_t2} score={petiteFinale.score2} tab={petiteFinale.tab2} isWinner={getWinner(currentPetiteFinal) === pf_t2} />
              </div>
            </div>

            {/* GRANDE FINALE */}
            <div className={styles.matchWrapper}>
              {finale.date && (
                <span className={styles.matchDateYellow}>
                  📅 {finale.date}
                </span>
              )}
              <div className={`${styles.matchCard} ${styles.featured}`}>
                <div className={styles.finalGlow}></div>
                <div className={styles.miniLabelCyan}>GRANDE FINALE</div>
                <TeamRow teamName={f_t1} score={finale.score1} tab={finale.tab1} isWinner={getWinner(currentFinal) === f_t1} isBold />
                <div className={styles.vsDivider}>VS</div>
                <TeamRow teamName={f_t2} score={finale.score2} tab={finale.tab2} isWinner={getWinner(currentFinal) === f_t2} isBold />
                <div className={styles.trophyIcon}>🏆</div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION POUR LES AUTRES MATCHS SPÉCIAUX */}
        {autresMatchsSpeciaux.length > 0 && (
          <section className={styles.stageRow}>
            <h2 className={`${styles.rowLabel} ${styles.labelPurple}`}>
              Matchs Événements
            </h2>
            <div className={styles.matchGrid}>
              {autresMatchsSpeciaux.map((m, i) => (
                <div key={i} className={styles.matchWrapper}>
                  {m.date && (
                    <span className={styles.matchDatePurple}>
                      📅 {m.date}
                    </span>
                  )}
                  <div className={`${styles.matchCard} ${styles.specialCard}`}>
                    <div className={`${styles.miniLabel} ${styles.miniLabelPurple}`}>
                      {m.label}
                    </div>
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