const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "../img");
const outputFolder = path.join(__dirname, "../img_resized");

const blogWidth = 400;
const blogHeight = 300;

// Criar pasta de saída se não existir
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Função para redimensionar imagens
const resizeImage = async (filePath, outputFilePath) => {
    try {
        await sharp(filePath)
            .resize(blogWidth, blogHeight, { fit: "cover" }) // "cover" garante que a imagem preencha o tamanho sem distorcer
            .toFile(outputFilePath);
        console.log(`Imagem salva: ${outputFilePath}`);
    } catch (error) {
        console.error(`Erro ao processar ${filePath}:`, error);
    }
};

// Processar todas as imagens no diretório
fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error("Erro ao ler diretório:", err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(inputFolder, file);
        const outputFilePath = path.join(outputFolder, file);

        if (/\.(jpg|jpeg|png|webp)$/i.test(file)) { // Apenas formatos suportados
            resizeImage(filePath, outputFilePath);
        } else {
            console.log(`Ignorando arquivo não suportado: ${file}`);
        }
    });
});
