# Mangrat V2Omini

<p align="center">
  <a href="https://www.npmjs.com/package/@mauriciotukss2/mangrat-v2omini"><img src="https://badge.fury.io/js/%40mauriciotukss2%2Fmangrat-v2omini.svg" alt="NPM Version"></a>
</p>

Mangrat V2Omini est un Méta-SDK révolutionnaire conçu pour unifier l'accès à plusieurs fournisseurs d'IA. Utilisez une seule interface simple pour appeler des modèles de Fal.ai, Mastra, SingleStore et Transformers.js.

## Le Problème
Chaque service d'IA a sa propre bibliothèque, sa propre configuration et sa propre manière d'appeler les modèles. Apprendre à utiliser chacun d'entre eux est complexe et redondant.

## La Solution Mangrat
Avec Mangrat V2Omini, vous configurez vos clés d'API une seule fois. Ensuite, vous appelez n'importe quel modèle via la méthode `.run()`, et la bibliothèque s'occupe du reste.

## Installation
```bash
npm install @mauriciotukss2/mangrat-v2omini
```
Utilisation (Exemple avec Fal.ai)
code
```bash
JavaScript
import MangratV2Omini from '@mauriciotukss2/mangrat-v2omini';

// 1. Initialisez le client avec vos clés
const client = new MangratV2Omini({
  falKey: "VOTRE_CLE_API_FAL_AI"
});

// 2. Appelez n'importe quel modèle via .run()
async function generateImage() {
  try {
    const output = await client.run('fal-ai/sdxl', {
      prompt: "Un logo futuriste pour 'Mangrat V2Omini', style circuits neuronaux, bleu et violet"
    });
    console.log("Résultat du modèle :", output);
  } catch (error) {
    console.error(error.message);
  }
}

generateImage();
Feuille de Route (Roadmap)

Intégration de Fal.ai (fal-ai/...)

Intégration de Mastra (mastra/...)

Intégration de SingleStore (singlestore/...)

Intégration de Transformers.js (Xenova) (transformers/...)
Licence
ISC

code
Code
---
```
nerateImage();
Feuille de Route (Roadmap)

Intégration de Fal.ai (fal-ai/...)

Intégration de Mastra (mastra/...)

Intégration de SingleStore (singlestore/...)

Intégration de Transformers.js (Xenova) (transformers/...)
Licence
ISC

### 4. Fichier : `.gitignore`

(Pour dire à Git d'ignorer les fichiers inutiles)
Dépendances
/node_modules

Fichiers de log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

Fichiers d'environnement (pour les clés secrètes)
```bash
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

Fichiers système
.DS_Store
```
code
Code
---

### createur
## Mauricio Mangituka (c) | 2025
