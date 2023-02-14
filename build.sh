python3 scripts/cdn.py
tsc -p ./tsconfig.json
rm ./dist/cdn.d.ts
rm ./src/cdn.ts
cp ./src/package.json ./dist
cd dist && npm publish --access public