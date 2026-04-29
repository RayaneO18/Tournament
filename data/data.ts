export const groupesBase = [
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
      { pays: "Etats-Unis", flag: "Etats-unis.png", classe: "CE2C" },
      { pays: "Panama", flag: "Panama.png", classe: "CM1B" },
      { pays: "Maroc", flag: "Maroc.png", classe: "ULISS" },
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

export const calendrierMatchs = [
  {
    semaine: "Semaine du 4 Mai au 8 Mai",
    rencontres: [
      { jour: "Lundi", date: "4 Mai", eq1: "Allemagne", score1: null, eq2: "Portugal", score2: null, poule: "Poule 1" },
      { jour: "Mardi", date: "5 Mai", eq1: "Etats-Unis", score1: null, eq2: "Panama", score2: null, poule: "Poule 2" },
      { jour: "Jeudi", date: "7 Mai", eq1: "France", score1: null, eq2: "Argentine", score2: null, poule: "Poule 3" },
      { jour: "Vendredi", date: "8 Mai", eq1: "?", score1: null, eq2: "?", score2: null, poule: "Férié" },
    ]
  },
  {
    semaine: "Semaine du 11 Mai au 15 Mai",
    rencontres: [
      { jour: "Lundi", date: "11 Mai", eq1: "Brésil", score1: null, eq2: "Angleterre", score2: null, poule: "Poule 4" },
      { jour: "Mardi", date: "12 Mai", eq1: "Allemagne", score1: null, eq2: "Algérie", score2: null, poule: "Poule 1" },
      { jour: "Jeudi", date: "14 Mai", eq1: "?", score1: null, eq2: "?", score2: null, poule: "Férié" },
      { jour: "Vendredi", date: "15 Mai", eq1: "?", score1: null, eq2: "?", score2: null, poule: "Férié" },
    ]
  },
  {
    semaine: "Semaine du 18 Mai au 22 Mai",
    rencontres: [
      { jour: "Lundi", date: "18 Mai", eq1: "Etats-Unis", score1: null, eq2: "Maroc", score2: null, poule: "Poule 2" },
      { jour: "Mardi", date: "19 Mai", eq1: "Nouvelle-Zélande", score1: null, eq2: "France", score2: null, poule: "Poule 3" },
      { jour: "Jeudi", date: "21 Mai", eq1: "Brésil", score1: null, eq2: "Espagne", score2: null, poule: "Poule 4" },
      { jour: "Vendredi", date: "22 Mai", eq1: "Allemagne", score1: null, eq2: "Japon", score2: null, poule: "Poule 1" },
    ]
  },
  {
    semaine: "Semaine du 25 Mai au 29 Mai",
    rencontres: [
      { jour: "Lundi", date: "25 Mai", eq1: "?", score1: null, eq2: "?", score2: null, poule: "Férié" },
      { jour: "Mardi", date: "26 Mai", eq1: "Maroc", score1: null, eq2: "Panama", score2: null, poule: "Poule 2" },
      { jour: "Jeudi", date: "28 Mai", eq1: "Nouvelle-Zélande", score1: null, eq2: "Argentine", score2: null, poule: "Poule 3" },
      { jour: "Vendredi", date: "29 Mai", eq1: "Espagne", score1: null, eq2: "Angleterre", score2: null, poule: "Poule 4" },
    ]
  },
  {
    semaine: "Semaine du 1 juin au 5 juin",
    rencontres: [
      { jour: "Lundi", date: "1 juin", eq1: "Algérie", score1: null, eq2: "Japon", score2: null, poule: "Poule 1" },
      { jour: "Mardi", date: "2 juin", eq1: "Portugal", score1: null, eq2: "Japon", score2: null, poule: "Poule 1" },
      { jour: "Jeudi", date: "4 juin", eq1: "Portugal", score1: null, eq2: "Algérie", score2: null, poule: "Poule 1" },
      { jour: "Vendredi", date: "5 juin", eq1: "Etats-Unis", score1: null, eq2: "Panama", score2: null, poule: "Poule 2" },
    ]
  }
];