(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"app_atlas_1", frames: [[0,0,1113,951],[0,953,1358,698]]},
		{name:"app_atlas_2", frames: [[0,0,950,927],[0,929,1342,617],[952,0,800,800]]},
		{name:"app_atlas_3", frames: [[1675,0,246,444],[1424,0,249,445],[463,802,440,777],[1657,1286,367,200],[1657,1488,225,225],[1969,1204,26,26],[905,472,512,512],[802,472,98,98],[0,1595,457,381],[1997,1204,26,26],[905,986,512,512],[1827,446,204,460],[1923,0,103,103],[1419,472,406,500],[463,1581,690,452],[1969,908,38,294],[2009,908,37,294],[1657,1715,167,297],[802,0,620,470],[1155,1500,500,500],[1419,974,236,453],[1657,974,310,310],[0,0,800,800],[0,802,461,791]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.botãooff = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.botãoon = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CarelMicroPc = function() {
	this.initialize(ss["app_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.compressor = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Controlador2 = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.DeRcofXkAAaHGZ = function() {
	this.initialize(img.DeRcofXkAAaHGZ);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2115,1218);


(lib.ECFAN = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.ElectricidadeCompressor = function() {
	this.initialize(ss["app_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.flash2 = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.flash = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.fundoapp = function() {
	this.initialize(ss["app_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.fundodeaçoinoxidáveldaplacadometal2 = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.logomini = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.logo = function() {
	this.initialize(ss["app_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.mechanic2 = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.mechanic = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.multimetro3 = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.parafuso = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.PDA = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.PLACACONTROL = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.pontapreta = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.pontavermelha = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.PRESSOSTATO = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.SENSORTEMPERATURA = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.timge1591860133869 = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.TP = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.veeelectrica = function() {
	this.initialize(ss["app_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.VEE = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.VENTILADORAXIALCONREGILLAEBMPAPST = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.vex7 = function() {
	this.initialize(ss["app_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Vref5J2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.vex_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.mechanic2();
	this.instance.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.7692,scaleY:0.7692,x:26,y:26},0).wait(1).to({scaleX:1,scaleY:1,x:23,y:23},0).wait(1));

	// objecto
	this.instance_1 = new lib.VEE();
	this.instance_1.setTransform(-35,-45,0.2323,0.2855);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.2059,scaleY:0.2531,x:-31,y:-40},0).wait(1).to({scaleX:0.2323,scaleY:0.2855,x:-35,y:-45},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9388,0.9388);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.vex_electrica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.flash2();
	this.instance.setTransform(27,27,0.6731,0.6731);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).to({_off:true},1).wait(1));

	// componente
	this.instance_1 = new lib.VEE();
	this.instance_1.setTransform(-33,-40,0.2059,0.2531);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},0).to({_off:true},1).wait(1));

	// base
	this.instance_2 = new lib.flash2();
	this.instance_2.setTransform(23,23);

	this.instance_3 = new lib.VEE();
	this.instance_3.setTransform(-37,-45,0.2323,0.2855);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9184,0.9184);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_3},{t:this.instance_2}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape},{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.vex_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.VEE();
	this.instance.setTransform(-38,-45,0.2323,0.2855);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.2059,scaleY:0.2531,x:-34,y:-40},0).wait(1).to({scaleX:0.2323,scaleY:0.2855,x:-38,y:-45},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9388,0.9388);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.ventilador_radial_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.mechanic2();
	this.instance.setTransform(28,28,0.6538,0.6538);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).to({_off:true},1).wait(1));

	// componente
	this.instance_1 = new lib.ECFAN();
	this.instance_1.setTransform(-40,-40,0.3555,0.3555);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},0).to({_off:true},1).wait(1));

	// base
	this.instance_2 = new lib.mechanic2();
	this.instance_2.setTransform(23,23);

	this.instance_3 = new lib.ECFAN();
	this.instance_3.setTransform(-42,-42,0.3733,0.3733);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9184,0.9184);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_3},{t:this.instance_2}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape},{t:this.instance_3},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.ventilador_radial_electrica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.flash2();
	this.instance.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.7309,scaleY:0.7309,x:27,y:27},0).wait(1).to({scaleX:1,scaleY:1,x:23,y:23},0).wait(1));

	// componente
	this.instance_1 = new lib.ECFAN();
	this.instance_1.setTransform(-42,-42,0.3733,0.3733);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.3555,scaleY:0.3555,x:-40,y:-40},0).wait(1).to({scaleX:0.3733,scaleY:0.3733,x:-42,y:-42},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9388,0.9388);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.ventilador_radial_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.ECFAN();
	this.instance.setTransform(-42,-42,0.3733,0.3733);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.329,scaleY:0.329,x:-37,y:-37},0).wait(1).to({scaleX:0.3733,scaleY:0.3733,x:-42,y:-42},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("Am+G/IAAt9IN9AAIAAN9g");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.ventilador_axial_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mechanic2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.VENTILADORAXIALCONREGILLAEBMPAPST();
	this.instance_1.setTransform(-40,-40,0.1,0.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.ventilador_axial_electrica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.flash2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.VENTILADORAXIALCONREGILLAEBMPAPST();
	this.instance_1.setTransform(-40,-40,0.1,0.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.ventilador_axial_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.VENTILADORAXIALCONREGILLAEBMPAPST();
	this.instance.setTransform(-40,-40,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.0914,scaleY:0.0914,x:-37,y:-37},0).wait(1).to({scaleX:0.1,scaleY:0.1,x:-40,y:-40},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9469,0.9469);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.VdcJ3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.VdcJ2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.transductor_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mechanic2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.TP();
	this.instance_1.setTransform(-30,-45,0.2542,0.1954);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.transductor_electrica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// base
	this.instance = new lib.flash2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.TP();
	this.instance_1.setTransform(-31,-45,0.2542,0.1954);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]},2).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.transductor_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.TP();
	this.instance.setTransform(-32,-45,0.2542,0.1954);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.2255,scaleY:0.1733,x:-29,y:-40},0).wait(1).to({scaleX:0.2542,scaleY:0.1954,x:-32,y:-45},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9184,0.9184);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.sensor_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.mechanic2();
	this.instance.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.7308,scaleY:0.7308,x:27,y:27},0).wait(1).to({scaleX:1,scaleY:1,x:23,y:23},0).wait(1));

	// componente
	this.instance_1 = new lib.SENSORTEMPERATURA();
	this.instance_1.setTransform(-44,-33,0.1408,0.1408);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.128,scaleY:0.128,x:-40,y:-30},0).wait(1).to({scaleX:0.1408,scaleY:0.1408,x:-44,y:-33},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9286,0.9286);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.sensor_electrica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.flash2();
	this.instance.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.7385,scaleY:0.7385,x:26,y:26},0).wait(1).to({scaleX:1,scaleY:1,x:23,y:23},0).wait(1));

	// componente
	this.instance_1 = new lib.SENSORTEMPERATURA();
	this.instance_1.setTransform(-44,-33,0.1408,0.1408);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.128,scaleY:0.128,x:-40,y:-30},0).wait(1).to({scaleX:0.1408,scaleY:0.1408,x:-44,y:-33},0).wait(1));

	// base
	this.instance_2 = new lib.SENSORTEMPERATURA();
	this.instance_2.setTransform(-44,-33,0.1408,0.1408);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9357,0.9357);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_2}]}).to({state:[{t:this.shape_1},{t:this.instance_2}]},2).to({state:[{t:this.shape},{t:this.instance_2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.sensor_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.SENSORTEMPERATURA();
	this.instance.setTransform(-40,-30,0.128,0.128);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).to({_off:true},1).wait(1));

	// base
	this.instance_1 = new lib.SENSORTEMPERATURA();
	this.instance_1.setTransform(-44.3,-32.8,0.1408,0.1408);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.949,0.949);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape},{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.Scene_1_vee = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// vee
	this.instance = new lib.vex7();
	this.instance.setTransform(627,218);

	this.instance_1 = new lib.veeelectrica();
	this.instance_1.setTransform(412,218);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_texto_superior = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto_superior
	this.display_texto_superior_txt = new cjs.Text("--------", "bold 25px 'Segoe UI'");
	this.display_texto_superior_txt.name = "display_texto_superior_txt";
	this.display_texto_superior_txt.textAlign = "center";
	this.display_texto_superior_txt.lineHeight = 35;
	this.display_texto_superior_txt.lineWidth = 187;
	this.display_texto_superior_txt.parent = this;
	this.display_texto_superior_txt.setTransform(1765.85,373.1);

	this.timeline.addTween(cjs.Tween.get(this.display_texto_superior_txt).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_texto_inferior = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto_inferior
	this.display_inferior_txt = new cjs.Text("00.00", "70px 'Digital-7'");
	this.display_inferior_txt.name = "display_inferior_txt";
	this.display_inferior_txt.textAlign = "center";
	this.display_inferior_txt.lineHeight = 73;
	this.display_inferior_txt.lineWidth = 192;
	this.display_inferior_txt.parent = this;
	this.display_inferior_txt.setTransform(1766.85,403.25);

	this.timeline.addTween(cjs.Tween.get(this.display_inferior_txt).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_texto = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Curso de Reparação de RoofTop", "bold 15px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 22;
	this.text.lineWidth = 256;
	this.text.parent = this;
	this.text.setTransform(203.15,34.6);
	this.text.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);

	this.text_1 = new cjs.Text("Simulador RoofTop CIAT RPF", "bold 18px 'Segoe UI'", "#0000FF");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 26;
	this.text_1.lineWidth = 308;
	this.text_1.parent = this;
	this.text_1.setTransform(202.35,13);
	this.text_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_1},{t:this.text}]}).to({state:[{t:this.text_1},{t:this.text}]},1).to({state:[{t:this.text_1},{t:this.text}]},1).to({state:[{t:this.text_1},{t:this.text}]},1).to({state:[{t:this.text_1},{t:this.text}]},1).to({state:[{t:this.text_1},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_tela_inicial = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// tela_inicial
	this.instance = new lib.DeRcofXkAAaHGZ();
	this.instance.setTransform(135,179,0.6437,0.6437);

	this.estado_simulador_txt = new cjs.Text("Aguardando...", "20px 'Arial'");
	this.estado_simulador_txt.name = "estado_simulador_txt";
	this.estado_simulador_txt.textAlign = "center";
	this.estado_simulador_txt.lineHeight = 24;
	this.estado_simulador_txt.lineWidth = 432;
	this.estado_simulador_txt.parent = this;
	this.estado_simulador_txt.setTransform(876,100.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EgjJADDMBGTAAAIAAmFMhGTAAAg");
	this.shape.setTransform(875,109.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape},{t:this.estado_simulador_txt}]},1).to({state:[{t:this.shape},{t:this.estado_simulador_txt}]},1).to({state:[{t:this.shape},{t:this.estado_simulador_txt}]},1).to({state:[{t:this.shape},{t:this.estado_simulador_txt}]},1).to({state:[{t:this.shape},{t:this.estado_simulador_txt}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_parafusos = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// parafusos
	this.instance = new lib.parafuso();
	this.instance.setTransform(332,45,0.0874,0.0874);

	this.instance_1 = new lib.parafuso();
	this.instance_1.setTransform(332,8,0.0874,0.0874);

	this.instance_2 = new lib.parafuso();
	this.instance_2.setTransform(11,45,0.0874,0.0874);

	this.instance_3 = new lib.parafuso();
	this.instance_3.setTransform(11,8,0.0874,0.0874);

	this.instance_4 = new lib.parafuso();
	this.instance_4.setTransform(102,156,0.0874,0.0874);

	this.instance_5 = new lib.parafuso();
	this.instance_5.setTransform(16,156,0.0874,0.0874);

	this.instance_6 = new lib.parafuso();
	this.instance_6.setTransform(102,70,0.0874,0.0874);

	this.instance_7 = new lib.parafuso();
	this.instance_7.setTransform(16,70,0.0874,0.0874);

	this.instance_8 = new lib.parafuso();
	this.instance_8.setTransform(11,45,0.0874,0.0874);

	this.instance_9 = new lib.parafuso();
	this.instance_9.setTransform(11,8,0.0874,0.0874);

	this.instance_10 = new lib.parafuso();
	this.instance_10.setTransform(102,156,0.0874,0.0874);

	this.instance_11 = new lib.parafuso();
	this.instance_11.setTransform(16,156,0.0874,0.0874);

	this.instance_12 = new lib.parafuso();
	this.instance_12.setTransform(102,70,0.0874,0.0874);

	this.instance_13 = new lib.parafuso();
	this.instance_13.setTransform(16,70,0.0874,0.0874);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7,p:{x:16,y:70}},{t:this.instance_6,p:{x:102,y:70}},{t:this.instance_5,p:{scaleX:0.0874,scaleY:0.0874,x:16,y:156}},{t:this.instance_4,p:{scaleX:0.0874,scaleY:0.0874,x:102,y:156}},{t:this.instance_3,p:{scaleX:0.0874,scaleY:0.0874,x:11,y:8}},{t:this.instance_2,p:{scaleX:0.0874,scaleY:0.0874,x:11,y:45}},{t:this.instance_1,p:{scaleX:0.0874,scaleY:0.0874,x:332,y:8}},{t:this.instance,p:{scaleX:0.0874,scaleY:0.0874,x:332,y:45}}]}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7,p:{x:332,y:8}},{t:this.instance_6,p:{x:332,y:45}},{t:this.instance_5,p:{scaleX:0.1359,scaleY:0.1359,x:707,y:292}},{t:this.instance_4,p:{scaleX:0.1359,scaleY:0.1359,x:1048,y:292}},{t:this.instance_3,p:{scaleX:0.1359,scaleY:0.1359,x:1049,y:627}},{t:this.instance_2,p:{scaleX:0.1359,scaleY:0.1359,x:1049,y:867}},{t:this.instance_1,p:{scaleX:0.1359,scaleY:0.1359,x:1049,y:1014}},{t:this.instance,p:{scaleX:0.1359,scaleY:0.1359,x:758,y:1028}}]},1).to({state:[]},1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_multimetro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// multimetro
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],11);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.454,0,0,1.454,-148.3,-334.4)).s().p("EgXKA0RMAAAhogMAuVAAAMAAABoggAoEjFQjjDiAAFBQAAFCDjDiQDjDjFAAAQFCAADijjQDjjiAAlCQAAlBjjjiQjijjlCAAQlAAAjjDjg")
	}.bind(this);
	this.shape.setTransform(1765.325,628.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_imagem_simulador = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// imagem_simulador
	this.instance = new lib.CarelMicroPc();
	this.instance.setTransform(245,73,1.1434,1.0624);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({_off:true},1).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_fundo_multimetro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fundo_multimetro
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ArmLmQkzkzAAmzQAAmyEzk0QE0kzGyAAQGzAAEzEzQE0E0AAGyQAAGzk0EzQkzE0mzAAQmyAAk0k0g");
	this.shape.setTransform(1768,664.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_fundo_controlador = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fundo_controlador
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(0.1,1,1).p("A3bq7MAu3AAAIAAV3Mgu3AAAg");
	this.shape.setTransform(1720,170);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("A3bK8IAA13MAu3AAAIAAV3g");
	this.shape_1.setTransform(1720,170);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_fundo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fundo
	this.instance = new lib.fundoapp();
	this.instance.setTransform(0,0,1.4138,1.5473);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_display_multimetro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// display_multimetro
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#999999").s().p("AuaIIQg7AAgBg8IAAuXQABg8A7AAIc0AAQA9AAAAA8IAAOXQAAA8g9AAg");
	this.shape.setTransform(1767.25,419.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_compressor = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// compressor
	this.instance = new lib.timge1591860133869();
	this.instance.setTransform(202,148,1.768,1.768);

	this.instance_1 = new lib.ElectricidadeCompressor();
	this.instance_1.setTransform(265,139);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},2).to({state:[{t:this.instance_1}]},1).to({state:[]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.roda_multimetro_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],11);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.454,0,0,1.454,-151.4,-369.7)).s().p("AojIkQjjjjAAlBQAAlADjjjQDjjjFAAAQFBAADjDjQDjDjAAFAQAAFBjjDjQjjDjlBAAQlAAAjjjjg")
	}.bind(this);
	this.shape.setTransform(-0.0117,0.0658,1,1,-50.7132);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.6,-77.4,155.1,155.10000000000002);


