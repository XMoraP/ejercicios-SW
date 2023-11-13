import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Lee el diccionario desde el archivo .txt
const diccionarioPath = '../diccionario.txt';
const diccionario = fs.readFileSync(diccionarioPath, 'utf-8').split('\n').filter(word => word.trim() !== '');

app.get('/', (req, res) => {
  // Obtén el número de palabras desde la query, si no se proporciona, usa 3 como valor predeterminado
  const numberOfWords = parseInt(req.query.X, 10) || 3;

  // Selecciona X palabras aleatorias del diccionario
  const password = Array.from({ length: numberOfWords }, () => getRandomWord(diccionario));

  // Muestra la contraseña en la página principal
  res.send(`Contraseña aleatoria: ${password.join('')}`);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Función para seleccionar una palabra aleatoria del diccionario
function getRandomWord(dictionary) {
  const randomIndex = Math.floor(Math.random() * dictionary.length);
  return dictionary[randomIndex].trim();
}

