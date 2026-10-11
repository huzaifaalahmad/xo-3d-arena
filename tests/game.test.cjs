const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync(process.argv[2] || 'work/portfolio-rebuild/huzaifa-portfolio-frontend/public/projects/xo/script.js','utf8');
const elements=new Map();const timers=new Map();let id=0;
const fake=()=>({dataset:{},style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},appendChild(){},focus(){},options:[],querySelector(){return fake()},getBoundingClientRect(){return {left:0,top:0,width:80,height:80}}});
const cells=Array.from({length:9},(_,i)=>{const el=fake();el.dataset.index=i;return el;});
const document={querySelectorAll:()=>cells,querySelector:s=>s==='.splash.show, .overlay.show'?null:fake(),getElementById:key=>{if(!elements.has(key))elements.set(key,fake());return elements.get(key)},createElement:fake,documentElement:fake(),body:fake(),addEventListener(){}};
const storage=new Map();
const context={document,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},window:{innerWidth:400,innerHeight:700,matchMedia:()=>({matches:true}),setTimeout(fn){timers.set(++id,fn);return id},clearTimeout(key){timers.delete(key)}},console};
vm.createContext(context);
vm.runInContext(source.replace(/\}\)\(\);\s*$/,`globalThis.testing={checkGame,minimax,resetBoard,handleCellClick,modeSelect,difficultySelect,score:()=>scores};})();`),context);
const api=context.testing;
// Explore every human continuation against the hard bot, rather than a few chosen examples.
let terminal=0;
function explore(board){
 const r=api.checkGame(board);
 if(r){assert.notEqual(r.winner,'X','Hard bot must never lose');terminal++;return}
 for(let i=0;i<9;i++)if(!board[i]){
  const next=[...board];next[i]='X';const r=api.checkGame(next);
  if(r){assert.notEqual(r.winner,'X');terminal++;continue}
  const move=api.minimax(next,'O').move;assert.ok(Number.isInteger(move));assert.equal(next[move],null);
  next[move]='O';explore(next);
 }
}
explore(Array(9).fill(null));
api.resetBoard();api.handleCellClick({currentTarget:cells[0]});
assert.equal(timers.size,1,'Bot move is scheduled');
api.resetBoard();assert.equal(timers.size,0,'Restart cancels the bot move');assert.ok(cells.every(c=>!c.dataset.marked));
api.handleCellClick({currentTarget:cells[0]});
for(const [key,fn] of [...timers]){timers.delete(key);fn()}
assert.equal(cells.filter(c=>c.dataset.marked==='O').length,1,'Bot makes exactly one valid move');
assert.ok(storage.has('xo_arena_scores'));
console.log(JSON.stringify({hardBotTerminalPaths:terminal,hardBotNeverLoses:true,restartCancelsPendingMove:true,botSingleMove:true,scorePersistence:true}));
