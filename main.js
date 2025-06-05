const pages = ['d9ee6576fe57c32980b5', 'dc51bb0457a5c67568c9', '0ec3263e0b1bba93c925'];
let currentPage = 0;
let timer = null;
let isPlaying = true;

function goToPage(pageName) {
    const baseUrl = "https://app.powerbi.com/reportEmbed?reportId=1ebb6e5b-e4f6-4e6d-ac91-329c65574ceb&autoAuth=true&ctid=012f520d-f6ca-493e-ad55-86ec0bec16c0";
    document.getElementById('powerbiFrame').src = baseUrl + "&pageName=" + pageName;
}

function goFullScreen() {
    const iframe = document.getElementById('powerbiFrame');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function startAutoRotate(intervalMs = 45000) {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        currentPage = (currentPage + 1) % pages.length;
        goToPage(pages[currentPage]);
    }, intervalMs);
    isPlaying = true;
    updatePlayPauseBtn();
    document.getElementById('floatingPlayPauseBtn').style.display = 'none';
}

function stopAutoRotate() {
    if (timer) clearInterval(timer);
    timer = null;
    isPlaying = false;
    updatePlayPauseBtn();
    document.getElementById('floatingPlayPauseBtn').style.display = 'block';
}

// Detectar cambios de pantalla completa
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    const floatingBtn = document.getElementById('floatingPlayPauseBtn');
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        floatingBtn.style.display = 'block';
        updateFloatingBtn();
    } else {
        floatingBtn.style.display = 'none';
    }
}

// Sincroniza el texto del botón flotante con el estado
function updateFloatingBtn() {
    const floatingBtn = document.getElementById('floatingPlayPauseBtn');
    floatingBtn.textContent = isPlaying ? "⏸" : "▶️";
}

// Modifica toggleAutoRotate para actualizar ambos botones
function toggleAutoRotate() {
    if (isPlaying) {
        stopAutoRotate();
    } else {
        startAutoRotate(45000);
    }
    updateFloatingBtn();
}

// Modifica updatePlayPauseBtn para actualizar ambos botones
function updatePlayPauseBtn() {
    const btn = document.getElementById('playPauseBtn');
    btn.textContent = isPlaying ? "⏸ Pausa" : "▶️ Play";
    updateFloatingBtn();
}

// Inicia la rotación automática al cargar la página
window.onload = function() {
    startAutoRotate(45000);
};