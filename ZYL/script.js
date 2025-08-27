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
            "position": "fixed", // Changed from absolute to fixed
            "top": "0", // Start position for transform calculations
            "left": "0", // Start position for transform calculations
            "display": "block",
            "pointerEvents": "none", // Particle shouldn't interfere with clicks
            "z-index": "10000000", // Ensure particle is on top
            "fontSize": "20px",
            "will-change": "transform" // Optimize animation
        };

        this.init = function(x, y, color) {
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1 // Moves downwards
            };
            // Adjust initial position slightly relative to cursor/touch
            this.position = {x: x - 10, y: y - 20};
            this.initialStyles.color = color;

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update(); // Initial position calculation
            document.body.appendChild(this.element); // Add particle to the page
        };

        this.update = function() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;
            // Apply transform for movement and scale for fade-out effect
            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")";
        };

        this.die = function() {
            // Remove the particle element from the DOM
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        };
    }

    // Helper function to apply CSS properties to an element
    function applyProperties(target, properties) {
        for(var key in properties) {
            target.style[key] = properties[key];
        }
    }

    // Start the fairy dust effect
    init();
})();

// --- Clicking Hearts Script ---
(function(e,t,a){
    // Function n: (Originally injected CSS, now assumed to be in style.css)
    // We still need to call o() and r()
    function n(){
        // c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"); // CSS injection removed
        o(); // Setup click listener
        r(); // Start animation loop
    }
    // Function r: Animation loop for fading/moving hearts
    function r(){
        for(var e=0;e<d.length;e++){
            if(d[e].alpha<=0){ // If heart faded out
                if(d[e].el.parentNode === t.body) { // Check if it's still attached
                   t.body.removeChild(d[e].el);
                }
                d.splice(e,1); // Remove from array
                e--; // Adjust index after splice
            }else{ // Update heart properties
                d[e].y--; // Move up
                d[e].scale+=.004; // Grow slightly
                d[e].alpha-=.013; // Fade out
                // Apply styles
                d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999";
            }
        }
        requestAnimationFrame(r); // Continue the loop
    }
    // Function o: Setup click listener
    function o(){
        var t_onclick="function"==typeof e.onclick&&e.onclick; // Store existing onclick
        e.onclick=function(event){ // New onclick
            t_onclick&&t_onclick(); // Run original onclick if exists
            i(event); // Create a heart
        }
    }
    // Function i: Create a heart element on click
    function i(e){
        var a=t.createElement("div"); // Create div
        a.className="heart"; // Assign class
        d.push({ // Add heart data to array
            el:a,
            x:e.clientX-5, // Position near click X
            y:e.clientY-5, // Position near click Y
            scale:1, // Initial scale
            alpha:1, // Initial opacity
            color:s() // Get random color
        });
        t.body.appendChild(a); // Add element to body
    }
    // Function c: (CSS Injection - Removed, assuming CSS is in file)
    // function c(e){ ... }
    // Function s: Generate random RGB color string
    function s(){
        return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"
    }
    var d=[]; // Array to hold active hearts
    // Polyfill requestAnimationFrame
    e.requestAnimationFrame=(function(){
        return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(callback){setTimeout(callback,1e3/60)}
    })();
    n(); // Initialize the clicking hearts effect
})(window,document);


// --- Original Heart Animation Script ---
var settings = {
    particles: {
        length: 500,      // Lower number for potentially better performance
        duration: 2,        // How long particles last in seconds
        velocity: 100,      // How fast particles start moving
        effect: -0.75,      // Negative value means particles accelerate outwards
        size: 30,         // Base size of particles (heart image)
    },
};

// RequestAnimationFrame Polyfill (Self-Executing)
(function(){var b=0;var c=["ms","moz","webkit","o"];for(var a=0;a<c.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(h,e){var d=new Date().getTime();var f=Math.max(0,16-(d-b));var g=window.setTimeout(function(){h(d+f)},f);b=d+f;return g}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(d){clearTimeout(d)}}}());

// Point Class (for 2D coordinates)
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
        if (length === 0) return this; // Avoid division by zero
        this.x /= length;
        this.y /= length;
        return this;
    };
    return Point;
})();

// Particle Class (individual hearts in the animation)
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
        function ease(t) {return (--t) * t * t + 1;} // Ease-out cubic easing
        var size = image.width * ease(this.age / settings.particles.duration);
        // Prevent drawing particles that are too small or fully faded
        if (size <= 0 || this.age >= settings.particles.duration) return;
        context.globalAlpha = 1 - this.age / settings.particles.duration; // Fade out
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
    };
    return Particle;
})();

