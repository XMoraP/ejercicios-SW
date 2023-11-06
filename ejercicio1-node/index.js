const config = require('./package.json').config;
const http = require('http');
const os = require('os');
const process = require('process');


const intervalo = config.intervaloSegundos * 1000;

const mostrarInfo = () => {
  if (config.mostrarCPU) console.log('Uso de CPU:', process.cpuUsage());
  if (config.mostrarMemoria) console.log('Uso de memoria:', process.memoryUsage());
  if (config.mostrarTiempoSistema) console.log('Tiempo que el sistema lleva activo:', os.uptime(), 'segundos');
  if (config.mostrarTiempoNode) console.log('Tiempo que lleva ejecutándose Node.js:', process.uptime(), 'segundos');
};

const server = http.createServer((req, res) => {
  res.end('¡Hola desde el servidor Node.js!');
});

server.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
  console.log('Información del sistema:');
  console.log('Sistema operativo:', os.platform());
  console.log('Arquitectura del sistema:', os.arch());
  console.log('Versión de Node.js:', process.version);
  setInterval(mostrarInfo, intervalo);
});
