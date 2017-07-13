
var état = {
  VIDE:"vide.png",
  ROUGE:"rouge.png",
  JAUNE:"jaune.png"
};

var hauteur = 6;
var largeur = 7;

function newGame() {
  var grille = [];
  for (i = 0; i < largeur; i++) {
    grille[i]=[];
    for (j = 0; j < hauteur; j++) {
      grille[i][j]=état.VIDE;
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
    var valide = false;
    var victoire = false;

    for (j = 0; j < hauteur; j++) {
      if (grille[id][j] == état.VIDE) {
        grille[id][j] = tour ? état.ROUGE: état.JAUNE;
        tour = !tour;
        valide = true;
        // On place le jeton
        //---------------------------
        break;
      }
    }

    // On update la grille du jeu.
    for (i = 0; i < largeur; i++) {
      for (j = 0; j < hauteur; j++) {
        document.getElementById(`${i}${hauteur-j-1}`).src = grille[i][j];
      }
    }

    // On crée une grille en vérifiant les lignes de 3 pour de différents angles.
    if (valide) {
      grille2 = [];
      for (i = 0; i < largeur; i++) {
        grille2[i] = []
        for (j = 0; j < hauteur; j++) {
          if(grille[i][j] == état.VIDE) {
            grille2[i][j] = {d0: false, d45: false, d90: false, d135:false}
          } else {
            grille2[i][j] = {
              couleur: grille[i][j],
              d0: j < hauteur - 1 && j > 0 && grille[i][j] == grille[i][j+1] && grille[i][j] == grille[i][j-1],
              d45: i < largeur - 1 && i > 0 && j < hauteur - 1 && j > 0 && j > 0 && grille[i][j] == grille[i+1][j+1] && grille[i][j] == grille[i-1][j-1],
              d90: i < largeur - 1 && i > 0 && grille[i][j] == grille[i+1][j] && grille[i][j] == grille[i-1][j],
              d135: i < largeur - 1 && i > 0 && j < hauteur - 1 && j > 0 && j > 0 && grille[i][j] == grille[i-1][j+1] && grille[i][j] == grille[i+1][j-1]
            };
          }
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
            window.alert("victoire");
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
  for (i=0;i<=hauteur;i++) {
    document.write(`<tr>`);
    for (j=0;j<largeur;j++) {
      if (i == 0) {
      document.write(`<td><button id="${j}" style="width:100px" onClick="onClick(${j})">v</button></td>`);
    } else {
      document.write(`<td><img id="${j + '' + (i-1)}" src="${état.VIDE}" style="display: block;"></td>`);
    }
    }
    document.write("</tr>");
  }
  document.write("</table>");
}
