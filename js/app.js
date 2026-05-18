fetch('data.json')
    .then(response => response.json())
    .then(data => {
        buildMenu(data.flowers);
    })
    .catch(error => console.error('Error loading data:', error));

function buildMenu(flowers) {
    const menu = document.getElementById('flowerMenu');
    flowers.forEach(flower => {
        const li = document.createElement('li')
        li.textContent = flower.title;
        li.addEventListener('click', () => {
            document.querySelectorAll('.flower-menu li').forEach(item => {
                item.classList.remove('active');
            });
            li.classList.add('active');
            showFlower(flower);
        });
        menu.appendChild(li);
    });
}
function showFlower(flower) {
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = `
        <h2>${flower.title}</h2>
        <div class="row align-items-center mt-3">
            <div class="col-md-6">
                <img src="${flower.image}" alt="${flower.title}" onerror="this.style.display='none'">
            </div>
            <div class="col-md-6">
                <p>${flower.text}</p>
                <audio controls>
                    <source src="${flower.audio}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
        <div class="grow-section mt-4">
            <button class="grow-btn" onclick="toggleGrow()">Grow Your Own!</button>
            <div id="growContent" class="grow-content" style="display:none;">
                <ul>
                    <li><strong>Sunlight:</strong> ${flower.growing.sunlight}</li>
                    <li><strong>Water:</strong> ${flower.growing.water}</li>
                    <li><strong>Soil:</strong> ${flower.growing.soil}</li>
                    <li><strong>Best Season:</strong> ${flower.growing.season}</li>
                    <li><strong>Tip:</strong> ${flower.growing.tip}</li>
                </ul>
            </div>
        </div>
    `;
}

function toggleGrow() {
    const content = document.getElementById('growContent');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
        installBtn.style.display = 'block';

        installBtn.onclick = () => {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then(() => {
                deferredPrompt = null;
                installBtn.style.display = 'none';
            });
        };
    }
});
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered!'))
        .catch(err => console.error('Service Worker error:', err));
}