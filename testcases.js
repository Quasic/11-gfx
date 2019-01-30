// Testcases to be run in node.js, WScript (preferrably the CScript variant) or a page in a browser
var
	DirTile = "t",
	DirChar = "c",
	DirItem = "i",
	DirBuild = "b",
	MapSizeX = 13,
	MapSizeY = 7,
	MapSizeX1 = MapSizeX + 1,
	MapSizeY1 = MapSizeY + 1,
	TotalTiles = MapSizeX1 * MapSizeY1,
	Tileset = (function(){var r="",i,m=["Gg","Ge","Gb","Gd","Og","Re"];for(i=0;i<TotalTiles*4;i++){r+=m[Math.floor(Math.random()*100)]||"Ga";}return[r.substring(0,TotalTiles),r.substring(TotalTiles,TotalTiles*2),r.substring(TotalTiles*2,TotalTiles*3),r.substring(TotalTiles*3,TotalTiles*4)];})(),
	ItemID,
	cache={t:{},i:{},b:{},c:{}},
	includes=[
		"client-startscreen.js",
		"client-itemid.js"];
function testcases(assert,log){
	function warn(m){
		log("Warning: "+m);
	}
	function assertTilesExist(s,t){
		var f;
		for(var j = 0; j < s.length; j+=2)assert(cache.t[f=(s.substring(j,j+2))+".png"],"Tile file not found: "+DirTile+"/"+f+" for "+t+" @ tile "+j/2+" / "+s.length/2+", char "+j+" / "+s.length);
	}
	log("Testing tiles");
	assertTilesExist(
		"Ga"
		, "[basic Tiles: Ga etc.]"
	);
	
	var r=/[A-Z][a-z].png/;
	for(var i in cache.t)if(cache.t.hasOwnProperty(i)&&i.search(r)<0)warn(DirTile+"/"+i+" is not a normal tile filename");
	log("Testing startscreen");
	log(Tileset);
	assert(Tileset && Object.prototype.toString.apply(Tileset) === "[object Array]","Tileset clobbered.");
	if(Tileset.length !== 4)
		warn("Tileset length !== 4");
	for(var i = 0; i < 4; i++){
		assert(typeof Tileset[i] === "string", "Tileset["+i+"] not a string");
		assert(Tileset[i].search(/^([A-Z][a-z])*$/) >= 0, "Tileset["+i+"] bad format");
		if(Tileset[i].length !== TotalTiles)warn("Tileset["+i+"] length is "+Tileset[i].length+" instead of "+TotalTiles);
			assertTilesExist(Tileset[i], "Tileset["+i+"]");
		}
	log("Testing Characters");
	//starting images CHRHne... CHRnw...
	var r=/^CH(I[A-Z][a-z]|RH[MF][0-9]|R[MF][0-9]|RHne|Rnw)([LR]|)\.gif$/,m,d;
	for(var i in cache.c)if(cache.c.hasOwnProperty(i)){
		m=i.match(r);
		if(m){
			if(m[1].charAt(0) === "I" && !cache.i["O"+m[1].substring(1)+".gif"])warn("Item '"+m[1].substring(1)+"', "+ItemID(m[1].substring(1))+", has a wearable image, "+DirChar+"/"+i+", but no matching item image "+DirItem+"/"+"O"+m[1].substring(1)+".gif");
			if(m[2]){
				d={L:"R",R:"L"}[m[2]];
				assert(cache.c["CH"+m[1]+d+".gif"],"There is a "+DirChar+"/"+i+", but no matching "+DirChar+"/"+"CH"+m[1]+d+".gif");
			}
		}else{
			warn(i+" is not a normal character image name");
		}
	}
	log("Testing ItemID, items");
	function hasItemID(id){
		var i=ItemID(id);
		return i && (i.substring(0,4) !== "Item" || i.substring(i.length-id.length) !== id);
	}
	assert(ItemID, "ItemID "+ typeof ItemID);
	r=/^O[A-Z][a-z]\.gif$/;
	for(var i in cache.i)if(cache.i.hasOwnProperty(i)){
		if(i.search(r)<0)
			warn(DirItem+"/"+i+" is not a normal item filename");
		else if(!hasItemID(i.substring(1,3)))
			warn("ItemID '"+i.substring(1,3)+"' not defined, but "+DirItem+"/"+i+" exists");
	}
	for(var i="A"; i<"Z"; i=String.fromCharCode(i.charCodeAt(0)+1))
		for(var j="a"; j<"z"; j=String.fromCharCode(j.charCodeAt(0)+1))
			if(!cache.i["O"+i+j+".gif"]&&hasItemID(i+j))
				warn("Item '"+i+j+"', "+ItemID(i+j)+", has no image, "+DirItem+"/O"+i+j+".gif");
	log("Testing ItemID, buildings");
	r=/^[A-Z]+\.gif$/;
	for(var i in cache.b)if(cache.b.hasOwnProperty(i)){
		if(i.search(r)<0)
			warn(DirBuild+"/"+i+" is not a normal building filename");
		else if(!hasItemID(i.substring(0,i.length-4)))
			warn("ItemID '"+i.substring(0,i.length-4)+"' not defined, but "+DirItem+"/"+i+" exists");
	}
	log("Testing ItemID, NPCs");
	// how should this work?
	log("Tests finished. No critical failures found.");
}

