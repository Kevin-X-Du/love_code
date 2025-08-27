// --- Fairy Dust Cursor Script ---
(function fairyDustCursor() {
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"];
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = {x: width/2, y: width/2};
    var particles = [];

    function init() {
        bindEvents();
        loop();
    }

    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchstart', onTouchMove);
        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onTouchMove(e) {
        if(e.touches.length > 0) {
            for(var i = 0; i < e.touches.length; i++) {
                addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
            }
        }
    }

    function onMouseMove(e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {
        for(var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        for(var i = particles.length -1; i >= 0; i--) {
            if(particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    function Particle() {
        this.character = "*";
        this.lifeSpan = 120; // Lifetime in frames
        this.initialStyles = {
            "position": "fixed",
            "top": "0",
            "left": "0",
            "display": "block",
            "pointerEvents": "none",
            "z-index": "10000000",
            "fontSize": "20px",
            "will-change": "transform"
        };

        this.init = function(x, y, color) {
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };
            this.position = {x: x - 10, y: y - 20};
            this.initialStyles.color = color;

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();
            document.body.appendChild(this.element);
        };

        this.update = function() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;
            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
        };

        this.die = function() {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        };
    }

    function applyProperties(target, properties) {
        for(var key in properties) {
            target.style[key] = properties[key];
        }
    }

    init();
})();

// --- Clicking Hearts Script ---
(function(e,t,a){
    function n(){
        o();
        r();
    }
    function r(){
        for(var e=0;e<d.length;e++){
            if(d[e].alpha<=0){
                if(d[e].el.parentNode === t.body) {
                   t.body.removeChild(d[e].el);
                }
                d.splice(e,1);
                e--;
            }else{
                d[e].y--;
                d[e].scale+=.004;
                d[e].alpha-=.013;
                d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999";
            }
        }
        requestAnimationFrame(r);
    }
    function o(){
        var t_onclick="function"==typeof e.onclick&&e.onclick;
        e.onclick=function(event){
            t_onclick&&t_onclick();
            i(event);
        }
    }
    function i(e){
        var a=t.createElement("div");
        a.className="heart";
        d.push({
            el:a,
            x:e.clientX-5,
            y:e.clientY-5,
            scale:1,
            alpha:1,
            color:s()
        });
        t.body.appendChild(a);
    }
    function s(){
        return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"
    }
    var d=[];
    e.requestAnimationFrame=(function(){
        return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(callback){setTimeout(callback,1e3/60)}
    })();
    n();
})(window,document);

// --- Original Heart Animation Script ---
var settings = {
    particles: {
        length: 500,
        duration: 2,
        velocity: 100,
        effect: -0.75,
        size: 30,
    },
};

(function(){var b=0;var c=["ms","moz","webkit","o"];for(var a=0;a<c.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(h,e){var d=new Date().getTime();var f=Math.max(0,16-(d-b));var g=window.setTimeout(function(){h(d+f)},f);b=d+f;return g}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(d){clearTimeout(d)}}}());

var Point = (function() {
    function Point(x, y) {
        this.x = (typeof x !== 'undefined') ? x : 0;
        this.y = (typeof y !== 'undefined') ? y : 0;
    }
    Point.prototype.clone = function() {return new Point(this.x, this.y);};
    Point.prototype.length = function(length) {
        if (typeof length == 'undefined') return Math.sqrt(this.x * this.x + this.y * this.y);
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
    };
    Point.prototype.normalize = function() {
        var length = this.length();
        if (length === 0) return this;
        this.x /= length;
        this.y /= length;
        return this;
    };
    return Point;
})();

var Particle = (function() {
    function Particle() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
    }
    Particle.prototype.initialize = function(x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
    };
    Particle.prototype.update = function(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
    };
    Particle.prototype.draw = function(context, image) {
        function ease(t) {return (--t) * t * t + 1;}
        var size = image.width * ease(this.age / settings.particles.duration);
        if (size <= 0 || this.age >= settings.particles.duration) return;
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
    };
    return Particle;
})();

var ParticlePool = (function() {
    var particles, firstActive = 0, firstFree = 0, duration = settings.particles.duration;

    function ParticlePool(length) {
        particles = new Array(length);
        for (var i = 0; i < particles.length; i++) particles[i] = new Particle();
    }
    ParticlePool.prototype.add = function(x, y, dx, dy) {
        particles[firstFree].initialize(x, y, dx, dy);
        firstFree++;
        if (firstFree == particles.length) firstFree = 0;
        if (firstActive == firstFree) {
             firstActive++;
             if (firstActive == particles.length) firstActive = 0;
        }
    };
    ParticlePool.prototype.update = function(deltaTime) {
        var i;
        if (firstActive < firstFree) {
            for (i = firstActive; i < firstFree; i++) particles[i].update(deltaTime);
        }
        if (firstFree < firstActive) {
            for (i = firstActive; i < particles.length; i++) particles[i].update(deltaTime);
            for (i = 0; i < firstFree; i++) particles[i].update(deltaTime);
        }
        while (particles[firstActive].age >= duration && firstActive != firstFree) {
            firstActive++;
            if (firstActive == particles.length) firstActive = 0;
        }
    };
    ParticlePool.prototype.draw = function(context, image) {
        var i;
        if (firstActive < firstFree) {
            for (i = firstActive; i < firstFree; i++) particles[i].draw(context, image);
        }
        if (firstFree < firstActive) {
            for (i = firstActive; i < particles.length; i++) particles[i].draw(context, image);
            for (i = 0; i < firstFree; i++) particles[i].draw(context, image);
        }
    };
    return ParticlePool;
})();

(function(canvas) {
    if (!canvas) {
        console.error("Canvas element with id 'pinkboard' not found.");
        return;
    }
    var context = canvas.getContext('2d'),
        particles = new ParticlePool(settings.particles.length),
        particleRate = settings.particles.length / settings.particles.duration,
        time;

    function pointOnHeart(t) {
        return new Point(
            160 * Math.pow(Math.sin(t), 3),
            130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
        );
    }

    var image = (function() {
        var offscreenCanvas = document.createElement('canvas'),
            offscreenContext = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = settings.particles.size;
        offscreenCanvas.height = settings.particles.size;

        function to(t) {
            var point = pointOnHeart(t);
            point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
            point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
            return point;
        }

        offscreenContext.beginPath();
        var t = -Math.PI;
        var startPoint = to(t);
        offscreenContext.moveTo(startPoint.x, startPoint.y);
        while (t < Math.PI) {
            t += 0.01;
            var currentPoint = to(t);
            offscreenContext.lineTo(currentPoint.x, currentPoint.y);
        }
        offscreenContext.closePath();
        offscreenContext.fillStyle = '#ff30c5';
        offscreenContext.fill();

        var heartImage = new Image();
        heartImage.src = offscreenCanvas.toDataURL();
        return heartImage;
    })();

    function render() {
        requestAnimationFrame(render);
        var newTime = new Date().getTime() / 1000,
            deltaTime = newTime - (time || newTime);
        time = newTime;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1.0;

        var amount = particleRate * deltaTime;
        for (var i = 0; i < amount; i++) {
            var pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
            var dir = pos.clone().normalize().length(settings.particles.velocity);
            particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
        }

        particles.update(deltaTime);
        particles.draw(context, image);
    }

    function onResize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', onResize);

    setTimeout(function() {
        onResize();
        render();
    }, 10);

})(document.getElementById('pinkboard'));

// --- Calculate Days Script ---
function calculateDays() {
    // 移除所有文字显示逻辑，包括时间计数器
    // 不再需要任何 DOM 更新
}

// 等待 DOM 加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', calculateDays);
} else {
    calculateDays();
}