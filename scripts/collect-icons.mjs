// Extrait du jeu Solar les seules icônes utilisées par le code, dans lib/icons/solar.json.
// L'app les embarque : plus aucun appel à api.iconify.design, même hors ligne ou sur le réseau local.
//
//   npm run icons   (lancé aussi avant `npm run dev` et `npm run build`)

import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs"
import { createRequire } from "node:module"
import { join, relative } from "node:path"

const require = createRequire(import.meta.url)
const root = process.cwd()
const output = join(root, "lib/icons/solar.json")

/** Dossiers du code source à parcourir. */
const sourceDirs = ["app", "components", "lib", "hooks"]
/** Suffixes des variantes Solar : un nom d'icône se termine toujours par l'un d'eux. */
const iconPattern = /["'`]((?:[a-z0-9]+-)+(?:linear|bold|broken|outline|line-duotone|bold-duotone))["'`]/g

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) walk(path, files)
    else if (/\.(tsx?|jsx?|mdx?)$/.test(entry)) files.push(path)
  }
  return files
}

const names = new Set()
for (const dir of sourceDirs) {
  let files = []
  try {
    files = walk(join(root, dir))
  } catch {
    continue
  }
  for (const file of files) {
    const text = readFileSync(file, "utf8")
    for (const match of text.matchAll(iconPattern)) names.add(match[1])
  }
}

const solar = require("@iconify-json/solar/icons.json")
const icons = {}
const aliases = {}
const missing = []

for (const name of [...names].sort()) {
  if (solar.icons[name]) {
    icons[name] = solar.icons[name]
  } else if (solar.aliases?.[name]) {
    const alias = solar.aliases[name]
    aliases[name] = alias
    icons[alias.parent] ??= solar.icons[alias.parent]
  } else {
    missing.push(name)
  }
}

mkdirSync(join(root, "lib/icons"), { recursive: true })
writeFileSync(
  output,
  JSON.stringify(
    {
      prefix: solar.prefix,
      lastModified: solar.lastModified,
      width: solar.width,
      height: solar.height,
      icons,
      ...(Object.keys(aliases).length ? { aliases } : {}),
    },
    null,
    0
  ) + "\n"
)

console.log(`${Object.keys(icons).length} icônes Solar écrites dans ${relative(root, output)}`)
if (missing.length) {
  console.warn(`Introuvables dans Solar (ignorées) : ${missing.join(", ")}`)
}
