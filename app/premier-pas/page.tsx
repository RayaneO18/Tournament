"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from "../page.module.css";
import { getStatsCoupeCP } from "../../data/logic";

export const dynamic = "force-dynamic"; 

export default function CoupeCPPage() {
  const router = useRouter(); 
  const [equipesTriees, setEquipesTriees] = useState(getStatsCoupeCP());
  const [opacity, setOpacity] = useState(1);

  const drapeaux: Record<string, string> = {
    France: "France.png",
    Japon: "Japon.png",
    Allemagne: "Allemagne.png"
  };

  useEffect(() => {
    const handleScroll = () => {
      const newOpacity = Math.max(1 - window.scrollY / 80, 0);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);

    const intervalle = setInterval(() => {
      router.refresh();
      setEquipesTriees(getStatsCoupeCP());
    }, 180000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalle);
    };
  }, [router]);

  // --- CALCUL DYNAMIQUE DES RANGS (Gestion des ex-æquo) ---
  let rangActuel = 1;
  const rangsCalcules = equipesTriees.map((equipe, index) => {
    if (index > 0) {
      const equipePrecedente = equipesTriees[index - 1];
      const diffActuelle = equipe.bp - equipe.bc;
      const diffPrecedente = equipePrecedente.bp - equipePrecedente.bc;

      // Si les points OU la différence de buts diffèrent, on met à jour le rang basé sur la position réelle
      if (equipe.pts !== equipePrecedente.pts || diffActuelle !== diffPrecedente) {
        rangActuel = index + 1;
      }
    }
    return rangActuel;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title} style={{ opacity }}>Coupe des CP</h1>

      <div className={styles.groupWrapper}>
        
        {/* SECTION 1 : LE TABLEAU DE CLASSEMENT */}
        <div className={styles.tableContainer}>
          <h2 className={styles.pouleHeader}>
            <span>Classement</span>
            <span className={styles.pouleDate}>18 Juin</span>
          </h2>
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
                  const rangAffichage = rangsCalcules[index];
                  
                  // Seul le véritable premier du classement s'allume en vert
                  const rankClassName = rangAffichage === 1 
                    ? `${styles.rank} ${styles.qualifiedRank}` 
                    : styles.rank;

                  return (
                    <tr key={equipe.pays} className={styles.tr}>
                      <td className={rankClassName}>{rangAffichage}</td>
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

        {/* SECTION 2 : LES 3 ENCADRÉS DE CONFRONTATION */}
        <div className={styles.cpMatchGrid}>
          
          {/* Match 1 */}
          <div className={styles.cpMatchCard}>
            <span className={styles.cpMatchHeader}>Match 1</span>
            <div className={styles.cpMatchBody}>
              <div className={`${styles.cpMatchTeam} ${styles.cpMatchTeamLeft}`}>
                <span className={styles.cpMatchTeamName}>France</span>
                <img src={`/flags/${drapeaux["France"]}`} alt="France" className={styles.cpMatchFlag} />
              </div>
              <div className={styles.cpMatchScoreBox}>
                <span>2</span>
                <span>-</span>
                <span>0</span>
              </div>
              <div className={`${styles.cpMatchTeam} ${styles.cpMatchTeamRight}`}>
                <img src={`/flags/${drapeaux["Japon"]}`} alt="Japon" className={styles.cpMatchFlag} />
                <span className={styles.cpMatchTeamName}>Japon</span>
              </div>
            </div>
          </div>

          {/* Match 2 */}
          <div className={styles.cpMatchCard}>
            <span className={styles.cpMatchHeader}>Match 2</span>
            <div className={styles.cpMatchBody}>
              <div className={`${styles.cpMatchTeam} ${styles.cpMatchTeamLeft}`}>
                <span className={styles.cpMatchTeamName}>Allemagne</span>
                <img src={`/flags/${drapeaux["Allemagne"]}`} alt="Allemagne" className={styles.cpMatchFlag} />
              </div>
              <div className={styles.cpMatchScoreBox}>
                <span>0</span>
                <span>-</span>
                <span>0</span>
              </div>
              <div className={`${styles.cpMatchTeam} ${styles.cpMatchTeamRight}`}>
                <img src={`/flags/${drapeaux["Japon"]}`} alt="Japon" className={styles.cpMatchFlag} />
                <span className={styles.cpMatchTeamName}>Japon</span>
              </div>
            </div>
          </div>

          {/* Match 3 */}
          <div className={styles.cpMatchCard}>
            <span className={styles.cpMatchHeader}>Match 3</span>
            <div className={styles.cpMatchBody}>
              <div className={`${styles.cpMatchTeam} ${styles.cpMatchTeamLeft}`}>
                <span className={styles.cpMatchTeamName}>France</span>
                <img src={`/flags/${drapeaux["France"]}`} alt="France" className={styles.cpMatchFlag} />
              </div>
              <div className={styles.cpMatchScoreBox}>
                <span>2</span>
                <span>-</span>
                <span>0</span>
              </div>
              <div className={`${styles.cpMatchTeam} ${styles.cpMatchTeamRight}`}>
                <img src={`/flags/${drapeaux["Allemagne"]}`} alt="Allemagne" className={styles.cpMatchFlag} />
                <span className={styles.cpMatchTeamName}>Allemagne</span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3 : LÉGENDES */}
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