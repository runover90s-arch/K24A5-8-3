import { stripTypeScriptTypes } from 'node:module';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { join,resolve } from 'node:path';
const root=resolve('.');
const order=[
  'utils/dom','data/eventConfig','data/recipients','data/letters','utils/validateStt',
  'utils/visualSeed','hooks/useReducedMotion','components/Envelope',
  'components/GalaxyBackground','components/IntroScene','components/StudentLookup',
  'components/StarField','components/MorphTransition','components/LetterView',
  'components/ClosingScene','components/AudioToggle','App','main'
];
let code='';
for(const file of order){
  const source=await readFile(join(root,'src',file+'.ts'),'utf8');
  let compiled=stripTypeScriptTypes(source,{mode:'strip'});
  compiled=compiled.replace(/^\s*import\s+[^\n]*;\s*$/gm,'').replace(/\bexport\s+(?=(?:const|let|function|class)\b)/g,'');
  code+=`\n// ---- ${file} ----\n${compiled}\n`;
}
const styles=['variables','animations','global','scenes','responsive'];
let css='';
for(const name of styles){
  let part=await readFile(join(root,'src/styles',name+'.css'),'utf8');
  part=part.replace(/^@import[^\n]+\n/gm,'');
  css+=`\n/* ${name}.css */\n${part}\n`;
}
let html=await readFile(join(root,'index.html'),'utf8');
html=html.replace(/\s*<link rel="stylesheet"[^>]+>/,'');
html=html.replace(/\s*<script type="module" defer src="\.\/src\/main\.js"><\/script>/,'');
html=html.replace(/\s*<meta property="og:image"[^>]+>/,'').replace(/\s*<meta name="twitter:image"[^>]+>/,'');
const favicon=await readFile(join(root,'public/favicon.svg'),'utf8');
html=html.replace('href="./favicon.svg"',`href="data:image/svg+xml,${encodeURIComponent(favicon)}"`);
html=html.replace('</head>',`  <style>\n${css}\n</style>\n</head>`);
html=html.replace('</body>',`  <script type="module">\n${code}\n</script>\n</body>`);
await mkdir(join(root,'standalone'),{recursive:true});
await writeFile(join(root,'standalone/index.html'),html,'utf8');
console.log(`✓ Bản 1 file cho điện thoại: standalone/index.html (${Math.round(html.length/1024)} KB)`);
