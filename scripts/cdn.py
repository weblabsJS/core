#cdn builder
cbf = open("components.ts", "r")
ibf = open("index.ts", "r")

print("Reading index.ts and components.ts")

components = cbf.read()
index = ibf.read()

index = index.replace("export ", "")
components = components.replace("import { WebLabsElement, WebLabsChild } from './index'", "").replace("export ", "")

print("Removing unused imports/exports")

cdn = f"{index} {components}"

print("Building CDN")

cdbf = open("cdn.ts", "w")
cdbf.write(cdn)

cbf.close()
cdbf.close()
ibf.close()

print("Finished. TSC Taking over now")