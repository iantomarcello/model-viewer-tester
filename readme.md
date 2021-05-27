# Model Viewer Tester
An small ExpressJS app that showcases 3D models using Google's [Model Viewer](https://modelviewer.dev/docs/index.html#loading-events) web component.

Essentially a precursor for WebGL contents to see if they would look right on the web.
I usually use this to check 3D models before importing to 3D library like THREE.JS

# Getting Started
Install them dependencies.
```
npm install
```

Run
```
npm run serve
```


## NOTE

1.  The Express app has a Websocket feature which updates the client if there are changes on `public/models/`. 

2.  Node script `tailwindcss:dev` isn't running as intended.


### OLD STUFFS NOTES
1. Prior to May 2021, this was a small testing site to test run Google's [Model Viewer](https://modelviewer.dev/docs/index.html#loading-events) web component.

    It works, and now this project has become a preview of 3D objects.
    
    Uses `json-server` to host data.