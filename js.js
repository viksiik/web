document.addEventListener("DOMContentLoaded", function () {
    var animatedBlock = document.getElementById('animatedBlock');
    var canvas = document.getElementById('animationCanvas');
    var ctx = canvas.getContext('2d');
    var radius = 10;

    var xOrange = canvas.width / 3;
    var yOrange = canvas.height / 2;
    var angleOrange = Math.random() * 2 * Math.PI;
    var speedOrange = 2;

    var xBlue = (2 * canvas.width) / 3;
    var yBlue = canvas.height / 2;
    var angleBlue = Math.random() * 2 * Math.PI;
    var speedBlue = 2;

    var directionOrange = 1;  // Напрямок руху для оранжевого м'ячика (1 або -1)
    var directionBlue = 1;    // Напрямок руху для синього м'ячика (1 або -1)

    canvas.width = animatedBlock.clientWidth - 10;
    canvas.height = animatedBlock.clientHeight - 50;

    var playButton = document.getElementById('playButton');
    var startButton = document.getElementById('startButton');
    var stopButton = document.getElementById('stopButton');
    var reloadButton = document.getElementById('reloadButton');
    var workArea = document.getElementById('workArea');

    var statusMessage = document.getElementById('statusMessage');
    var isRunning = false;

    function updateButtons() {
        startButton.style.display = isRunning ? 'none' : 'inline-block';
        stopButton.style.display = isRunning ? 'inline-block' : 'none';
        reloadButton.style.display = isRunning ? 'none' : 'inline-block';
    }

    function setStatusMessage(message) {
        statusMessage.textContent = message;
    }

    updateButtons();
    setStatusMessage('Очікую...');

    playButton.addEventListener('click', function () {
        workArea.style.display = 'block';
        startButton.style.display = 'inline-block';
        reloadButton.style.display = 'inline-block';
        playButton.style.display = 'none';
    });

    startButton.addEventListener('click', function () {
        isRunning = true;
        updateButtons();
        setStatusMessage('Рух!');
        animate();
    });

    stopButton.addEventListener('click', function () {
        isRunning = false;
        updateButtons();
    });

    reloadButton.addEventListener('click', function () {
        isRunning = false;
        updateButtons();
        xOrange = canvas.width / 3;
        yOrange = canvas.height / 2;
        angleOrange = Math.random() * 2 * Math.PI;
        directionOrange = 1;
        xBlue = (2 * canvas.width) / 3;
        yBlue = canvas.height / 2;
        angleBlue = Math.random() * 2 * Math.PI;
        directionBlue = 1;
        clearCanvas();
        setStatusMessage('Очікую...');
        drawBalls();
    });

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawBall(x, y, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawBalls() {
        drawBall(xOrange, yOrange, 'orange');
        drawBall(xBlue, yBlue, 'blue');
    }

    function animate() {
        drawBalls();
        clearCanvas();
        drawBalls();

        if (isRunning) {
            moveBall(xOrange, yOrange, angleOrange, speedOrange, 'orange', directionOrange);
            moveBall(xBlue, yBlue, angleBlue, speedBlue, 'blue', directionBlue);
            checkCollision();
            requestAnimationFrame(animate);
        }
    }

    function moveBall(x, y, angle, speed, color, direction) {
        var distanceToLeft = x - radius;
        var distanceToRight = canvas.width - (x + radius);
        var distanceToTop = y - radius;
        var distanceToBottom = canvas.height - (y + radius);

        if (distanceToLeft < 0) {
            angle = Math.PI - angle;
            setStatusMessage(color + ': Стук!');
            direction *= -1;  // Змінюємо напрямок руху
            angle = getRandomAngle();
            x = radius;
        } else if (distanceToRight < 0) {
            angle = Math.PI - angle;
            setStatusMessage(color + ': Стук!');
            direction *= -1;  // Змінюємо напрямок руху
            angle = getRandomAngle();
            x = canvas.width - radius;
        }

        if (distanceToTop < 0) {
            angle = 2 * Math.PI - angle;
            setStatusMessage(color + ': Стук!');
            direction *= -1;  // Змінюємо напрямок руху
            angle = getRandomAngle();
            y = radius;
        } else if (distanceToBottom < 0) {
            angle = 2 * Math.PI - angle;
            setStatusMessage(color + ': Стук!');
            direction *= -1;  // Змінюємо напрямок руху
            angle = getRandomAngle();
            y = canvas.height - radius;
        }

        x += speed * Math.cos(angle) * direction;
        y += speed * Math.sin(angle) * direction;

        if (color === 'orange') {
            xOrange = x;
            yOrange = y;
            angleOrange = angle;
            directionOrange = direction;
        } else if (color === 'blue') {
            xBlue = x;
            yBlue = y;
            angleBlue = angle;
            directionBlue = direction;
        }
    }

    function checkCollision() {
        var dx = xOrange - xBlue;
        var dy = yOrange - yBlue;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2 * radius) {
            // М'ячики перетинаються, змінюємо напрямок руху
            directionOrange *= -1;
            directionBlue *= -1;
            angleOrange = getRandomAngle();
            angleBlue = getRandomAngle();
        }
    }

    function getRandomAngle() {
        return Math.random() * 2 * Math.PI;
    }

    animate();
});
