const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 100;

function createStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 1 + 0.5
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

createStars();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0;
    createStars();
});

const volumeSlider = document.getElementById('volume-slider');
const audio = document.getElementById('background-music');
const volumeIcon = document.getElementById('volume-icon');

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    volumeIcon.textContent = audio.volume === 0 ? '🔇' : '🔊';
});

document.body.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    }
});

const trackName = document.getElementById('track-name');
const musicTimeline = document.getElementById('music-timeline');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');

trackName.textContent = 'Phantom Liberty';

totalTimeDisplay.textContent = '5:48';

audio.addEventListener('loadedmetadata', () => {
    musicTimeline.max = 348; 
});

audio.addEventListener('timeupdate', () => {
    musicTimeline.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}