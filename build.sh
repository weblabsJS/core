mkdir dist
python3 scripts/cdn.py
tsc -p ./tsconfig.json
rm ./dist/cdn.d.ts
rm ./src/cdn.ts
cp ./src/package.json ./dist
cp README.MD ./dist
git add ./src/package.json
git add build.sh
git add README.MD
git commit -m "Updated package.json"
git push
cd dist && npm publish --access public