// ParticlePool Class (manages particle creation and recycling)
var ParticlePool = (function() {
    var particles, firstActive = 0, firstFree = 0, duration = settings.particles.duration;

    function ParticlePool(length) {
        particles = new Array(length);
        for (var i = 0; i < particles.length; i++) particles[i] = new Particle();
    }
    ParticlePool.prototype.add = function(x, y, dx, dy) {
        particles[firstFree].initialize(x, y, dx, dy);
        // Move pointer for next free particle
        firstFree++;
        if (firstFree == particles.length) firstFree = 0; // Wrap around
        // If we've wrapped around and caught up to the first active particle
        if (firstActive == firstFree) {
             firstActive++; // Force the oldest particle to become free
             if (firstActive == particles.length) firstActive = 0; // Wrap around
        }
    };
    ParticlePool.prototype.update = function(deltaTime) {
        var i;
        // Update active particles in two possible ranges (due to wrap-around)
        if (firstActive < firstFree) { // Simple case: active particles are contiguous
            for (i = firstActive; i < firstFree; i++) particles[i].update(deltaTime);
        }
        if (firstFree < firstActive) { // Wrap-around case
            for (i = firstActive; i < particles.length; i++) particles[i].update(deltaTime); // From firstActive to end
            for (i = 0; i < firstFree; i++) particles[i].update(deltaTime); // From start to firstFree
        }
        // Clean up old particles
        while (particles[firstActive].age >= duration && firstActive != firstFree) {
            firstActive++;
            if (firstActive == particles.length) firstActive = 0; // Wrap around
        }
    };
    ParticlePool.prototype.draw = function(context, image) {
        var i;
         // Draw active particles in two possible ranges
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

// Main Animation Logic (Self-Executing Function)
(function(canvas) {
    // Ensure canvas exists before proceeding
    if (!canvas) {
        console.error("Canvas element with id 'pinkboard' not found.");
        return;
    }
    var context = canvas.getContext('2d'),
        particles = new ParticlePool(settings.particles.length),
        particleRate = settings.particles.length / settings.particles.duration, // Particles per second
        time; // Stores last frame time

    // Function to calculate points on the parametric heart curve
    function pointOnHeart(t) {
        // Parametric equation for a heart shape
        return new Point(
            160 * Math.pow(Math.sin(t), 3),
            130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
        );
    }

    // Pre-render the heart image onto an offscreen canvas
    var image = (function() {
        var offscreenCanvas = document.createElement('canvas'),
            offscreenContext = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = settings.particles.size;
        offscreenCanvas.height = settings.particles.size;

        // Helper to scale heart points to the particle size
        function to(t) {
            var point = pointOnHeart(t);
            // Scale and center the point within the particle canvas
            point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
            point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
            return point;
        }

        // Draw the heart shape
        offscreenContext.beginPath();
        var t = -Math.PI; // Start angle
        var startPoint = to(t);
        offscreenContext.moveTo(startPoint.x, startPoint.y);
        while (t < Math.PI) {
            t += 0.01; // Increment angle
            var currentPoint = to(t);
            offscreenContext.lineTo(currentPoint.x, currentPoint.y);
        }
        offscreenContext.closePath();
        offscreenContext.fillStyle = '#ff30c5'; // Heart color
        offscreenContext.fill();

        // Create an Image object from the offscreen canvas
        var heartImage = new Image();
        heartImage.src = offscreenCanvas.toDataURL();
        return heartImage;
    })();

    // Main render loop
    function render() {
        requestAnimationFrame(render); // Request next frame
        var newTime = new Date().getTime() / 1000, // Current time in seconds
            deltaTime = newTime - (time || newTime); // Time since last frame
        time = newTime; // Update last frame time

        // Clear the main canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1.0; // Reset global alpha

        // Create new particles based on delta time
        var amount = particleRate * deltaTime;
        for (var i = 0; i < amount; i++) {
            // Get a random point on the heart outline
            var pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
            // Calculate initial direction (outward from the center)
            var dir = pos.clone().normalize().length(settings.particles.velocity);
             // Add particle, adjusting for canvas center and Y-axis inversion
            particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
        }

        // Update and draw all active particles
        particles.update(deltaTime);
        particles.draw(context, image); // Draw using the pre-rendered heart image
    }

    // Resize canvas handler
    function onResize() {
        // Ensure canvas fills the client area
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', onResize); // Attach resize listener

    // Initial setup: delay slightly to ensure DOM is ready and styles applied
    setTimeout(function() {
        onResize();  // Set initial canvas size
        render();    // Start the animation loop
    }, 10);

})(document.getElementById('pinkboard')); // Pass the canvas element


// --- Calculate Days Script ---
function calculateDays() {
    // Text lines for the counter display
    const lines = [
        "小余宝宝，这是我们认识的第", // Line 1 text
        "", // Line 2 (placeholder for time)
        "永远爱你，一辈子，不分离！", // Line 3 text
        "最爱你啦！小余宝宝" // Line 4 text
    ];

    // Get DOM elements for each line
    const lineElements = [
        document.getElementById('line1'),
        document.getElementById('line2'),
        document.getElementById('line3'),
        document.getElementById('line4')
    ];

    // Basic check if elements exist
    if (lineElements.some(el => !el)) {
        console.error("Counter line elements not found! Check HTML IDs.");
        return;
    }

    // Function to display lines sequentially with animation
    function displayLine(lineIndex) {
        if (lineIndex >= lines.length) return; // Stop if all lines are displayed

        const line = lines[lineIndex];
        const lineElement = lineElements[lineIndex];

        if (lineIndex === 1) { // Special handling for the time line
            startTimeUpdate(lineElement); // Start the time update function
        } else { // Handle static text lines
            lineElement.innerHTML = ''; // Clear previous content if any
            // Create and append spans for each character with animation delay
            for (let i = 0; i < line.length; i++) {
                const span = document.createElement('span');
                span.textContent = line[i];
                const charDelay = i * 0.1; // Stagger animation start
                span.style.animationDelay = `${charDelay}s`;
                span.style.opacity = '0'; // Ensure starts invisible before animation kicks in
                lineElement.appendChild(span);
            }
        }

        // Set timeout to display the next line after a delay
        // Adjust delay based on line length for a more natural feel
        const lineDisplayDelay = lineIndex === 1 ? 1000 : Math.max(500, line.length * 100 + 200);
        setTimeout(() => displayLine(lineIndex + 1), lineDisplayDelay);
    }

    // Function to update the time counter continuously
    function startTimeUpdate(timeLineElement) {
        const startDate = new Date('2025-08-26T15:49:39+08:00'); // The target start date/time (CST)

        function updateTime() {
            // Get current date/time in Shanghai timezone
            const currentDateCSTStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' });
            const currentDateCST = new Date(currentDateCSTStr);

            const timeDiff = currentDateCST - startDate; // Difference in milliseconds

            let days, hours, minutes, seconds;

            if (timeDiff < 0) { // If the start date is in the future
                days = 0;
                hours = '00';
                minutes = '00';
                seconds = '00';
                // Optionally display a "coming soon" message or countdown
            } else {
                // Calculate time components
                days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                hours = String(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                minutes = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                seconds = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, '0');
            }

            // Format the time string
            const timeText = `${days}天${hours}小时${minutes}分钟${seconds}秒`;

            // Update the DOM efficiently
            // Only apply animation on the very first update
            const isInitialized = timeLineElement.hasAttribute('data-initialized');
            timeLineElement.innerHTML = ''; // Clear previous content

            for (let i = 0; i < timeText.length; i++) {
                const span = document.createElement('span');
                span.textContent = timeText[i];
                if (!isInitialized) { // Only animate the first time
                    const charDelay = i * 0.05; // Slightly faster animation for time update
                    span.style.animationDelay = `${charDelay}s`;
                    span.style.opacity = '0';
                } else {
                    span.style.opacity = '1'; // Ensure visible on subsequent updates
                }
                timeLineElement.appendChild(span);
            }

            if (!isInitialized) {
                timeLineElement.setAttribute('data-initialized', 'true'); // Mark as initialized
            }
        }

        updateTime(); // Initial update
        setInterval(updateTime, 1000); // Update every second
    }

    // Start displaying the first line
    displayLine(0);
}

// Wait for the DOM to be fully loaded before running the script
// This replaces window.onload to allow other scripts to use onload if needed
if (document.readyState === 'loading') { // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', calculateDays);
} else { // `DOMContentLoaded` has already fired
    calculateDays();
}