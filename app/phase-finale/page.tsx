"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "../page.module.css";

const donneesEquipes = [
  { pays: "France", flag: "France.png", classe: "CPA" },
  { pays: "Japon", flag: "Japon.png", classe: "CPB" },
  { pays: "Allemagne", flag: "Allemagne.png", classe: "CPC" },
  { pays: "Maroc", flag: "Maroc.png", classe: "ULISS" },
  { pays: "Espagne", flag: "Espagne.png", classe: "CE1A" },
  { pays: "Argentine", flag: "Argentine.png", classe: "CE1B" },
  { pays: "Brésil", flag: "Bresil.png", classe: "CE2A" },
  { pays: "Nouvelle-Zélande", flag: "Nouvelle-zelande.png", classe: "CE2B" },
  { pays: "Etats-Unis", flag: "Etats-Unis.png", classe: "CE2C" },
  { pays: "Algérie", flag: "Algerie.png", classe: "CM1A" },
  { pays: "Panama", flag: "Panama.png", classe: "CM1B" },
  { pays: "Angleterre", flag: "Angleterre.png", classe: "CM2A" },
  { pays: "Portugal", flag: "Portugal.png", classe: "CM2B" },
];

interface Match {
  t1: string; s1: number; tab1?: number;
  t2: string; s2: number; tab2?: number;
}

