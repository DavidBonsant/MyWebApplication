
status = {
  VIDE:0,
  ROUGE:1,
  JAUNE:2
};

var hauteur = 6;
var largeur = 7;

function newGame() {
  var grille = [];
  for (i = 0; i < largeur; i++) {
    grille[i]=[];
    for (j = 0; j < hauteur; j++) {
      grille[i][j]=status.VIDE;
    }
  }
  return grille;
};

var grille = newGame();

var tour = true; // true => Rouge, false => Jaune
var lock = true; //agit en tant que lock pour la fonction onClick

function onClick (id) {
  if (lock) {
    lock = false;
    var i = id[0]; // premier caractère du id.
    var valide = false;
    var victoire = false;

    for (j = 0; j < hauteur; j++) {
      if (grille[i][j]) {
        grille[i][j] = tour ? status.ROUGE: status.JAUNE;
        tour = !tour;
        valide = true;
        // On place le jeton
        //---------------------------
        break;
      }
    }
    // On crée une grille en vérifiant les lignes de 3 pour de différents angles.
    if (valide) {
      grille2 = [];
      for (i = 0; i < largeur; i++) {
        grille2[i] = []
        for (j = 0; j < hauteur; j++) {
          grille2[i][j] = {
            couleur: grille[i][j],
            d0: j < largeur - 1 && j > 0 && grille[i][j] == grille[i][j+1] && grille[i][j] == grille[i][j-1],
            d45: i < hauteur - 1 && i > 0 && j < largeur - 1 && j > 0 && j > 0 && grille[i][j] == grille[i+1][j+1] && grille[i][j] == grille[i-1][j-1],
            d90: i < hauteur - 1 && i > 0 && grille[i][j] == grille[i+1][j] && grille[i][j] == grille[i-1][j],
            d135: i < hauteur - 1 && i > 0 && j < largeur - 1 && j > 0 && j > 0 && grille[i][j] == grille[i-1][j+1] && grille[i][j] == grille[i+1][j-1]
          };
        }
      }
      // on vérifie si deux places adjacentes ont une ligne de trois pour le même angle qu'ils sont parraport à eux même.
      for (i = 0; i < largeur; i++) {
        for (j = 0; j < hauteur; j++) {
          if (grille2[i][j].d0 && (grille2[i][j-1].d0 || grille2[i][j+1].d0) ||
              grille2[i][j].d45 && (grille2[i-1][j-1].d45 || grille2[i+1][j+1].d45) ||
              grille2[i][j].d90 && (grille2[i-1][j].d90 || grille2[i+1][j].d90) ||
              grille2[i][j].d135 && (grille2[i+1][j-1].d135 || grille2[i-1][j+1].d135)
              ) {
            victoire = true;
            // afficher message de victoire.
            //-----------------------------
            lock = true;
            return;
          }
        }
      }
    }
    lock = true;
  }
};

// Fonction pour dessiner le tableau
function drawGrid() {
  document.write(`<table border="0" cellspacing="0" cellpadding="0">`);
  for (i=0;i<hauteur;i++) {
    document.write("<tr>");
    for (j=0;j<largeur;j++) {
      document.write(`<td><img id="${j*10+hauteur-i-1}" src="vide.png"></td>`);
    }
    document.write("</tr>");
  }
  document.write("</table>");
}
