// --- 1. VOS INTERFACES OFFICIELLES (Source unique de vérité) ---

export interface Equipe {
  pays: string;
  flag: string;
  classe: string;
}

export interface Groupe {
  nom: string;
  equipes: Equipe[];
}

export interface Match {
  eq1: string;
  score1: number | null;
  tab1?: number| null;
  eq2: string;
  score2: number | null;
  tab2?: number| null;     
  poule: string;
  isForfait?: boolean;
  gagnantTAB?: string; 
  date?: string;       
  label?: string;      
}

export interface Rencontre {
  jour: string;
  date: string;
  matchs: Match[];
  isFerie?: boolean;
  isReporte?: boolean;      
  isTirageAuSort?: boolean;
  isForfait?: boolean;
}

export interface Semaine {
  semaine: string;
  rencontres: Rencontre[];
}

// --- 2. DONNÉES DE LA PHASE DE POULE ---

export const groupesBase: Groupe[] = [
  {
    nom: "Poule 1",
    equipes: [
      { pays: "Allemagne", flag: "Allemagne.png", classe: "CPC" },
      { pays: "Portugal", flag: "Portugal.png", classe: "CM2B" },
      { pays: "Algérie", flag: "Algerie.png", classe: "CM1A" },
      { pays: "Japon", flag: "Japon.png", classe: "CPB" },
    ],
  },
  {
    nom: "Poule 2",
    equipes: [
      { pays: "Etats-Unis", flag: "Etats-Unis.png", classe: "CE2C" },
      { pays: "Panama", flag: "Panama.png", classe: "CM1B" },
      { pays: "Maroc", flag: "Maroc.png", classe: "ULIS" },
    ],
  },
  {
    nom: "Poule 3",
    equipes: [
      { pays: "France", flag: "France.png", classe: "CPA" },
      { pays: "Argentine", flag: "Argentine.png", classe: "CE1B" },
      { pays: "Nouvelle-Zélande", flag: "Nouvelle-zelande.png", classe: "CE2B" },
    ],
  },
  {
    nom: "Poule 4",
    equipes: [
      { pays: "Brésil", flag: "Bresil.png", classe: "CE2A" },
      { pays: "Angleterre", flag: "Angleterre.png", classe: "CM2A" },
      { pays: "Espagne", flag: "Espagne.png", classe: "CE1A" },
    ],
  },
];

