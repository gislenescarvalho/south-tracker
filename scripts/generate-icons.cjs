const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Fundo
    ctx.fillStyle = '#4F46E5';
    ctx.fillRect(0, 0, size, size);

    // Texto
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${size * 0.15}px Arial`;

    // Texto simples
    ctx.fillText('ST', size / 2, size / 2);

    // Salva o arquivo
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`public/icons/icon-${size}x${size}.png`, buffer);
    console.log(`Ícone ${size}x${size} gerado com sucesso!`);
}

// Cria o diretório se não existir
if (!fs.existsSync('public/icons')) {
    fs.mkdirSync('public/icons', { recursive: true });
}

// Gera os ícones
sizes.forEach(generateIcon); 