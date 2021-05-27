import express from 'express';
import fs from 'fs';
import { Server } from 'socket.io';
import chokidar from 'chokidar';

const app = express();
const port = 3000;
const ROOT_DIRNAME = 'public';
const MODEL_DIRNAME = 'models';
const MODEL_PATH = ROOT_DIRNAME + '/' + MODEL_DIRNAME;

app.use(express.static(ROOT_DIRNAME));
app.use(express.static(MODEL_PATH));

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
const io = new Server(server);


/**
 * Reads the directiory `./public/models`
 * @returns JSON Array of Models
 */

function getModelLists() {
  const dirs = fs.readdirSync(MODEL_PATH);

  let exts = ['obj', 'fbx', 'glb', 'gltf'];
  const data = [];

  dirs.forEach((dir, i) => {
    let model = {};
    let contents = fs.readdirSync(MODEL_PATH + '/' + dir);
    model.id = i;
    model.title = dir;

    contents.forEach(file => {
      let ext = file.split('.').pop().toLowerCase();
      if ( exts.includes(ext) ) {
        model.url = MODEL_DIRNAME + '/' + dir + '/' + file;
      }
    });

    data.push(model);
  });

  return data;
}

app.get('/models', (req, res) => {
  const jsonData = getModelLists();
  const jsonString = JSON.stringify(jsonData);
  res.send(jsonString);
});

let hasSocketConnected = false;

function emitModelUpdate(path) {
  const emitEvent = 'models_update';

  if ( hasSocketConnected ) {
    console.log('send');
    io.emit(emitEvent, { message: path });
  }
}

const watcher = chokidar.watch(MODEL_PATH + '/**/*', { persistent: true });
watcher
  .on('change', emitModelUpdate)
  .on('add', path => {
    watcher.add(path);
    emitModelUpdate(path);
  })
  .on('unlink', (path) => {
    emitModelUpdate(path);
  })
  .on('error', error => console.log('error', error));


io.on('connection', socket => {
  console.log('connected');

  hasSocketConnected = true;

  // On ending socket
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});