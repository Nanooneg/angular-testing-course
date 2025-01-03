import { defineConfig } from "cypress";
const fs = require('fs');


export default defineConfig({
  projectId: 'abc123',
  video: true,
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // on('after:spec', (spec, results) => {
      //   if (results && results.stats.failures === 0 && results.video) {
      //     fs.unlinkSync(results.video); // Supprime la vidéo si tous les tests réussissent
      //   }
      // });

      // Ne fonctionne pas !
      on('after:run', () => {
        return new Promise((resolve) => {
          setTimeout(resolve, 2000); // Ajoute un délai de 2 secondes après l'exécution des tests
        });
      });
    },
  },
});
