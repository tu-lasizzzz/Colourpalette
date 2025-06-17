
// Get DOM elements
const generateBtn = document.getElementById('generateBtn');
const paletteContainer = document.getElementById('paletteContainer');
const copyTooltip = document.getElementById('copyTooltip');
const copiedPopup = document.getElementById('copiedPopup');

// Number of colors in each palette
const PALETTE_SIZE = 5;

// Function to generate a random hex color
function generateRandomHex() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to determine if a color is light or dark (for text contrast)
function isLightColor(hex) {
  // Remove # if present
  const color = hex.replace('#', '');
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

// Function to create a color card element
function createColorCard(hexColor) {
  const card = document.createElement('div');
  card.className = 'color-card';
  card.style.backgroundColor = hexColor;
  
  const colorInfo = document.createElement('div');
  colorInfo.className = 'color-info';
  
  const hexCode = document.createElement('div');
  hexCode.className = 'hex-code';
  hexCode.textContent = hexColor.toUpperCase();
  
  const copyInstruction = document.createElement('div');
  copyInstruction.className = 'copy-instruction';
  copyInstruction.textContent = 'Click to copy';
  
  colorInfo.appendChild(hexCode);
  colorInfo.appendChild(copyInstruction);
  card.appendChild(colorInfo);
  
  // Add click event to copy hex code
  card.addEventListener('click', () => copyToClipboard(hexColor));
  
  // Add hover events for tooltip
  card.addEventListener('mouseenter', (e) => showTooltip(e));
  card.addEventListener('mouseleave', hideTooltip);
  card.addEventListener('mousemove', updateTooltipPosition);
  
  return card;
}

// Function to generate a complete palette
function generatePalette() {
  // Clear existing palette
  paletteContainer.innerHTML = '';
  
  // Generate new colors
  for (let i = 0; i < PALETTE_SIZE; i++) {
    const hexColor = generateRandomHex();
    const colorCard = createColorCard(hexColor);
    paletteContainer.appendChild(colorCard);
  }
  
  // Add animation to new cards
  const cards = paletteContainer.querySelectorAll('.color-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Function to copy text to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showCopiedPopup();
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showCopiedPopup();
  }
}

// Function to show the "Copied!" popup
function showCopiedPopup() {
  copiedPopup.classList.add('show');
  setTimeout(() => {
    copiedPopup.classList.remove('show');
  }, 1500);
}

// Function to show tooltip on hover
function showTooltip(event) {
  copyTooltip.classList.add('show');
  updateTooltipPosition(event);
}

// Function to hide tooltip
function hideTooltip() {
  copyTooltip.classList.remove('show');
}

// Function to update tooltip position
function updateTooltipPosition(event) {
  const tooltip = copyTooltip;
  const x = event.clientX;
  const y = event.clientY;
  
  tooltip.style.left = x + 10 + 'px';
  tooltip.style.top = y - 40 + 'px';
}

// Event listener for generate button
generateBtn.addEventListener('click', generatePalette);

// Generate initial palette when page loads
document.addEventListener('DOMContentLoaded', generatePalette);

// Add keyboard support
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'Enter') {
    if (event.target === generateBtn) {
      generatePalette();
    }
  }
});

console.log('Color Palette Generator loaded successfully! 🎨');
