Mangrat V3 - SDK Universel IA

![Mangrat V3](https://img.shields.io/badge/Mangrat-V3-blue?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...) 
![Fal.ai](https://img.shields.io/badge/Fal.ai-Client-orange?logo=robot)
![Mastra](https://img.shields.io/badge/Mastra-Client-yellow?logo=data:image/png;base64,iVBOR...)
![SingleStore](https://img.shields.io/badge/SingleStore-DB-red?logo=database)
![Transformers.js](https://img.shields.io/badge/Transformers.js-Local-green?logo=code)

Mangrat V3 est un SDK JavaScript/Node.js universel pour interagir avec **plusieurs fournisseurs d'IA**, avec mémoire, streaming et fallback local.

---

## 🌐 Liens utiles

- [Mangrat AI Client](https://www.npmjs.com/package/mangrat-ai-client)  
- [Mangrat V2Omini](https://www.npmjs.com/package/@mauriciotukss2/mangrat-v2omini)  
- [Env Guardian](https://www.npmjs.com/package/@mauriciotukss2/env-guardian)  
- [Schema Forge](https://www.npmjs.com/package/@mauriciotukss2/schema-forge)

---

## Installation

```bash
npm install @mauriciotukss2/mangrat-v2omini

```


### Configuration
```bash
import MangratV3 from '@mauriciotukss2/mangrat-v3';

const client = new MangratV3({
  falKey: 'VOTRE_CLE_FAL',
  mastraKey: 'VOTRE_CLE_MASTRA',
  singlestoreKey: 'VOTRE_CLE_SINGlestore'
});
Utilisation de base
const result = await client.run('fal-ai/sdxl', { prompt: 'Crée un logo minimaliste' });
console.log(result);
Sessions et mémoire
const session = client.session('user123');
await session.chat('fal-ai/sdxl', 'Bonjour, présente-toi');
console.log(session.history());
Streaming en temps réel
await session.chat('fal-ai/sdxl', 'Écris une histoire courte', {
  stream: true,
  onToken: token => process.stdout.write(token)
});
Multi-provider
Préfixe	Provider	Badge
fal-ai/	Fal.ai	
mastra/	Mastra	
singlestore/	SingleStore	
local/	Transformers.js	
Validation de sortie
import { validateSchema } from '@mauriciotukss2/schema-forge';
const output = await client.run('fal-ai/sdxl', { prompt: 'Génère un JSON utilisateur' });
validateSchema(output, { type: 'object', properties: { name: { type: 'string' }, age: { type: 'number' } }, required: ['name','age'] });
```
### Badges personnalisés Mangrat


### Contribuer
PRs et issues sont les bienvenues. Suivez le style ESM, testez vos changements, et mettez à jour le README si vous ajoutez un provider ou un module.
### Licence
ISC © Mauricio
