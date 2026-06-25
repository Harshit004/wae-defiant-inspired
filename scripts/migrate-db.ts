import { readDB, writeDB } from '../lib/db';

async function migrate() {
  const dbState = readDB();
  
  Object.values(dbState.products).forEach(product => {
    // @ts-ignore
    if ('datasheetPdf' in product) {
      // @ts-ignore
      delete product.datasheetPdf;
    }
    
    if (product.featuresList) {
      product.featuresList.forEach((feat: any, idx: number) => {
        if (idx < 3) {
          feat.isDisplayed = true;
        } else {
          feat.isDisplayed = false;
        }
      });
    }
  });

  await writeDB(dbState);
  console.log('Migration complete.');
}

migrate();
