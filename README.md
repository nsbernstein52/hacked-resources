# HACKED RESOURCES
Find and contribute to Hack Reactor's Software Engineering Immersive (SEI) resources

## Deployment on Heroku
[Heroku: HACKED RESOURCES](https://tranquil-mesa-77742.herokuapp.com/)

## Source on github
[HACKED RESOURCES](https://github.com/nsbernstein52/hacked-resources)

## To download and develop/run locally:
- Fork & clone repo 
- Go to directory: hacked-resources
- In terminal:
```sh
npm install
npm run webpack-dev
npm run nodemon
```
- To open in a browser, enter 
[url](http://localhost:3000) 

## Testing:
```sh
npm test
```

## Heroku deployment
- Set up your Heroku account (code + PG DB)
- From root of repo, on your terminal:
```sh
git push origin master
git checkout -b herokutemp
npm run webpack-build
git add -f ./dist/bundle.js
git commit . -m "HerokuBuild"
git push -f heroku herokutemp:master
git push heroku herokutemp:master
git checkout master
git branch -D herokutemp
```
