mkdir dist

# Prompt the user for the commit message
echo "Enter the commit message:"
read commit_message

# Run the necessary commands
python3 scripts/cdn.py
tsc -p ./tsconfig.json
rm ./dist/cdn.d.ts
rm ./src/cdn.ts
cp ./src/package.json ./dist
cp README.MD ./dist
git add ./src/package.json
git add build.sh
git add README.MD
git add *
git commit -m "$commit_message"
git push
cd dist && npm publish --access public
