# Hacked Resources

Find and contribute to Hack Reactor's Software Engineering Immersive (SEI) resources

# Deployment on Heroku
localhost:3000
[Heroku: HACKED RESOURCES](https://tranquil-mesa-77742.herokuapp.com/)
For PG DB url:
```sh
heroku run printenv
```

# SOURCE
[HACKED RESOURCES](https://github.com/nsbernstein52/hacked-resources)

# To run locally
const pathname = path.join(__dirname, '../public/index.html');
(<root>/hacked-resources/public/index.html)

# testing:
npm test

# Heroku deployment
```sh
git push origin master
git checkout -b herokutemp
npm run webpack-build
git add -f ./dist/bundle.js
git commit . -m "HerokuBuild"
git push heroku herokutemp:master
git checkout master
git branch -D herokutemp
```
