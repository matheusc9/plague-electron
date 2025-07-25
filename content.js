function createCheckbox(labelText, checked = false) {
    const label = document.createElement('label');
    label.className = 'checkbox-container';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;

    const custom = document.createElement('span');
    custom.className = 'custom-checkbox';

    label.appendChild(input);
    label.appendChild(custom);
    label.appendChild(document.createTextNode(labelText));

    return label;
}

function createSlider(labelText, min, max, value, unit = '') {
    const container = document.createElement('div');
    container.className = 'slider-container';

    const label = document.createElement('label');
    label.textContent = labelText;

    const span = document.createElement('span');
    span.textContent = value + unit;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.className = 'slider';

    slider.addEventListener('input', () => {
        span.textContent = slider.value + unit;
        updateSliderBackground(slider);
    });

    container.appendChild(label);
    container.appendChild(span);
    container.appendChild(slider);

    updateSliderBackground(slider);

    return container;
}

function createSelect(labelText, options = []) {
    const container = document.createElement('div');

    const label = document.createElement('label');
    label.textContent = labelText;

    const select = document.createElement('select');
    options.forEach(opt => {
        const option = document.createElement('option');
        option.textContent = opt;
        select.appendChild(option);
    });

    container.appendChild(label);
    container.appendChild(select);

    return container;
}

function createPanel(title) {
    const panel = document.createElement('div');
    panel.className = 'panel';

    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = title;

    panel.appendChild(sectionTitle);

    return panel;
}

function updateSliderBackground(slider) {
    const min = slider.min ? slider.min : 0;
    const max = slider.max ? slider.max : 100;
    const val = ((slider.value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #4676d7 ${val}%, #1e1f1f ${val}%)`;
}

// ---------------------------
// Criação dos panels
// ---------------------------
const container = document.getElementById('container');

const wgPanel = createPanel('Weapon group');
wgPanel.appendChild(createSelect('', ['Shared', '...']));
container.appendChild(wgPanel);

const globalPanel = createPanel('Global');
globalPanel.appendChild(createCheckbox('Enabled'));
globalPanel.appendChild(createCheckbox('Autowall'));
globalPanel.appendChild(createCheckbox('Silent'));
globalPanel.appendChild(createCheckbox('Damage override'));
globalPanel.appendChild(createCheckbox('Rapid'));
globalPanel.appendChild(createCheckbox('Backtrack'));
globalPanel.appendChild(createSlider('Field of view', 0, 180, 180, '°'));
container.appendChild(globalPanel);

const accPanel = createPanel('Accuracy');
accPanel.appendChild(createSelect('Target sorting', ['Highest damage', 'Closest']));
accPanel.appendChild(createSelect('Hitboxes', ['Head', 'Chest', 'Head, Upper chest...']));
accPanel.appendChild(createSlider('Minimum damage', 0, 100, 100, 'hp'));
accPanel.appendChild(createCheckbox('Multipoint'));
container.appendChild(accPanel);

const antiPanel = createPanel('Antiaim');
antiPanel.appendChild(createCheckbox('Enabled'));
antiPanel.appendChild(createSelect('Pitch', ['Down', 'Up']));
antiPanel.appendChild(createSelect('Yaw', ['At-targets', 'Backwards', 'Sideways']));
antiPanel.appendChild(createCheckbox('Jitter'));
container.appendChild(antiPanel);

/*
const settingsPanel = createPanel('Settings');
const closeBtn = document.createElement('button');
closeBtn.textContent = 'Close';
closeBtn.id = 'close-btn';
settingsPanel.style.width = '220px'
settingsPanel.appendChild(closeBtn);
container.appendChild(settingsPanel);
*/

// Botão de fechar
document.getElementById('close-btn').addEventListener('click', () => {
    window.api.closeApp();
});