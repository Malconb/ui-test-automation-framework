import fs from 'fs';
import path from 'path';

interface Logger {
  info: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
}

const LOG_DIR = path.resolve(process.cwd(), 'logs');

// Crear carpeta si no existe
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Archivo único por ejecución - usar singleton pattern
let logStream: fs.WriteStream | null = null;

function getLogStream(): fs.WriteStream {
  if (!logStream) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFilePath = path.join(LOG_DIR, `${timestamp}.log`);
    logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
  }
  return logStream;
}

// Obtiene el nombre del archivo desde donde se llamó el logger
function getCallerFile(): string {
  const err = new Error();
  const stackLines = (err.stack || '').split('\n');

  const callerLine = stackLines[4] || '';
  const match = callerLine.match(/\((.*):\d+:\d+\)/);

  if (!match?.[1]) return 'unknown';

  const fullPath = match[1];
  return path.basename(fullPath, path.extname(fullPath));
}

type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function write(level: LogLevel, message: string): void {
  const caller = getCallerFile();
  const time = new Date().toISOString();
  const line = `[${time}] [${level}] [${caller}] ${message}\n`;
  getLogStream().write(line);
  console.log(line.trim());
}

export default function getLogger(): Logger {
  return {
    info: (msg: string): void => write('INFO', msg),
    warn: (msg: string): void => write('WARN', msg),
    error: (msg: string): void => write('ERROR', msg),
  };
}
