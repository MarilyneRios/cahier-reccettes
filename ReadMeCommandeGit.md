# cloner un dépôt
git clone https://github.com/MarilyneRios/auth-React-Bootstrap.git


# Créer une branche

## Créer et basculer vers une nouvelle branche
git checkout -b feature/new-feature

## (Optionnel) Effectuer des modifications et les valider
git add .
git commit -m "Ajout de la nouvelle fonctionnalité"

## Pousser la nouvelle branche vers le dépôt distant
git push origin feature/new-feature


//----------------------------------------------------

# Sénario merge sans conflit

## Sauvegarder le travail en cours (optionnel)
git add .
git commit -m "Sauvegarde du travail en cours"  # ou git stash

## Passer à la branche principale
git checkout main

## Mettre à jour la branche principale
git pull origin main

## Fusionner la branche feature/outlet dans main
git merge feature/outlet

## Pousser les modifications vers le dépôt distant
git push origin main

//----------------------------------------------------

# Sénario merge avec conflit

## Sauvegarder le travail en cours (optionnel)
git add .
git commit -m "Sauvegarde du travail en cours"  # ou git stash

## Passer à la branche principale
git checkout main

## Mettre à jour la branche principale
git pull origin main

## Fusionner la branche feature/outlet dans main
git merge feature/outlet

## Résoudre les conflits (si nécessaire), puis ajouter les fichiers résolus
## git add <fichier_conflit>

## Finaliser le merge (si des conflits ont été résolus)
git commit

## Pousser les modifications vers le dépôt distant
git push origin main

//----------------------------------------------------

# Supprimer une branche fusionnée
git branch -d nom-de-la-branche

# Supprimer une branche non fusionnée
git branch -D nom-de-la-branche
