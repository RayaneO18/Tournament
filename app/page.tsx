"use client";
import styles from "./page.module.css";

export default function Page() {
  
  return (
    <div className={styles.container}>
      <header className="pt-32"> 
        <h1 className={styles.title}>Tournoi Vercin 2026</h1>
      </header>

      {/* ENCADRÉ D'INFORMATION DYNAMIQUE */}
      <div className={styles.apercuUpdateBox}>
        <span className={styles.apercuInfoEmoji}>⚠️</span>
        <p className={styles.apercuUpdateText}>
          <strong>Note importante :</strong> Cet espace centralise toutes les alertes du tournoi : modifications de match, annulations pour cause d'intempéries ou absence créant un manque d'effectif.
          <br></br>
          ☔ Certains matchs ont été déplacés en raison de la pluie : certaines journées compteront deux rencontres (deux matchs par jour).
          <br></br>
          <br></br>
        Mise à jour 19/05 : En raison des intempéries, les matchs du 19/05 ainsi que d'autres rencontres ont dû être déplacés. Veuillez consulter le nouveau calendrier.
          <br></br>
          <br></br>
         Mise à jour 27/05 : En raison d'une sortie scolaire, les matchs du 01/06 et du 02/06 ont été inversés.
        </p>
      </div>

      {/* BLOC REMISE DES RÉCOMPENSES (TEXTE SIMPLIFIÉ) */}
      <div className={styles.apercuRewardSection}>
        <div className={styles.apercuRewardCardFull}>
          <div className={styles.apercuRuleHeader}>
            <span className={styles.apercuInfoEmoji}>🏆</span>
            <h3 className={styles.apercuRewardTitle}>Cérémonie de Clôture</h3>
          </div>
          <p className={styles.apercuRuleDescription}>
            <strong>Événement de fin de tournoi :</strong> Rassemblement de toutes les équipes pour procéder à la remise de toutes les récompenses.
          </p>
          <div className={styles.apercuRewardBadge}>
            Lundi 29 Juin
          </div>
        </div>
      </div>

      {/* SECTION DES RÈGLES */}
      <section className={styles.apercuRulesSection}>
        <h2 className={styles.apercuRulesLabel}>Règles du Tournoi</h2>
        
        <div className={styles.apercuRulesGrid}>
          
          {/* Règle 1: Effectifs et Durée Classique */}
          <div className={styles.apercuRuleCard}>
            <div className={styles.apercuRuleHeader}>
              <span className={styles.apercuRuleIndex}>01</span>
              <h3 className={styles.apercuRuleTitle}>Format des Matchs</h3>
            </div>
            <p className={styles.apercuRuleDescription}>
              <strong>Durée :</strong> 10 min / 5 min (repos) / 10 min.
            </p>
            <p className={styles.apercuRuleDescription}>
              <strong>Effectif :</strong> 5 joueurs de base.
            </p>
            <p className={styles.apercuRuleDescription}>
              <strong>Spécificité CP :</strong> Les buts comptent double.
            </p>
            <div className={styles.apercuLevelBadge}>
              +1 joueur par écart de niveau de classe
            </div>
          </div>

          {/* Règle 2: Phases Finales & Finale Spéciale */}
          <div className={styles.apercuRuleCard}>
            <div className={styles.apercuRuleHeader}>
              <span className={styles.apercuRuleIndex}>02</span>
              <h3 className={styles.apercuRuleTitle}>Phases Finales</h3>
            </div>
            <ul className={styles.apercuRuleList}>
              <li>Terrain agrandi et passage à <strong>6 joueurs</strong>.</li>
              <li>Nouveau tirage au sort des matchs.</li>
              <li><strong>Finale :</strong> 20 min / 5 min (repos) / 20 min.</li>
            </ul>
          </div>

          {/* Règle 3: Coupe des CP */}
          <div className={`${styles.apercuRuleCard} ${styles.apercuSpecialBorder}`}>
            <div className={styles.apercuRuleHeader}>
              <span className={styles.apercuRuleIndex}>03</span>
              <h3 className={styles.apercuCyanText}>Coupe des CP</h3>
            </div>
            <p className={styles.apercuRuleDescription}>Format "Tournante" spécial :</p>
            <ul className={styles.apercuRuleList}>
              <li><strong>3 matchs</strong> de 10 minutes chacun.</li>
              <li>Victoire finale au plus grand nombre de points.</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}