export const calendrierMatchs: Semaine[] = [
  {
    semaine: "Semaine du 11 Mai au 15 Mai",
    rencontres: [
      { jour: "Lundi", date: "11 Mai", isReporte: true, matchs: [] },
      { jour: "Mardi", date: "12 Mai", matchs: [{ eq1: "Allemagne", score1: 2, eq2: "Portugal", score2: 15, poule: "Poule 1" },{ eq1: "Allemagne", score1: 1, eq2: "Algérie", score2: 0, poule: "Poule 1", isForfait: true} ] },
      { jour: "Jeudi", date: "14 Mai", isFerie: true, matchs: [] },
      { jour: "Vendredi", date: "15 Mai", isFerie: true, matchs: [] },
    ]
  },
  {
    semaine: "Semaine du 18 Mai au 22 Mai",
    rencontres: [
      { jour: "Lundi", date: "18 Mai", matchs: [{ eq1: "Etats-Unis", score1: 3, eq2: "Maroc", score2: 1, poule: "Poule 2" }, { eq1: "France", score1: 0, eq2: "Argentine", score2: 2, poule: "Poule 3" } ] },
      { jour: "Mardi", date: "19 Mai", isReporte: true, matchs: [] },
      { jour: "Jeudi", date: "21 Mai", matchs: [{ eq1: "Nouvelle-Zélande", score1: 1, eq2: "France", score2: 4, poule: "Poule 3" }, { eq1: "Brésil", score1: 0, eq2: "Angleterre", score2: 2, poule: "Poule 4" }] },
      { jour: "Vendredi", date: "22 Mai", matchs: [{ eq1: "Etats-Unis", score1: 1, eq2: "Panama", score2: 0, poule: "Poule 2" }, { eq1: "Brésil", score1: 0, eq2: "Espagne", score2: 0, poule: "Poule 4", gagnantTAB: "Espagne" }] },
    ]
  },
  {
    semaine: "Semaine du 25 Mai au 29 Mai",
    rencontres: [
      { jour: "Lundi", date: "25 Mai", isFerie: true, matchs: [] },
      { jour: "Mardi", date: "26 Mai", matchs: [{ eq1: "Allemagne", score1: 3, eq2: "Japon", score2: 1, poule: "Poule 1" }, { eq1: "Maroc", score1: 0, eq2: "Panama", score2: 3, poule: "Poule 2" }] },
      { jour: "Jeudi", date: "28 Mai", matchs: [{ eq1: "Espagne", score1: 0, eq2: "Angleterre", score2: 2, poule: "Poule 4" }] },
      { jour: "Vendredi", date: "29 Mai", matchs: [{ eq1: "Nouvelle-Zélande", score1: 2, eq2: "Argentine", score2: 0, poule: "Poule 3" }] },
    ]
  },
  {
    semaine: "Semaine du 1 Juin au 5 Juin",
    rencontres: [
      { jour: "Lundi", date: "1 juin", matchs: [{ eq1: "Portugal", score1: 16, eq2: "Japon", score2: 4, poule: "Poule 1" }] },
      { jour: "Mardi", date: "2 juin", matchs: [{ eq1: "Algérie", score1: 11, eq2: "Japon", score2: 0, poule: "Poule 1" }] },
      { jour: "Jeudi", date: "4 juin", matchs: [{ eq1: "Portugal", score1: 2, eq2: "Algérie", score2: 2, poule: "Poule 1" }] },
      { jour: "Vendredi", date: "5 juin",isTirageAuSort: true, matchs: [] },    ]
  },
];  

// --- 3. DONNÉES DE LA PHASE FINALE (Même type 'Match') ---

export const initialQuarts: Match[] = [
  { eq1: "Angleterre", score1: null, tab1: null, eq2: "Panama", score2: null, tab2: null, poule: "Quart de finale", date: "8 Juin" },
  { eq1: "Portugal", score1: null, tab1: null, eq2: "Espagne", score2: null, tab2: null, poule: "Quart de finale", date: "9 Juin" },
  { eq1: "Etats-Unis", score1: null, tab1: null, eq2: "Allemagne", score2: null, tab2: null, poule: "Quart de finale", date: "11 Juin" },
  { eq1: "France", score1: null, tab1: null, eq2: "Argentine", score2: null, tab2: null, poule: "Quart de finale", date: "12 Juin" },
];

export const initialDemis: Match[] = [
  { eq1: "", score1: null, tab1: null, eq2: "", score2: null, tab2: null, poule: "Demi-finale", date: "15 Juin" },
  { eq1: "", score1: null, tab1: null, eq2: "", score2: null, tab2: null, poule: "Demi-finale", date: "16 Juin" },
];

export const initialFinale: Match = { eq1: "", score1: null, tab1: null, eq2: "", score2: null, tab2: null, poule: "Finale", date: "26 Juin" };

export const initialPetiteFinale: Match = { eq1: "", score1: null, tab1: null, eq2: "", score2: null, tab2: null, poule: "3ème place", date: "23 Juin" };

export const initialMatchsSpeciaux: Match[] = [
  { eq1: "Animateurs", score1: null, eq2: "Parents", score2: null, poule: "Spécial", date: "19 Juin", label: "MATCH ALLER ANIMATEURS VS PARENTS" },
  { eq1: "", score1: null, eq2: "", score2: null, poule: "Spécial", date: "22 Juin", label: "COUPE DU FAIR-PLAY" },
  { eq1: "Parents", score1: null, eq2: "Animateurs", score2: null, poule: "Spécial", date: "25 Juin", label: "MATCH RETOUR ANIMATEURS VS PARENTS" }
];