(lib.prog_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// base
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-64.3,-98.9)).s().p("AiWCvIAAldIEtAAIAAFdg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({scaleX:0.9109,scaleY:0.9109},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-17.4,30.299999999999997,34.9);


(lib.pressostato_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mechanic2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.PRESSOSTATO();
	this.instance_1.setTransform(-26,-42,0.2859,0.2859);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.pressostato_electrica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.flash2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.PRESSOSTATO();
	this.instance_1.setTransform(-25,-42,0.2859,0.2859);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.pressostato_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.PRESSOSTATO();
	this.instance.setTransform(-25,-42,0.2859,0.2859);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.253,scaleY:0.253,x:-22,y:-37},0).wait(1).to({scaleX:0.2859,scaleY:0.2859,x:-25,y:-42},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnSHTIAAulIOlAAIAAOlg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.potencia_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Potência", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-8.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.ponta_vermelha_inicial_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// edicao
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,1).p("AAiD8IAAnHIgigwIghAwIAAHH");
	this.shape.setTransform(2.375,-167.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#999999").ss(1,1,1).p("AggAAIBCAAAhTABICnAA");
	this.shape_1.setTransform(2.325,-142.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AghD8IAAnHIAhgwIAiAwIAAHHg");
	this.shape_2.setTransform(2.375,-167.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// fundo
	this.instance = new lib.pontavermelha();
	this.instance.setTransform(-26,-200,1.4054,1.3605);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ponta_vermelha_inicial_mc, new cjs.Rectangle(-26,-200,52,400), null);


(lib.ponta_vermelha_final_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// edicao
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#999999").ss(1,1,1).p("Ag3AAIAkAAIAnAAIAkAA");
	this.shape.setTransform(1.575,-104.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#CCCCCC").ss(1,1,1).p("AAUDAIAAlWIgUgpIgTApIAAFW");
	this.shape_1.setTransform(1.575,-124.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AgTDAIAAlWIATgpIAUApIAAFWg");
	this.shape_2.setTransform(1.575,-124.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// fundo
	this.instance = new lib.pontavermelha();
	this.instance.setTransform(-18.5,-147);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ponta_vermelha_final_mc, new cjs.Rectangle(-18.5,-147,37,294), null);


(lib.ponta_preta_inicial_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// edicao
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCCCC").ss(1,1,1).p("ABLEAIgnAAIAAnQIgggvIggAvIAAHQIguAA");
	this.shape.setTransform(2.55,-168.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#999999").ss(1,1,1).p("AggAAIBBAA");
	this.shape_1.setTransform(2.875,-142.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AggEAIAAnQIAhgvIAgAvIAAHQg");
	this.shape_2.setTransform(2.875,-168.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// fundo
	this.instance = new lib.pontapreta();
	this.instance.setTransform(-26,-200,1.3684,1.3605);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26,-200,52,400);


(lib.ponta_preta_final_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// edicao
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#999999").ss(1,1,1).p("AgVAAIArAA");
	this.shape.setTransform(2.1,-105.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#CCCCCC").ss(1,1,1).p("AhKC1IA3AAIAAk5IAVgxIAAABIAWAwIAAE5IAzAA");
	this.shape_1.setTransform(1.875,-123.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AgVC1IAAk5IAVgwIAAABIAWAvIAAE5g");
	this.shape_2.setTransform(2.1,-123.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// fundo
	this.instance = new lib.pontapreta();
	this.instance.setTransform(-19,-147);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-147,38,294);


(lib.placa_electronica_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.mechanic2();
	this.instance.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.7808,scaleY:0.7808,x:26,y:26},0).wait(1).to({scaleX:1,scaleY:1,x:23,y:23},0).wait(1));

	// componente
	this.instance_1 = new lib.PLACACONTROL();
	this.instance_1.setTransform(-45,-31,0.1304,0.1372);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.1199,scaleY:0.1261,x:-42,y:-29},0).wait(1).to({scaleX:0.1304,scaleY:0.1372,x:-45,y:-31},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9459,0.9459);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.placa_electronica_electrica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.flash2();
	this.instance.setTransform(23,23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.7423,scaleY:0.7423,x:26,y:26},0).wait(1).to({scaleX:1,scaleY:1,x:23,y:23},0).wait(1));

	// componente
	this.instance_1 = new lib.PLACACONTROL();
	this.instance_1.setTransform(-45,-31,0.1304,0.1372);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.1159,scaleY:0.1219,x:-40,y:-28},0).wait(1).to({scaleX:0.1304,scaleY:0.1372,x:-45,y:-31},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnHHIIAAuPIOPAAIAAOPg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.placa_electronica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.PLACACONTROL();
	this.instance.setTransform(-45,-31,0.1304,0.1372);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.1159,scaleY:0.1219,x:-40,y:-28},0).wait(1).to({scaleX:0.1304,scaleY:0.1372,x:-45,y:-31},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9459,0.9459);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.pda_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mechanic2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.PDA();
	this.instance_1.setTransform(31.2,37.35,0.1507,0.1507,180);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.pda_electricidade_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.flash2();
	this.instance.setTransform(23,23);

	this.instance_1 = new lib.PDA();
	this.instance_1.setTransform(31.2,37.35,0.1507,0.1507,180);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.pda_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// componente
	this.instance = new lib.PDA();
	this.instance.setTransform(31.2,37.35,0.1507,0.1507,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.1387,scaleY:0.1387,x:28.3,y:34.35},0).wait(1).to({scaleX:0.1507,scaleY:0.1507,x:31.2,y:37.35},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnOHPIAAudIOdAAIAAOdg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.menu_valores_medidas_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Valores de Medidas", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_tensao_dc_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Tensão DC", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_tensao_ac_milivolts_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fundo
	this.text = new cjs.Text("Tensão AC/1000", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.3,-10.85);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyyD6IAAnzMAllAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyyD6IAAnzMAllAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).to({state:[{t:this.shape},{t:this.text}]},1).to({state:[{t:this.shape_1},{t:this.text}]},1).to({state:[{t:this.shape},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_tensao_ac_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fundo
	this.text = new cjs.Text("Tensão AC", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).to({state:[{t:this.shape},{t:this.text}]},1).to({state:[{t:this.shape_1},{t:this.text}]},1).to({state:[{t:this.shape},{t:this.text}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_setpoint_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("SetPoint", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_resistencia_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Resistência", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_multimetro_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Multímetro", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_ligar_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Ligar", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_entradas_saidas_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Entradas e Saídas", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_desligar_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Desligar", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_corrente_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Corrente", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_controle_remoto_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Controle Remoto", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_circuitos_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Circuitos", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 235;
	this.text.parent = this;
	this.text.setTransform(0.75,-10.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyyD6IAAnzMAllAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyyD6IAAnzMAllAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.7,50);


(lib.menu_capacidade_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Capacidade", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(-0.05,-10.15);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(0.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.text}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.2,-25,240.5,50);


(lib.menu_avarias_electronicas_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Avarias Electrónicas", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.2,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(-0.45,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(-0.45,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.4,-25,240.9,50);


(lib.menu_avarias_electricas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Avarias Eléctricas", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.2,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape.setTransform(-0.45,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyvD6IAAnzMAlfAAAIAAHzg");
	this.shape_1.setTransform(-0.45,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.4,-25,240.9,50);


(lib.menu_avarias_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Avarias Mecânicas", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL13b_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL13b", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL13a_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL13a", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL13_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL13", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL12c_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL12c", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL12b_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL12b", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL12a_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL12a", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL12_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL12", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL11_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL11", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL10_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL10", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL09_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL09", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL08_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL08", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL07_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL07", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL06a_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL06a", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL06_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL06", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL05a_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL05a", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_AL05_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("AL05", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-10.55);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.menu_ajuda_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Ajuda", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 115;
	this.text.parent = this;
	this.text.setTransform(-60.75,-10.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("ApQD6IAAnzIShAAIAAHzg");
	this.shape.setTransform(-61.175,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("ApQD6IAAnzIShAAIAAHzg");
	this.shape_1.setTransform(-61.175,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.4,-25,119,50);


(lib.logo_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.logo();
	this.instance.setTransform(-381.7,-175.5,0.5689,0.5689);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.logo_mc, new cjs.Rectangle(-381.7,-175.5,763.5,351), null);


(lib.logo_dois_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.logomini();
	this.instance.setTransform(-23.15,-19.3,0.1013,0.1013);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.logo_dois_mc, new cjs.Rectangle(-23.1,-19.3,46.3,38.6), null);


(lib.J1G0_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQATgTAaAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgaAAgTgTg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.5,-6.5,13,13);


(lib.J1G_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQATgTAaAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgaAAgTgTg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.5,-6.5,13,13);


(lib.GNDJ3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.GNDJ2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.frigorifico_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Frigorífico", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 236;
	this.text.parent = this;
	this.text.setTransform(0.3,-6.65);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.esc_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// base
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-64.3,-135.9)).s().p("AhdCoQg8ioADinIEuAAIAAFPg")
	}.bind(this);
	this.shape.setTransform(-0.0071,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({scaleX:0.9241,scaleY:0.9241,x:-0.0066,y:0.0231},0).wait(1).to({scaleX:1,scaleY:1,x:-0.0071,y:0.025},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-16.7,30.299999999999997,33.5);


(lib.enter_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// base
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-303.5,-98.9)).s().p("AiWCvIAAldIEtAAIAAFdg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({scaleX:0.901,scaleY:0.901},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-17.4,30.299999999999997,34.9);


(lib.display_controlador_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066FF").s().p("As6GmQgUAAAAgUIAAsjQAAgUAUAAIZ1AAQAUAAAAAUIAAMjQAAAUgUAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.display_controlador_mc, new cjs.Rectangle(-84.7,-42.2,169.4,84.4), null);


(lib.controle_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Controle", "20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 29;
	this.text.lineWidth = 235;
	this.text.parent = this;
	this.text.setTransform(-0.2,-7.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// fundo
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AyzD6IAAnzMAlnAAAIAAHzg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.3,-25,240.7,50);


(lib.continuar_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// texto
	this.text = new cjs.Text("Seguinte", "bold 20px 'Segoe UI'");
	this.text.textAlign = "center";
	this.text.lineHeight = 27;
	this.text.lineWidth = 234;
	this.text.parent = this;
	this.text.setTransform(-0.2,-9.05);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(4));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF9900").s().p("AyeD6QgWAAABgRIAAnRQgBgRAWAAMAk9AAAQAWAAgBARIAAHRQABARgWAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF6600").s().p("AyeD6QgWAAABgRIAAnRQgBgRAWAAMAk9AAAQAWAAgBARIAAHRQABARgWAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.4,-25,240.9,50);


(lib.compressor_mecanica_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.mechanic();
	this.instance.setTransform(23,23,0.0508,0.0508);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.0351,scaleY:0.0351,x:27,y:27},0).wait(1).to({scaleX:0.0508,scaleY:0.0508,x:23,y:23},0).wait(1));

	// objecto
	this.instance_1 = new lib.compressor();
	this.instance_1.setTransform(-26,-44,0.1139,0.1139);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.1036,scaleY:0.1036,x:-24,y:-40},0).wait(1).to({scaleX:0.1139,scaleY:0.1139,x:-26,y:-44},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnGHHIAAuNIONAAIAAONg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.compressor_electricidade_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ferramenta
	this.instance = new lib.flash();
	this.instance.setTransform(23,23,0.0508,0.0508);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({scaleX:0.0381,scaleY:0.0381,x:26,y:26},0).wait(1).to({scaleX:0.0508,scaleY:0.0508,x:23,y:23},0).wait(1));

	// objecto
	this.instance_1 = new lib.compressor();
	this.instance_1.setTransform(-26,-44,0.1139,0.1139);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({scaleX:0.1036,scaleY:0.1036,x:-24,y:-40},0).wait(1).to({scaleX:0.1139,scaleY:0.1139,x:-26,y:-44},0).wait(1));

	// base
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnpHqIAAvTIPTAAIAAPTg");
	this.shape_1.setTransform(0,0,0.9337,0.9337);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.compressor_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// base
	this.instance = new lib.compressor();
	this.instance.setTransform(-26.3,-43.8,0.1139,0.1139);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AnpHqIAAvTIPTAAIAAPTg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AnBHCIAAuDIODAAIAAODg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance,p:{scaleX:0.1139,scaleY:0.1139,x:-26.3,y:-43.8}}]}).to({state:[{t:this.shape_1},{t:this.instance,p:{scaleX:0.1046,scaleY:0.1046,x:-24,y:-40}}]},2).to({state:[{t:this.shape},{t:this.instance,p:{scaleX:0.1139,scaleY:0.1139,x:-26.3,y:-43.8}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49,-49,98,98);


(lib.cima_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// base
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-303.5,-62.2)).s().p("AiXCmIAAlLID2AAQA7ClgDCmg")
	}.bind(this);
	this.shape.setTransform(0.0073,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({scaleX:0.9277,scaleY:0.9277,x:0.0067,y:0.0232},0).wait(1).to({scaleX:1,scaleY:1,x:0.0073,y:0.025},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-16.6,30.299999999999997,33.3);


(lib.capa_display_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(153,153,153,0.8)").s().p("AuhH0IAAvnIdDAAIAAPng");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.capa_display_mc, new cjs.Rectangle(-93,-50,186,100), null);


(lib.botao_on_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.botãoon();
	this.instance.setTransform(-22.5,-40,0.1807,0.1797);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.5,-40,45,80);


(lib.botao_off_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.botãooff();
	this.instance.setTransform(-22.5,-40,0.1828,0.1802);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.5,-40,45,80);


(lib.baixo_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// base
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-303.5,-136.3)).s().p("AiXCsIAAlXIEuAAQADCng8CoIgDAIg")
	}.bind(this);
	this.shape.setTransform(0.0071,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({scaleX:0.9215,scaleY:0.9215,x:0.0066},0).wait(1).to({scaleX:1,scaleY:1,x:0.0071},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-17.2,30.299999999999997,34.4);


(lib.B7J3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.B6J3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.B5J3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.B4J3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.B3J3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.B2J3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.B1J3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.02)").s().p("AgtAuQgTgTAAgbQAAgaATgTQAUgTAZAAQAbAAATATQATATAAAaQAAAbgTATQgTATgbAAQgZAAgUgTg");
	this.shape.setTransform(6.5,6.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.alarme_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-64.3,-61.7)).s().p("AiWCrQgDirA+iqIDzAAIAAFVg")
	}.bind(this);
	this.shape.setTransform(-0.0069,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2).to({scaleX:0.8918,scaleY:0.8918,x:-0.0061,y:0.0223},0).wait(1).to({scaleX:1,scaleY:1,x:-0.0069,y:0.025},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.1,-17.1,30.299999999999997,34.3);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-961,-541,1922,1082);


(lib.Scene_1_roda_multimetro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// roda_multimetro
	this.roda_multimetro_btn = new lib.roda_multimetro_btn();
	this.roda_multimetro_btn.name = "roda_multimetro_btn";
	this.roda_multimetro_btn.setTransform(1768.45,663.7,1,1,-1.5643,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.roda_multimetro_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.roda_multimetro_btn).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ponta_vermelha = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ponta_vermelha
	this.ponta_vermelha_final_mc = new lib.ponta_vermelha_final_mc();
	this.ponta_vermelha_final_mc.name = "ponta_vermelha_final_mc";
	this.ponta_vermelha_final_mc.setTransform(854.95,288.25,1,1,-105.0002);
	this.ponta_vermelha_final_mc.visible = false;

	this.ponta_vermelha_inicial_mc = new lib.ponta_vermelha_inicial_mc();
	this.ponta_vermelha_inicial_mc.name = "ponta_vermelha_inicial_mc";
	this.ponta_vermelha_inicial_mc.setTransform(1573,880);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ponta_vermelha_inicial_mc},{t:this.ponta_vermelha_final_mc}]}).to({state:[{t:this.ponta_vermelha_inicial_mc},{t:this.ponta_vermelha_final_mc}]},1).to({state:[{t:this.ponta_vermelha_inicial_mc},{t:this.ponta_vermelha_final_mc}]},1).to({state:[{t:this.ponta_vermelha_inicial_mc},{t:this.ponta_vermelha_final_mc}]},1).to({state:[{t:this.ponta_vermelha_inicial_mc},{t:this.ponta_vermelha_final_mc}]},1).to({state:[{t:this.ponta_vermelha_inicial_mc},{t:this.ponta_vermelha_final_mc}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ponta_preta = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ponta_preta
	this.ponta_preta_inicial_mc = new lib.ponta_preta_inicial_mc();
	this.ponta_preta_inicial_mc.name = "ponta_preta_inicial_mc";
	this.ponta_preta_inicial_mc.setTransform(1573,482);
	new cjs.ButtonHelper(this.ponta_preta_inicial_mc, 0, 1, 1);

	this.ponta_preta_final_mc = new lib.ponta_preta_final_mc();
	this.ponta_preta_final_mc.name = "ponta_preta_final_mc";
	this.ponta_preta_final_mc.setTransform(815.2,440.15,1,1,-45);
	this.ponta_preta_final_mc.visible = false;
	new cjs.ButtonHelper(this.ponta_preta_final_mc, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ponta_preta_final_mc},{t:this.ponta_preta_inicial_mc}]}).to({state:[{t:this.ponta_preta_final_mc},{t:this.ponta_preta_inicial_mc}]},1).to({state:[{t:this.ponta_preta_final_mc},{t:this.ponta_preta_inicial_mc}]},1).to({state:[{t:this.ponta_preta_final_mc},{t:this.ponta_preta_inicial_mc}]},1).to({state:[{t:this.ponta_preta_final_mc},{t:this.ponta_preta_inicial_mc}]},1).to({state:[{t:this.ponta_preta_final_mc},{t:this.ponta_preta_inicial_mc}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_menus = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// menus
	this.menu_tensao_ac_milivolts_btn = new lib.menu_tensao_ac_milivolts_btn();
	this.menu_tensao_ac_milivolts_btn.name = "menu_tensao_ac_milivolts_btn";
	this.menu_tensao_ac_milivolts_btn.setTransform(706.7,186.2);
	this.menu_tensao_ac_milivolts_btn.visible = false;
	new cjs.ButtonHelper(this.menu_tensao_ac_milivolts_btn, 0, 1, 2, false, new lib.menu_tensao_ac_milivolts_btn(), 3);

	this.menu_corrente_btn = new lib.menu_corrente_btn();
	this.menu_corrente_btn.name = "menu_corrente_btn";
	this.menu_corrente_btn.setTransform(706.7,341.5);
	this.menu_corrente_btn.visible = false;
	new cjs.ButtonHelper(this.menu_corrente_btn, 0, 1, 1);

	this.menu_capacidade_btn = new lib.menu_capacidade_btn();
	this.menu_capacidade_btn.name = "menu_capacidade_btn";
	this.menu_capacidade_btn.setTransform(706.7,289.9);
	this.menu_capacidade_btn.visible = false;
	new cjs.ButtonHelper(this.menu_capacidade_btn, 0, 1, 1);

	this.menu_resistencia_btn = new lib.menu_resistencia_btn();
	this.menu_resistencia_btn.name = "menu_resistencia_btn";
	this.menu_resistencia_btn.setTransform(706.7,238.3);
	this.menu_resistencia_btn.visible = false;
	new cjs.ButtonHelper(this.menu_resistencia_btn, 0, 1, 1);

	this.menu_tensao_dc_btn = new lib.menu_tensao_dc_btn();
	this.menu_tensao_dc_btn.name = "menu_tensao_dc_btn";
	this.menu_tensao_dc_btn.setTransform(706.7,134.2);
	this.menu_tensao_dc_btn.visible = false;
	new cjs.ButtonHelper(this.menu_tensao_dc_btn, 0, 1, 1);

	this.menu_tensao_ac_btn = new lib.menu_tensao_ac_btn();
	this.menu_tensao_ac_btn.name = "menu_tensao_ac_btn";
	this.menu_tensao_ac_btn.setTransform(706.7,82.6);
	this.menu_tensao_ac_btn.visible = false;
	new cjs.ButtonHelper(this.menu_tensao_ac_btn, 0, 1, 2, false, new lib.menu_tensao_ac_btn(), 3);

	this.menu_desligar_btn = new lib.menu_desligar_btn();
	this.menu_desligar_btn.name = "menu_desligar_btn";
	this.menu_desligar_btn.setTransform(464.7,-60.8);
	this.menu_desligar_btn.visible = false;
	new cjs.ButtonHelper(this.menu_desligar_btn, 0, 1, 1);

	this.menu_ligar_btn = new lib.menu_ligar_btn();
	this.menu_ligar_btn.name = "menu_ligar_btn";
	this.menu_ligar_btn.setTransform(464.7,-112.4);
	this.menu_ligar_btn.visible = false;
	new cjs.ButtonHelper(this.menu_ligar_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.menu_ligar_btn,p:{y:-112.4}},{t:this.menu_desligar_btn,p:{y:-60.8}},{t:this.menu_tensao_ac_btn},{t:this.menu_tensao_dc_btn},{t:this.menu_resistencia_btn},{t:this.menu_capacidade_btn},{t:this.menu_corrente_btn},{t:this.menu_tensao_ac_milivolts_btn}]}).to({state:[{t:this.menu_ligar_btn,p:{y:-106.4}},{t:this.menu_desligar_btn,p:{y:-54.8}},{t:this.menu_tensao_ac_btn},{t:this.menu_tensao_dc_btn},{t:this.menu_resistencia_btn},{t:this.menu_capacidade_btn},{t:this.menu_corrente_btn},{t:this.menu_tensao_ac_milivolts_btn}]},1).to({state:[{t:this.menu_ligar_btn,p:{y:-106.4}},{t:this.menu_desligar_btn,p:{y:-54.8}},{t:this.menu_tensao_ac_btn},{t:this.menu_tensao_dc_btn},{t:this.menu_resistencia_btn},{t:this.menu_capacidade_btn},{t:this.menu_corrente_btn},{t:this.menu_tensao_ac_milivolts_btn}]},1).to({state:[{t:this.menu_ligar_btn,p:{y:-106.4}},{t:this.menu_desligar_btn,p:{y:-54.8}},{t:this.menu_tensao_ac_btn},{t:this.menu_tensao_dc_btn},{t:this.menu_resistencia_btn},{t:this.menu_capacidade_btn},{t:this.menu_corrente_btn},{t:this.menu_tensao_ac_milivolts_btn}]},1).to({state:[{t:this.menu_ligar_btn,p:{y:-106.4}},{t:this.menu_desligar_btn,p:{y:-54.8}},{t:this.menu_tensao_ac_btn},{t:this.menu_tensao_dc_btn},{t:this.menu_resistencia_btn},{t:this.menu_capacidade_btn},{t:this.menu_corrente_btn},{t:this.menu_tensao_ac_milivolts_btn}]},1).to({state:[{t:this.menu_ligar_btn,p:{y:-106.4}},{t:this.menu_desligar_btn,p:{y:-54.8}},{t:this.menu_tensao_ac_btn},{t:this.menu_tensao_dc_btn},{t:this.menu_resistencia_btn},{t:this.menu_capacidade_btn},{t:this.menu_corrente_btn},{t:this.menu_tensao_ac_milivolts_btn}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_logo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// logo
	this.logo_dois_mc = new lib.logo_dois_mc();
	this.logo_dois_mc.name = "logo_dois_mc";
	this.logo_dois_mc.setTransform(49.2,33.75);
	this.logo_dois_mc.shadow = new cjs.Shadow("#000000",1,1,2);

	this.timeline.addTween(cjs.Tween.get(this.logo_dois_mc).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ficha_tecnica = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ficha_tecnica
	this.logo_mc = new lib.logo_mc();
	this.logo_mc.name = "logo_mc";
	this.logo_mc.setTransform(558.7,778.5);
	this.logo_mc.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);

	this.text = new cjs.Text("Parceria: CINFOTEC - Fábrica de Software\nProgramadores Sêniores: Paulo Ernesto, Alberto Monteiro\nArquitectura do Software: Alberto Monteiro, Paulo Ernesto\nInterface Gráfica: Alberto Monteiro, Paulo Ernesto\nAnimações: Alberto Monteiro, Paulo Ernesto\nConsultores: Eng. Edgar Bartolomeu, Eng. Francisco Cinco, Arq. Ladislau Miguel, Dra. Maria Gomes, \nLuan Monteiro", "bold 25px 'Segoe UI'", "#FFFFFF");
	this.text.lineHeight = 33;
	this.text.lineWidth = 1303;
	this.text.parent = this;
	this.text.setTransform(170.95,337.6);
	this.text.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.text_1 = new cjs.Text("Simulador de Unidade de Ar Condicionado Industrial\nPropriedade: Monteiro & Monteiro - Tecnologia e Serviços", "bold 30px 'Segoe UI'", "#FFFFFF");
	this.text_1.lineHeight = 40;
	this.text_1.lineWidth = 991;
	this.text_1.parent = this;
	this.text_1.setTransform(167.95,211.35);
	this.text_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text_1},{t:this.text},{t:this.logo_mc}]}).to({state:[]},1).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_controlador = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// controlador
	this.display_controlador_mc = new lib.display_controlador_mc();
	this.display_controlador_mc.name = "display_controlador_mc";
	this.display_controlador_mc.setTransform(1726.9,168.55);

	this.baixo_btn = new lib.baixo_btn();
	this.baixo_btn.name = "baixo_btn";
	this.baixo_btn.setTransform(1846.5,208.3);
	this.baixo_btn.shadow = new cjs.Shadow("#000000",1,1,1);
	new cjs.ButtonHelper(this.baixo_btn, 0, 1, 2, false, new lib.baixo_btn(), 3);

	this.enter_btn = new lib.enter_btn();
	this.enter_btn.name = "enter_btn";
	this.enter_btn.setTransform(1846.5,170.95);
	this.enter_btn.shadow = new cjs.Shadow("#000000",1,1,1);
	new cjs.ButtonHelper(this.enter_btn, 0, 1, 2, false, new lib.enter_btn(), 3);

	this.cima_btn = new lib.cima_btn();
	this.cima_btn.name = "cima_btn";
	this.cima_btn.setTransform(1846.5,134.15);
	this.cima_btn.shadow = new cjs.Shadow("#000000",1,1,1);
	new cjs.ButtonHelper(this.cima_btn, 0, 1, 2, false, new lib.cima_btn(), 3);

	this.esc_btn = new lib.esc_btn();
	this.esc_btn.name = "esc_btn";
	this.esc_btn.setTransform(1607.3,207.85);
	this.esc_btn.shadow = new cjs.Shadow("#000000",1,1,1);
	new cjs.ButtonHelper(this.esc_btn, 0, 1, 2, false, new lib.esc_btn(), 3);

	this.prog_btn = new lib.prog_btn();
	this.prog_btn.name = "prog_btn";
	this.prog_btn.setTransform(1607.3,170.95);
	this.prog_btn.shadow = new cjs.Shadow("#000000",1,1,1);
	new cjs.ButtonHelper(this.prog_btn, 0, 1, 2, false, new lib.prog_btn(), 3);

	this.alarme_btn = new lib.alarme_btn();
	this.alarme_btn.name = "alarme_btn";
	this.alarme_btn.setTransform(1607.3,133.65);
	this.alarme_btn.shadow = new cjs.Shadow("#000000",1,1,1);
	new cjs.ButtonHelper(this.alarme_btn, 0, 1, 2, false, new lib.alarme_btn(), 3);

	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["app_atlas_3"],3);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1,0,0,1,-183.5,-100)).s().p("A8qPoIAA/PMA5VAAAIAAfPgAQYIXIDzAAIAEgJQA7ingCioIkwAAgA0FIOID1AAIAAlPIkuAAQgDCoA8CngAtKm0IAAMjQAAAVAUAAIZ1AAQAUAAAAgVIAAsjQAAgTgUAAI51AAQgUAAAAATgAQYCkIEwAAIAAlcIkwAAgA0+CkIEuAAIAAlcIkuAAgAQYjTIEwAAQACimg6inIj4AAgA0+jTIEuAAIAAlXIjzAAQg/CsAECrg")
	}.bind(this);
	this.shape.setTransform(1726.5,172);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.alarme_btn},{t:this.prog_btn},{t:this.esc_btn},{t:this.cima_btn},{t:this.enter_btn},{t:this.baixo_btn},{t:this.display_controlador_mc}]}).to({state:[{t:this.shape},{t:this.alarme_btn},{t:this.prog_btn},{t:this.esc_btn},{t:this.cima_btn},{t:this.enter_btn},{t:this.baixo_btn},{t:this.display_controlador_mc}]},1).to({state:[{t:this.shape},{t:this.alarme_btn},{t:this.prog_btn},{t:this.esc_btn},{t:this.cima_btn},{t:this.enter_btn},{t:this.baixo_btn},{t:this.display_controlador_mc}]},1).to({state:[{t:this.shape},{t:this.alarme_btn},{t:this.prog_btn},{t:this.esc_btn},{t:this.cima_btn},{t:this.enter_btn},{t:this.baixo_btn},{t:this.display_controlador_mc}]},1).to({state:[{t:this.shape},{t:this.alarme_btn},{t:this.prog_btn},{t:this.esc_btn},{t:this.cima_btn},{t:this.enter_btn},{t:this.baixo_btn},{t:this.display_controlador_mc}]},1).to({state:[{t:this.shape},{t:this.alarme_btn},{t:this.prog_btn},{t:this.esc_btn},{t:this.cima_btn},{t:this.enter_btn},{t:this.baixo_btn},{t:this.display_controlador_mc}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_contactos_placa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// contactos_placa
	this.Vref5J2 = new lib.Vref5J2();
	this.Vref5J2.name = "Vref5J2";
	this.Vref5J2.setTransform(1050.8,991.9,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2, 0, 1, 1);

	this.Vref5J2_1 = new lib.Vref5J2();
	this.Vref5J2_1.name = "Vref5J2_1";
	this.Vref5J2_1.setTransform(1050.95,974.4,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_1, 0, 1, 1);

	this.Vref5J2_2 = new lib.Vref5J2();
	this.Vref5J2_2.name = "Vref5J2_2";
	this.Vref5J2_2.setTransform(1050.8,957.4,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_2, 0, 1, 1);

	this.gndJ2 = new lib.GNDJ2();
	this.gndJ2.name = "gndJ2";
	this.gndJ2.setTransform(1051.2,940.4,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.gndJ2, 0, 1, 1);

	this.VdcJ2 = new lib.VdcJ2();
	this.VdcJ2.name = "VdcJ2";
	this.VdcJ2.setTransform(1051.05,922.85,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.VdcJ2, 0, 1, 1);

	this.Vref5J2_3 = new lib.Vref5J2();
	this.Vref5J2_3.name = "Vref5J2_3";
	this.Vref5J2_3.setTransform(1050.8,905.95,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_3, 0, 1, 1);

	this.Vref5J2_4 = new lib.Vref5J2();
	this.Vref5J2_4.name = "Vref5J2_4";
	this.Vref5J2_4.setTransform(1051.9,796.15,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_4, 0, 1, 1);

	this.gndJ2_1 = new lib.GNDJ2();
	this.gndJ2_1.name = "gndJ2_1";
	this.gndJ2_1.setTransform(1051.8,779.25,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.gndJ2_1, 0, 1, 1);

	this.VdcJ2_1 = new lib.VdcJ2();
	this.VdcJ2_1.name = "VdcJ2_1";
	this.VdcJ2_1.setTransform(1051.65,762.5,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.VdcJ2_1, 0, 1, 1);

	this.Vref5J2_5 = new lib.Vref5J2();
	this.Vref5J2_5.name = "Vref5J2_5";
	this.Vref5J2_5.setTransform(1052,707.45,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_5, 0, 1, 1);

	this.Vref5J2_6 = new lib.Vref5J2();
	this.Vref5J2_6.name = "Vref5J2_6";
	this.Vref5J2_6.setTransform(1051.85,691.25,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_6, 0, 1, 1);

	this.gndJ2_2 = new lib.GNDJ2();
	this.gndJ2_2.name = "gndJ2_2";
	this.gndJ2_2.setTransform(1051.75,674.35,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.gndJ2_2, 0, 1, 1);

	this.VdcJ2_2 = new lib.VdcJ2();
	this.VdcJ2_2.name = "VdcJ2_2";
	this.VdcJ2_2.setTransform(1051.6,657.6,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.VdcJ2_2, 0, 1, 1);

	this.Vref5J2_7 = new lib.Vref5J2();
	this.Vref5J2_7.name = "Vref5J2_7";
	this.Vref5J2_7.setTransform(1051.75,611.75,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_7, 0, 1, 1);

	this.Vref5J2_8 = new lib.Vref5J2();
	this.Vref5J2_8.name = "Vref5J2_8";
	this.Vref5J2_8.setTransform(1051.6,595.55,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_8, 0, 1, 1);

	this.gndJ2_3 = new lib.GNDJ2();
	this.gndJ2_3.name = "gndJ2_3";
	this.gndJ2_3.setTransform(1051.5,578.65,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.gndJ2_3, 0, 1, 1);

	this.VdcJ2_3 = new lib.VdcJ2();
	this.VdcJ2_3.name = "VdcJ2_3";
	this.VdcJ2_3.setTransform(1051.35,561.9,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.VdcJ2_3, 0, 1, 1);

	this.Vref5J2_9 = new lib.Vref5J2();
	this.Vref5J2_9.name = "Vref5J2_9";
	this.Vref5J2_9.setTransform(1063.7,480.9,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_9, 0, 1, 1);

	this.Vref5J2_10 = new lib.Vref5J2();
	this.Vref5J2_10.name = "Vref5J2_10";
	this.Vref5J2_10.setTransform(1064,467.55,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_10, 0, 1, 1);

	this.gndJ2_4 = new lib.GNDJ2();
	this.gndJ2_4.name = "gndJ2_4";
	this.gndJ2_4.setTransform(1063.9,453.95,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.gndJ2_4, 0, 1, 1);

	this.VdcJ2_4 = new lib.VdcJ2();
	this.VdcJ2_4.name = "VdcJ2_4";
	this.VdcJ2_4.setTransform(1063.75,439.9,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.VdcJ2_4, 0, 1, 1);

	this.Vref5J2_11 = new lib.Vref5J2();
	this.Vref5J2_11.name = "Vref5J2_11";
	this.Vref5J2_11.setTransform(1063.75,388.25,0.8657,0.8657,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_11, 0, 1, 1);

	this.gndJ2_5 = new lib.GNDJ2();
	this.gndJ2_5.name = "gndJ2_5";
	this.gndJ2_5.setTransform(1063.8,373.45,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.gndJ2_5, 0, 1, 1);

	this.VdcJ2_5 = new lib.VdcJ2();
	this.VdcJ2_5.name = "VdcJ2_5";
	this.VdcJ2_5.setTransform(1063.8,357.9,0.8657,0.8657,0,0,0,6.6,6.5);
	new cjs.ButtonHelper(this.VdcJ2_5, 0, 1, 1);

	this.gndJ2_6 = new lib.GNDJ2();
	this.gndJ2_6.name = "gndJ2_6";
	this.gndJ2_6.setTransform(718.25,1032.45,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_6, 0, 1, 1);

	this.VdcJ2_6 = new lib.VdcJ2();
	this.VdcJ2_6.name = "VdcJ2_6";
	this.VdcJ2_6.setTransform(718.25,1015.55,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_6, 0, 1, 1);

	this.Vref5J2_12 = new lib.Vref5J2();
	this.Vref5J2_12.name = "Vref5J2_12";
	this.Vref5J2_12.setTransform(717.75,999.4,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_12, 0, 1, 1);

	this.gndJ2_7 = new lib.GNDJ2();
	this.gndJ2_7.name = "gndJ2_7";
	this.gndJ2_7.setTransform(718.1,982.95,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_7, 0, 1, 1);

	this.gndJ2_8 = new lib.GNDJ2();
	this.gndJ2_8.name = "gndJ2_8";
	this.gndJ2_8.setTransform(718.2,954.65,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_8, 0, 1, 1);

	this.VdcJ2_7 = new lib.VdcJ2();
	this.VdcJ2_7.name = "VdcJ2_7";
	this.VdcJ2_7.setTransform(718.2,937.75,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_7, 0, 1, 1);

	this.Vref5J2_13 = new lib.Vref5J2();
	this.Vref5J2_13.name = "Vref5J2_13";
	this.Vref5J2_13.setTransform(717.7,921.6,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_13, 0, 1, 1);

	this.gndJ2_9 = new lib.GNDJ2();
	this.gndJ2_9.name = "gndJ2_9";
	this.gndJ2_9.setTransform(718.05,905.15,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_9, 0, 1, 1);

	this.VdcJ2_8 = new lib.VdcJ2();
	this.VdcJ2_8.name = "VdcJ2_8";
	this.VdcJ2_8.setTransform(718.05,888.25,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_8, 0, 1, 1);

	this.Vref5J2_14 = new lib.Vref5J2();
	this.Vref5J2_14.name = "Vref5J2_14";
	this.Vref5J2_14.setTransform(718.05,872.2,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_14, 0, 1, 1);

	this.gndJ2_10 = new lib.GNDJ2();
	this.gndJ2_10.name = "gndJ2_10";
	this.gndJ2_10.setTransform(717.95,792.15,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_10, 0, 1, 1);

	this.VdcJ2_9 = new lib.VdcJ2();
	this.VdcJ2_9.name = "VdcJ2_9";
	this.VdcJ2_9.setTransform(717.95,775.25,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_9, 0, 1, 1);

	this.Vref5J2_15 = new lib.Vref5J2();
	this.Vref5J2_15.name = "Vref5J2_15";
	this.Vref5J2_15.setTransform(717.45,759.1,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_15, 0, 1, 1);

	this.gndJ2_11 = new lib.GNDJ2();
	this.gndJ2_11.name = "gndJ2_11";
	this.gndJ2_11.setTransform(717.8,742.65,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_11, 0, 1, 1);

	this.Vref5J2_16 = new lib.Vref5J2();
	this.Vref5J2_16.name = "Vref5J2_16";
	this.Vref5J2_16.setTransform(717.85,726.1,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_16, 0, 1, 1);

	this.gndJ2_12 = new lib.GNDJ2();
	this.gndJ2_12.name = "gndJ2_12";
	this.gndJ2_12.setTransform(717.45,700.65,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_12, 0, 1, 1);

	this.VdcJ2_10 = new lib.VdcJ2();
	this.VdcJ2_10.name = "VdcJ2_10";
	this.VdcJ2_10.setTransform(717.45,683.75,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_10, 0, 1, 1);

	this.Vref5J2_17 = new lib.Vref5J2();
	this.Vref5J2_17.name = "Vref5J2_17";
	this.Vref5J2_17.setTransform(716.95,667.6,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_17, 0, 1, 1);

	this.gndJ2_13 = new lib.GNDJ2();
	this.gndJ2_13.name = "gndJ2_13";
	this.gndJ2_13.setTransform(717.3,651.15,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_13, 0, 1, 1);

	this.VdcJ2_11 = new lib.VdcJ2();
	this.VdcJ2_11.name = "VdcJ2_11";
	this.VdcJ2_11.setTransform(717.3,634.25,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_11, 0, 1, 1);

	this.Vref5J2_18 = new lib.Vref5J2();
	this.Vref5J2_18.name = "Vref5J2_18";
	this.Vref5J2_18.setTransform(717.3,618.2,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_18, 0, 1, 1);

	this.gndJ2_14 = new lib.GNDJ2();
	this.gndJ2_14.name = "gndJ2_14";
	this.gndJ2_14.setTransform(717.65,601.75,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_14, 0, 1, 1);

	this.VdcJ2_12 = new lib.VdcJ2();
	this.VdcJ2_12.name = "VdcJ2_12";
	this.VdcJ2_12.setTransform(717.65,584.85,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_12, 0, 1, 1);

	this.VdcJ3 = new lib.VdcJ3();
	this.VdcJ3.name = "VdcJ3";
	this.VdcJ3.setTransform(717.45,558.75,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ3, 0, 1, 1);

	this.GNDJ3 = new lib.GNDJ3();
	this.GNDJ3.name = "GNDJ3";
	this.GNDJ3.setTransform(717.8,542.3,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.GNDJ3, 0, 1, 1);

	this.B7J3 = new lib.B7J3();
	this.B7J3.name = "B7J3";
	this.B7J3.setTransform(717.8,525.4,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.B7J3, 0, 1, 1);

	this.B5J3 = new lib.B6J3();
	this.B5J3.name = "B5J3";
	this.B5J3.setTransform(717.3,509.25,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.B5J3, 0, 1, 1);

	this.B5J3_1 = new lib.B5J3();
	this.B5J3_1.name = "B5J3_1";
	this.B5J3_1.setTransform(717.65,492.8,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.B5J3_1, 0, 1, 1);

	this.B4J3 = new lib.B4J3();
	this.B4J3.name = "B4J3";
	this.B4J3.setTransform(717.65,475.9,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.B4J3, 0, 1, 1);

	this.B3J3 = new lib.B3J3();
	this.B3J3.name = "B3J3";
	this.B3J3.setTransform(717.65,459.85,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.B3J3, 0, 1, 1);

	this.B2J3 = new lib.B2J3();
	this.B2J3.name = "B2J3";
	this.B2J3.setTransform(718,443.4,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.B2J3, 0, 1, 1);

	this.B1J3 = new lib.B1J3();
	this.B1J3.name = "B1J3";
	this.B1J3.setTransform(718,426.5,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.B1J3, 0, 1, 1);

	this.Vref5J2_19 = new lib.Vref5J2();
	this.Vref5J2_19.name = "Vref5J2_19";
	this.Vref5J2_19.setTransform(717.65,401,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.Vref5J2_19, 0, 1, 1);

	this.gndJ2_15 = new lib.GNDJ2();
	this.gndJ2_15.name = "gndJ2_15";
	this.gndJ2_15.setTransform(718,384.55,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.gndJ2_15, 0, 1, 1);

	this.VdcJ2_13 = new lib.VdcJ2();
	this.VdcJ2_13.name = "VdcJ2_13";
	this.VdcJ2_13.setTransform(718,367.65,1,1,0,0,0,6.5,6.5);
	new cjs.ButtonHelper(this.VdcJ2_13, 0, 1, 1);

	this.J1G0_btn = new lib.J1G0_btn();
	this.J1G0_btn.name = "J1G0_btn";
	this.J1G0_btn.setTransform(718,339.35);
	new cjs.ButtonHelper(this.J1G0_btn, 0, 1, 1);

	this.J1G_btn = new lib.J1G_btn();
	this.J1G_btn.name = "J1G_btn";
	this.J1G_btn.setTransform(718,323.35);
	new cjs.ButtonHelper(this.J1G_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.J1G_btn},{t:this.J1G0_btn},{t:this.VdcJ2_13},{t:this.gndJ2_15},{t:this.Vref5J2_19},{t:this.B1J3},{t:this.B2J3},{t:this.B3J3},{t:this.B4J3},{t:this.B5J3_1},{t:this.B5J3},{t:this.B7J3},{t:this.GNDJ3},{t:this.VdcJ3},{t:this.VdcJ2_12},{t:this.gndJ2_14},{t:this.Vref5J2_18},{t:this.VdcJ2_11},{t:this.gndJ2_13},{t:this.Vref5J2_17},{t:this.VdcJ2_10},{t:this.gndJ2_12},{t:this.Vref5J2_16},{t:this.gndJ2_11},{t:this.Vref5J2_15},{t:this.VdcJ2_9},{t:this.gndJ2_10},{t:this.Vref5J2_14},{t:this.VdcJ2_8},{t:this.gndJ2_9},{t:this.Vref5J2_13},{t:this.VdcJ2_7},{t:this.gndJ2_8},{t:this.gndJ2_7},{t:this.Vref5J2_12},{t:this.VdcJ2_6},{t:this.gndJ2_6},{t:this.VdcJ2_5},{t:this.gndJ2_5},{t:this.Vref5J2_11},{t:this.VdcJ2_4},{t:this.gndJ2_4},{t:this.Vref5J2_10},{t:this.Vref5J2_9},{t:this.VdcJ2_3},{t:this.gndJ2_3},{t:this.Vref5J2_8},{t:this.Vref5J2_7},{t:this.VdcJ2_2},{t:this.gndJ2_2},{t:this.Vref5J2_6},{t:this.Vref5J2_5},{t:this.VdcJ2_1},{t:this.gndJ2_1},{t:this.Vref5J2_4},{t:this.Vref5J2_3},{t:this.VdcJ2},{t:this.gndJ2},{t:this.Vref5J2_2},{t:this.Vref5J2_1},{t:this.Vref5J2}]}).to({state:[{t:this.J1G_btn},{t:this.J1G0_btn},{t:this.VdcJ2_13},{t:this.gndJ2_15},{t:this.Vref5J2_19},{t:this.B1J3},{t:this.B2J3},{t:this.B3J3},{t:this.B4J3},{t:this.B5J3_1},{t:this.B5J3},{t:this.B7J3},{t:this.GNDJ3},{t:this.VdcJ3},{t:this.VdcJ2_12},{t:this.gndJ2_14},{t:this.Vref5J2_18},{t:this.VdcJ2_11},{t:this.gndJ2_13},{t:this.Vref5J2_17},{t:this.VdcJ2_10},{t:this.gndJ2_12},{t:this.Vref5J2_16},{t:this.gndJ2_11},{t:this.Vref5J2_15},{t:this.VdcJ2_9},{t:this.gndJ2_10},{t:this.Vref5J2_14},{t:this.VdcJ2_8},{t:this.gndJ2_9},{t:this.Vref5J2_13},{t:this.VdcJ2_7},{t:this.gndJ2_8},{t:this.gndJ2_7},{t:this.Vref5J2_12},{t:this.VdcJ2_6},{t:this.gndJ2_6},{t:this.VdcJ2_5},{t:this.gndJ2_5},{t:this.Vref5J2_11},{t:this.VdcJ2_4},{t:this.gndJ2_4},{t:this.Vref5J2_10},{t:this.Vref5J2_9},{t:this.VdcJ2_3},{t:this.gndJ2_3},{t:this.Vref5J2_8},{t:this.Vref5J2_7},{t:this.VdcJ2_2},{t:this.gndJ2_2},{t:this.Vref5J2_6},{t:this.Vref5J2_5},{t:this.VdcJ2_1},{t:this.gndJ2_1},{t:this.Vref5J2_4},{t:this.Vref5J2_3},{t:this.VdcJ2},{t:this.gndJ2},{t:this.Vref5J2_2},{t:this.Vref5J2_1},{t:this.Vref5J2}]},1).to({state:[{t:this.J1G_btn},{t:this.J1G0_btn},{t:this.VdcJ2_13},{t:this.gndJ2_15},{t:this.Vref5J2_19},{t:this.B1J3},{t:this.B2J3},{t:this.B3J3},{t:this.B4J3},{t:this.B5J3_1},{t:this.B5J3},{t:this.B7J3},{t:this.GNDJ3},{t:this.VdcJ3},{t:this.VdcJ2_12},{t:this.gndJ2_14},{t:this.Vref5J2_18},{t:this.VdcJ2_11},{t:this.gndJ2_13},{t:this.Vref5J2_17},{t:this.VdcJ2_10},{t:this.gndJ2_12},{t:this.Vref5J2_16},{t:this.gndJ2_11},{t:this.Vref5J2_15},{t:this.VdcJ2_9},{t:this.gndJ2_10},{t:this.Vref5J2_14},{t:this.VdcJ2_8},{t:this.gndJ2_9},{t:this.Vref5J2_13},{t:this.VdcJ2_7},{t:this.gndJ2_8},{t:this.gndJ2_7},{t:this.Vref5J2_12},{t:this.VdcJ2_6},{t:this.gndJ2_6},{t:this.VdcJ2_5},{t:this.gndJ2_5},{t:this.Vref5J2_11},{t:this.VdcJ2_4},{t:this.gndJ2_4},{t:this.Vref5J2_10},{t:this.Vref5J2_9},{t:this.VdcJ2_3},{t:this.gndJ2_3},{t:this.Vref5J2_8},{t:this.Vref5J2_7},{t:this.VdcJ2_2},{t:this.gndJ2_2},{t:this.Vref5J2_6},{t:this.Vref5J2_5},{t:this.VdcJ2_1},{t:this.gndJ2_1},{t:this.Vref5J2_4},{t:this.Vref5J2_3},{t:this.VdcJ2},{t:this.gndJ2},{t:this.Vref5J2_2},{t:this.Vref5J2_1},{t:this.Vref5J2}]},1).to({state:[{t:this.J1G_btn},{t:this.J1G0_btn},{t:this.VdcJ2_13},{t:this.gndJ2_15},{t:this.Vref5J2_19},{t:this.B1J3},{t:this.B2J3},{t:this.B3J3},{t:this.B4J3},{t:this.B5J3_1},{t:this.B5J3},{t:this.B7J3},{t:this.GNDJ3},{t:this.VdcJ3},{t:this.VdcJ2_12},{t:this.gndJ2_14},{t:this.Vref5J2_18},{t:this.VdcJ2_11},{t:this.gndJ2_13},{t:this.Vref5J2_17},{t:this.VdcJ2_10},{t:this.gndJ2_12},{t:this.Vref5J2_16},{t:this.gndJ2_11},{t:this.Vref5J2_15},{t:this.VdcJ2_9},{t:this.gndJ2_10},{t:this.Vref5J2_14},{t:this.VdcJ2_8},{t:this.gndJ2_9},{t:this.Vref5J2_13},{t:this.VdcJ2_7},{t:this.gndJ2_8},{t:this.gndJ2_7},{t:this.Vref5J2_12},{t:this.VdcJ2_6},{t:this.gndJ2_6},{t:this.VdcJ2_5},{t:this.gndJ2_5},{t:this.Vref5J2_11},{t:this.VdcJ2_4},{t:this.gndJ2_4},{t:this.Vref5J2_10},{t:this.Vref5J2_9},{t:this.VdcJ2_3},{t:this.gndJ2_3},{t:this.Vref5J2_8},{t:this.Vref5J2_7},{t:this.VdcJ2_2},{t:this.gndJ2_2},{t:this.Vref5J2_6},{t:this.Vref5J2_5},{t:this.VdcJ2_1},{t:this.gndJ2_1},{t:this.Vref5J2_4},{t:this.Vref5J2_3},{t:this.VdcJ2},{t:this.gndJ2},{t:this.Vref5J2_2},{t:this.Vref5J2_1},{t:this.Vref5J2}]},1).to({state:[{t:this.J1G_btn},{t:this.J1G0_btn},{t:this.VdcJ2_13},{t:this.gndJ2_15},{t:this.Vref5J2_19},{t:this.B1J3},{t:this.B2J3},{t:this.B3J3},{t:this.B4J3},{t:this.B5J3_1},{t:this.B5J3},{t:this.B7J3},{t:this.GNDJ3},{t:this.VdcJ3},{t:this.VdcJ2_12},{t:this.gndJ2_14},{t:this.Vref5J2_18},{t:this.VdcJ2_11},{t:this.gndJ2_13},{t:this.Vref5J2_17},{t:this.VdcJ2_10},{t:this.gndJ2_12},{t:this.Vref5J2_16},{t:this.gndJ2_11},{t:this.Vref5J2_15},{t:this.VdcJ2_9},{t:this.gndJ2_10},{t:this.Vref5J2_14},{t:this.VdcJ2_8},{t:this.gndJ2_9},{t:this.Vref5J2_13},{t:this.VdcJ2_7},{t:this.gndJ2_8},{t:this.gndJ2_7},{t:this.Vref5J2_12},{t:this.VdcJ2_6},{t:this.gndJ2_6},{t:this.VdcJ2_5},{t:this.gndJ2_5},{t:this.Vref5J2_11},{t:this.VdcJ2_4},{t:this.gndJ2_4},{t:this.Vref5J2_10},{t:this.Vref5J2_9},{t:this.VdcJ2_3},{t:this.gndJ2_3},{t:this.Vref5J2_8},{t:this.Vref5J2_7},{t:this.VdcJ2_2},{t:this.gndJ2_2},{t:this.Vref5J2_6},{t:this.Vref5J2_5},{t:this.VdcJ2_1},{t:this.gndJ2_1},{t:this.Vref5J2_4},{t:this.Vref5J2_3},{t:this.VdcJ2},{t:this.gndJ2},{t:this.Vref5J2_2},{t:this.Vref5J2_1},{t:this.Vref5J2}]},1).to({state:[{t:this.J1G_btn},{t:this.J1G0_btn},{t:this.VdcJ2_13},{t:this.gndJ2_15},{t:this.Vref5J2_19},{t:this.B1J3},{t:this.B2J3},{t:this.B3J3},{t:this.B4J3},{t:this.B5J3_1},{t:this.B5J3},{t:this.B7J3},{t:this.GNDJ3},{t:this.VdcJ3},{t:this.VdcJ2_12},{t:this.gndJ2_14},{t:this.Vref5J2_18},{t:this.VdcJ2_11},{t:this.gndJ2_13},{t:this.Vref5J2_17},{t:this.VdcJ2_10},{t:this.gndJ2_12},{t:this.Vref5J2_16},{t:this.gndJ2_11},{t:this.Vref5J2_15},{t:this.VdcJ2_9},{t:this.gndJ2_10},{t:this.Vref5J2_14},{t:this.VdcJ2_8},{t:this.gndJ2_9},{t:this.Vref5J2_13},{t:this.VdcJ2_7},{t:this.gndJ2_8},{t:this.gndJ2_7},{t:this.Vref5J2_12},{t:this.VdcJ2_6},{t:this.gndJ2_6},{t:this.VdcJ2_5},{t:this.gndJ2_5},{t:this.Vref5J2_11},{t:this.VdcJ2_4},{t:this.gndJ2_4},{t:this.Vref5J2_10},{t:this.Vref5J2_9},{t:this.VdcJ2_3},{t:this.gndJ2_3},{t:this.Vref5J2_8},{t:this.Vref5J2_7},{t:this.VdcJ2_2},{t:this.gndJ2_2},{t:this.Vref5J2_6},{t:this.Vref5J2_5},{t:this.VdcJ2_1},{t:this.gndJ2_1},{t:this.Vref5J2_4},{t:this.Vref5J2_3},{t:this.VdcJ2},{t:this.gndJ2},{t:this.Vref5J2_2},{t:this.Vref5J2_1},{t:this.Vref5J2}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_capa_display = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// capa_display
	this.capa_display_mc = new lib.capa_display_mc();
	this.capa_display_mc.name = "capa_display_mc";
	this.capa_display_mc.setTransform(1767,420);

	this.timeline.addTween(cjs.Tween.get(this.capa_display_mc).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_botão_off = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// botão_off
	this.botao_off_btn = new lib.botao_off_btn();
	this.botao_off_btn.name = "botao_off_btn";
	this.botao_off_btn.setTransform(61.5,115);
	new cjs.ButtonHelper(this.botao_off_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.botao_off_btn).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_botoes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// botoes
	this.menu_avarias_btn = new lib.menu_avarias_btn();
	this.menu_avarias_btn.name = "menu_avarias_btn";
	this.menu_avarias_btn.setTransform(1676.2,862.5);
	this.menu_avarias_btn.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_1 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_1.name = "menu_avarias_btn_1";
	this.menu_avarias_btn_1.setTransform(1676.2,810);
	this.menu_avarias_btn_1.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_1, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_2 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_2.name = "menu_avarias_btn_2";
	this.menu_avarias_btn_2.setTransform(1676.2,758);
	this.menu_avarias_btn_2.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_2, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_3 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_3.name = "menu_avarias_btn_3";
	this.menu_avarias_btn_3.setTransform(1676.2,706);
	this.menu_avarias_btn_3.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_3, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_4 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_4.name = "menu_avarias_btn_4";
	this.menu_avarias_btn_4.setTransform(1676.2,654.5);
	this.menu_avarias_btn_4.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_4, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_5 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_5.name = "menu_avarias_btn_5";
	this.menu_avarias_btn_5.setTransform(1676.2,602.5);
	this.menu_avarias_btn_5.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_5, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_6 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_6.name = "menu_avarias_btn_6";
	this.menu_avarias_btn_6.setTransform(1676.2,550.5);
	this.menu_avarias_btn_6.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_6, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_7 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_7.name = "menu_avarias_btn_7";
	this.menu_avarias_btn_7.setTransform(1676.2,498.5);
	this.menu_avarias_btn_7.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_7, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_8 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_8.name = "menu_avarias_btn_8";
	this.menu_avarias_btn_8.setTransform(1676.2,446.5);
	this.menu_avarias_btn_8.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_8, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_9 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_9.name = "menu_avarias_btn_9";
	this.menu_avarias_btn_9.setTransform(1676.2,394.5);
	this.menu_avarias_btn_9.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_9, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_10 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_10.name = "menu_avarias_btn_10";
	this.menu_avarias_btn_10.setTransform(1676.2,342.5);
	this.menu_avarias_btn_10.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_10, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_11 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_11.name = "menu_avarias_btn_11";
	this.menu_avarias_btn_11.setTransform(1676.2,290.5);
	this.menu_avarias_btn_11.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_11, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_12 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_12.name = "menu_avarias_btn_12";
	this.menu_avarias_btn_12.setTransform(1676.2,238.5);
	this.menu_avarias_btn_12.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_12, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_13 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_13.name = "menu_avarias_btn_13";
	this.menu_avarias_btn_13.setTransform(1676.2,186.5);
	this.menu_avarias_btn_13.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_13, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_14 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_14.name = "menu_avarias_btn_14";
	this.menu_avarias_btn_14.setTransform(1676.2,134.5);
	this.menu_avarias_btn_14.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_14, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_15 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_15.name = "menu_avarias_btn_15";
	this.menu_avarias_btn_15.setTransform(1676.2,82.5);
	this.menu_avarias_btn_15.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_15, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_16 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_16.name = "menu_avarias_btn_16";
	this.menu_avarias_btn_16.setTransform(1433.65,862.5);
	this.menu_avarias_btn_16.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_16, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_17 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_17.name = "menu_avarias_btn_17";
	this.menu_avarias_btn_17.setTransform(1433.65,810);
	this.menu_avarias_btn_17.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_17, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_18 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_18.name = "menu_avarias_btn_18";
	this.menu_avarias_btn_18.setTransform(1433.65,758);
	this.menu_avarias_btn_18.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_18, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_19 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_19.name = "menu_avarias_btn_19";
	this.menu_avarias_btn_19.setTransform(1433.65,706);
	this.menu_avarias_btn_19.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_19, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_20 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_20.name = "menu_avarias_btn_20";
	this.menu_avarias_btn_20.setTransform(1433.65,654.5);
	this.menu_avarias_btn_20.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_20, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_21 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_21.name = "menu_avarias_btn_21";
	this.menu_avarias_btn_21.setTransform(1433.65,602.5);
	this.menu_avarias_btn_21.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_21, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_22 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_22.name = "menu_avarias_btn_22";
	this.menu_avarias_btn_22.setTransform(1433.65,550.5);
	this.menu_avarias_btn_22.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_22, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_23 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_23.name = "menu_avarias_btn_23";
	this.menu_avarias_btn_23.setTransform(1433.65,498.5);
	this.menu_avarias_btn_23.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_23, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_24 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_24.name = "menu_avarias_btn_24";
	this.menu_avarias_btn_24.setTransform(1433.65,446.5);
	this.menu_avarias_btn_24.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_24, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_25 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_25.name = "menu_avarias_btn_25";
	this.menu_avarias_btn_25.setTransform(1433.65,394.5);
	this.menu_avarias_btn_25.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_25, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_26 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_26.name = "menu_avarias_btn_26";
	this.menu_avarias_btn_26.setTransform(1433.65,342.5);
	this.menu_avarias_btn_26.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_26, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_27 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_27.name = "menu_avarias_btn_27";
	this.menu_avarias_btn_27.setTransform(1433.65,290.5);
	this.menu_avarias_btn_27.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_27, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_28 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_28.name = "menu_avarias_btn_28";
	this.menu_avarias_btn_28.setTransform(1433.65,238.5);
	this.menu_avarias_btn_28.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_28, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_29 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_29.name = "menu_avarias_btn_29";
	this.menu_avarias_btn_29.setTransform(1433.65,186.5);
	this.menu_avarias_btn_29.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_29, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_30 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_30.name = "menu_avarias_btn_30";
	this.menu_avarias_btn_30.setTransform(1433.65,134.5);
	this.menu_avarias_btn_30.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_30, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_avarias_btn_31 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_31.name = "menu_avarias_btn_31";
	this.menu_avarias_btn_31.setTransform(1433.65,82.5);
	this.menu_avarias_btn_31.visible = false;
	new cjs.ButtonHelper(this.menu_avarias_btn_31, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_AL13b_btn = new lib.menu_AL13b_btn();
	this.menu_AL13b_btn.name = "menu_AL13b_btn";
	this.menu_AL13b_btn.setTransform(1191.1,862.5);
	this.menu_AL13b_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL13b_btn, 0, 1, 2, false, new lib.menu_AL13b_btn(), 3);

	this.menu_AL12c_btn = new lib.menu_AL12c_btn();
	this.menu_AL12c_btn.name = "menu_AL12c_btn";
	this.menu_AL12c_btn.setTransform(1191.1,810);
	this.menu_AL12c_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL12c_btn, 0, 1, 2, false, new lib.menu_AL12c_btn(), 3);

	this.menu_AL12b_btn = new lib.menu_AL12b_btn();
	this.menu_AL12b_btn.name = "menu_AL12b_btn";
	this.menu_AL12b_btn.setTransform(1191.1,758);
	this.menu_AL12b_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL12b_btn, 0, 1, 2, false, new lib.menu_AL12b_btn(), 3);

	this.menu_AL13a_btn = new lib.menu_AL13a_btn();
	this.menu_AL13a_btn.name = "menu_AL13a_btn";
	this.menu_AL13a_btn.setTransform(1191.1,706);
	this.menu_AL13a_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL13a_btn, 0, 1, 2, false, new lib.menu_AL13a_btn(), 3);

	this.menu_AL12a_btn = new lib.menu_AL12a_btn();
	this.menu_AL12a_btn.name = "menu_AL12a_btn";
	this.menu_AL12a_btn.setTransform(1191.1,654.5);
	this.menu_AL12a_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL12a_btn, 0, 1, 2, false, new lib.menu_AL12a_btn(), 3);

	this.menu_AL13_btn = new lib.menu_AL13_btn();
	this.menu_AL13_btn.name = "menu_AL13_btn";
	this.menu_AL13_btn.setTransform(1191.1,602.5);
	this.menu_AL13_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL13_btn, 0, 1, 2, false, new lib.menu_AL13_btn(), 3);

	this.menu_AL12_btn = new lib.menu_AL12_btn();
	this.menu_AL12_btn.name = "menu_AL12_btn";
	this.menu_AL12_btn.setTransform(1191.1,550.5);
	this.menu_AL12_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL12_btn, 0, 1, 2, false, new lib.menu_AL12_btn(), 3);

	this.menu_AL11_btn = new lib.menu_AL11_btn();
	this.menu_AL11_btn.name = "menu_AL11_btn";
	this.menu_AL11_btn.setTransform(1191.1,498.5);
	this.menu_AL11_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL11_btn, 0, 1, 2, false, new lib.menu_AL11_btn(), 3);

	this.menu_AL10_btn = new lib.menu_AL10_btn();
	this.menu_AL10_btn.name = "menu_AL10_btn";
	this.menu_AL10_btn.setTransform(1191.1,446.5);
	this.menu_AL10_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL10_btn, 0, 1, 2, false, new lib.menu_AL10_btn(), 3);

	this.menu_AL09_btn = new lib.menu_AL09_btn();
	this.menu_AL09_btn.name = "menu_AL09_btn";
	this.menu_AL09_btn.setTransform(1191.1,394.5);
	this.menu_AL09_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL09_btn, 0, 1, 2, false, new lib.menu_AL09_btn(), 3);

	this.menu_AL08_btn = new lib.menu_AL08_btn();
	this.menu_AL08_btn.name = "menu_AL08_btn";
	this.menu_AL08_btn.setTransform(1191.1,342.5);
	this.menu_AL08_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL08_btn, 0, 1, 2, false, new lib.menu_AL08_btn(), 3);

	this.menu_AL07_btn = new lib.menu_AL07_btn();
	this.menu_AL07_btn.name = "menu_AL07_btn";
	this.menu_AL07_btn.setTransform(1191.1,290.5);
	this.menu_AL07_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL07_btn, 0, 1, 2, false, new lib.menu_AL07_btn(), 3);

	this.menu_AL06a_btn = new lib.menu_AL06a_btn();
	this.menu_AL06a_btn.name = "menu_AL06a_btn";
	this.menu_AL06a_btn.setTransform(1191.1,238.5);
	this.menu_AL06a_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL06a_btn, 0, 1, 2, false, new lib.menu_AL06a_btn(), 3);

	this.menu_AL05a_btn = new lib.menu_AL05a_btn();
	this.menu_AL05a_btn.name = "menu_AL05a_btn";
	this.menu_AL05a_btn.setTransform(1191.1,186.5);
	this.menu_AL05a_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL05a_btn, 0, 1, 2, false, new lib.menu_AL05a_btn(), 3);

	this.menu_AL06_btn = new lib.menu_AL06_btn();
	this.menu_AL06_btn.name = "menu_AL06_btn";
	this.menu_AL06_btn.setTransform(1191.1,134.5);
	this.menu_AL06_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL06_btn, 0, 1, 2, false, new lib.menu_AL06_btn(), 3);

	this.menu_AL05_btn = new lib.menu_AL05_btn();
	this.menu_AL05_btn.name = "menu_AL05_btn";
	this.menu_AL05_btn.setTransform(1191.1,82.5);
	this.menu_AL05_btn.visible = false;
	new cjs.ButtonHelper(this.menu_AL05_btn, 0, 1, 2, false, new lib.menu_AL05_btn(), 3);

	this.menu_ajuda_btn = new lib.menu_ajuda_btn();
	this.menu_ajuda_btn.name = "menu_ajuda_btn";
	this.menu_ajuda_btn.setTransform(1918.35,31);
	new cjs.ButtonHelper(this.menu_ajuda_btn, 0, 1, 2, false, new lib.menu_ajuda_btn(), 3);

	this.potencia_btn = new lib.potencia_btn();
	this.potencia_btn.name = "potencia_btn";
	this.potencia_btn.setTransform(949.35,186.6);
	this.potencia_btn.visible = false;
	new cjs.ButtonHelper(this.potencia_btn, 0, 1, 2, false, new lib.potencia_btn(), 3);

	this.controle_btn = new lib.controle_btn();
	this.controle_btn.name = "controle_btn";
	this.controle_btn.setTransform(949.35,134.6);
	this.controle_btn.visible = false;
	new cjs.ButtonHelper(this.controle_btn, 0, 1, 2, false, new lib.controle_btn(), 3);

	this.frigorifico_btn = new lib.frigorifico_btn();
	this.frigorifico_btn.name = "frigorifico_btn";
	this.frigorifico_btn.setTransform(949.35,82.6);
	this.frigorifico_btn.visible = false;
	new cjs.ButtonHelper(this.frigorifico_btn, 0, 1, 2, false, new lib.frigorifico_btn(), 3);

	this.menu_entradas_saidas_btn = new lib.menu_entradas_saidas_btn();
	this.menu_entradas_saidas_btn.name = "menu_entradas_saidas_btn";
	this.menu_entradas_saidas_btn.setTransform(464.7,187);
	this.menu_entradas_saidas_btn.visible = false;
	new cjs.ButtonHelper(this.menu_entradas_saidas_btn, 0, 1, 2, false, new lib.menu_entradas_saidas_btn(), 3);

	this.menu_valores_medidas_btn = new lib.menu_valores_medidas_btn();
	this.menu_valores_medidas_btn.name = "menu_valores_medidas_btn";
	this.menu_valores_medidas_btn.setTransform(464.7,134.5);
	this.menu_valores_medidas_btn.visible = false;
	new cjs.ButtonHelper(this.menu_valores_medidas_btn, 0, 1, 2, false, new lib.menu_valores_medidas_btn(), 3);

	this.menu_setpoint_btn = new lib.menu_setpoint_btn();
	this.menu_setpoint_btn.name = "menu_setpoint_btn";
	this.menu_setpoint_btn.setTransform(464.7,82.5);
	this.menu_setpoint_btn.visible = false;
	new cjs.ButtonHelper(this.menu_setpoint_btn, 0, 1, 2, false, new lib.menu_setpoint_btn(), 3);

	this.menu_avarias_btn_32 = new lib.menu_avarias_btn();
	this.menu_avarias_btn_32.name = "menu_avarias_btn_32";
	this.menu_avarias_btn_32.setTransform(1191.1,31);
	new cjs.ButtonHelper(this.menu_avarias_btn_32, 0, 1, 2, false, new lib.menu_avarias_btn(), 3);

	this.menu_circuitos_btn = new lib.menu_circuitos_btn();
	this.menu_circuitos_btn.name = "menu_circuitos_btn";
	this.menu_circuitos_btn.setTransform(948.75,31);
	new cjs.ButtonHelper(this.menu_circuitos_btn, 0, 1, 2, false, new lib.menu_circuitos_btn(), 3);

	this.continuar_btn = new lib.continuar_btn();
	this.continuar_btn.name = "continuar_btn";
	this.continuar_btn.setTransform(1365.55,926.25);
	this.continuar_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.continuar_btn, 0, 1, 2, false, new lib.continuar_btn(), 3);

	this.placa_electronica_electrica_btn = new lib.placa_electronica_electrica_btn();
	this.placa_electronica_electrica_btn.name = "placa_electronica_electrica_btn";
	this.placa_electronica_electrica_btn.setTransform(264,1017);
	this.placa_electronica_electrica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.placa_electronica_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.placa_electronica_electrica_btn, 0, 1, 2, false, new lib.placa_electronica_electrica_btn(), 3);

	this.placa_electronica_mecanica_btn = new lib.placa_electronica_mecanica_btn();
	this.placa_electronica_mecanica_btn.name = "placa_electronica_mecanica_btn";
	this.placa_electronica_mecanica_btn.setTransform(164,1017);
	this.placa_electronica_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.placa_electronica_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.placa_electronica_mecanica_btn, 0, 1, 2, false, new lib.placa_electronica_mecanica_btn(), 3);

	this.placa_electronica_btn = new lib.placa_electronica_btn();
	this.placa_electronica_btn.name = "placa_electronica_btn";
	this.placa_electronica_btn.setTransform(63.3,1016.8);
	this.placa_electronica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.placa_electronica_btn, 0, 1, 2, false, new lib.placa_electronica_btn(), 3);

	this.pda_electrica_btn = new lib.pda_electricidade_btn();
	this.pda_electrica_btn.name = "pda_electrica_btn";
	this.pda_electrica_btn.setTransform(264,917);
	this.pda_electrica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.pda_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.pda_electrica_btn, 0, 1, 1);

	this.pda_mecanica_btn = new lib.pda_mecanica_btn();
	this.pda_mecanica_btn.name = "pda_mecanica_btn";
	this.pda_mecanica_btn.setTransform(164,917);
	this.pda_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.pda_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.pda_mecanica_btn, 0, 1, 1);

	this.pda_btn = new lib.pda_btn();
	this.pda_btn.name = "pda_btn";
	this.pda_btn.setTransform(63.3,916.8);
	this.pda_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.pda_btn, 0, 1, 2, false, new lib.pda_btn(), 3);

	this.pressostato_electrica_btn = new lib.pressostato_electrica_btn();
	this.pressostato_electrica_btn.name = "pressostato_electrica_btn";
	this.pressostato_electrica_btn.setTransform(264,817);
	this.pressostato_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.pressostato_electrica_btn, 0, 1, 1);

	this.pressostato_mecanica_btn = new lib.pressostato_mecanica_btn();
	this.pressostato_mecanica_btn.name = "pressostato_mecanica_btn";
	this.pressostato_mecanica_btn.setTransform(164,817);
	this.pressostato_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.pressostato_mecanica_btn, 0, 1, 1);

	this.pressostato_btn = new lib.pressostato_btn();
	this.pressostato_btn.name = "pressostato_btn";
	this.pressostato_btn.setTransform(63.3,816.8);
	this.pressostato_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.pressostato_btn, 0, 1, 2, false, new lib.pressostato_btn(), 3);

	this.transductor_electrica_btn = new lib.transductor_electrica_btn();
	this.transductor_electrica_btn.name = "transductor_electrica_btn";
	this.transductor_electrica_btn.setTransform(264,717);
	this.transductor_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.transductor_electrica_btn, 0, 1, 2, false, new lib.transductor_electrica_btn(), 3);

	this.transductor_mecanica_btn = new lib.transductor_mecanica_btn();
	this.transductor_mecanica_btn.name = "transductor_mecanica_btn";
	this.transductor_mecanica_btn.setTransform(164,717);
	this.transductor_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.transductor_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.transductor_mecanica_btn, 0, 1, 1);

	this.transductor_btn = new lib.transductor_btn();
	this.transductor_btn.name = "transductor_btn";
	this.transductor_btn.setTransform(63.3,716.8);
	this.transductor_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.transductor_btn, 0, 1, 2, false, new lib.transductor_btn(), 3);

	this.ventilador_axial_electrica_btn = new lib.ventilador_axial_electrica_btn();
	this.ventilador_axial_electrica_btn.name = "ventilador_axial_electrica_btn";
	this.ventilador_axial_electrica_btn.setTransform(264,617);
	this.ventilador_axial_electrica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.ventilador_axial_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.ventilador_axial_electrica_btn, 0, 1, 1);

	this.ventilador_axial_mecanica_btn = new lib.ventilador_axial_mecanica_btn();
	this.ventilador_axial_mecanica_btn.name = "ventilador_axial_mecanica_btn";
	this.ventilador_axial_mecanica_btn.setTransform(164,617);
	this.ventilador_axial_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.ventilador_axial_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.ventilador_axial_mecanica_btn, 0, 1, 1);

	this.ventilador_axial_btn = new lib.ventilador_axial_btn();
	this.ventilador_axial_btn.name = "ventilador_axial_btn";
	this.ventilador_axial_btn.setTransform(63.3,616.8);
	this.ventilador_axial_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.ventilador_axial_btn, 0, 1, 2, false, new lib.ventilador_axial_btn(), 3);

	this.sensor_electrica_btn = new lib.sensor_electrica_btn();
	this.sensor_electrica_btn.name = "sensor_electrica_btn";
	this.sensor_electrica_btn.setTransform(264,517);
	this.sensor_electrica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.sensor_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.sensor_electrica_btn, 0, 1, 2, false, new lib.sensor_electrica_btn(), 3);

	this.sensor_mecanica_btn = new lib.sensor_mecanica_btn();
	this.sensor_mecanica_btn.name = "sensor_mecanica_btn";
	this.sensor_mecanica_btn.setTransform(164,517);
	this.sensor_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.sensor_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.sensor_mecanica_btn, 0, 1, 2, false, new lib.sensor_mecanica_btn(), 3);

	this.sensor_btn = new lib.sensor_btn();
	this.sensor_btn.name = "sensor_btn";
	this.sensor_btn.setTransform(63.3,516.8);
	this.sensor_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.sensor_btn, 0, 1, 2, false, new lib.sensor_btn(), 3);

	this.ventilador_radial_electricidade_btn = new lib.ventilador_radial_electrica_btn();
	this.ventilador_radial_electricidade_btn.name = "ventilador_radial_electricidade_btn";
	this.ventilador_radial_electricidade_btn.setTransform(264,417);
	this.ventilador_radial_electricidade_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.ventilador_radial_electricidade_btn.visible = false;
	new cjs.ButtonHelper(this.ventilador_radial_electricidade_btn, 0, 1, 2, false, new lib.ventilador_radial_electrica_btn(), 3);

	this.ventilador_radial_mecanica_btn = new lib.ventilador_radial_mecanica_btn();
	this.ventilador_radial_mecanica_btn.name = "ventilador_radial_mecanica_btn";
	this.ventilador_radial_mecanica_btn.setTransform(164,417);
	this.ventilador_radial_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.ventilador_radial_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.ventilador_radial_mecanica_btn, 0, 1, 2, false, new lib.ventilador_radial_mecanica_btn(), 3);

	this.ventilador_radial_btn = new lib.ventilador_radial_btn();
	this.ventilador_radial_btn.name = "ventilador_radial_btn";
	this.ventilador_radial_btn.setTransform(63.3,416.8);
	this.ventilador_radial_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.ventilador_radial_btn, 0, 1, 2, false, new lib.ventilador_radial_btn(), 3);

	this.vex_electrica_btn = new lib.vex_electrica_btn();
	this.vex_electrica_btn.name = "vex_electrica_btn";
	this.vex_electrica_btn.setTransform(264,317);
	this.vex_electrica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.vex_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.vex_electrica_btn, 0, 1, 2, false, new lib.vex_electrica_btn(), 3);

	this.vex_mecanica_btn = new lib.vex_mecanica_btn();
	this.vex_mecanica_btn.name = "vex_mecanica_btn";
	this.vex_mecanica_btn.setTransform(164,317);
	this.vex_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.vex_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.vex_mecanica_btn, 0, 1, 2, false, new lib.vex_mecanica_btn(), 3);

	this.vex_btn = new lib.vex_btn();
	this.vex_btn.name = "vex_btn";
	this.vex_btn.setTransform(63.3,316.8);
	this.vex_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.vex_btn, 0, 1, 2, false, new lib.vex_btn(), 3);

	this.compressor_electrica_btn = new lib.compressor_electricidade_btn();
	this.compressor_electrica_btn.name = "compressor_electrica_btn";
	this.compressor_electrica_btn.setTransform(264,217);
	this.compressor_electrica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.compressor_electrica_btn.visible = false;
	new cjs.ButtonHelper(this.compressor_electrica_btn, 0, 1, 2, false, new lib.compressor_electricidade_btn(), 3);

	this.compressor_mecanica_btn = new lib.compressor_mecanica_btn();
	this.compressor_mecanica_btn.name = "compressor_mecanica_btn";
	this.compressor_mecanica_btn.setTransform(164,217);
	this.compressor_mecanica_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	this.compressor_mecanica_btn.visible = false;
	new cjs.ButtonHelper(this.compressor_mecanica_btn, 0, 1, 2, false, new lib.compressor_mecanica_btn(), 3);

	this.compressor_btn = new lib.compressor_btn();
	this.compressor_btn.name = "compressor_btn";
	this.compressor_btn.setTransform(63.3,216.8);
	this.compressor_btn.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,2);
	new cjs.ButtonHelper(this.compressor_btn, 0, 1, 2, false, new lib.compressor_btn(), 3);

	this.menu_avarias_electronicas_btn = new lib.menu_avarias_electronicas_btn();
	this.menu_avarias_electronicas_btn.name = "menu_avarias_electronicas_btn";
	this.menu_avarias_electronicas_btn.setTransform(1676.35,31);
	new cjs.ButtonHelper(this.menu_avarias_electronicas_btn, 0, 1, 2, false, new lib.menu_avarias_electronicas_btn(), 3);

	this.menu_multimetro_btn = new lib.menu_multimetro_btn();
	this.menu_multimetro_btn.name = "menu_multimetro_btn";
	this.menu_multimetro_btn.setTransform(706.7,31);
	new cjs.ButtonHelper(this.menu_multimetro_btn, 0, 1, 2, false, new lib.menu_multimetro_btn(), 3);

	this.menu_controle_remoto_btn = new lib.menu_controle_remoto_btn();
	this.menu_controle_remoto_btn.name = "menu_controle_remoto_btn";
	this.menu_controle_remoto_btn.setTransform(464.7,31);
	new cjs.ButtonHelper(this.menu_controle_remoto_btn, 0, 1, 2, false, new lib.menu_controle_remoto_btn(), 3);

	this.menu_avarias_electricas = new lib.menu_avarias_electricas();
	this.menu_avarias_electricas.name = "menu_avarias_electricas";
	this.menu_avarias_electricas.setTransform(1433.35,31,0.9998,1,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.menu_avarias_electricas, 0, 1, 2, false, new lib.menu_avarias_electricas(), 3);

	this.instance = new lib.fundodeaçoinoxidáveldaplacadometal2();
	this.instance.setTransform(14,67);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("A5NMiIAAvTIPUAAIAAPTgA6DktIAAnzMA0HAAAIAAHzg");
	this.shape.setTransform(175.75,86.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance},{t:this.menu_avarias_electricas,p:{regX:0.1,scaleX:0.9998,x:1433.35}},{t:this.menu_controle_remoto_btn},{t:this.menu_multimetro_btn},{t:this.menu_avarias_electronicas_btn,p:{x:1676.35}},{t:this.compressor_btn},{t:this.compressor_mecanica_btn},{t:this.compressor_electrica_btn},{t:this.vex_btn},{t:this.vex_mecanica_btn},{t:this.vex_electrica_btn},{t:this.ventilador_radial_btn},{t:this.ventilador_radial_mecanica_btn},{t:this.ventilador_radial_electricidade_btn},{t:this.sensor_btn},{t:this.sensor_mecanica_btn},{t:this.sensor_electrica_btn},{t:this.ventilador_axial_btn},{t:this.ventilador_axial_mecanica_btn},{t:this.ventilador_axial_electrica_btn},{t:this.transductor_btn},{t:this.transductor_mecanica_btn},{t:this.transductor_electrica_btn},{t:this.pressostato_btn},{t:this.pressostato_mecanica_btn},{t:this.pressostato_electrica_btn},{t:this.pda_btn},{t:this.pda_mecanica_btn},{t:this.pda_electrica_btn},{t:this.placa_electronica_btn},{t:this.placa_electronica_mecanica_btn},{t:this.placa_electronica_electrica_btn},{t:this.continuar_btn},{t:this.menu_circuitos_btn},{t:this.menu_avarias_btn_32},{t:this.menu_setpoint_btn},{t:this.menu_valores_medidas_btn},{t:this.menu_entradas_saidas_btn},{t:this.frigorifico_btn},{t:this.controle_btn},{t:this.potencia_btn},{t:this.menu_ajuda_btn,p:{x:1918.35}},{t:this.menu_AL05_btn},{t:this.menu_AL06_btn},{t:this.menu_AL05a_btn},{t:this.menu_AL06a_btn},{t:this.menu_AL07_btn},{t:this.menu_AL08_btn},{t:this.menu_AL09_btn},{t:this.menu_AL10_btn},{t:this.menu_AL11_btn},{t:this.menu_AL12_btn},{t:this.menu_AL13_btn},{t:this.menu_AL12a_btn},{t:this.menu_AL13a_btn},{t:this.menu_AL12b_btn},{t:this.menu_AL12c_btn},{t:this.menu_AL13b_btn},{t:this.menu_avarias_btn_31},{t:this.menu_avarias_btn_30},{t:this.menu_avarias_btn_29},{t:this.menu_avarias_btn_28},{t:this.menu_avarias_btn_27},{t:this.menu_avarias_btn_26},{t:this.menu_avarias_btn_25},{t:this.menu_avarias_btn_24},{t:this.menu_avarias_btn_23},{t:this.menu_avarias_btn_22},{t:this.menu_avarias_btn_21},{t:this.menu_avarias_btn_20},{t:this.menu_avarias_btn_19},{t:this.menu_avarias_btn_18},{t:this.menu_avarias_btn_17},{t:this.menu_avarias_btn_16},{t:this.menu_avarias_btn_15},{t:this.menu_avarias_btn_14},{t:this.menu_avarias_btn_13},{t:this.menu_avarias_btn_12},{t:this.menu_avarias_btn_11},{t:this.menu_avarias_btn_10},{t:this.menu_avarias_btn_9},{t:this.menu_avarias_btn_8},{t:this.menu_avarias_btn_7},{t:this.menu_avarias_btn_6},{t:this.menu_avarias_btn_5},{t:this.menu_avarias_btn_4},{t:this.menu_avarias_btn_3},{t:this.menu_avarias_btn_2},{t:this.menu_avarias_btn_1},{t:this.menu_avarias_btn,p:{x:1676.2,y:862.5,visible:false}}]}).to({state:[{t:this.shape},{t:this.instance},{t:this.menu_avarias_electricas,p:{regX:0,scaleX:1,x:1433.45}},{t:this.menu_controle_remoto_btn},{t:this.menu_multimetro_btn},{t:this.menu_avarias_electronicas_btn,p:{x:1675.45}},{t:this.compressor_btn},{t:this.compressor_mecanica_btn},{t:this.compressor_electrica_btn},{t:this.vex_btn},{t:this.vex_mecanica_btn},{t:this.vex_electrica_btn},{t:this.ventilador_radial_btn},{t:this.ventilador_radial_mecanica_btn},{t:this.ventilador_radial_electricidade_btn},{t:this.sensor_btn},{t:this.sensor_mecanica_btn},{t:this.sensor_electrica_btn},{t:this.ventilador_axial_btn},{t:this.ventilador_axial_mecanica_btn},{t:this.ventilador_axial_electrica_btn},{t:this.transductor_btn},{t:this.transductor_mecanica_btn},{t:this.transductor_electrica_btn},{t:this.pressostato_btn},{t:this.pressostato_mecanica_btn},{t:this.pressostato_electrica_btn},{t:this.pda_btn},{t:this.pda_mecanica_btn},{t:this.pda_electrica_btn},{t:this.placa_electronica_btn},{t:this.placa_electronica_mecanica_btn},{t:this.placa_electronica_electrica_btn},{t:this.menu_circuitos_btn},{t:this.frigorifico_btn},{t:this.controle_btn},{t:this.potencia_btn},{t:this.menu_avarias_btn,p:{x:1191.1,y:31,visible:true}},{t:this.menu_setpoint_btn},{t:this.menu_valores_medidas_btn},{t:this.menu_entradas_saidas_btn},{t:this.menu_ajuda_btn,p:{x:1917.45}},{t:this.menu_AL05_btn},{t:this.menu_AL06_btn},{t:this.menu_AL05a_btn},{t:this.menu_AL06a_btn},{t:this.menu_AL07_btn},{t:this.menu_AL08_btn},{t:this.menu_AL09_btn},{t:this.menu_AL10_btn},{t:this.menu_AL11_btn},{t:this.menu_AL12_btn},{t:this.menu_AL13_btn},{t:this.menu_AL12a_btn},{t:this.menu_AL13a_btn},{t:this.menu_AL12b_btn},{t:this.menu_AL12c_btn},{t:this.menu_AL13b_btn}]},1).to({state:[{t:this.shape},{t:this.instance},{t:this.menu_avarias_electricas,p:{regX:0,scaleX:1,x:1433.45}},{t:this.menu_controle_remoto_btn},{t:this.menu_multimetro_btn},{t:this.menu_avarias_electronicas_btn,p:{x:1675.45}},{t:this.compressor_btn},{t:this.compressor_mecanica_btn},{t:this.compressor_electrica_btn},{t:this.vex_btn},{t:this.vex_mecanica_btn},{t:this.vex_electrica_btn},{t:this.ventilador_radial_btn},{t:this.ventilador_radial_mecanica_btn},{t:this.ventilador_radial_electricidade_btn},{t:this.sensor_btn},{t:this.sensor_mecanica_btn},{t:this.sensor_electrica_btn},{t:this.ventilador_axial_btn},{t:this.ventilador_axial_mecanica_btn},{t:this.ventilador_axial_electrica_btn},{t:this.transductor_btn},{t:this.transductor_mecanica_btn},{t:this.transductor_electrica_btn},{t:this.pressostato_btn},{t:this.pressostato_mecanica_btn},{t:this.pressostato_electrica_btn},{t:this.pda_btn},{t:this.pda_mecanica_btn},{t:this.pda_electrica_btn},{t:this.placa_electronica_btn},{t:this.placa_electronica_mecanica_btn},{t:this.placa_electronica_electrica_btn},{t:this.menu_circuitos_btn},{t:this.frigorifico_btn},{t:this.controle_btn},{t:this.potencia_btn},{t:this.menu_avarias_btn,p:{x:1191.1,y:31,visible:true}},{t:this.menu_setpoint_btn},{t:this.menu_valores_medidas_btn},{t:this.menu_entradas_saidas_btn},{t:this.menu_ajuda_btn,p:{x:1917.45}},{t:this.menu_AL05_btn},{t:this.menu_AL06_btn},{t:this.menu_AL05a_btn},{t:this.menu_AL06a_btn},{t:this.menu_AL07_btn},{t:this.menu_AL08_btn},{t:this.menu_AL09_btn},{t:this.menu_AL10_btn},{t:this.menu_AL11_btn},{t:this.menu_AL12_btn},{t:this.menu_AL13_btn},{t:this.menu_AL12a_btn},{t:this.menu_AL13a_btn},{t:this.menu_AL12b_btn},{t:this.menu_AL12c_btn},{t:this.menu_AL13b_btn}]},1).to({state:[{t:this.shape},{t:this.instance},{t:this.menu_avarias_electricas,p:{regX:0,scaleX:1,x:1433.45}},{t:this.menu_controle_remoto_btn},{t:this.menu_multimetro_btn},{t:this.menu_avarias_electronicas_btn,p:{x:1675.45}},{t:this.compressor_btn},{t:this.compressor_mecanica_btn},{t:this.compressor_electrica_btn},{t:this.vex_btn},{t:this.vex_mecanica_btn},{t:this.vex_electrica_btn},{t:this.ventilador_radial_btn},{t:this.ventilador_radial_mecanica_btn},{t:this.ventilador_radial_electricidade_btn},{t:this.sensor_btn},{t:this.sensor_mecanica_btn},{t:this.sensor_electrica_btn},{t:this.ventilador_axial_btn},{t:this.ventilador_axial_mecanica_btn},{t:this.ventilador_axial_electrica_btn},{t:this.transductor_btn},{t:this.transductor_mecanica_btn},{t:this.transductor_electrica_btn},{t:this.pressostato_btn},{t:this.pressostato_mecanica_btn},{t:this.pressostato_electrica_btn},{t:this.pda_btn},{t:this.pda_mecanica_btn},{t:this.pda_electrica_btn},{t:this.placa_electronica_btn},{t:this.placa_electronica_mecanica_btn},{t:this.placa_electronica_electrica_btn},{t:this.menu_circuitos_btn},{t:this.frigorifico_btn},{t:this.controle_btn},{t:this.potencia_btn},{t:this.menu_avarias_btn,p:{x:1191.1,y:31,visible:true}},{t:this.menu_setpoint_btn},{t:this.menu_valores_medidas_btn},{t:this.menu_entradas_saidas_btn},{t:this.menu_ajuda_btn,p:{x:1917.45}},{t:this.menu_AL05_btn},{t:this.menu_AL06_btn},{t:this.menu_AL05a_btn},{t:this.menu_AL06a_btn},{t:this.menu_AL07_btn},{t:this.menu_AL08_btn},{t:this.menu_AL09_btn},{t:this.menu_AL10_btn},{t:this.menu_AL11_btn},{t:this.menu_AL12_btn},{t:this.menu_AL13_btn},{t:this.menu_AL12a_btn},{t:this.menu_AL13a_btn},{t:this.menu_AL12b_btn},{t:this.menu_AL12c_btn},{t:this.menu_AL13b_btn}]},1).to({state:[{t:this.shape},{t:this.instance},{t:this.menu_avarias_electricas,p:{regX:0,scaleX:1,x:1433.45}},{t:this.menu_controle_remoto_btn},{t:this.menu_multimetro_btn},{t:this.menu_avarias_electronicas_btn,p:{x:1675.45}},{t:this.compressor_btn},{t:this.compressor_mecanica_btn},{t:this.compressor_electrica_btn},{t:this.vex_btn},{t:this.vex_mecanica_btn},{t:this.vex_electrica_btn},{t:this.ventilador_radial_btn},{t:this.ventilador_radial_mecanica_btn},{t:this.ventilador_radial_electricidade_btn},{t:this.sensor_btn},{t:this.sensor_mecanica_btn},{t:this.sensor_electrica_btn},{t:this.ventilador_axial_btn},{t:this.ventilador_axial_mecanica_btn},{t:this.ventilador_axial_electrica_btn},{t:this.transductor_btn},{t:this.transductor_mecanica_btn},{t:this.transductor_electrica_btn},{t:this.pressostato_btn},{t:this.pressostato_mecanica_btn},{t:this.pressostato_electrica_btn},{t:this.pda_btn},{t:this.pda_mecanica_btn},{t:this.pda_electrica_btn},{t:this.placa_electronica_btn},{t:this.placa_electronica_mecanica_btn},{t:this.placa_electronica_electrica_btn},{t:this.menu_circuitos_btn},{t:this.frigorifico_btn},{t:this.controle_btn},{t:this.potencia_btn},{t:this.menu_avarias_btn,p:{x:1191.1,y:31,visible:true}},{t:this.menu_setpoint_btn},{t:this.menu_valores_medidas_btn},{t:this.menu_entradas_saidas_btn},{t:this.menu_ajuda_btn,p:{x:1917.45}},{t:this.menu_AL05_btn},{t:this.menu_AL06_btn},{t:this.menu_AL05a_btn},{t:this.menu_AL06a_btn},{t:this.menu_AL07_btn},{t:this.menu_AL08_btn},{t:this.menu_AL09_btn},{t:this.menu_AL10_btn},{t:this.menu_AL11_btn},{t:this.menu_AL12_btn},{t:this.menu_AL13_btn},{t:this.menu_AL12a_btn},{t:this.menu_AL13a_btn},{t:this.menu_AL12b_btn},{t:this.menu_AL12c_btn},{t:this.menu_AL13b_btn}]},1).to({state:[{t:this.shape},{t:this.instance},{t:this.menu_avarias_electricas,p:{regX:0,scaleX:1,x:1433.45}},{t:this.menu_controle_remoto_btn},{t:this.menu_multimetro_btn},{t:this.menu_avarias_electronicas_btn,p:{x:1675.45}},{t:this.compressor_btn},{t:this.compressor_mecanica_btn},{t:this.compressor_electrica_btn},{t:this.vex_btn},{t:this.vex_mecanica_btn},{t:this.vex_electrica_btn},{t:this.ventilador_radial_btn},{t:this.ventilador_radial_mecanica_btn},{t:this.ventilador_radial_electricidade_btn},{t:this.sensor_btn},{t:this.sensor_mecanica_btn},{t:this.sensor_electrica_btn},{t:this.ventilador_axial_btn},{t:this.ventilador_axial_mecanica_btn},{t:this.ventilador_axial_electrica_btn},{t:this.transductor_btn},{t:this.transductor_mecanica_btn},{t:this.transductor_electrica_btn},{t:this.pressostato_btn},{t:this.pressostato_mecanica_btn},{t:this.pressostato_electrica_btn},{t:this.pda_btn},{t:this.pda_mecanica_btn},{t:this.pda_electrica_btn},{t:this.placa_electronica_btn},{t:this.placa_electronica_mecanica_btn},{t:this.placa_electronica_electrica_btn},{t:this.menu_circuitos_btn},{t:this.frigorifico_btn},{t:this.controle_btn},{t:this.potencia_btn},{t:this.menu_avarias_btn,p:{x:1191.1,y:31,visible:true}},{t:this.menu_setpoint_btn},{t:this.menu_valores_medidas_btn},{t:this.menu_entradas_saidas_btn},{t:this.menu_ajuda_btn,p:{x:1917.45}},{t:this.menu_AL05_btn},{t:this.menu_AL06_btn},{t:this.menu_AL05a_btn},{t:this.menu_AL06a_btn},{t:this.menu_AL07_btn},{t:this.menu_AL08_btn},{t:this.menu_AL09_btn},{t:this.menu_AL10_btn},{t:this.menu_AL11_btn},{t:this.menu_AL12_btn},{t:this.menu_AL13_btn},{t:this.menu_AL12a_btn},{t:this.menu_AL13a_btn},{t:this.menu_AL12b_btn},{t:this.menu_AL12c_btn},{t:this.menu_AL13b_btn}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_botao_on = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// botao_on
	this.botao_on_btn = new lib.botao_on_btn();
	this.botao_on_btn.name = "botao_on_btn";
	this.botao_on_btn.setTransform(61.5,115);
	new cjs.ButtonHelper(this.botao_on_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.botao_on_btn).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.SimuladorRooftopCiatRPFJunho1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2,3,4,5];
	this.streamSoundSymbolsList[0] = [{id:"SomBotao",startFrame:0,endFrame:1,loop:1,offset:0}];
	this.streamSoundSymbolsList[1] = [{id:"SomBotao",startFrame:1,endFrame:2,loop:1,offset:0}];
	this.streamSoundSymbolsList[2] = [{id:"SomBotao",startFrame:2,endFrame:3,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("SomBotao",0);
		this.InsertIntoSoundStreamData(soundInstance,0,1,1);
		this.logo_dois_mc = this.logo.logo_dois_mc;
		this.botao_off_btn = this.botão_off.botao_off_btn;
		this.botao_on_btn = this.botao_on.botao_on_btn;
		this.menu_avarias_electricas = this.botoes.menu_avarias_electricas;
		this.menu_controle_remoto_btn = this.botoes.menu_controle_remoto_btn;
		this.menu_multimetro_btn = this.botoes.menu_multimetro_btn;
		this.menu_avarias_electronicas_btn = this.botoes.menu_avarias_electronicas_btn;
		this.compressor_btn = this.botoes.compressor_btn;
		this.compressor_mecanica_btn = this.botoes.compressor_mecanica_btn;
		this.compressor_electrica_btn = this.botoes.compressor_electrica_btn;
		this.vex_btn = this.botoes.vex_btn;
		this.vex_mecanica_btn = this.botoes.vex_mecanica_btn;
		this.vex_electrica_btn = this.botoes.vex_electrica_btn;
		this.ventilador_radial_btn = this.botoes.ventilador_radial_btn;
		this.ventilador_radial_mecanica_btn = this.botoes.ventilador_radial_mecanica_btn;
		this.ventilador_radial_electricidade_btn = this.botoes.ventilador_radial_electricidade_btn;
		this.sensor_btn = this.botoes.sensor_btn;
		this.sensor_mecanica_btn = this.botoes.sensor_mecanica_btn;
		this.sensor_electrica_btn = this.botoes.sensor_electrica_btn;
		this.ventilador_axial_btn = this.botoes.ventilador_axial_btn;
		this.ventilador_axial_mecanica_btn = this.botoes.ventilador_axial_mecanica_btn;
		this.ventilador_axial_electrica_btn = this.botoes.ventilador_axial_electrica_btn;
		this.transductor_btn = this.botoes.transductor_btn;
		this.transductor_mecanica_btn = this.botoes.transductor_mecanica_btn;
		this.transductor_electrica_btn = this.botoes.transductor_electrica_btn;
		this.pressostato_btn = this.botoes.pressostato_btn;
		this.pressostato_mecanica_btn = this.botoes.pressostato_mecanica_btn;
		this.pressostato_electrica_btn = this.botoes.pressostato_electrica_btn;
		this.pda_btn = this.botoes.pda_btn;
		this.pda_mecanica_btn = this.botoes.pda_mecanica_btn;
		this.pda_electrica_btn = this.botoes.pda_electrica_btn;
		this.placa_electronica_btn = this.botoes.placa_electronica_btn;
		this.placa_electronica_mecanica_btn = this.botoes.placa_electronica_mecanica_btn;
		this.placa_electronica_electrica_btn = this.botoes.placa_electronica_electrica_btn;
		this.continuar_btn = this.botoes.continuar_btn;
		this.menu_circuitos_btn = this.botoes.menu_circuitos_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_setpoint_btn = this.botoes.menu_setpoint_btn;
		this.menu_valores_medidas_btn = this.botoes.menu_valores_medidas_btn;
		this.menu_entradas_saidas_btn = this.botoes.menu_entradas_saidas_btn;
		this.frigorifico_btn = this.botoes.frigorifico_btn;
		this.controle_btn = this.botoes.controle_btn;
		this.potencia_btn = this.botoes.potencia_btn;
		this.menu_ajuda_btn = this.botoes.menu_ajuda_btn;
		this.menu_AL05_btn = this.botoes.menu_AL05_btn;
		this.menu_AL06_btn = this.botoes.menu_AL06_btn;
		this.menu_AL05a_btn = this.botoes.menu_AL05a_btn;
		this.menu_AL06a_btn = this.botoes.menu_AL06a_btn;
		this.menu_AL07_btn = this.botoes.menu_AL07_btn;
		this.menu_AL08_btn = this.botoes.menu_AL08_btn;
		this.menu_AL09_btn = this.botoes.menu_AL09_btn;
		this.menu_AL10_btn = this.botoes.menu_AL10_btn;
		this.menu_AL11_btn = this.botoes.menu_AL11_btn;
		this.menu_AL12_btn = this.botoes.menu_AL12_btn;
		this.menu_AL13_btn = this.botoes.menu_AL13_btn;
		this.menu_AL12a_btn = this.botoes.menu_AL12a_btn;
		this.menu_AL13a_btn = this.botoes.menu_AL13a_btn;
		this.menu_AL12b_btn = this.botoes.menu_AL12b_btn;
		this.menu_AL12c_btn = this.botoes.menu_AL12c_btn;
		this.menu_AL13b_btn = this.botoes.menu_AL13b_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.ponta_preta_final_mc = this.ponta_preta.ponta_preta_final_mc;
		this.ponta_preta_inicial_mc = this.ponta_preta.ponta_preta_inicial_mc;
		this.ponta_vermelha_inicial_mc = this.ponta_vermelha.ponta_vermelha_inicial_mc;
		this.ponta_vermelha_final_mc = this.ponta_vermelha.ponta_vermelha_final_mc;
		this.J1G_btn = this.contactos_placa.J1G_btn;
		this.J1G0_btn = this.contactos_placa.J1G0_btn;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.B1J3 = this.contactos_placa.B1J3;
		this.B2J3 = this.contactos_placa.B2J3;
		this.B3J3 = this.contactos_placa.B3J3;
		this.B4J3 = this.contactos_placa.B4J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B7J3 = this.contactos_placa.B7J3;
		this.GNDJ3 = this.contactos_placa.GNDJ3;
		this.VdcJ3 = this.contactos_placa.VdcJ3;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.menu_ligar_btn = this.menus.menu_ligar_btn;
		this.menu_desligar_btn = this.menus.menu_desligar_btn;
		this.menu_tensao_ac_btn = this.menus.menu_tensao_ac_btn;
		this.menu_tensao_dc_btn = this.menus.menu_tensao_dc_btn;
		this.menu_resistencia_btn = this.menus.menu_resistencia_btn;
		this.menu_capacidade_btn = this.menus.menu_capacidade_btn;
		this.menu_corrente_btn = this.menus.menu_corrente_btn;
		this.menu_tensao_ac_milivolts_btn = this.menus.menu_tensao_ac_milivolts_btn;
		this.capa_display_mc = this.capa_display.capa_display_mc;
		this.display_texto_superior_txt = this.texto_superior.display_texto_superior_txt;
		this.display_inferior_txt = this.texto_inferior.display_inferior_txt;
		this.roda_multimetro_btn = this.roda_multimetro.roda_multimetro_btn;
		this.alarme_btn = this.controlador.alarme_btn;
		this.prog_btn = this.controlador.prog_btn;
		this.esc_btn = this.controlador.esc_btn;
		this.cima_btn = this.controlador.cima_btn;
		this.enter_btn = this.controlador.enter_btn;
		this.baixo_btn = this.controlador.baixo_btn;
		this.display_controlador_mc = this.controlador.display_controlador_mc;
		this.logo_mc = this.ficha_tecnica.logo_mc;
		this.continuar_btn.addEventListener("click", fl_ClickToGoToAndStopAtFrame.bind(this));
		
		function fl_ClickToGoToAndStopAtFrame()
		{
			this.gotoAndStop(1);
		}
		this.stop();
	}
	this.frame_1 = function() {
		var soundInstance = playSound("SomBotao",0);
		this.InsertIntoSoundStreamData(soundInstance,1,2,1);
		this.logo_mc = undefined;this.alarme_btn = undefined;this.prog_btn = undefined;this.esc_btn = undefined;this.cima_btn = undefined;this.enter_btn = undefined;this.baixo_btn = undefined;this.display_controlador_mc = undefined;this.roda_multimetro_btn = undefined;this.display_inferior_txt = undefined;this.display_texto_superior_txt = undefined;this.capa_display_mc = undefined;this.menu_ligar_btn = undefined;this.menu_desligar_btn = undefined;this.menu_tensao_ac_btn = undefined;this.menu_tensao_dc_btn = undefined;this.menu_resistencia_btn = undefined;this.menu_capacidade_btn = undefined;this.menu_corrente_btn = undefined;this.menu_tensao_ac_milivolts_btn = undefined;this.J1G_btn = undefined;this.J1G0_btn = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.B1J3 = undefined;this.B2J3 = undefined;this.B3J3 = undefined;this.B4J3 = undefined;this.B5J3 = undefined;this.B5J3 = undefined;this.B7J3 = undefined;this.GNDJ3 = undefined;this.VdcJ3 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.ponta_vermelha_inicial_mc = undefined;this.ponta_vermelha_final_mc = undefined;this.ponta_preta_final_mc = undefined;this.ponta_preta_inicial_mc = undefined;this.menu_avarias_electricas = undefined;this.menu_controle_remoto_btn = undefined;this.menu_multimetro_btn = undefined;this.menu_avarias_electronicas_btn = undefined;this.compressor_btn = undefined;this.compressor_mecanica_btn = undefined;this.compressor_electrica_btn = undefined;this.vex_btn = undefined;this.vex_mecanica_btn = undefined;this.vex_electrica_btn = undefined;this.ventilador_radial_btn = undefined;this.ventilador_radial_mecanica_btn = undefined;this.ventilador_radial_electricidade_btn = undefined;this.sensor_btn = undefined;this.sensor_mecanica_btn = undefined;this.sensor_electrica_btn = undefined;this.ventilador_axial_btn = undefined;this.ventilador_axial_mecanica_btn = undefined;this.ventilador_axial_electrica_btn = undefined;this.transductor_btn = undefined;this.transductor_mecanica_btn = undefined;this.transductor_electrica_btn = undefined;this.pressostato_btn = undefined;this.pressostato_mecanica_btn = undefined;this.pressostato_electrica_btn = undefined;this.pda_btn = undefined;this.pda_mecanica_btn = undefined;this.pda_electrica_btn = undefined;this.placa_electronica_btn = undefined;this.placa_electronica_mecanica_btn = undefined;this.placa_electronica_electrica_btn = undefined;this.continuar_btn = undefined;this.menu_circuitos_btn = undefined;this.menu_avarias_btn = undefined;this.menu_setpoint_btn = undefined;this.menu_valores_medidas_btn = undefined;this.menu_entradas_saidas_btn = undefined;this.frigorifico_btn = undefined;this.controle_btn = undefined;this.potencia_btn = undefined;this.menu_ajuda_btn = undefined;this.menu_AL05_btn = undefined;this.menu_AL06_btn = undefined;this.menu_AL05a_btn = undefined;this.menu_AL06a_btn = undefined;this.menu_AL07_btn = undefined;this.menu_AL08_btn = undefined;this.menu_AL09_btn = undefined;this.menu_AL10_btn = undefined;this.menu_AL11_btn = undefined;this.menu_AL12_btn = undefined;this.menu_AL13_btn = undefined;this.menu_AL12a_btn = undefined;this.menu_AL13a_btn = undefined;this.menu_AL12b_btn = undefined;this.menu_AL12c_btn = undefined;this.menu_AL13b_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.menu_avarias_btn = undefined;this.botao_on_btn = undefined;this.botao_off_btn = undefined;this.logo_dois_mc = undefined;this.logo_dois_mc = this.logo.logo_dois_mc;
		this.botao_off_btn = this.botão_off.botao_off_btn;
		this.botao_on_btn = this.botao_on.botao_on_btn;
		this.menu_avarias_electricas = this.botoes.menu_avarias_electricas;
		this.menu_controle_remoto_btn = this.botoes.menu_controle_remoto_btn;
		this.menu_multimetro_btn = this.botoes.menu_multimetro_btn;
		this.menu_avarias_electronicas_btn = this.botoes.menu_avarias_electronicas_btn;
		this.compressor_btn = this.botoes.compressor_btn;
		this.compressor_mecanica_btn = this.botoes.compressor_mecanica_btn;
		this.compressor_electrica_btn = this.botoes.compressor_electrica_btn;
		this.vex_btn = this.botoes.vex_btn;
		this.vex_mecanica_btn = this.botoes.vex_mecanica_btn;
		this.vex_electrica_btn = this.botoes.vex_electrica_btn;
		this.ventilador_radial_btn = this.botoes.ventilador_radial_btn;
		this.ventilador_radial_mecanica_btn = this.botoes.ventilador_radial_mecanica_btn;
		this.ventilador_radial_electricidade_btn = this.botoes.ventilador_radial_electricidade_btn;
		this.sensor_btn = this.botoes.sensor_btn;
		this.sensor_mecanica_btn = this.botoes.sensor_mecanica_btn;
		this.sensor_electrica_btn = this.botoes.sensor_electrica_btn;
		this.ventilador_axial_btn = this.botoes.ventilador_axial_btn;
		this.ventilador_axial_mecanica_btn = this.botoes.ventilador_axial_mecanica_btn;
		this.ventilador_axial_electrica_btn = this.botoes.ventilador_axial_electrica_btn;
		this.transductor_btn = this.botoes.transductor_btn;
		this.transductor_mecanica_btn = this.botoes.transductor_mecanica_btn;
		this.transductor_electrica_btn = this.botoes.transductor_electrica_btn;
		this.pressostato_btn = this.botoes.pressostato_btn;
		this.pressostato_mecanica_btn = this.botoes.pressostato_mecanica_btn;
		this.pressostato_electrica_btn = this.botoes.pressostato_electrica_btn;
		this.pda_btn = this.botoes.pda_btn;
		this.pda_mecanica_btn = this.botoes.pda_mecanica_btn;
		this.pda_electrica_btn = this.botoes.pda_electrica_btn;
		this.placa_electronica_btn = this.botoes.placa_electronica_btn;
		this.placa_electronica_mecanica_btn = this.botoes.placa_electronica_mecanica_btn;
		this.placa_electronica_electrica_btn = this.botoes.placa_electronica_electrica_btn;
		this.menu_circuitos_btn = this.botoes.menu_circuitos_btn;
		this.frigorifico_btn = this.botoes.frigorifico_btn;
		this.controle_btn = this.botoes.controle_btn;
		this.potencia_btn = this.botoes.potencia_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_setpoint_btn = this.botoes.menu_setpoint_btn;
		this.menu_valores_medidas_btn = this.botoes.menu_valores_medidas_btn;
		this.menu_entradas_saidas_btn = this.botoes.menu_entradas_saidas_btn;
		this.menu_ajuda_btn = this.botoes.menu_ajuda_btn;
		this.menu_AL05_btn = this.botoes.menu_AL05_btn;
		this.menu_AL06_btn = this.botoes.menu_AL06_btn;
		this.menu_AL05a_btn = this.botoes.menu_AL05a_btn;
		this.menu_AL06a_btn = this.botoes.menu_AL06a_btn;
		this.menu_AL07_btn = this.botoes.menu_AL07_btn;
		this.menu_AL08_btn = this.botoes.menu_AL08_btn;
		this.menu_AL09_btn = this.botoes.menu_AL09_btn;
		this.menu_AL10_btn = this.botoes.menu_AL10_btn;
		this.menu_AL11_btn = this.botoes.menu_AL11_btn;
		this.menu_AL12_btn = this.botoes.menu_AL12_btn;
		this.menu_AL13_btn = this.botoes.menu_AL13_btn;
		this.menu_AL12a_btn = this.botoes.menu_AL12a_btn;
		this.menu_AL13a_btn = this.botoes.menu_AL13a_btn;
		this.menu_AL12b_btn = this.botoes.menu_AL12b_btn;
		this.menu_AL12c_btn = this.botoes.menu_AL12c_btn;
		this.menu_AL13b_btn = this.botoes.menu_AL13b_btn;
		this.ponta_preta_final_mc = this.ponta_preta.ponta_preta_final_mc;
		this.ponta_preta_inicial_mc = this.ponta_preta.ponta_preta_inicial_mc;
		this.ponta_vermelha_inicial_mc = this.ponta_vermelha.ponta_vermelha_inicial_mc;
		this.ponta_vermelha_final_mc = this.ponta_vermelha.ponta_vermelha_final_mc;
		this.J1G_btn = this.contactos_placa.J1G_btn;
		this.J1G0_btn = this.contactos_placa.J1G0_btn;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.B1J3 = this.contactos_placa.B1J3;
		this.B2J3 = this.contactos_placa.B2J3;
		this.B3J3 = this.contactos_placa.B3J3;
		this.B4J3 = this.contactos_placa.B4J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B7J3 = this.contactos_placa.B7J3;
		this.GNDJ3 = this.contactos_placa.GNDJ3;
		this.VdcJ3 = this.contactos_placa.VdcJ3;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.menu_ligar_btn = this.menus.menu_ligar_btn;
		this.menu_desligar_btn = this.menus.menu_desligar_btn;
		this.menu_tensao_ac_btn = this.menus.menu_tensao_ac_btn;
		this.menu_tensao_dc_btn = this.menus.menu_tensao_dc_btn;
		this.menu_resistencia_btn = this.menus.menu_resistencia_btn;
		this.menu_capacidade_btn = this.menus.menu_capacidade_btn;
		this.menu_corrente_btn = this.menus.menu_corrente_btn;
		this.menu_tensao_ac_milivolts_btn = this.menus.menu_tensao_ac_milivolts_btn;
		this.capa_display_mc = this.capa_display.capa_display_mc;
		this.display_texto_superior_txt = this.texto_superior.display_texto_superior_txt;
		this.display_inferior_txt = this.texto_inferior.display_inferior_txt;
		this.roda_multimetro_btn = this.roda_multimetro.roda_multimetro_btn;
		this.alarme_btn = this.controlador.alarme_btn;
		this.prog_btn = this.controlador.prog_btn;
		this.esc_btn = this.controlador.esc_btn;
		this.cima_btn = this.controlador.cima_btn;
		this.enter_btn = this.controlador.enter_btn;
		this.baixo_btn = this.controlador.baixo_btn;
		this.display_controlador_mc = this.controlador.display_controlador_mc;
		this.estado_simulador_txt = this.tela_inicial.estado_simulador_txt;
		///variaveis globais
		var contar_botao_compressor = 0;
		var contar_botao_circuitos = 0;
		var altera_estados = false;
		const este = this;
		
		// Configurações dos componentes (mantido igual)
		const COMPONENTES_CONFIG = {
		    1: {
		        nome: "Compressor",
		        botoes: ["compressor_mecanica_btn", "compressor_electrica_btn"],
		    },
		    2: {
		        nome: "Vavula de Expansão",
		        botoes: ["vex_electrica_btn", "vex_mecanica_btn"],
		    },
		    3: {
		        nome: "Ventilador Radial",
		        botoes: [
		            "ventilador_radial_mecanica_btn",
		            "ventilador_radial_electricidade_btn",
		        ],
		    },
		    4: {
		        nome: "Sensor",
		        botoes: ["sensor_mecanica_btn", "sensor_electrica_btn"],
		    },
		    5: {
		        nome: "Ventilador Axial",
		        botoes: ["ventilador_axial_mecanica_btn", "ventilador_axial_electrica_btn"],
		    },
		    6: {
		        nome: "Transductor",
		        botoes: ["transductor_mecanica_btn", "transductor_electrica_btn"],
		    },
		    7: {
		        nome: "Pressostato",
		        botoes: ["pressostato_mecanica_btn", "pressostato_electrica_btn"],
		    },
		    8: { nome: "Manometro", botoes: ["pda_mecanica_btn", "pda_electrica_btn"] },
		    9: {
		        nome: "Placa",
		        botoes: [
		            "placa_electronica_mecanica_btn",
		            "placa_electronica_electrica_btn",
		        ],
		    },
		};
		
		const SUBMENU_CONFIG = {
		    vex_electrica: { label: "Vavula de Expansão Eletrica", page: 10 },
		    vex_mecanica: { label: "Vavula de Expansão Mecanica", page: 11 },
		    compressor_mecanica: { label: "Mecânica do Compressor", page: 2 },
		    compressor_electrica: { label: "Electricidade do Compressor", page: 3 },
		    ventilador_radial_mecanica: { label: "Ventilador Radial Eletrica", page: 4 },
		    ventilador_radial_electricidade: { label: "Ventilador Radial Mecanica", page: 5 },
		    sensor_mecanica: { label: "Sensor Eletrica", page: 6 },
		    sensor_electrica: { label: "Sensor Mecanica", page: 7 },
		    ventilador_axial_mecanica: { label: "Ventilador Axial Eletrica", page: 8 },
		    ventilador_axial_electrica: { label: "Ventilador Axial Mecanica", page: 9 },
		    transductor_mecanica: { label: "Transductor Eletrica", page: 12 },
		    transductor_electrica: { label: "Transductor Mecanica", page: 13 },
		    pressostato_mecanica: { label: "Pressostato Eletrica", page: 14 },
		    pressostato_electrica: { label: "Pressostato Mecanica", page: 15 },
		    pda_mecanica: { label: "PDA Eletrica", page: 16 },
		    pda_electrica: { label: "PDA Mecanica", page: 17 },
		    placa_electronica_mecanica: { label: "Placa Electronica Eletrica", page: 18 },
		    placa_electronica_electrica: { label: "Placa Electronica Mecanica", page: 19 },
		};
		
		// Configuração dos dropdowns - Sistema centralizado
		const DROPDOWN_CONFIG = {
		    multimetro: {
		        botao: "menu_multimetro_btn",
		        itens: [
		            "menu_tensao_ac_btn",
		            "menu_tensao_dc_btn", 
		            "menu_tensao_ac_milivolts_btn",
		            "menu_resistencia_btn",
		            "menu_capacidade_btn",
		            "menu_corrente_btn"
		        ],
		        acoes: {
		            menu_tensao_ac_btn: () => this.multimetro.selecionarFuncao(1),
		            menu_tensao_dc_btn: () => this.multimetro.selecionarFuncao(2),
		            menu_tensao_ac_milivolts_btn: () => this.multimetro.selecionarFuncao(3),
		            menu_resistencia_btn: () => this.multimetro.selecionarFuncao(4),
		            menu_capacidade_btn: () => this.multimetro.selecionarFuncao(5),
		            menu_corrente_btn: () => this.multimetro.selecionarFuncao(6)
		        }
		    },
		    controle_remoto: {
		        botao: "menu_controle_remoto_btn",
		        itens: [
		            "menu_setpoint_btn",
		            "menu_valores_medidas_btn",
		            "menu_entradas_saidas_btn"
		        ]
		    },
		    avarias: {
		        botao: "menu_avarias_btn",
		        itens: [
		            "menu_AL05_btn", "menu_AL06_btn", "menu_AL05a_btn", "menu_AL06a_btn",
		            "menu_AL07_btn", "menu_AL08_btn", "menu_AL09_btn", "menu_AL10_btn",
		            "menu_AL11_btn", "menu_AL12_btn", "menu_AL13_btn", "menu_AL12a_btn",
		            "menu_AL13a_btn", "menu_AL12b_btn", "menu_AL12c_btn", "menu_AL13b_btn"
		        ]
		    },
		    circuitos: {
		        botao: "menu_circuitos_btn",
		        itens: [
		            "frigorifico_btn",
		            "controle_btn",
		            "potencia_btn"
		        ]
		    }
		};
		
		// Classe genérica para gerenciar dropdowns
		class DropdownManager {
		    constructor(app, simulador) {
		        this.app = app;
		        this.simulador = simulador;
		        this.dropdownAberto = null; // Controla qual dropdown está aberto
		        this.initEventListeners();
		    }
		
		    initEventListeners() {
		        // Configura todos os dropdowns
		        Object.keys(DROPDOWN_CONFIG).forEach(dropdown => {
		            const config = DROPDOWN_CONFIG[dropdown];
		            
		            // Botão principal do dropdown
		            this.app[config.botao].addEventListener("click", () => {
		                this.toggleDropdown(dropdown);
		            });
		
		            // Itens do dropdown
		            config.itens.forEach(item => {
		                if (this.app[item]) {
		                    this.app[item].addEventListener("click", () => {
		                        this.selecionarItem(dropdown, item);
		                    });
		                }
		            });
		        });
		    }
		
		    toggleDropdown(dropdown) {
		        this.simulador.audio.tocarSom("SomBotao");
		        
		        // Se o mesmo dropdown está aberto, fecha
		        if (this.dropdownAberto === dropdown) {
		            this.fecharTodosDropdowns();
		            this.dropdownAberto = null;
		        } else {
		            // Fecha todos e abre o selecionado
		            this.fecharTodosDropdowns();
		            this.abrirDropdown(dropdown);
		            this.dropdownAberto = dropdown;
		        }
		    }
		
		    abrirDropdown(dropdown) {
		        const config = DROPDOWN_CONFIG[dropdown];
		        config.itens.forEach(item => {
		            if (this.app[item]) {
		                this.app[item].visible = true;
		            }
		        });
		
		        // Ações específicas por dropdown
		        this.executarAcaoEspecifica(dropdown, 'abrir');
		    }
		
		    fecharTodosDropdowns() {
		        Object.keys(DROPDOWN_CONFIG).forEach(dropdown => {
		            const config = DROPDOWN_CONFIG[dropdown];
		            config.itens.forEach(item => {
		                if (this.app[item]) {
		                    this.app[item].visible = false;
		                }
		            });
		        });
		
		        // Reset específico do multímetro
		        if (this.dropdownAberto === 'multimetro') {
		            this.app.capa_display_mc.visible = true;
		        }
		    }
		
		    selecionarItem(dropdown, item) {
		        const config = DROPDOWN_CONFIG[dropdown];
		        
		        // Executa ação específica se existir
		        if (config.acoes && config.acoes[item]) {
		            config.acoes[item]();
		        }
		
		        // Fecha o dropdown após seleção
		        this.fecharTodosDropdowns();
		        this.dropdownAberto = null;
		        
		        this.simulador.audio.tocarSom("SomBotao");
		    }
		
		    executarAcaoEspecifica(dropdown, acao) {
		        switch (dropdown) {
		            case 'multimetro':
		                if (acao === 'abrir') {
		                    this.app.capa_display_mc.visible = false;
		                }
		                break;
		            case 'circuitos':
		                if (acao === 'abrir') {
		                    this.app.estado_simulador_txt.text = "Circuitos";
		                }
		                break;
		        }
		    }
		}
		
		// Funções de conexão das pontas (mantidas iguais)
		function conectPontaVermelha(posY) {
		    if (!this.validarCondicoes("Ponta vermelha")) return;
		    this.app.ponta_vermelha_inicial_mc.visible = false;
		    this.app.ponta_vermelha_final_mc.visible = true;
		    this.app.ponta_vermelha_final_mc.y = posY;
		    this.pontaVermelha.conectada = true;
		    this.pontaVermelha.posicao = "J1G";
		    this.estado = "Ponta vermelha ligada";
		    this.atualizarInterface();
		    this.verificarMedicao();
		}
		
		function conectarPontaPreta(posY) {
		    if (!this.validarCondicoes("Ponta preta")) return;
		    this.app.ponta_preta_inicial_mc.visible = false;
		    this.app.ponta_preta_final_mc.visible = true;
		    this.app.ponta_preta_final_mc.y = posY;
		    this.pontaPreta.conectada = true;
		    this.pontaPreta.posicao = "J1G0";
		    this.estado = "Ponta preta ligada";
		    this.atualizarInterface();
		    this.verificarMedicao();
		}
		
		class Simulador {
		    constructor(app) {
		        this.app = app;
		        this.tensaoAlimentacao = 0;
		        this.ligado = false;
		        this.estado = "Simulador Desligado";
		        this.pontaVermelha = { conectada: false, posicao: null };
		        this.pontaPreta = { conectada: false, posicao: null };
		
		        this.multimetro = new Multimetro(app, this);
		        this.dropdownManager = new DropdownManager(app, this);
		        this.audio = new Audio();
		
		        this.initEventListeners();
		    }
		
		    initEventListeners() {
		        // Botões de ligar/desligar
		        ["botao_off_btn", "botao_on_btn"].forEach((btn) => {
		            this.app[btn].addEventListener("click", this.togglePower.bind(this));
		        });
		
		        this.app.menu_ligar_btn.addEventListener("click", this.ligarSimulador.bind(this));
		        this.app.menu_desligar_btn.addEventListener("click", this.desligarSimulador.bind(this));
		
		        // Pontos de conexão
		        const conexoes = [
		            { elemento: "J1G_btn", funcao: conectPontaVermelha, posY: 288 },
		            { elemento: "J1G0_btn", funcao: conectarPontaPreta, posY: 440 },
		            { elemento: "VdcJ2", funcao: conectPontaVermelha, posY: 332 },
		            { elemento: "gndJ2", funcao: conectarPontaPreta, posY: 485 },
		            { elemento: "Vref5J2", funcao: conectPontaVermelha, posY: 495 },
		        ];
		
		        conexoes.forEach(({ elemento, funcao, posY }) => {
		            this.app[elemento].addEventListener("click", funcao.bind(this, posY));
		        });
		
		        // Menu lateral principal
		        const menuBotoes = [
		            "compressor_btn", "vex_btn", "ventilador_radial_btn", "sensor_btn",
		            "ventilador_axial_btn", "transductor_btn", "pressostato_btn", 
		            "pda_btn", "placa_electronica_btn",
		        ];
		
		        menuBotoes.forEach((btn, index) => {
		            this.app[btn].addEventListener("click", 
		                this.esconderBtnMenuLateral.bind(this, index + 1)
		            );
		        });
		
		        // Submenu lateral
		        Object.keys(SUBMENU_CONFIG).forEach((acao) => {
		            const btnName = acao + "_btn";
		            if (this.app[btnName]) {
		                const page = SUBMENU_CONFIG[acao].page;
		                this.app[btnName].addEventListener("click", 
		                    this.subMenuFuncao.bind(this, acao, page)
		                );
		            }
		        });
		    }
		
		    // Função unificada para esconder todos os botões do submenu
		    esconderTodosBotoesSubmenu() {
		        this.audio.tocarSom("SomBotao");
		        Object.values(COMPONENTES_CONFIG).forEach((config) => {
		            config.botoes.forEach((btn) => {
		                this.app[btn].visible = false;
		            });
		        });
		    }
		
		    esconderBtnMenuLateral(nClick) {
		        this.audio.tocarSom("SomBotao");
		        this.altera_estados = !this.altera_estados;
		
		        this.esconderTodosBotoesSubmenu();
		
		        if (this.altera_estados && COMPONENTES_CONFIG[nClick]) {
		            const config = COMPONENTES_CONFIG[nClick];
		            config.botoes.forEach((btn) => {
		                this.app[btn].visible = true;
		            });
		            this.app.estado_simulador_txt.text = config.nome;
		        }
		    }
		
		    subMenuFuncao(acao, page) {
		        this.esconderTodosBotoesSubmenu();
		        const config = SUBMENU_CONFIG[acao];
		        this.app.estado_simulador_txt.text = config ? config.label : "Estado não definido";
		        this.altera_estados = false;
		        if (typeof page === "number") {
		            this.app.gotoAndStop(page);
		        }
		    }
		
		    // Funções de controle de energia
		    setPowerState(ligado) {
		        this.ligado = ligado;
		        this.app.botao_off_btn.visible = !ligado;
		        this.app.botao_on_btn.visible = ligado;
		        this.estado = ligado ? "Simulador Ligado" : "Simulador Desligado";
		        this.tensaoAlimentacao = ligado ? 220 : 0;
		        this.audio.tocarSom("SomBotao");
		        this.atualizarInterface();
		    }
		
		    ligarSimulador() { this.setPowerState(true); }
		    desligarSimulador() { this.setPowerState(false); }
		    togglePower() { this.setPowerState(!this.ligado); }
		
		    atualizarInterface() {
		        this.app.estado_simulador_txt.text = this.estado;
		    }
		
		    validarCondicoes(ponta) {
		        if (!this.ligado) {
		            this.estado = "Ligar Tensão de Alimentação";
		            this.resetarPonta(ponta);
		            this.atualizarInterface();
		            return false;
		        }
		
		        if (this.multimetro.posicaoRoda !== 1) {
		            this.estado = "Colocar multimetro em tensao AC";
		            this.resetarPonta(ponta);
		            this.atualizarInterface();
		            return false;
		        }
		
		        return true;
		    }
		
		    resetarPonta(ponta) {
		        const isVermelha = ponta === "Ponta vermelha";
		        this.app[isVermelha ? "ponta_vermelha_inicial_mc" : "ponta_preta_inicial_mc"].visible = true;
		        this.app[isVermelha ? "ponta_vermelha_final_mc" : "ponta_preta_final_mc"].visible = false;
		    }
		
		    verificarMedicao() {
		        if (this.pontaVermelha.conectada && this.pontaPreta.conectada) {
		            if (this.pontaVermelha.posicao === "J1G" && this.pontaPreta.posicao === "J1G0") {
		                this.app.display_inferior_txt.text = this.tensaoAlimentacao.toString();
		            }
		            this.pontaVermelha.conectada = false;
		            this.pontaPreta.conectada = false;
		        }
		    }
		}
		
		// Classe Multimetro simplificada
		class Multimetro {
		    constructor(app, simulador) {
		        this.app = app;
		        this.simulador = simulador;
		        this.posicaoRoda = 0;
		        this.menuAberto = false;
		
		        this.posicoes = [
		            {
		                nome: "Desligado",
		                rotacao: 0,
		                displayText: "--------",
		                statusText: "",
		            },
		            {
		                nome: "Volts AC",
		                rotacao: 25,
		                displayText: "Volts AC",
		                statusText: "Multímetro ligado para Volts AC",
		            },
		            {
		                nome: "Volts DC",
		                rotacao: 50,
		                displayText: "Volts DC",
		                statusText: "Multímetro ligado para Volts DC",
		            },
		            {
		                nome: "Volts mV",
		                rotacao: 75,
		                displayText: "Volts mV",
		                statusText: "Multímetro ligado para Volts mV",
		            },
		            {
		                nome: "Ohms",
		                rotacao: 100,
		                displayText: "Ohms",
		                statusText: "Multímetro ligado para Ohms",
		            },
		            {
		                nome: "Microfarads",
		                rotacao: 125,
		                displayText: "Microfarads",
		                statusText: "Multímetro ligado para Microfarads",
		            },
		            {
		                nome: "Anpers",
		                rotacao: 150,
		                displayText: "Anpers",
		                statusText: "Multímetro ligado para Anpers",
		            },
		        ];
		
		        this.initEventListeners();
		    }
		
		    initEventListeners() {
		        this.app.menu_multimetro_btn.addEventListener(
		            "click",
		            this.toggleMenu.bind(this)
		        );
		        this.app.roda_multimetro_btn.addEventListener(
		            "click",
		            this.girarRoda.bind(this)
		        );
		
		        const menuOpcoes = [
		            "menu_tensao_ac_btn",
		            "menu_tensao_dc_btn",
		            "menu_tensao_ac_milivolts_btn",
		            "menu_resistencia_btn",
		            "menu_capacidade_btn",
		            "menu_corrente_btn",
		        ];
		
		        menuOpcoes.forEach((btn, index) => {
		            this.app[btn].addEventListener("click", () =>
		                this.selecionarFuncao(index + 1)
		            );
		        });
		    }
		
		    toggleMenu() {
		        this.menuAberto = !this.menuAberto;
		        this.setMenuVisibility(this.menuAberto);
		
		        if (!this.menuAberto) {
		            this.resetarMultimetro();
		        } else {
		            this.app.capa_display_mc.visible = false;
		        }
		    }
		
		    setMenuVisibility(visible) {
		        const menuBotoes = [
		            "menu_tensao_ac_btn",
		            "menu_tensao_dc_btn",
		            "menu_tensao_ac_milivolts_btn",
		            "menu_resistencia_btn",
		            "menu_capacidade_btn",
		            "menu_corrente_btn",
		        ];
		
		        menuBotoes.forEach((btn) => {
		            this.app[btn].visible = visible;
		        });
		
		        this.app.menu_ligar_btn.visible = false;
		        this.app.menu_desligar_btn.visible = false;
		    }
		
		    resetarMultimetro() {
		        this.posicaoRoda = 0;
		        this.app.roda_multimetro_btn.rotation = 0;
		        this.app.capa_display_mc.visible = true;
		        this.app.display_texto_superior_txt.text = "--------";
		    }
		
		    girarRoda() {
		        this.posicaoRoda = (this.posicaoRoda + 1) % this.posicoes.length;
		        this.atualizarPosicaoRoda();
		    }
		
		    selecionarFuncao(posicao) {
		        this.posicaoRoda = posicao;
		        this.atualizarPosicaoRoda();
		        this.simulador.audio.tocarSom("SomBotao");
		    }
		
		    atualizarPosicaoRoda() {
		        const posicao = this.posicoes[this.posicaoRoda];
		        this.app.roda_multimetro_btn.rotation = posicao.rotacao;
		        this.app.display_texto_superior_txt.text = posicao.displayText;
		        this.app.capa_display_mc.visible = this.posicaoRoda === 0;
		
		        if (posicao.statusText) {
		            this.simulador.estado = posicao.statusText;
		            this.simulador.atualizarInterface();
		        }
		
		        this.simulador.audio.tocarSom("SomBotao");
		    }
		}
		
		class Audio {
		    tocarSom(nomeSom, volume = 0.5) {
		        const som = createjs.Sound.createInstance(nomeSom);
		        som.volume = volume;
		        som.play();
		    }
		}
		
		// Inicialização
		const iniciarSimulador = function () {
		    const simulador = new Simulador(this);
		};
		
		iniciarSimulador.call(this);
		this.stop();
	}
	this.frame_2 = function() {
		var soundInstance = playSound("SomBotao",0);
		this.InsertIntoSoundStreamData(soundInstance,2,3,1);
		this.estado_simulador_txt = undefined;this.alarme_btn = undefined;this.prog_btn = undefined;this.esc_btn = undefined;this.cima_btn = undefined;this.enter_btn = undefined;this.baixo_btn = undefined;this.display_controlador_mc = undefined;this.roda_multimetro_btn = undefined;this.display_inferior_txt = undefined;this.display_texto_superior_txt = undefined;this.capa_display_mc = undefined;this.menu_ligar_btn = undefined;this.menu_desligar_btn = undefined;this.menu_tensao_ac_btn = undefined;this.menu_tensao_dc_btn = undefined;this.menu_resistencia_btn = undefined;this.menu_capacidade_btn = undefined;this.menu_corrente_btn = undefined;this.menu_tensao_ac_milivolts_btn = undefined;this.J1G_btn = undefined;this.J1G0_btn = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.B1J3 = undefined;this.B2J3 = undefined;this.B3J3 = undefined;this.B4J3 = undefined;this.B5J3 = undefined;this.B5J3 = undefined;this.B7J3 = undefined;this.GNDJ3 = undefined;this.VdcJ3 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.ponta_vermelha_inicial_mc = undefined;this.ponta_vermelha_final_mc = undefined;this.ponta_preta_final_mc = undefined;this.ponta_preta_inicial_mc = undefined;this.menu_avarias_electricas = undefined;this.menu_controle_remoto_btn = undefined;this.menu_multimetro_btn = undefined;this.menu_avarias_electronicas_btn = undefined;this.compressor_btn = undefined;this.compressor_mecanica_btn = undefined;this.compressor_electrica_btn = undefined;this.vex_btn = undefined;this.vex_mecanica_btn = undefined;this.vex_electrica_btn = undefined;this.ventilador_radial_btn = undefined;this.ventilador_radial_mecanica_btn = undefined;this.ventilador_radial_electricidade_btn = undefined;this.sensor_btn = undefined;this.sensor_mecanica_btn = undefined;this.sensor_electrica_btn = undefined;this.ventilador_axial_btn = undefined;this.ventilador_axial_mecanica_btn = undefined;this.ventilador_axial_electrica_btn = undefined;this.transductor_btn = undefined;this.transductor_mecanica_btn = undefined;this.transductor_electrica_btn = undefined;this.pressostato_btn = undefined;this.pressostato_mecanica_btn = undefined;this.pressostato_electrica_btn = undefined;this.pda_btn = undefined;this.pda_mecanica_btn = undefined;this.pda_electrica_btn = undefined;this.placa_electronica_btn = undefined;this.placa_electronica_mecanica_btn = undefined;this.placa_electronica_electrica_btn = undefined;this.menu_circuitos_btn = undefined;this.frigorifico_btn = undefined;this.controle_btn = undefined;this.potencia_btn = undefined;this.menu_avarias_btn = undefined;this.menu_setpoint_btn = undefined;this.menu_valores_medidas_btn = undefined;this.menu_entradas_saidas_btn = undefined;this.menu_ajuda_btn = undefined;this.menu_AL05_btn = undefined;this.menu_AL06_btn = undefined;this.menu_AL05a_btn = undefined;this.menu_AL06a_btn = undefined;this.menu_AL07_btn = undefined;this.menu_AL08_btn = undefined;this.menu_AL09_btn = undefined;this.menu_AL10_btn = undefined;this.menu_AL11_btn = undefined;this.menu_AL12_btn = undefined;this.menu_AL13_btn = undefined;this.menu_AL12a_btn = undefined;this.menu_AL13a_btn = undefined;this.menu_AL12b_btn = undefined;this.menu_AL12c_btn = undefined;this.menu_AL13b_btn = undefined;this.botao_on_btn = undefined;this.botao_off_btn = undefined;this.logo_dois_mc = undefined;this.logo_dois_mc = this.logo.logo_dois_mc;
		this.botao_off_btn = this.botão_off.botao_off_btn;
		this.botao_on_btn = this.botao_on.botao_on_btn;
		this.menu_avarias_electricas = this.botoes.menu_avarias_electricas;
		this.menu_controle_remoto_btn = this.botoes.menu_controle_remoto_btn;
		this.menu_multimetro_btn = this.botoes.menu_multimetro_btn;
		this.menu_avarias_electronicas_btn = this.botoes.menu_avarias_electronicas_btn;
		this.compressor_btn = this.botoes.compressor_btn;
		this.compressor_mecanica_btn = this.botoes.compressor_mecanica_btn;
		this.compressor_electrica_btn = this.botoes.compressor_electrica_btn;
		this.vex_btn = this.botoes.vex_btn;
		this.vex_mecanica_btn = this.botoes.vex_mecanica_btn;
		this.vex_electrica_btn = this.botoes.vex_electrica_btn;
		this.ventilador_radial_btn = this.botoes.ventilador_radial_btn;
		this.ventilador_radial_mecanica_btn = this.botoes.ventilador_radial_mecanica_btn;
		this.ventilador_radial_electricidade_btn = this.botoes.ventilador_radial_electricidade_btn;
		this.sensor_btn = this.botoes.sensor_btn;
		this.sensor_mecanica_btn = this.botoes.sensor_mecanica_btn;
		this.sensor_electrica_btn = this.botoes.sensor_electrica_btn;
		this.ventilador_axial_btn = this.botoes.ventilador_axial_btn;
		this.ventilador_axial_mecanica_btn = this.botoes.ventilador_axial_mecanica_btn;
		this.ventilador_axial_electrica_btn = this.botoes.ventilador_axial_electrica_btn;
		this.transductor_btn = this.botoes.transductor_btn;
		this.transductor_mecanica_btn = this.botoes.transductor_mecanica_btn;
		this.transductor_electrica_btn = this.botoes.transductor_electrica_btn;
		this.pressostato_btn = this.botoes.pressostato_btn;
		this.pressostato_mecanica_btn = this.botoes.pressostato_mecanica_btn;
		this.pressostato_electrica_btn = this.botoes.pressostato_electrica_btn;
		this.pda_btn = this.botoes.pda_btn;
		this.pda_mecanica_btn = this.botoes.pda_mecanica_btn;
		this.pda_electrica_btn = this.botoes.pda_electrica_btn;
		this.placa_electronica_btn = this.botoes.placa_electronica_btn;
		this.placa_electronica_mecanica_btn = this.botoes.placa_electronica_mecanica_btn;
		this.placa_electronica_electrica_btn = this.botoes.placa_electronica_electrica_btn;
		this.menu_circuitos_btn = this.botoes.menu_circuitos_btn;
		this.frigorifico_btn = this.botoes.frigorifico_btn;
		this.controle_btn = this.botoes.controle_btn;
		this.potencia_btn = this.botoes.potencia_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_setpoint_btn = this.botoes.menu_setpoint_btn;
		this.menu_valores_medidas_btn = this.botoes.menu_valores_medidas_btn;
		this.menu_entradas_saidas_btn = this.botoes.menu_entradas_saidas_btn;
		this.menu_ajuda_btn = this.botoes.menu_ajuda_btn;
		this.menu_AL05_btn = this.botoes.menu_AL05_btn;
		this.menu_AL06_btn = this.botoes.menu_AL06_btn;
		this.menu_AL05a_btn = this.botoes.menu_AL05a_btn;
		this.menu_AL06a_btn = this.botoes.menu_AL06a_btn;
		this.menu_AL07_btn = this.botoes.menu_AL07_btn;
		this.menu_AL08_btn = this.botoes.menu_AL08_btn;
		this.menu_AL09_btn = this.botoes.menu_AL09_btn;
		this.menu_AL10_btn = this.botoes.menu_AL10_btn;
		this.menu_AL11_btn = this.botoes.menu_AL11_btn;
		this.menu_AL12_btn = this.botoes.menu_AL12_btn;
		this.menu_AL13_btn = this.botoes.menu_AL13_btn;
		this.menu_AL12a_btn = this.botoes.menu_AL12a_btn;
		this.menu_AL13a_btn = this.botoes.menu_AL13a_btn;
		this.menu_AL12b_btn = this.botoes.menu_AL12b_btn;
		this.menu_AL12c_btn = this.botoes.menu_AL12c_btn;
		this.menu_AL13b_btn = this.botoes.menu_AL13b_btn;
		this.ponta_preta_final_mc = this.ponta_preta.ponta_preta_final_mc;
		this.ponta_preta_inicial_mc = this.ponta_preta.ponta_preta_inicial_mc;
		this.ponta_vermelha_inicial_mc = this.ponta_vermelha.ponta_vermelha_inicial_mc;
		this.ponta_vermelha_final_mc = this.ponta_vermelha.ponta_vermelha_final_mc;
		this.J1G_btn = this.contactos_placa.J1G_btn;
		this.J1G0_btn = this.contactos_placa.J1G0_btn;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.B1J3 = this.contactos_placa.B1J3;
		this.B2J3 = this.contactos_placa.B2J3;
		this.B3J3 = this.contactos_placa.B3J3;
		this.B4J3 = this.contactos_placa.B4J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B7J3 = this.contactos_placa.B7J3;
		this.GNDJ3 = this.contactos_placa.GNDJ3;
		this.VdcJ3 = this.contactos_placa.VdcJ3;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.menu_ligar_btn = this.menus.menu_ligar_btn;
		this.menu_desligar_btn = this.menus.menu_desligar_btn;
		this.menu_tensao_ac_btn = this.menus.menu_tensao_ac_btn;
		this.menu_tensao_dc_btn = this.menus.menu_tensao_dc_btn;
		this.menu_resistencia_btn = this.menus.menu_resistencia_btn;
		this.menu_capacidade_btn = this.menus.menu_capacidade_btn;
		this.menu_corrente_btn = this.menus.menu_corrente_btn;
		this.menu_tensao_ac_milivolts_btn = this.menus.menu_tensao_ac_milivolts_btn;
		this.capa_display_mc = this.capa_display.capa_display_mc;
		this.display_texto_superior_txt = this.texto_superior.display_texto_superior_txt;
		this.display_inferior_txt = this.texto_inferior.display_inferior_txt;
		this.roda_multimetro_btn = this.roda_multimetro.roda_multimetro_btn;
		this.alarme_btn = this.controlador.alarme_btn;
		this.prog_btn = this.controlador.prog_btn;
		this.esc_btn = this.controlador.esc_btn;
		this.cima_btn = this.controlador.cima_btn;
		this.enter_btn = this.controlador.enter_btn;
		this.baixo_btn = this.controlador.baixo_btn;
		this.display_controlador_mc = this.controlador.display_controlador_mc;
		this.estado_simulador_txt = this.tela_inicial.estado_simulador_txt;
		///variaveis globais
		var contar_botao_compressor = 0;
		var contar_botao_circuitos = 0;
		var altera_estados = false;
		const este = this;
		//this.estado_simulador_txt.text = contar_botao_compressor;
		
		// Configurações dos componentes
		const COMPONENTES_CONFIG = {
		    1: {
		        nome: "Compressor",
		        botoes: ["compressor_mecanica_btn", "compressor_electrica_btn"],
		    },
		    2: {
		        nome: "Vavula de Expansão",
		        botoes: ["vex_electrica_btn", "vex_mecanica_btn"],
		    },
		    3: {
		        nome: "Ventilador Radial",
		        botoes: [
		            "ventilador_radial_mecanica_btn",
		            "ventilador_radial_electricidade_btn",
		        ],
		    },
		    4: {
		        nome: "Sensor",
		        botoes: ["sensor_mecanica_btn", "sensor_electrica_btn"],
		    },
		    5: {
		        nome: "Ventilador Axial",
		        botoes: ["ventilador_axial_mecanica_btn", "ventilador_axial_electrica_btn"],
		    },
		    6: {
		        nome: "Transductor",
		        botoes: ["transductor_mecanica_btn", "transductor_electrica_btn"],
		    },
		    7: {
		        nome: "Pressostato",
		        botoes: ["pressostato_mecanica_btn", "pressostato_electrica_btn"],
		    },
		    8: { nome: "Manometro", botoes: ["pda_mecanica_btn", "pda_electrica_btn"] },
		    9: {
		        nome: "Placa",
		        botoes: [
		            "placa_electronica_mecanica_btn",
		            "placa_electronica_electrica_btn",
		        ],
		    },
		};
		
		const SUBMENU_CONFIG = {
		    vex_electrica: { label: "Vavula de Expansão Eletrica", page: 10 },
		    vex_mecanica: { label: "Vavula de Expansão Mecanica", page: 11 },
		    compressor_mecanica: { label: "Mecânica do Compressor", page: 2 },
		    compressor_electrica: { label: "Electricidade do Compressor", page: 3 },
		    ventilador_radial_mecanica: { label: "Ventilador Radial Eletrica", page: 4 },
		    ventilador_radial_electricidade: {
		        label: "Ventilador Radial Mecanica",
		        page: 5,
		    },
		    sensor_mecanica: { label: "Sensor Eletrica", page: 6 },
		    sensor_electrica: { label: "Sensor Mecanica", page: 7 },
		    ventilador_axial_mecanica: { label: "Ventilador Axial Eletrica", page: 8 },
		    ventilador_axial_electrica: { label: "Ventilador Axial Mecanica", page: 9 },
		    transductor_mecanica: { label: "Transductor Eletrica", page: 12 },
		    transductor_electrica: { label: "Transductor Mecanica", page: 13 },
		    pressostato_mecanica: { label: "Pressostato Eletrica", page: 14 },
		    pressostato_electrica: { label: "Pressostato Mecanica", page: 15 },
		    pda_mecanica: { label: "PDA Eletrica", page: 16 },
		    pda_electrica: { label: "PDA Mecanica", page: 17 },
		    placa_electronica_mecanica: { label: "Placa Electronica Eletrica", page: 18 },
		    placa_electronica_electrica: {
		        label: "Placa Electronica Mecanica",
		        page: 19,
		    },
		};
		
		// Funções de conexão das pontas
		function conectPontaVermelha(posY) {
		    if (!this.validarCondicoes("Ponta vermelha")) return;
		    this.app.ponta_vermelha_inicial_mc.visible = false;
		    this.app.ponta_vermelha_final_mc.visible = true;
		    this.app.ponta_vermelha_final_mc.y = posY;
		    this.pontaVermelha.conectada = true;
		    this.pontaVermelha.posicao = "J1G";
		    this.estado = "Ponta vermelha ligada";
		    this.atualizarInterface();
		    this.verificarMedicao();
		}
		
		function conectarPontaPreta(posY) {
		    if (!this.validarCondicoes("Ponta preta")) return;
		    this.app.ponta_preta_inicial_mc.visible = false;
		    this.app.ponta_preta_final_mc.visible = true;
		    this.app.ponta_preta_final_mc.y = posY;
		    this.pontaPreta.conectada = true;
		    this.pontaPreta.posicao = "J1G0";
		    this.estado = "Ponta preta ligada";
		    this.atualizarInterface();
		    this.verificarMedicao();
		}
		
		class Simulador {
		    constructor(app) {
		        this.app = app;
		        this.tensaoAlimentacao = 0;
		        this.ligado = false;
		        this.estado = "Simulador Desligado";
		        this.pontaVermelha = { conectada: false, posicao: null };
		        this.pontaPreta = { conectada: false, posicao: null };
		
		        this.multimetro = new Multimetro(app, this);
		        this.controleRemoto = new ControleRemoto(app, this);
		        this.avarias = new Avarias(app, this);
		        this.circuitos = new Circuitos(app, this);
		        this.audio = new Audio();
		
		        this.initEventListeners();
		    }
		
		    initEventListeners() {
		        // Botões de ligar/desligar
		        ["botao_off_btn", "botao_on_btn"].forEach((btn) => {
		            this.app[btn].addEventListener("click", this.togglePower.bind(this));
		        });
		
		        this.app.menu_ligar_btn.addEventListener(
		            "click",
		            this.ligarSimulador.bind(this)
		        );
		        this.app.menu_desligar_btn.addEventListener(
		            "click",
		            this.desligarSimulador.bind(this)
		        );
		
		        // Pontos de conexão
		        const conexoes = [
		            { elemento: "J1G_btn", funcao: conectPontaVermelha, posY: 288 },
		            { elemento: "J1G0_btn", funcao: conectarPontaPreta, posY: 440 },
		            { elemento: "VdcJ2", funcao: conectPontaVermelha, posY: 332 },
		            { elemento: "gndJ2", funcao: conectarPontaPreta, posY: 485 },
		            { elemento: "Vref5J2", funcao: conectPontaVermelha, posY: 495 },
		        ];
		
		        conexoes.forEach(({ elemento, funcao, posY }) => {
		            this.app[elemento].addEventListener("click", funcao.bind(this, posY));
		        });
		
		        // Menu lateral principal
		        const menuBotoes = [
		            "compressor_btn",
		            "vex_btn",
		            "ventilador_radial_btn",
		            "sensor_btn",
		            "ventilador_axial_btn",
		            "transductor_btn",
		            "pressostato_btn",
		            "pda_btn",
		            "placa_electronica_btn",
		        ];
		
		        menuBotoes.forEach((btn, index) => {
		            this.app[btn].addEventListener(
		                "click",
		                this.esconderBtnMenuLateral.bind(this, index + 1)
		            );
		        });
		
		        // Submenu lateral
		        Object.keys(SUBMENU_CONFIG).forEach((acao) => {
		            const btnName = acao + "_btn";
		            if (this.app[btnName]) {
		                const page = SUBMENU_CONFIG[acao].page;
		                this.app[btnName].addEventListener(
		                    "click",
		                    this.subMenuFuncao.bind(this, acao, page)
		                );
		            }
		        });
		    }
		
		    // Função unificada para esconder todos os botões do submenu
		    esconderTodosBotoesSubmenu() {
		        this.audio.tocarSom("SomBotao");
		        Object.values(COMPONENTES_CONFIG).forEach((config) => {
		            config.botoes.forEach((btn) => {
		                this.app[btn].visible = false;
		            });
		        });
		    }
		
		    esconderBtnMenuLateral(nClick) {
		        this.audio.tocarSom("SomBotao");
		        this.altera_estados = !this.altera_estados;
		
		        this.esconderTodosBotoesSubmenu();
		
		        if (this.altera_estados && COMPONENTES_CONFIG[nClick]) {
		            const config = COMPONENTES_CONFIG[nClick];
		            config.botoes.forEach((btn) => {
		                this.app[btn].visible = true;
		            });
		            this.app.estado_simulador_txt.text = config.nome;
		        }
		    }
		
		    subMenuFuncao(acao, page) {
		        this.esconderTodosBotoesSubmenu();
		        const config = SUBMENU_CONFIG[acao];
		        this.app.estado_simulador_txt.text = config
		            ? config.label
		            : "Estado não definido";
		        this.altera_estados = false;
		        if (typeof page === "number") {
		            this.app.gotoAndStop(page); // ou qualquer função que use o número da página
		        }
		    }
		
		    // Funções de controle de energia simplificadas
		    setPowerState(ligado) {
		        this.ligado = ligado;
		        this.app.botao_off_btn.visible = !ligado;
		        this.app.botao_on_btn.visible = ligado;
		        this.estado = ligado ? "Simulador Ligado" : "Simulador Desligado";
		        this.tensaoAlimentacao = ligado ? 220 : 0;
		        this.audio.tocarSom("SomBotao");
		        this.atualizarInterface();
		    }
		
		    ligarSimulador() {
		        this.setPowerState(true);
		    }
		    desligarSimulador() {
		        this.setPowerState(false);
		    }
		    togglePower() {
		        this.setPowerState(!this.ligado);
		    }
		
		    atualizarInterface() {
		        this.app.estado_simulador_txt.text = this.estado;
		    }
		
		    validarCondicoes(ponta) {
		        if (!this.ligado) {
		            this.estado = "Ligar Tensão de Alimentação";
		            this.resetarPonta(ponta);
		            this.atualizarInterface();
		            return false;
		        }
		
		        if (this.multimetro.posicaoRoda !== 1) {
		            this.estado = "Colocar multimetro em tensao AC";
		            this.resetarPonta(ponta);
		            this.atualizarInterface();
		            return false;
		        }
		
		        return true;
		    }
		
		    resetarPonta(ponta) {
		        const isVermelha = ponta === "Ponta vermelha";
		        this.app[
		            isVermelha ? "ponta_vermelha_inicial_mc" : "ponta_preta_inicial_mc"
		        ].visible = true;
		        this.app[
		            isVermelha ? "ponta_vermelha_final_mc" : "ponta_preta_final_mc"
		        ].visible = false;
		    }
		
		    verificarMedicao() {
		        if (this.pontaVermelha.conectada && this.pontaPreta.conectada) {
		            if (
		                this.pontaVermelha.posicao === "J1G" &&
		                this.pontaPreta.posicao === "J1G0"
		            ) {
		                this.app.display_inferior_txt.text = this.tensaoAlimentacao.toString();
		            }
		            this.pontaVermelha.conectada = false;
		            this.pontaPreta.conectada = false;
		        }
		    }
		}
		
		class Multimetro {
		    constructor(app, simulador) {
		        this.app = app;
		        this.simulador = simulador;
		        this.posicaoRoda = 0;
		        this.menuAberto = false;
		
		        this.posicoes = [
		            {
		                nome: "Desligado",
		                rotacao: 0,
		                displayText: "--------",
		                statusText: "",
		            },
		            {
		                nome: "Volts AC",
		                rotacao: 25,
		                displayText: "Volts AC",
		                statusText: "Multímetro ligado para Volts AC",
		            },
		            {
		                nome: "Volts DC",
		                rotacao: 50,
		                displayText: "Volts DC",
		                statusText: "Multímetro ligado para Volts DC",
		            },
		            {
		                nome: "Volts mV",
		                rotacao: 75,
		                displayText: "Volts mV",
		                statusText: "Multímetro ligado para Volts mV",
		            },
		            {
		                nome: "Ohms",
		                rotacao: 100,
		                displayText: "Ohms",
		                statusText: "Multímetro ligado para Ohms",
		            },
		            {
		                nome: "Microfarads",
		                rotacao: 125,
		                displayText: "Microfarads",
		                statusText: "Multímetro ligado para Microfarads",
		            },
		            {
		                nome: "Anpers",
		                rotacao: 150,
		                displayText: "Anpers",
		                statusText: "Multímetro ligado para Anpers",
		            },
		        ];
		
		        this.initEventListeners();
		    }
		
		    initEventListeners() {
		        this.app.menu_multimetro_btn.addEventListener(
		            "click",
		            this.toggleMenu.bind(this)
		        );
		        this.app.roda_multimetro_btn.addEventListener(
		            "click",
		            this.girarRoda.bind(this)
		        );
		
		        const menuOpcoes = [
		            "menu_tensao_ac_btn",
		            "menu_tensao_dc_btn",
		            "menu_tensao_ac_milivolts_btn",
		            "menu_resistencia_btn",
		            "menu_capacidade_btn",
		            "menu_corrente_btn",
		        ];
		
		        menuOpcoes.forEach((btn, index) => {
		            this.app[btn].addEventListener("click", () =>
		                this.selecionarFuncao(index + 1)
		            );
		        });
		    }
		
		    toggleMenu() {
		        this.menuAberto = !this.menuAberto;
		        this.setMenuVisibility(this.menuAberto);
		
		        if (!this.menuAberto) {
		            this.resetarMultimetro();
		        } else {
		            this.app.capa_display_mc.visible = false;
		        }
		    }
		
		    setMenuVisibility(visible) {
		        const menuBotoes = [
		            "menu_tensao_ac_btn",
		            "menu_tensao_dc_btn",
		            "menu_tensao_ac_milivolts_btn",
		            "menu_resistencia_btn",
		            "menu_capacidade_btn",
		            "menu_corrente_btn",
		        ];
		
		        menuBotoes.forEach((btn) => {
		            this.app[btn].visible = visible;
		        });
		
		        this.app.menu_ligar_btn.visible = false;
		        this.app.menu_desligar_btn.visible = false;
		    }
		
		    resetarMultimetro() {
		        this.posicaoRoda = 0;
		        this.app.roda_multimetro_btn.rotation = 0;
		        this.app.capa_display_mc.visible = true;
		        this.app.display_texto_superior_txt.text = "--------";
		    }
		
		    girarRoda() {
		        this.posicaoRoda = (this.posicaoRoda + 1) % this.posicoes.length;
		        this.atualizarPosicaoRoda();
		    }
		
		    selecionarFuncao(posicao) {
		        this.posicaoRoda = posicao;
		        this.atualizarPosicaoRoda();
		        this.simulador.audio.tocarSom("SomBotao");
		    }
		
		    atualizarPosicaoRoda() {
		        const posicao = this.posicoes[this.posicaoRoda];
		        this.app.roda_multimetro_btn.rotation = posicao.rotacao;
		        this.app.display_texto_superior_txt.text = posicao.displayText;
		        this.app.capa_display_mc.visible = this.posicaoRoda === 0;
		
		        if (posicao.statusText) {
		            this.simulador.estado = posicao.statusText;
		            this.simulador.atualizarInterface();
		        }
		
		        this.simulador.audio.tocarSom("SomBotao");
		    }
		}
		
		class ControleRemoto {
		    constructor(app, simulador) {
		        this.app = app;
		        this.simulador = simulador;
		        this.menuAberto = false;
		        this.initEventListeners();
		    }
		
		    initEventListeners() {
		        this.app.menu_controle_remoto_btn.addEventListener(
		            "click",
		            this.toggleMenu.bind(this)
		        );
		        [
		            "menu_setpoint_btn",
		            "menu_valores_medidas_btn",
		            "menu_entradas_saidas_btn",
		        ].forEach((btn) => {
		            this.app[btn].addEventListener("click", this.fecharMenu.bind(this));
		        });
		    }
		
		    toggleMenu() {
		        this.menuAberto = !this.menuAberto;
		        this.setMenuVisibility(this.menuAberto);
		    }
		
		    setMenuVisibility(visible) {
		        this.app.menu_setpoint_btn.visible = visible;
		        this.app.menu_valores_medidas_btn.visible = visible;
		        this.app.menu_entradas_saidas_btn.visible = visible;
		
		        const multimetroMenus = [
		            "menu_tensao_ac_btn",
		            "menu_tensao_dc_btn",
		            "menu_tensao_ac_milivolts_btn",
		            "menu_resistencia_btn",
		            "menu_capacidade_btn",
		            "menu_corrente_btn",
		        ];
		
		        multimetroMenus.forEach((btn) => {
		            this.app[btn].visible = false;
		        });
		    }
		
		    fecharMenu() {
		        this.menuAberto = false;
		        this.setMenuVisibility(false);
		    }
		}
		
		class Avarias {
		    constructor(app, simulador) {
		        this.app = app;
		        this.simulador = simulador;
		        this.menuAberto = false;
		        this.initEventListeners();
		    }
		    initEventListeners() {
		        this.app.menu_avarias_btn.addEventListener(
		            "click",
		            this.toggleMenu.bind(this)
		        );
		        [
		            "menu_AL05_btn",
		            "menu_AL06_btn",
		            "menu_AL05a_btn",
		            "menu_AL06a_btn",
		            "menu_AL07_btn",
		            "menu_AL08_btn",
		            "menu_AL09_btn",
		            "menu_AL10_btn",
		            "menu_AL11_btn",
		            "menu_AL12_btn",
		            "menu_AL13_btn",
		            "menu_AL12a_btn",
		            "menu_AL13a_btn",
		            "menu_AL12b_btn",
		            "menu_AL12c_btn",
		            "menu_AL13b_btn",
		        ].forEach((btn) => {
		            this.app[btn].addEventListener("click", this.fecharMenu.bind(this));
		        });
		    }
		
		    toggleMenu() {
		        this.menuAberto = !this.menuAberto;
		        this.setMenuVisibility(this.menuAberto);
		    }
		
		    setMenuVisibility(visible) {
		        this.app.menu_AL05_btn.visible = visible;
		        this.app.menu_AL06_btn.visible = visible;
		        this.app.menu_AL05a_btn.visible = visible;
		        this.app.menu_AL06a_btn.visible = visible;
		        this.app.menu_AL07_btn.visible = visible;
		        this.app.menu_AL08_btn.visible = visible;
		        this.app.menu_AL09_btn.visible = visible;
		        this.app.menu_AL10_btn.visible = visible;
		        this.app.menu_AL11_btn.visible = visible;
		        this.app.menu_AL12_btn.visible = visible;
		        this.app.menu_AL13_btn.visible = visible;
		        this.app.menu_AL12a_btn.visible = visible;
		        this.app.menu_AL13a_btn.visible = visible;
		        this.app.menu_AL12b_btn.visible = visible;
		        this.app.menu_AL12c_btn.visible = visible;
		        this.app.menu_AL13b_btn.visible = visible;
		
		        const multimetroMenus = [
		            "menu_tensao_ac_btn",
		            "menu_tensao_dc_btn",
		            "menu_tensao_ac_milivolts_btn",
		            "menu_resistencia_btn",
		            "menu_capacidade_btn",
		            "menu_corrente_btn",
		        ];
		
		        multimetroMenus.forEach((btn) => {
		            this.app[btn].visible = false;
		        });
		    }
		    fecharMenu() {
		        this.menuAberto = false;
		        this.setMenuVisibility(false);
		    }
		}
		
		class Circuitos {
		    constructor(app, simulador) {
		        this.app = app;
		        this.simulador = simulador;
		        this.menuAberto = false;
		        this.initEventListeners();
		    }
		    initEventListeners() {
		        this.app.menu_circuitos_btn.addEventListener(
		            "click",
		            this.toggleMenu.bind(this)
		        );
		        [
		            "frigorifico_btn",
		            "controle_btn",
		            "potencia_btn",
		        ].forEach((btn) => {
		            this.app[btn].addEventListener("click", this.fecharMenu.bind(this));
		        });
		    }
		
		    toggleMenu() {
		        this.menuAberto = !this.menuAberto;
		        this.setMenuVisibility(this.menuAberto);
		        this.estado_simulador_txt.text = "Circuitos";
		    }
		
		    setMenuVisibility(visible) {
		        this.app.frigorifico_btn.visible = visible;
		        this.app.controle_btn.visible = visible;
		        this.app.potencia_btn.visible = visible;
		        this.estado_simulador_txt.text = "Circuitos";
		    }
		    fecharMenu() {
		        this.menuAberto = false;
		        this.setMenuVisibility(false);
		    }
		}
		
		class Audio {
		    tocarSom(nomeSom, volume = 0.5) {
		        const som = createjs.Sound.createInstance(nomeSom);
		        som.volume = volume;
		        som.play();
		    }
		}
		
		// Inicialização
		const iniciarSimulador = function () {
		    const simulador = new Simulador(this);
		};
		
		iniciarSimulador.call(this);
		this.stop();
	}
	this.frame_3 = function() {
		this.estado_simulador_txt = undefined;this.alarme_btn = undefined;this.prog_btn = undefined;this.esc_btn = undefined;this.cima_btn = undefined;this.enter_btn = undefined;this.baixo_btn = undefined;this.display_controlador_mc = undefined;this.roda_multimetro_btn = undefined;this.display_inferior_txt = undefined;this.display_texto_superior_txt = undefined;this.capa_display_mc = undefined;this.menu_ligar_btn = undefined;this.menu_desligar_btn = undefined;this.menu_tensao_ac_btn = undefined;this.menu_tensao_dc_btn = undefined;this.menu_resistencia_btn = undefined;this.menu_capacidade_btn = undefined;this.menu_corrente_btn = undefined;this.menu_tensao_ac_milivolts_btn = undefined;this.J1G_btn = undefined;this.J1G0_btn = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.B1J3 = undefined;this.B2J3 = undefined;this.B3J3 = undefined;this.B4J3 = undefined;this.B5J3 = undefined;this.B5J3 = undefined;this.B7J3 = undefined;this.GNDJ3 = undefined;this.VdcJ3 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.ponta_vermelha_inicial_mc = undefined;this.ponta_vermelha_final_mc = undefined;this.ponta_preta_final_mc = undefined;this.ponta_preta_inicial_mc = undefined;this.menu_avarias_electricas = undefined;this.menu_controle_remoto_btn = undefined;this.menu_multimetro_btn = undefined;this.menu_avarias_electronicas_btn = undefined;this.compressor_btn = undefined;this.compressor_mecanica_btn = undefined;this.compressor_electrica_btn = undefined;this.vex_btn = undefined;this.vex_mecanica_btn = undefined;this.vex_electrica_btn = undefined;this.ventilador_radial_btn = undefined;this.ventilador_radial_mecanica_btn = undefined;this.ventilador_radial_electricidade_btn = undefined;this.sensor_btn = undefined;this.sensor_mecanica_btn = undefined;this.sensor_electrica_btn = undefined;this.ventilador_axial_btn = undefined;this.ventilador_axial_mecanica_btn = undefined;this.ventilador_axial_electrica_btn = undefined;this.transductor_btn = undefined;this.transductor_mecanica_btn = undefined;this.transductor_electrica_btn = undefined;this.pressostato_btn = undefined;this.pressostato_mecanica_btn = undefined;this.pressostato_electrica_btn = undefined;this.pda_btn = undefined;this.pda_mecanica_btn = undefined;this.pda_electrica_btn = undefined;this.placa_electronica_btn = undefined;this.placa_electronica_mecanica_btn = undefined;this.placa_electronica_electrica_btn = undefined;this.menu_circuitos_btn = undefined;this.frigorifico_btn = undefined;this.controle_btn = undefined;this.potencia_btn = undefined;this.menu_avarias_btn = undefined;this.menu_setpoint_btn = undefined;this.menu_valores_medidas_btn = undefined;this.menu_entradas_saidas_btn = undefined;this.menu_ajuda_btn = undefined;this.menu_AL05_btn = undefined;this.menu_AL06_btn = undefined;this.menu_AL05a_btn = undefined;this.menu_AL06a_btn = undefined;this.menu_AL07_btn = undefined;this.menu_AL08_btn = undefined;this.menu_AL09_btn = undefined;this.menu_AL10_btn = undefined;this.menu_AL11_btn = undefined;this.menu_AL12_btn = undefined;this.menu_AL13_btn = undefined;this.menu_AL12a_btn = undefined;this.menu_AL13a_btn = undefined;this.menu_AL12b_btn = undefined;this.menu_AL12c_btn = undefined;this.menu_AL13b_btn = undefined;this.botao_on_btn = undefined;this.botao_off_btn = undefined;this.logo_dois_mc = undefined;this.logo_dois_mc = this.logo.logo_dois_mc;
		this.botao_off_btn = this.botão_off.botao_off_btn;
		this.botao_on_btn = this.botao_on.botao_on_btn;
		this.menu_avarias_electricas = this.botoes.menu_avarias_electricas;
		this.menu_controle_remoto_btn = this.botoes.menu_controle_remoto_btn;
		this.menu_multimetro_btn = this.botoes.menu_multimetro_btn;
		this.menu_avarias_electronicas_btn = this.botoes.menu_avarias_electronicas_btn;
		this.compressor_btn = this.botoes.compressor_btn;
		this.compressor_mecanica_btn = this.botoes.compressor_mecanica_btn;
		this.compressor_electrica_btn = this.botoes.compressor_electrica_btn;
		this.vex_btn = this.botoes.vex_btn;
		this.vex_mecanica_btn = this.botoes.vex_mecanica_btn;
		this.vex_electrica_btn = this.botoes.vex_electrica_btn;
		this.ventilador_radial_btn = this.botoes.ventilador_radial_btn;
		this.ventilador_radial_mecanica_btn = this.botoes.ventilador_radial_mecanica_btn;
		this.ventilador_radial_electricidade_btn = this.botoes.ventilador_radial_electricidade_btn;
		this.sensor_btn = this.botoes.sensor_btn;
		this.sensor_mecanica_btn = this.botoes.sensor_mecanica_btn;
		this.sensor_electrica_btn = this.botoes.sensor_electrica_btn;
		this.ventilador_axial_btn = this.botoes.ventilador_axial_btn;
		this.ventilador_axial_mecanica_btn = this.botoes.ventilador_axial_mecanica_btn;
		this.ventilador_axial_electrica_btn = this.botoes.ventilador_axial_electrica_btn;
		this.transductor_btn = this.botoes.transductor_btn;
		this.transductor_mecanica_btn = this.botoes.transductor_mecanica_btn;
		this.transductor_electrica_btn = this.botoes.transductor_electrica_btn;
		this.pressostato_btn = this.botoes.pressostato_btn;
		this.pressostato_mecanica_btn = this.botoes.pressostato_mecanica_btn;
		this.pressostato_electrica_btn = this.botoes.pressostato_electrica_btn;
		this.pda_btn = this.botoes.pda_btn;
		this.pda_mecanica_btn = this.botoes.pda_mecanica_btn;
		this.pda_electrica_btn = this.botoes.pda_electrica_btn;
		this.placa_electronica_btn = this.botoes.placa_electronica_btn;
		this.placa_electronica_mecanica_btn = this.botoes.placa_electronica_mecanica_btn;
		this.placa_electronica_electrica_btn = this.botoes.placa_electronica_electrica_btn;
		this.menu_circuitos_btn = this.botoes.menu_circuitos_btn;
		this.frigorifico_btn = this.botoes.frigorifico_btn;
		this.controle_btn = this.botoes.controle_btn;
		this.potencia_btn = this.botoes.potencia_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_setpoint_btn = this.botoes.menu_setpoint_btn;
		this.menu_valores_medidas_btn = this.botoes.menu_valores_medidas_btn;
		this.menu_entradas_saidas_btn = this.botoes.menu_entradas_saidas_btn;
		this.menu_ajuda_btn = this.botoes.menu_ajuda_btn;
		this.menu_AL05_btn = this.botoes.menu_AL05_btn;
		this.menu_AL06_btn = this.botoes.menu_AL06_btn;
		this.menu_AL05a_btn = this.botoes.menu_AL05a_btn;
		this.menu_AL06a_btn = this.botoes.menu_AL06a_btn;
		this.menu_AL07_btn = this.botoes.menu_AL07_btn;
		this.menu_AL08_btn = this.botoes.menu_AL08_btn;
		this.menu_AL09_btn = this.botoes.menu_AL09_btn;
		this.menu_AL10_btn = this.botoes.menu_AL10_btn;
		this.menu_AL11_btn = this.botoes.menu_AL11_btn;
		this.menu_AL12_btn = this.botoes.menu_AL12_btn;
		this.menu_AL13_btn = this.botoes.menu_AL13_btn;
		this.menu_AL12a_btn = this.botoes.menu_AL12a_btn;
		this.menu_AL13a_btn = this.botoes.menu_AL13a_btn;
		this.menu_AL12b_btn = this.botoes.menu_AL12b_btn;
		this.menu_AL12c_btn = this.botoes.menu_AL12c_btn;
		this.menu_AL13b_btn = this.botoes.menu_AL13b_btn;
		this.ponta_preta_final_mc = this.ponta_preta.ponta_preta_final_mc;
		this.ponta_preta_inicial_mc = this.ponta_preta.ponta_preta_inicial_mc;
		this.ponta_vermelha_inicial_mc = this.ponta_vermelha.ponta_vermelha_inicial_mc;
		this.ponta_vermelha_final_mc = this.ponta_vermelha.ponta_vermelha_final_mc;
		this.J1G_btn = this.contactos_placa.J1G_btn;
		this.J1G0_btn = this.contactos_placa.J1G0_btn;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.B1J3 = this.contactos_placa.B1J3;
		this.B2J3 = this.contactos_placa.B2J3;
		this.B3J3 = this.contactos_placa.B3J3;
		this.B4J3 = this.contactos_placa.B4J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B7J3 = this.contactos_placa.B7J3;
		this.GNDJ3 = this.contactos_placa.GNDJ3;
		this.VdcJ3 = this.contactos_placa.VdcJ3;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.menu_ligar_btn = this.menus.menu_ligar_btn;
		this.menu_desligar_btn = this.menus.menu_desligar_btn;
		this.menu_tensao_ac_btn = this.menus.menu_tensao_ac_btn;
		this.menu_tensao_dc_btn = this.menus.menu_tensao_dc_btn;
		this.menu_resistencia_btn = this.menus.menu_resistencia_btn;
		this.menu_capacidade_btn = this.menus.menu_capacidade_btn;
		this.menu_corrente_btn = this.menus.menu_corrente_btn;
		this.menu_tensao_ac_milivolts_btn = this.menus.menu_tensao_ac_milivolts_btn;
		this.capa_display_mc = this.capa_display.capa_display_mc;
		this.display_texto_superior_txt = this.texto_superior.display_texto_superior_txt;
		this.display_inferior_txt = this.texto_inferior.display_inferior_txt;
		this.roda_multimetro_btn = this.roda_multimetro.roda_multimetro_btn;
		this.alarme_btn = this.controlador.alarme_btn;
		this.prog_btn = this.controlador.prog_btn;
		this.esc_btn = this.controlador.esc_btn;
		this.cima_btn = this.controlador.cima_btn;
		this.enter_btn = this.controlador.enter_btn;
		this.baixo_btn = this.controlador.baixo_btn;
		this.display_controlador_mc = this.controlador.display_controlador_mc;
		this.estado_simulador_txt = this.tela_inicial.estado_simulador_txt;
	}
	this.frame_4 = function() {
		this.estado_simulador_txt = undefined;this.alarme_btn = undefined;this.prog_btn = undefined;this.esc_btn = undefined;this.cima_btn = undefined;this.enter_btn = undefined;this.baixo_btn = undefined;this.display_controlador_mc = undefined;this.roda_multimetro_btn = undefined;this.display_inferior_txt = undefined;this.display_texto_superior_txt = undefined;this.capa_display_mc = undefined;this.menu_ligar_btn = undefined;this.menu_desligar_btn = undefined;this.menu_tensao_ac_btn = undefined;this.menu_tensao_dc_btn = undefined;this.menu_resistencia_btn = undefined;this.menu_capacidade_btn = undefined;this.menu_corrente_btn = undefined;this.menu_tensao_ac_milivolts_btn = undefined;this.J1G_btn = undefined;this.J1G0_btn = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.B1J3 = undefined;this.B2J3 = undefined;this.B3J3 = undefined;this.B4J3 = undefined;this.B5J3 = undefined;this.B5J3 = undefined;this.B7J3 = undefined;this.GNDJ3 = undefined;this.VdcJ3 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.ponta_vermelha_inicial_mc = undefined;this.ponta_vermelha_final_mc = undefined;this.ponta_preta_final_mc = undefined;this.ponta_preta_inicial_mc = undefined;this.menu_avarias_electricas = undefined;this.menu_controle_remoto_btn = undefined;this.menu_multimetro_btn = undefined;this.menu_avarias_electronicas_btn = undefined;this.compressor_btn = undefined;this.compressor_mecanica_btn = undefined;this.compressor_electrica_btn = undefined;this.vex_btn = undefined;this.vex_mecanica_btn = undefined;this.vex_electrica_btn = undefined;this.ventilador_radial_btn = undefined;this.ventilador_radial_mecanica_btn = undefined;this.ventilador_radial_electricidade_btn = undefined;this.sensor_btn = undefined;this.sensor_mecanica_btn = undefined;this.sensor_electrica_btn = undefined;this.ventilador_axial_btn = undefined;this.ventilador_axial_mecanica_btn = undefined;this.ventilador_axial_electrica_btn = undefined;this.transductor_btn = undefined;this.transductor_mecanica_btn = undefined;this.transductor_electrica_btn = undefined;this.pressostato_btn = undefined;this.pressostato_mecanica_btn = undefined;this.pressostato_electrica_btn = undefined;this.pda_btn = undefined;this.pda_mecanica_btn = undefined;this.pda_electrica_btn = undefined;this.placa_electronica_btn = undefined;this.placa_electronica_mecanica_btn = undefined;this.placa_electronica_electrica_btn = undefined;this.menu_circuitos_btn = undefined;this.frigorifico_btn = undefined;this.controle_btn = undefined;this.potencia_btn = undefined;this.menu_avarias_btn = undefined;this.menu_setpoint_btn = undefined;this.menu_valores_medidas_btn = undefined;this.menu_entradas_saidas_btn = undefined;this.menu_ajuda_btn = undefined;this.menu_AL05_btn = undefined;this.menu_AL06_btn = undefined;this.menu_AL05a_btn = undefined;this.menu_AL06a_btn = undefined;this.menu_AL07_btn = undefined;this.menu_AL08_btn = undefined;this.menu_AL09_btn = undefined;this.menu_AL10_btn = undefined;this.menu_AL11_btn = undefined;this.menu_AL12_btn = undefined;this.menu_AL13_btn = undefined;this.menu_AL12a_btn = undefined;this.menu_AL13a_btn = undefined;this.menu_AL12b_btn = undefined;this.menu_AL12c_btn = undefined;this.menu_AL13b_btn = undefined;this.botao_on_btn = undefined;this.botao_off_btn = undefined;this.logo_dois_mc = undefined;this.logo_dois_mc = this.logo.logo_dois_mc;
		this.botao_off_btn = this.botão_off.botao_off_btn;
		this.botao_on_btn = this.botao_on.botao_on_btn;
		this.menu_avarias_electricas = this.botoes.menu_avarias_electricas;
		this.menu_controle_remoto_btn = this.botoes.menu_controle_remoto_btn;
		this.menu_multimetro_btn = this.botoes.menu_multimetro_btn;
		this.menu_avarias_electronicas_btn = this.botoes.menu_avarias_electronicas_btn;
		this.compressor_btn = this.botoes.compressor_btn;
		this.compressor_mecanica_btn = this.botoes.compressor_mecanica_btn;
		this.compressor_electrica_btn = this.botoes.compressor_electrica_btn;
		this.vex_btn = this.botoes.vex_btn;
		this.vex_mecanica_btn = this.botoes.vex_mecanica_btn;
		this.vex_electrica_btn = this.botoes.vex_electrica_btn;
		this.ventilador_radial_btn = this.botoes.ventilador_radial_btn;
		this.ventilador_radial_mecanica_btn = this.botoes.ventilador_radial_mecanica_btn;
		this.ventilador_radial_electricidade_btn = this.botoes.ventilador_radial_electricidade_btn;
		this.sensor_btn = this.botoes.sensor_btn;
		this.sensor_mecanica_btn = this.botoes.sensor_mecanica_btn;
		this.sensor_electrica_btn = this.botoes.sensor_electrica_btn;
		this.ventilador_axial_btn = this.botoes.ventilador_axial_btn;
		this.ventilador_axial_mecanica_btn = this.botoes.ventilador_axial_mecanica_btn;
		this.ventilador_axial_electrica_btn = this.botoes.ventilador_axial_electrica_btn;
		this.transductor_btn = this.botoes.transductor_btn;
		this.transductor_mecanica_btn = this.botoes.transductor_mecanica_btn;
		this.transductor_electrica_btn = this.botoes.transductor_electrica_btn;
		this.pressostato_btn = this.botoes.pressostato_btn;
		this.pressostato_mecanica_btn = this.botoes.pressostato_mecanica_btn;
		this.pressostato_electrica_btn = this.botoes.pressostato_electrica_btn;
		this.pda_btn = this.botoes.pda_btn;
		this.pda_mecanica_btn = this.botoes.pda_mecanica_btn;
		this.pda_electrica_btn = this.botoes.pda_electrica_btn;
		this.placa_electronica_btn = this.botoes.placa_electronica_btn;
		this.placa_electronica_mecanica_btn = this.botoes.placa_electronica_mecanica_btn;
		this.placa_electronica_electrica_btn = this.botoes.placa_electronica_electrica_btn;
		this.menu_circuitos_btn = this.botoes.menu_circuitos_btn;
		this.frigorifico_btn = this.botoes.frigorifico_btn;
		this.controle_btn = this.botoes.controle_btn;
		this.potencia_btn = this.botoes.potencia_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_setpoint_btn = this.botoes.menu_setpoint_btn;
		this.menu_valores_medidas_btn = this.botoes.menu_valores_medidas_btn;
		this.menu_entradas_saidas_btn = this.botoes.menu_entradas_saidas_btn;
		this.menu_ajuda_btn = this.botoes.menu_ajuda_btn;
		this.menu_AL05_btn = this.botoes.menu_AL05_btn;
		this.menu_AL06_btn = this.botoes.menu_AL06_btn;
		this.menu_AL05a_btn = this.botoes.menu_AL05a_btn;
		this.menu_AL06a_btn = this.botoes.menu_AL06a_btn;
		this.menu_AL07_btn = this.botoes.menu_AL07_btn;
		this.menu_AL08_btn = this.botoes.menu_AL08_btn;
		this.menu_AL09_btn = this.botoes.menu_AL09_btn;
		this.menu_AL10_btn = this.botoes.menu_AL10_btn;
		this.menu_AL11_btn = this.botoes.menu_AL11_btn;
		this.menu_AL12_btn = this.botoes.menu_AL12_btn;
		this.menu_AL13_btn = this.botoes.menu_AL13_btn;
		this.menu_AL12a_btn = this.botoes.menu_AL12a_btn;
		this.menu_AL13a_btn = this.botoes.menu_AL13a_btn;
		this.menu_AL12b_btn = this.botoes.menu_AL12b_btn;
		this.menu_AL12c_btn = this.botoes.menu_AL12c_btn;
		this.menu_AL13b_btn = this.botoes.menu_AL13b_btn;
		this.ponta_preta_final_mc = this.ponta_preta.ponta_preta_final_mc;
		this.ponta_preta_inicial_mc = this.ponta_preta.ponta_preta_inicial_mc;
		this.ponta_vermelha_inicial_mc = this.ponta_vermelha.ponta_vermelha_inicial_mc;
		this.ponta_vermelha_final_mc = this.ponta_vermelha.ponta_vermelha_final_mc;
		this.J1G_btn = this.contactos_placa.J1G_btn;
		this.J1G0_btn = this.contactos_placa.J1G0_btn;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.B1J3 = this.contactos_placa.B1J3;
		this.B2J3 = this.contactos_placa.B2J3;
		this.B3J3 = this.contactos_placa.B3J3;
		this.B4J3 = this.contactos_placa.B4J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B7J3 = this.contactos_placa.B7J3;
		this.GNDJ3 = this.contactos_placa.GNDJ3;
		this.VdcJ3 = this.contactos_placa.VdcJ3;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.menu_ligar_btn = this.menus.menu_ligar_btn;
		this.menu_desligar_btn = this.menus.menu_desligar_btn;
		this.menu_tensao_ac_btn = this.menus.menu_tensao_ac_btn;
		this.menu_tensao_dc_btn = this.menus.menu_tensao_dc_btn;
		this.menu_resistencia_btn = this.menus.menu_resistencia_btn;
		this.menu_capacidade_btn = this.menus.menu_capacidade_btn;
		this.menu_corrente_btn = this.menus.menu_corrente_btn;
		this.menu_tensao_ac_milivolts_btn = this.menus.menu_tensao_ac_milivolts_btn;
		this.capa_display_mc = this.capa_display.capa_display_mc;
		this.display_texto_superior_txt = this.texto_superior.display_texto_superior_txt;
		this.display_inferior_txt = this.texto_inferior.display_inferior_txt;
		this.roda_multimetro_btn = this.roda_multimetro.roda_multimetro_btn;
		this.alarme_btn = this.controlador.alarme_btn;
		this.prog_btn = this.controlador.prog_btn;
		this.esc_btn = this.controlador.esc_btn;
		this.cima_btn = this.controlador.cima_btn;
		this.enter_btn = this.controlador.enter_btn;
		this.baixo_btn = this.controlador.baixo_btn;
		this.display_controlador_mc = this.controlador.display_controlador_mc;
		this.estado_simulador_txt = this.tela_inicial.estado_simulador_txt;
		this.stop();
	}
	this.frame_5 = function() {
		this.estado_simulador_txt = undefined;this.alarme_btn = undefined;this.prog_btn = undefined;this.esc_btn = undefined;this.cima_btn = undefined;this.enter_btn = undefined;this.baixo_btn = undefined;this.display_controlador_mc = undefined;this.roda_multimetro_btn = undefined;this.display_inferior_txt = undefined;this.display_texto_superior_txt = undefined;this.capa_display_mc = undefined;this.menu_ligar_btn = undefined;this.menu_desligar_btn = undefined;this.menu_tensao_ac_btn = undefined;this.menu_tensao_dc_btn = undefined;this.menu_resistencia_btn = undefined;this.menu_capacidade_btn = undefined;this.menu_corrente_btn = undefined;this.menu_tensao_ac_milivolts_btn = undefined;this.J1G_btn = undefined;this.J1G0_btn = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.B1J3 = undefined;this.B2J3 = undefined;this.B3J3 = undefined;this.B4J3 = undefined;this.B5J3 = undefined;this.B5J3 = undefined;this.B7J3 = undefined;this.GNDJ3 = undefined;this.VdcJ3 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.VdcJ2 = undefined;this.gndJ2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.Vref5J2 = undefined;this.ponta_vermelha_inicial_mc = undefined;this.ponta_vermelha_final_mc = undefined;this.ponta_preta_final_mc = undefined;this.ponta_preta_inicial_mc = undefined;this.menu_avarias_electricas = undefined;this.menu_controle_remoto_btn = undefined;this.menu_multimetro_btn = undefined;this.menu_avarias_electronicas_btn = undefined;this.compressor_btn = undefined;this.compressor_mecanica_btn = undefined;this.compressor_electrica_btn = undefined;this.vex_btn = undefined;this.vex_mecanica_btn = undefined;this.vex_electrica_btn = undefined;this.ventilador_radial_btn = undefined;this.ventilador_radial_mecanica_btn = undefined;this.ventilador_radial_electricidade_btn = undefined;this.sensor_btn = undefined;this.sensor_mecanica_btn = undefined;this.sensor_electrica_btn = undefined;this.ventilador_axial_btn = undefined;this.ventilador_axial_mecanica_btn = undefined;this.ventilador_axial_electrica_btn = undefined;this.transductor_btn = undefined;this.transductor_mecanica_btn = undefined;this.transductor_electrica_btn = undefined;this.pressostato_btn = undefined;this.pressostato_mecanica_btn = undefined;this.pressostato_electrica_btn = undefined;this.pda_btn = undefined;this.pda_mecanica_btn = undefined;this.pda_electrica_btn = undefined;this.placa_electronica_btn = undefined;this.placa_electronica_mecanica_btn = undefined;this.placa_electronica_electrica_btn = undefined;this.menu_circuitos_btn = undefined;this.frigorifico_btn = undefined;this.controle_btn = undefined;this.potencia_btn = undefined;this.menu_avarias_btn = undefined;this.menu_setpoint_btn = undefined;this.menu_valores_medidas_btn = undefined;this.menu_entradas_saidas_btn = undefined;this.menu_ajuda_btn = undefined;this.menu_AL05_btn = undefined;this.menu_AL06_btn = undefined;this.menu_AL05a_btn = undefined;this.menu_AL06a_btn = undefined;this.menu_AL07_btn = undefined;this.menu_AL08_btn = undefined;this.menu_AL09_btn = undefined;this.menu_AL10_btn = undefined;this.menu_AL11_btn = undefined;this.menu_AL12_btn = undefined;this.menu_AL13_btn = undefined;this.menu_AL12a_btn = undefined;this.menu_AL13a_btn = undefined;this.menu_AL12b_btn = undefined;this.menu_AL12c_btn = undefined;this.menu_AL13b_btn = undefined;this.botao_on_btn = undefined;this.botao_off_btn = undefined;this.logo_dois_mc = undefined;this.logo_dois_mc = this.logo.logo_dois_mc;
		this.botao_off_btn = this.botão_off.botao_off_btn;
		this.botao_on_btn = this.botao_on.botao_on_btn;
		this.menu_avarias_electricas = this.botoes.menu_avarias_electricas;
		this.menu_controle_remoto_btn = this.botoes.menu_controle_remoto_btn;
		this.menu_multimetro_btn = this.botoes.menu_multimetro_btn;
		this.menu_avarias_electronicas_btn = this.botoes.menu_avarias_electronicas_btn;
		this.compressor_btn = this.botoes.compressor_btn;
		this.compressor_mecanica_btn = this.botoes.compressor_mecanica_btn;
		this.compressor_electrica_btn = this.botoes.compressor_electrica_btn;
		this.vex_btn = this.botoes.vex_btn;
		this.vex_mecanica_btn = this.botoes.vex_mecanica_btn;
		this.vex_electrica_btn = this.botoes.vex_electrica_btn;
		this.ventilador_radial_btn = this.botoes.ventilador_radial_btn;
		this.ventilador_radial_mecanica_btn = this.botoes.ventilador_radial_mecanica_btn;
		this.ventilador_radial_electricidade_btn = this.botoes.ventilador_radial_electricidade_btn;
		this.sensor_btn = this.botoes.sensor_btn;
		this.sensor_mecanica_btn = this.botoes.sensor_mecanica_btn;
		this.sensor_electrica_btn = this.botoes.sensor_electrica_btn;
		this.ventilador_axial_btn = this.botoes.ventilador_axial_btn;
		this.ventilador_axial_mecanica_btn = this.botoes.ventilador_axial_mecanica_btn;
		this.ventilador_axial_electrica_btn = this.botoes.ventilador_axial_electrica_btn;
		this.transductor_btn = this.botoes.transductor_btn;
		this.transductor_mecanica_btn = this.botoes.transductor_mecanica_btn;
		this.transductor_electrica_btn = this.botoes.transductor_electrica_btn;
		this.pressostato_btn = this.botoes.pressostato_btn;
		this.pressostato_mecanica_btn = this.botoes.pressostato_mecanica_btn;
		this.pressostato_electrica_btn = this.botoes.pressostato_electrica_btn;
		this.pda_btn = this.botoes.pda_btn;
		this.pda_mecanica_btn = this.botoes.pda_mecanica_btn;
		this.pda_electrica_btn = this.botoes.pda_electrica_btn;
		this.placa_electronica_btn = this.botoes.placa_electronica_btn;
		this.placa_electronica_mecanica_btn = this.botoes.placa_electronica_mecanica_btn;
		this.placa_electronica_electrica_btn = this.botoes.placa_electronica_electrica_btn;
		this.menu_circuitos_btn = this.botoes.menu_circuitos_btn;
		this.frigorifico_btn = this.botoes.frigorifico_btn;
		this.controle_btn = this.botoes.controle_btn;
		this.potencia_btn = this.botoes.potencia_btn;
		this.menu_avarias_btn = this.botoes.menu_avarias_btn;
		this.menu_setpoint_btn = this.botoes.menu_setpoint_btn;
		this.menu_valores_medidas_btn = this.botoes.menu_valores_medidas_btn;
		this.menu_entradas_saidas_btn = this.botoes.menu_entradas_saidas_btn;
		this.menu_ajuda_btn = this.botoes.menu_ajuda_btn;
		this.menu_AL05_btn = this.botoes.menu_AL05_btn;
		this.menu_AL06_btn = this.botoes.menu_AL06_btn;
		this.menu_AL05a_btn = this.botoes.menu_AL05a_btn;
		this.menu_AL06a_btn = this.botoes.menu_AL06a_btn;
		this.menu_AL07_btn = this.botoes.menu_AL07_btn;
		this.menu_AL08_btn = this.botoes.menu_AL08_btn;
		this.menu_AL09_btn = this.botoes.menu_AL09_btn;
		this.menu_AL10_btn = this.botoes.menu_AL10_btn;
		this.menu_AL11_btn = this.botoes.menu_AL11_btn;
		this.menu_AL12_btn = this.botoes.menu_AL12_btn;
		this.menu_AL13_btn = this.botoes.menu_AL13_btn;
		this.menu_AL12a_btn = this.botoes.menu_AL12a_btn;
		this.menu_AL13a_btn = this.botoes.menu_AL13a_btn;
		this.menu_AL12b_btn = this.botoes.menu_AL12b_btn;
		this.menu_AL12c_btn = this.botoes.menu_AL12c_btn;
		this.menu_AL13b_btn = this.botoes.menu_AL13b_btn;
		this.ponta_preta_final_mc = this.ponta_preta.ponta_preta_final_mc;
		this.ponta_preta_inicial_mc = this.ponta_preta.ponta_preta_inicial_mc;
		this.ponta_vermelha_inicial_mc = this.ponta_vermelha.ponta_vermelha_inicial_mc;
		this.ponta_vermelha_final_mc = this.ponta_vermelha.ponta_vermelha_final_mc;
		this.J1G_btn = this.contactos_placa.J1G_btn;
		this.J1G0_btn = this.contactos_placa.J1G0_btn;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.B1J3 = this.contactos_placa.B1J3;
		this.B2J3 = this.contactos_placa.B2J3;
		this.B3J3 = this.contactos_placa.B3J3;
		this.B4J3 = this.contactos_placa.B4J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B5J3 = this.contactos_placa.B5J3;
		this.B7J3 = this.contactos_placa.B7J3;
		this.GNDJ3 = this.contactos_placa.GNDJ3;
		this.VdcJ3 = this.contactos_placa.VdcJ3;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.VdcJ2 = this.contactos_placa.VdcJ2;
		this.gndJ2 = this.contactos_placa.gndJ2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.Vref5J2 = this.contactos_placa.Vref5J2;
		this.menu_ligar_btn = this.menus.menu_ligar_btn;
		this.menu_desligar_btn = this.menus.menu_desligar_btn;
		this.menu_tensao_ac_btn = this.menus.menu_tensao_ac_btn;
		this.menu_tensao_dc_btn = this.menus.menu_tensao_dc_btn;
		this.menu_resistencia_btn = this.menus.menu_resistencia_btn;
		this.menu_capacidade_btn = this.menus.menu_capacidade_btn;
		this.menu_corrente_btn = this.menus.menu_corrente_btn;
		this.menu_tensao_ac_milivolts_btn = this.menus.menu_tensao_ac_milivolts_btn;
		this.capa_display_mc = this.capa_display.capa_display_mc;
		this.display_texto_superior_txt = this.texto_superior.display_texto_superior_txt;
		this.display_inferior_txt = this.texto_inferior.display_inferior_txt;
		this.roda_multimetro_btn = this.roda_multimetro.roda_multimetro_btn;
		this.alarme_btn = this.controlador.alarme_btn;
		this.prog_btn = this.controlador.prog_btn;
		this.esc_btn = this.controlador.esc_btn;
		this.cima_btn = this.controlador.cima_btn;
		this.enter_btn = this.controlador.enter_btn;
		this.baixo_btn = this.controlador.baixo_btn;
		this.display_controlador_mc = this.controlador.display_controlador_mc;
		this.estado_simulador_txt = this.tela_inicial.estado_simulador_txt;
		this.___loopingOver___ = true;
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(960,540);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(6));

	// logo_obj_
	this.logo = new lib.Scene_1_logo();
	this.logo.name = "logo";
	this.logo.setTransform(49.2,33.8,1,1,0,0,0,49.2,33.8);
	this.logo.depth = 0;
	this.logo.isAttachedToCamera = 0
	this.logo.isAttachedToMask = 0
	this.logo.layerDepth = 0
	this.logo.layerIndex = 0
	this.logo.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.logo).wait(6));

	// texto_obj_
	this.texto = new lib.Scene_1_texto();
	this.texto.name = "texto";
	this.texto.setTransform(202.3,33.8,1,1,0,0,0,202.3,33.8);
	this.texto.depth = 0;
	this.texto.isAttachedToCamera = 0
	this.texto.isAttachedToMask = 0
	this.texto.layerDepth = 0
	this.texto.layerIndex = 1
	this.texto.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.texto).wait(6));

	// botão_off_obj_
	this.botão_off = new lib.Scene_1_botão_off();
	this.botão_off.name = "botão_off";
	this.botão_off.setTransform(61.5,115,1,1,0,0,0,61.5,115);
	this.botão_off.depth = 0;
	this.botão_off.isAttachedToCamera = 0
	this.botão_off.isAttachedToMask = 0
	this.botão_off.layerDepth = 0
	this.botão_off.layerIndex = 2
	this.botão_off.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.botão_off).wait(6));

	// botao_on_obj_
	this.botao_on = new lib.Scene_1_botao_on();
	this.botao_on.name = "botao_on";
	this.botao_on.setTransform(61.5,115,1,1,0,0,0,61.5,115);
	this.botao_on.depth = 0;
	this.botao_on.isAttachedToCamera = 0
	this.botao_on.isAttachedToMask = 0
	this.botao_on.layerDepth = 0
	this.botao_on.layerIndex = 3
	this.botao_on.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.botao_on).wait(6));

	// botoes_obj_
	this.botoes = new lib.Scene_1_botoes();
	this.botoes.name = "botoes";
	this.botoes.setTransform(963.6,536,1,1,0,0,0,963.6,536);
	this.botoes.depth = 0;
	this.botoes.isAttachedToCamera = 0
	this.botoes.isAttachedToMask = 0
	this.botoes.layerDepth = 0
	this.botoes.layerIndex = 4
	this.botoes.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.botoes).wait(6));

	// ponta_preta_obj_
	this.ponta_preta = new lib.Scene_1_ponta_preta();
	this.ponta_preta.name = "ponta_preta";
	this.ponta_preta.setTransform(1148.4,482,1,1,0,0,0,1148.4,482);
	this.ponta_preta.depth = 0;
	this.ponta_preta.isAttachedToCamera = 0
	this.ponta_preta.isAttachedToMask = 0
	this.ponta_preta.layerDepth = 0
	this.ponta_preta.layerIndex = 5
	this.ponta_preta.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ponta_preta).wait(6));

	// ponta_vermelha_obj_
	this.ponta_vermelha = new lib.Scene_1_ponta_vermelha();
	this.ponta_vermelha.name = "ponta_vermelha";
	this.ponta_vermelha.setTransform(1153.5,656.1,1,1,0,0,0,1153.5,656.1);
	this.ponta_vermelha.depth = 0;
	this.ponta_vermelha.isAttachedToCamera = 0
	this.ponta_vermelha.isAttachedToMask = 0
	this.ponta_vermelha.layerDepth = 0
	this.ponta_vermelha.layerIndex = 6
	this.ponta_vermelha.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ponta_vermelha).wait(6));

	// contactos_placa_obj_
	this.contactos_placa = new lib.Scene_1_contactos_placa();
	this.contactos_placa.name = "contactos_placa";
	this.contactos_placa.setTransform(890,677.9,1,1,0,0,0,890,677.9);
	this.contactos_placa.depth = 0;
	this.contactos_placa.isAttachedToCamera = 0
	this.contactos_placa.isAttachedToMask = 0
	this.contactos_placa.layerDepth = 0
	this.contactos_placa.layerIndex = 7
	this.contactos_placa.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.contactos_placa).wait(6));

	// menus_obj_
	this.menus = new lib.Scene_1_menus();
	this.menus.name = "menus";
	this.menus.setTransform(585.7,114.5,1,1,0,0,0,585.7,114.5);
	this.menus.depth = 0;
	this.menus.isAttachedToCamera = 0
	this.menus.isAttachedToMask = 0
	this.menus.layerDepth = 0
	this.menus.layerIndex = 8
	this.menus.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.menus).wait(6));

	// capa_display_obj_
	this.capa_display = new lib.Scene_1_capa_display();
	this.capa_display.name = "capa_display";
	this.capa_display.setTransform(1767,420,1,1,0,0,0,1767,420);
	this.capa_display.depth = 0;
	this.capa_display.isAttachedToCamera = 0
	this.capa_display.isAttachedToMask = 0
	this.capa_display.layerDepth = 0
	this.capa_display.layerIndex = 9
	this.capa_display.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.capa_display).wait(6));

	// texto_superior_obj_
	this.texto_superior = new lib.Scene_1_texto_superior();
	this.texto_superior.name = "texto_superior";
	this.texto_superior.setTransform(1765.9,389.7,1,1,0,0,0,1765.9,389.7);
	this.texto_superior.depth = 0;
	this.texto_superior.isAttachedToCamera = 0
	this.texto_superior.isAttachedToMask = 0
	this.texto_superior.layerDepth = 0
	this.texto_superior.layerIndex = 10
	this.texto_superior.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.texto_superior).wait(6));

	// texto_inferior_obj_
	this.texto_inferior = new lib.Scene_1_texto_inferior();
	this.texto_inferior.name = "texto_inferior";
	this.texto_inferior.setTransform(1766.9,442.4,1,1,0,0,0,1766.9,442.4);
	this.texto_inferior.depth = 0;
	this.texto_inferior.isAttachedToCamera = 0
	this.texto_inferior.isAttachedToMask = 0
	this.texto_inferior.layerDepth = 0
	this.texto_inferior.layerIndex = 11
	this.texto_inferior.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.texto_inferior).wait(6));

	// display_multimetro_obj_
	this.display_multimetro = new lib.Scene_1_display_multimetro();
	this.display_multimetro.name = "display_multimetro";
	this.display_multimetro.setTransform(1767.2,419.5,1,1,0,0,0,1767.2,419.5);
	this.display_multimetro.depth = 0;
	this.display_multimetro.isAttachedToCamera = 0
	this.display_multimetro.isAttachedToMask = 0
	this.display_multimetro.layerDepth = 0
	this.display_multimetro.layerIndex = 12
	this.display_multimetro.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.display_multimetro).wait(6));

	// parafusos_obj_
	this.parafusos = new lib.Scene_1_parafusos();
	this.parafusos.name = "parafusos";
	this.parafusos.setTransform(176,86.5,1,1,0,0,0,176,86.5);
	this.parafusos.depth = 0;
	this.parafusos.isAttachedToCamera = 0
	this.parafusos.isAttachedToMask = 0
	this.parafusos.layerDepth = 0
	this.parafusos.layerIndex = 13
	this.parafusos.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.parafusos).wait(6));

	// roda_multimetro_obj_
	this.roda_multimetro = new lib.Scene_1_roda_multimetro();
	this.roda_multimetro.name = "roda_multimetro";
	this.roda_multimetro.setTransform(1768.3,663.7,1,1,0,0,0,1768.3,663.7);
	this.roda_multimetro.depth = 0;
	this.roda_multimetro.isAttachedToCamera = 0
	this.roda_multimetro.isAttachedToMask = 0
	this.roda_multimetro.layerDepth = 0
	this.roda_multimetro.layerIndex = 14
	this.roda_multimetro.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.roda_multimetro).wait(6));

	// multimetro_obj_
	this.multimetro = new lib.Scene_1_multimetro();
	this.multimetro.name = "multimetro";
	this.multimetro.setTransform(1765.3,628.5,1,1,0,0,0,1765.3,628.5);
	this.multimetro.depth = 0;
	this.multimetro.isAttachedToCamera = 0
	this.multimetro.isAttachedToMask = 0
	this.multimetro.layerDepth = 0
	this.multimetro.layerIndex = 15
	this.multimetro.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.multimetro).wait(6));

	// fundo_multimetro_obj_
	this.fundo_multimetro = new lib.Scene_1_fundo_multimetro();
	this.fundo_multimetro.name = "fundo_multimetro";
	this.fundo_multimetro.setTransform(1768,664.5,1,1,0,0,0,1768,664.5);
	this.fundo_multimetro.depth = 0;
	this.fundo_multimetro.isAttachedToCamera = 0
	this.fundo_multimetro.isAttachedToMask = 0
	this.fundo_multimetro.layerDepth = 0
	this.fundo_multimetro.layerIndex = 16
	this.fundo_multimetro.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fundo_multimetro).wait(6));

	// vee_obj_
	this.vee = new lib.Scene_1_vee();
	this.vee.name = "vee";
	this.vee.depth = 0;
	this.vee.isAttachedToCamera = 0
	this.vee.isAttachedToMask = 0
	this.vee.layerDepth = 0
	this.vee.layerIndex = 17
	this.vee.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.vee).wait(6));

	// compressor_obj_
	this.compressor = new lib.Scene_1_compressor();
	this.compressor.name = "compressor";
	this.compressor.depth = 0;
	this.compressor.isAttachedToCamera = 0
	this.compressor.isAttachedToMask = 0
	this.compressor.layerDepth = 0
	this.compressor.layerIndex = 18
	this.compressor.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.compressor).wait(6));

	// controlador_obj_
	this.controlador = new lib.Scene_1_controlador();
	this.controlador.name = "controlador";
	this.controlador.setTransform(1726.5,172,1,1,0,0,0,1726.5,172);
	this.controlador.depth = 0;
	this.controlador.isAttachedToCamera = 0
	this.controlador.isAttachedToMask = 0
	this.controlador.layerDepth = 0
	this.controlador.layerIndex = 19
	this.controlador.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.controlador).wait(6));

	// fundo_controlador_obj_
	this.fundo_controlador = new lib.Scene_1_fundo_controlador();
	this.fundo_controlador.name = "fundo_controlador";
	this.fundo_controlador.setTransform(1720,170,1,1,0,0,0,1720,170);
	this.fundo_controlador.depth = 0;
	this.fundo_controlador.isAttachedToCamera = 0
	this.fundo_controlador.isAttachedToMask = 0
	this.fundo_controlador.layerDepth = 0
	this.fundo_controlador.layerIndex = 20
	this.fundo_controlador.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fundo_controlador).wait(6));

	// ficha_tecnica_obj_
	this.ficha_tecnica = new lib.Scene_1_ficha_tecnica();
	this.ficha_tecnica.name = "ficha_tecnica";
	this.ficha_tecnica.setTransform(820.9,581.6,1,1,0,0,0,820.9,581.6);
	this.ficha_tecnica.depth = 0;
	this.ficha_tecnica.isAttachedToCamera = 0
	this.ficha_tecnica.isAttachedToMask = 0
	this.ficha_tecnica.layerDepth = 0
	this.ficha_tecnica.layerIndex = 21
	this.ficha_tecnica.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ficha_tecnica).wait(6));

	// tela_inicial_obj_
	this.tela_inicial = new lib.Scene_1_tela_inicial();
	this.tela_inicial.name = "tela_inicial";
	this.tela_inicial.setTransform(815.7,571,1,1,0,0,0,815.7,571);
	this.tela_inicial.depth = 0;
	this.tela_inicial.isAttachedToCamera = 0
	this.tela_inicial.isAttachedToMask = 0
	this.tela_inicial.layerDepth = 0
	this.tela_inicial.layerIndex = 22
	this.tela_inicial.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.tela_inicial).wait(6));

	// imagem_simulador_obj_
	this.imagem_simulador = new lib.Scene_1_imagem_simulador();
	this.imagem_simulador.name = "imagem_simulador";
	this.imagem_simulador.depth = 0;
	this.imagem_simulador.isAttachedToCamera = 0
	this.imagem_simulador.isAttachedToMask = 0
	this.imagem_simulador.layerDepth = 0
	this.imagem_simulador.layerIndex = 23
	this.imagem_simulador.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.imagem_simulador).wait(6));

	// fundo_obj_
	this.fundo = new lib.Scene_1_fundo();
	this.fundo.name = "fundo";
	this.fundo.setTransform(960,540,1,1,0,0,0,960,540);
	this.fundo.depth = 0;
	this.fundo.isAttachedToCamera = 0
	this.fundo.isAttachedToMask = 0
	this.fundo.layerDepth = 0
	this.fundo.layerIndex = 24
	this.fundo.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fundo).wait(6));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(959,402.6,962,687.4);
// library properties:
lib.properties = {
	id: 'C6934A9B29ABEA45BAF4C51A65D885DC',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/DeRcofXkAAaHGZ.jpg?1751961714968", id:"DeRcofXkAAaHGZ"},
		{src:"images/app_atlas_1.png?1751961713818", id:"app_atlas_1"},
		{src:"images/app_atlas_2.png?1751961713818", id:"app_atlas_2"},
		{src:"images/app_atlas_3.png?1751961713820", id:"app_atlas_3"},
		{src:"sounds/SomBotao.mp3?1751961714968", id:"SomBotao"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C6934A9B29ABEA45BAF4C51A65D885DC'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;