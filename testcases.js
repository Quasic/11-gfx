var
	Tileset = [
		"",
		"",
		"",
		""
	],
	ItemID,
	includes=[
		"client-startscreen.js",
		"client-itemid.js"];
function testcases(assert,log){
	function warn(m){
		log("Warning: "+m);
	}
	log("Testing Tileset");
	log(Tileset);
	assert(Tileset && Object.prototype.toString.apply(Tileset) === "[object Array]","Tileset clobbered.");
	if(Tileset.length !== 4)
		warn("Tileset length !== 4");
	for(var i = 0; i < 4; i++){
		assert(typeof Tileset[i] === "string", "Tileset["+i+"] not a string");
		assert(Tileset[i].search(/^([A-Z][a-z])*$/) >= 0, "Tileset["+i+"] bad format");
		//if(Tileset[i].length !== )warn("Tileset["+i+"] length is "+Tileset[i].length+" instead of "+);
		// for(var j = 0; j < Tileset[i].length; j++)test for each image existance
	}
	log("Testing ItemID");
	assert(ItemID, "ItemID "+ typeof ItemID);
	//...
	log("Tests finished. No critical failures found.");
}
if(typeof WScript == "object"){
	WScript.echo("WScript "+WScript.version);
	var
		fso=new ActiveXObject("Scripting.FileSystemObject"),
		h,
		i;
	for(i=0;i<includes.length;i++){
		h=fso.openTextFile(includes[i],1);
		eval(h.readAll());
		h.close();
	}
	testcases(
		function(t,m){if(!t)throw new Error(m);},
		function(m){WScript.echo(m);}
	);
}else if(typeof module == "object" && module.exports){
	console.log(process.versions);
	var
		fs = require("fs"),
		vm = require("vm"),
		assert = require("assert"),
		sandbox = {Tileset: Tileset };
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
	console.log("Loading script tags...");
	scriptags(
		includes,
		function(){
			console.log("Script tags loaded, starting tests...");
			ItemID=sandbox.ItemID;
			testcases(assert,console.log);
		}
	);
}else if(typeof window === "object"){
	// assuming script tags present in correct order
	function l(m){
		// TODO: figure out log implementation
	}
	window.onerror=function(u,m,l){
		l("Error in "+u+"<"+l+">: "+m);
	};
	l(window.navigator);
	testcases(
		function(t,m){if(!t)throw new Error(m);},
		l
	);
}