export default function PhaseFinale() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); 

  const [quarts] = useState<Match[]>([
    { t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 },
    { t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 },
    { t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 },
    { t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 },
  ]);

  const [demis] = useState<Match[]>([
    { t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 },
    { t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 },
  ]);

  const [finale] = useState<Match>({ t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 });
  const [petiteFinale] = useState<Match>({ t1: "", s1: 0, tab1: 0, t2: "", s2: 0, tab2: 0 });

  useEffect(() => { 
    setMounted(true); 

  
    const intervalle = setInterval(() => {
      router.refresh();
    }, 180000);

    return () => clearInterval(intervalle);
  }, [router]); 

  if (!mounted) return null;

  // --- LOGIQUE DE CALCUL DES RÉSULTATS ---
  const trouverEquipe = (nom: string) => donneesEquipes.find(e => e.pays === nom);

  const getWinner = (m: Match) => {
    if (!m.t1 || !m.t2) return null;
    if (m.s1 > m.s2) return m.t1;
    if (m.s2 > m.s1) return m.t2;
    if ((m.tab1 || 0) > (m.tab2 || 0)) return m.t1;
    if ((m.tab2 || 0) > (m.tab1 || 0)) return m.t2;
    return null;
  };

  const getLoser = (m: Match) => {
    const winner = getWinner(m);
    if (!winner) return null;
    return winner === m.t1 ? m.t2 : m.t1;
  };

  // --- COMPOSANTS DE RENDU ---
  const Team = ({ name }: { name: string }) => {
    const info = trouverEquipe(name);
    if (!name || !info) return (
      <div className={styles.teamContainer}>
        <div className={styles.nameAndClass}>
          <span className={styles.teamNameSmall} style={{ opacity: 0.5 }}>En attente</span>
        </div>
      </div>
    );

    return (
      <div className={styles.teamContainer}>
        <div className={styles.flagWrapper}>
          <img src={`/flags/${info.flag}`} alt="" className={styles.flagImg} />
        </div>
        <div className={styles.nameAndClass} style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
          <span className={styles.teamNameSmall}>{info.pays}</span>
          <span className={styles.groupBadge} style={{ background: 'none', border: 'none', padding: 0, opacity: 0.6, fontSize: '0.7rem' }}>
            {info.classe}
          </span>
        </div>
      </div>
    );
  };

  const TeamRow = ({ teamName, score, tab, isWinner, isBold }: any) => {
    const showTab = tab !== undefined && tab > 0;
    return (
      <div className={styles.teamRow}>
        <Team name={teamName} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          {showTab && <span className={styles.scoreCyan} style={{ fontSize: '0.8rem' }}>({tab})</span>}
          <span className={isBold ? styles.teamNameBold : styles.teamNameSmall}>{score}</span>
          <div className={isWinner ? styles.dotCyan : styles.dot}></div>
        </div>
      </div>
    );
  };

  // --- CALCUL DES QUALIFIÉS ET GAGNANTS ---
  const qWinner = quarts.map(m => getWinner(m));
  
  // Noms effectifs pour les demis (soit forcé dans l'état, soit calculé depuis les quarts)
  const d1_t1 = demis[0].t1 || qWinner[0] || "";
  const d1_t2 = demis[0].t2 || qWinner[1] || "";
  const d2_t1 = demis[1].t1 || qWinner[2] || "";
  const d2_t2 = demis[1].t2 || qWinner[3] || "";

  // Création d'objets de match "virtuels" pour calculer les vainqueurs/perdants des demis
  const currentDemi1 = { ...demis[0], t1: d1_t1, t2: d1_t2 };
  const currentDemi2 = { ...demis[1], t1: d2_t1, t2: d2_t2 };

  const dWinner = [getWinner(currentDemi1), getWinner(currentDemi2)];
  const dLoser = [getLoser(currentDemi1), getLoser(currentDemi2)];

  // Noms effectifs pour les finales
  const f_t1 = finale.t1 || dWinner[0] || "";
  const f_t2 = finale.t2 || dWinner[1] || "";
  const currentFinal = { ...finale, t1: f_t1, t2: f_t2 };

  const pf_t1 = petiteFinale.t1 || dLoser[0] || "";
  const pf_t2 = petiteFinale.t2 || dLoser[1] || "";
  const currentPetiteFinal = { ...petiteFinale, t1: pf_t1, t2: pf_t2 };

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
              <div key={i} className={styles.matchCard}>
                <TeamRow teamName={m.t1} score={m.s1} tab={m.tab1} isWinner={getWinner(m) === m.t1} />
                <TeamRow teamName={m.t2} score={m.s2} tab={m.tab2} isWinner={getWinner(m) === m.t2} />
              </div>
            ))}
          </div>
        </section>

        {/* DEMIS */}
        <section className={styles.stageRow}>
          <h2 className={styles.rowLabel}>Demi-finales</h2>
          <div className={styles.matchGrid}>
            <div className={styles.matchCard}>
              <TeamRow teamName={d1_t1} score={demis[0].s1} tab={demis[0].tab1} isWinner={getWinner(currentDemi1) === d1_t1} />
              <TeamRow teamName={d1_t2} score={demis[0].s2} tab={demis[0].tab2} isWinner={getWinner(currentDemi1) === d1_t2} />
            </div>
            <div className={styles.matchCard}>
              <TeamRow teamName={d2_t1} score={demis[1].s1} tab={demis[1].tab1} isWinner={getWinner(currentDemi2) === d2_t1} />
              <TeamRow teamName={d2_t2} score={demis[1].s2} tab={demis[1].tab2} isWinner={getWinner(currentDemi2) === d2_t2} />
            </div>
          </div>
        </section>

        {/* CLASSEMENT & FINALE */}
        <section className={styles.stageRow}>
          <h2 className={`${styles.rowLabel} ${styles.labelCyan}`}>Matchs de Classement</h2>
          <div className={styles.matchGrid}>
            
            {/* 3ÈME PLACE */}
            <div className={`${styles.matchCard} ${styles.cardDimmed}`}>
              <div className={styles.miniLabel}>3ÈME PLACE</div>
              <TeamRow teamName={pf_t1} score={petiteFinale.s1} tab={petiteFinale.tab1} isWinner={getWinner(currentPetiteFinal) === pf_t1} />
              <TeamRow teamName={pf_t2} score={petiteFinale.s2} tab={petiteFinale.tab2} isWinner={getWinner(currentPetiteFinal) === pf_t2} />
            </div>

            {/* GRANDE FINALE */}
            <div className={`${styles.matchCard} ${styles.featured}`}>
              <div className={styles.finalGlow}></div>
              <div className={styles.miniLabelCyan}>GRANDE FINALE</div>
              <TeamRow teamName={f_t1} score={finale.s1} tab={finale.tab1} isWinner={getWinner(currentFinal) === f_t1} isBold />
              <div className={styles.vsDivider}>VS</div>
              <TeamRow teamName={f_t2} score={finale.s2} tab={finale.tab2} isWinner={getWinner(currentFinal) === f_t2} isBold />
              <div className={styles.trophyIcon}>🏆</div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}