// Bootstrap:

// WScript, CScript
if(typeof WScript == "object"){
	WScript.echo("WScript "+WScript.version);
	var
		fso=new ActiveXObject("Scripting.FileSystemObject"),
		h,
		i;
	WScript.echo("Loading scripts...");
	for(i=0;i<includes.length;i++){
		h=fso.openTextFile(includes[i],1);
		eval(h.readAll());
		h.close();
	}
	WScript.echo("Listing images...");
	function readdir(d,k){
		for(i=new Enumerator(fso.getFolder(d).files); i.hasNext(); i.moveNext())cache[k][i.item().name]=1;
	}
	readdir(DirTile,"t");
	readdir(DirBuild,"b");
	readdir(DirItem,"i");
	readdir(DirChar,"c");
	testcases(
		function(t,m){if(!t)throw new Error(m);},
		function(m){WScript.echo(m);}
	);

// Node.js
}else if(typeof module === "object" && module.exports && typeof process === "object"){
	console.log(process.versions);
	var
		fs = require("fs"),
		vm = require("vm"),
		assert = require("assert"),
		d,
		sandbox = {
			MapSizeX: MapSizeX,
			MapSizeY: MapSizeY,
			MapSizeX1: MapSizeX1,
			MapSizeY1: MapSizeY1,
			Tileset: Tileset
		};
	vm.createContext(sandbox);
	function tagsrc(src,callback){
		console.log(src);
		fs.readFile(src,
			function(err,data){
				if(err)throw err;
				new vm.runInContext(data, sandbox, { filename: src });
				callback();
			}
		)
	}
	function scriptags(a, callback){
		var n = -1;
		function f(){
			n++;
			if(n < a.length)
				tagsrc(a[n], f);
			else
				callback();
		}
		f();
	}
	console.log("Loading scripts...");
	scriptags(
		includes,
		function(){
			console.log("Listing images...");
			d="i";
			fs.readdir(DirItem,cacheFiles);
		}
	);
	function cacheFiles(err,files){
		for(var i=0; i<files.length; i++)cache[d][files[i]]=1;
		d={i:"t", t:"b", b:"c"}[d];
		if(d)fs.readdir({
			t:DirTile,
			b:DirBuild,
			c:DirChar}[d],
			cacheFiles
		);
		else start();
	}
	function start(){
		console.log("Script tags loaded, starting tests...");
		ItemID=sandbox.ItemID;
		testcases(
			assert,
			console.log
		);
	}
}else if(typeof window === "object"){
	// assuming script tags present in correct order
	function l(m){
		// TODO: figure out log and fexists implementations
	}
	window.onerror=function(u,m,l){
		l("Error in "+u+"<"+l+">: "+m);
	};
	l(window.navigator);
	testcases(
		function(t,m){if(!t)throw new Error(m);},
		l,
		fexists
	);
}
