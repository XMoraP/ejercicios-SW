const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

// URL de la página web que se va a rastrear
const urlToScrape = 'https://elpais.com';

// Función para realizar el scraping
const scrapeData = async () => {
  try {
    const html = await axios.get(urlToScrape);
    const $ = cheerio.load(html.data);

    const description = $('meta[name="description"]').attr('content');
    
    // Devuelve la descripción para que pueda ser enviada al cliente
    return description;
  } catch (error) {
    console.error('Error al realizar el scraping:', error.message);
    return 'Error al realizar el scraping';
  }
};

// Ruta a la que se accede para obtener la información
app.get('/scrape', async (req, res) => {
  // Realiza el scraping y obtén la descripción
  const description = await scrapeData();
  
  // Envía la descripción como respuesta al cliente
  res.send(`Descripción de la página web: ${description}`);
});

// Ruta para manejar la raíz
app.get('/', (req, res) => {
  res.send('¡Hola! Este es un servidor de scraping. Accede a /scrape para obtener la descripción de la página web.');
});

cron.schedule('* * * * *', () => {
  console.log('Realizando scraping...');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

