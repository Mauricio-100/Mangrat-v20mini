// --- Imports providers ---
import * as fal from '@fal-ai/client';
// TODO: importer mastra, singlestore, transformers.js, openai, anthropic, mistral, groq...

/**
 * Client universel Mangrat V3 (ex-V2Omini)
 * Support multi-provider avec fallback, streaming, mémoire et validation.
 */
class MangratV3 {
  #apiKeys;
  #memory = new Map(); // historique par session

  constructor(config = {}) {
    this.#apiKeys = config;
  }

  /**
   * Crée/accède à une session de conversation avec mémoire.
   * @param {string} sessionId - Identifiant unique (ex: userId).
   */
  session(sessionId) {
    if (!this.#memory.has(sessionId)) {
      this.#memory.set(sessionId, []);
    }
    return {
      chat: async (modelName, message, options = {}) => {
        const history = this.#memory.get(sessionId);
        history.push({ role: "user", content: message });

        const result = await this.run(modelName, { prompt: this._formatHistory(history) }, options);

        history.push({ role: "assistant", content: result });
        this.#memory.set(sessionId, history);
        return result;
      },
      history: () => this.#memory.get(sessionId)
    };
  }

  /**
   * Routage intelligent entre providers
   */
  async run(modelName, inputs, options = {}) {
    if (!modelName || typeof modelName !== 'string') {
      throw new Error("Le nom du modèle est requis.");
    }

    // 1. Fal.ai
    if (modelName.startsWith('fal-ai/')) {
      if (!this.#apiKeys.falKey) throw new Error("La clé d'API Fal.ai ('falKey') est requise.");
      const actualModel = modelName.replace('fal-ai/', '');
      fal.config({ credentials: this.#apiKeys.falKey });

      // --- Mode streaming ---
      if (options.stream) {
        return this._streamFal(actualModel, inputs, options.onToken);
      }

      return fal.run(actualModel, { input: inputs });
    }

    // 2. Mastra
    if (modelName.startsWith('mastra/')) {
      if (!this.#apiKeys.mastraKey) throw new Error("La clé d'API Mastra est requise.");
      // TODO: appeler Mastra SDK
    }

    // 3. SingleStore
    if (modelName.startsWith('singlestore/')) {
      if (!this.#apiKeys.singlestoreKey) throw new Error("La clé d'API SingleStore est requise.");
      // TODO: exécution SQL via IA
    }

    // 4. Transformers.js (offline fallback)
    if (modelName.startsWith('local/')) {
      // TODO: load local model avec @xenova/transformers
    }

    throw new Error(`Le fournisseur pour "${modelName}" n'est pas encore supporté.`);
  }

  /**
   * Stream Fal.ai token par token
   */
  async _streamFal(model, inputs, onToken) {
    const stream = await fal.stream(model, { input: inputs });
    for await (const token of stream) {
      if (onToken) onToken(token);
    }
  }

  /**
   * Formatte l'historique pour un prompt conversationnel
   */
  _formatHistory(history) {
    return history.map(m => `${m.role}: ${m.content}`).join("\n");
  }
}

export default MangratV3;
