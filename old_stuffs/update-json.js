/**
 * Creates db.json by reading files inside ./models
 */

import { readdirSync, writeFileSync } from 'fs';

const MODELS_DIR = './models';

let dirs = readdirSync(MODELS_DIR);

let exts = ['obj', 'fbx', 'glb', 'gltf']; 
let models = [];

dirs.forEach((dir, i) => {
  let model = {};
  let contents = readdirSync(MODELS_DIR + '/' + dir);
  model.id = i;
  model.title = dir;

  contents.forEach(file => {
    let ext = file.split('.').pop().toLowerCase();
    if ( exts.includes(ext) ) {
      model.url = MODELS_DIR + '/' + dir + '/' + file;
    }
  });

  models.push(model);
});


const data = {};
data.models = models;
const jsonData = JSON.stringify(data);

writeFileSync('./db.json', jsonData, { encoding: 'utf-8' });
console.log('DB updated');