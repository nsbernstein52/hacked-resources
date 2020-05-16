# hacked-resources

Heroku deployment
commit everything
git push origin master
// checkout to tmp branch
git checkout -b tmp
npm run webpack-build
git add -f ./dist/bundle.js
git commit . "heroku build"
// don't push to origin github
git push heroku master
// xor
git push heroku master --force
git checkout master
git branch -D tmp

