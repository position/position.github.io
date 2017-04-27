(function(window, undefined){
	
	var FloatParticle = function(){

		var paper = Raphael('particle'),
			particleArr,
			colorArr = [ '#ffffff', '#88def8', '#fff799' ],
			pathArr,
			particleNum = 15,
			minV = 0.2, // 최소 변화량
			maxV = 0.4, // 최대 변화량
			sw = this.innerWidth,
			sh = this.innerHeight,
			rotV = 2, // 회전 변화량
			shapeLength = 6, // Shape의 길이
			radius = shapeLength / 2, // 반지름
			pathAnimDuration= 2000,
			frameRate = 1000 / 100,
			shapeChangeCnt = 0;

		function init(){
			createParticle();
		}

		function createParticle(){
			particleArr = [];

			var gridNum = Math.sqrt(particleNum),
				intNum = Math.floor(gridNum),
				decimal = gridNum - intNum,
				minMaxDiff = maxV - minV,
				xAxisNum, yAxisNum, cellWidth, cellHeight,
				colorLen = colorArr.length;
			
			if ( decimal == 0 ) {
				xAxisNum = yAxisNum = intNum;
			} else if ( decimal > 0.5 ) {
				xAxisNum = yAxisNum = intNum + 1;
			} else {
				xAxisNum = intNum + 1;
				yAxisNum = intNum;
			}
			cellWidth = Math.floor ( sw / xAxisNum );
			cellHeight = Math.floor ( sh / yAxisNum );


			var gapX = Math.round ( sw / particleNum ),
				colorLen = colorArr.length,
				minMaxDiff = maxV - minV,
				cirPath = 'M' + 1 + ',0A' + radius + ',' + radius + ',1,1,1,' + ( -0.1 ) + ',0z';


			pathArr = [cirPath];

			for(var i=0;i<particleNum;i++){
				var particle,
					valueX = Math.floor ( ( ( i % xAxisNum ) + Math.random () ) * cellWidth ),
					valueY = Math.floor ( ( Math.floor ( i / xAxisNum ) + Math.random () ) * cellHeight ),
					rotation = Math.ceil ( Math.random () * 360 ),
					colorIdx = i % colorLen,
					vx = ( minV + ( Math.random () * minMaxDiff ) ) * getDir (), //0.2 + 0.645545 * 0.2 * -1
					vy = ( minV + ( Math.random () * minMaxDiff ) ) * getDir (),
					targetColor = colorArr [ colorIdx ],
					vx = parseFloat ( vx.toFixed ( 4 ) ),
					vy = parseFloat ( vy.toFixed ( 4 ) );

				particle = paper.path(pathArr);
				particle.data('idx', i);
				particle.data ( 'x', valueX );
				particle.data ( 'y', valueY );
				particle.data ( 'r', rotation );
				particle.data ( 'vx', vx );
				particle.data ( 'vy', vy );
				particle.data ( 'colorIdx', colorIdx );

				particle.attr( { fill: targetColor, 'stroke-width': 1, 'stroke-opacity': 0, transform: 't' + valueX + ',' + valueY + 'r' + rotation } );
				particleArr.push ( particle );
				particleAnimate(particle, i*700);

			}
			setTick ();
		}

		function setTick () {
			tick = setTimeout ( updateParticles, frameRate );
		}

		function stopTick () {
			clearTimeout ( tick );
			tick = null;
		}

		function particleAnimate(particle, delay){
			var	targetIdx = particle.data ('idx'),
				curColorIdx = particle.data('colorIdx'),
				nextColorIdx = getNextColorIndex ( curColorIdx ),
				anim;

			particle.data ( 'colorIdx', nextColorIdx );

			if ( shapeChangeCnt == targetIdx ) {
				var curShapeIdx = particle.data ( 'shapeIdx' ),
					nextShapeIdx = getNextShapeIndex ( curShapeIdx );
				particle.data ( 'shapeIdx', nextShapeIdx );
				anim = Raphael.animation ( { path: pathArr [ nextShapeIdx ]}, pathAnimDuration, animShapeComplete );

			} else {
				anim = Raphael.animation ( { fill: colorArr [ nextColorIdx ] }, 1000, animColorComplete);
			}
			particle.stop().animate ( anim.delay ( delay ) );
		}

		function getNextColorIndex ( idx ) {
			var targetIdx = ( idx < colorArr.length - 1 ) ? idx + 1: 0;
			try {
				return targetIdx;
			} finally {
				idx = null;
				targetIdx = null;
			}
		}

		function getNextShapeIndex ( idx ) {
			var targetIdx = ( idx < pathArr.length - 1 ) ? idx + 1: 0;
			
			try {
				return targetIdx;
			} finally {
				idx = null;
				targetIdx = null;
			}
		}

		function animColorComplete () {
			var s = this;
			particleAnimate ( s, 2000 );
			s = null;
		}

		function animShapeComplete () {
			var s = this;
			shapeChangeCnt = ( shapeChangeCnt < particleNum - 1 ) ? shapeChangeCnt + 1 : 0;
			particleAnimate ( s, 2000 );
			s = null;
		}

		function updateParticles () {
			stopTick ();

			for ( var i = 0; i < particleNum; i++ ) {

				var particle = particleArr [ i ],
					x = particle.data ( 'x' ),
					y = particle.data ( 'y' ),
					r = particle.data ( 'r' ),
					vx = particle.data ( 'vx' ),
					vy = particle.data ( 'vy' ),
					ax = x + vx,
					ay = y + vy,
					ar = r + rotV;

					

				if ( ax < 0 || ax > sw  ) {
					particle.data ( 'vx', -vx );
					ax = x + -vx;
				}

				if ( ay < 0 || ay > sh ) {
					particle.data ( 'vy', -vy );
					ay = y + -vy;
				}

				if ( ar > 360 ) {
					ar = ( ar - 360 );
				}
				particle.data ( 'x', ax );
				particle.data ( 'y', ay );
				particle.data ( 'r', ar );

				particle.transform ( 't' + ax + ',' + ay + 'r' + ar );
				x = null; y = null; r = null; vx = null; vy = null; ax = null; ay = null; ar = null; particle = null;
			}
			i = null;

			setTick ();
		}

		function getDir () {
			var dir = ( Math.random () <= 0.5 ) ? 1 : -1;
			try {
				return dir;
			} finally {
				dir = null;
			}
		}

		init();
	
	}();

})();
