// Importe les clients nécessaires. Nous commençons avec Fal.ai.
import * as fal from '@fal-ai/client';
// Les autres imports viendront ici au fur et à mesure.

/**
 * Le client universel Mangrat V2Omini pour interagir avec plusieurs fournisseurs d'IA.
 * @class MangratV2Omini
 */
class MangratV2Omini {
  #apiKeys;

  /**
   * Crée une instance de MangratV2Omini.
   * @param {object} config - L'objet de configuration contenant les clés d'API.
   * @param {string} [config.falKey] - Votre clé d'API pour Fal.ai.
   * @param {string} [config.mastraKey] - Votre clé d'API pour Mastra.
   * @param {string} [config.singlestoreKey] - Votre clé d'API pour SingleStore.
   */
  constructor(config = {}) {
    this.#apiKeys = config;
  }

  /**
   * Exécute un modèle d'IA avec des entrées spécifiques.
   * La bibliothèque choisit le bon fournisseur en fonction du nom du modèle.
   * @param {string} modelName - Le nom complet du modèle (ex: 'fal-ai/sdxl').
   * @param {object} inputs - Les entrées pour le modèle (ex: { prompt: 'un logo' }).
   * @returns {Promise<any>} La sortie du modèle.
   */
  async run(modelName, inputs) {
    if (!modelName || typeof modelName !== 'string') {
      throw new Error("Le nom du modèle est requis.");
    }

    // --- Cerveau de Routage ---

    // 1. Gérer les modèles Fal.ai
    if (modelName.startsWith('fal-ai/')) {
      if (!this.#apiKeys.falKey) {
        throw new Error("La clé d'API Fal.ai ('falKey') est requise pour ce modèle.");
      }
      const actualModel = modelName.replace('fal-ai/', '');
      fal.config({ credentials: this.#apiKeys.falKey });
      const result = await fal.run(actualModel, { input: inputs });
      return result;
    }

    // TODO: Ajouter la logique pour les autres fournisseurs ici.

    // Si aucun fournisseur ne correspond
    throw new Error(`Le fournisseur pour le modèle "${modelName}" n'est pas supporté.`);
  }
}

export default MangratV2Omini;
