// server.js
import { serve } from 'bun';

serve({
  port: 3001,
  fetch(request) {
    const url = new URL(request.url);
    const fileName = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    
    return new Response(Bun.file(fileName), {
      headers: {
        'Content-Type': getContentType(fileName),
      },
    });
  },
});

function getContentType(fileName) {
  const extname = fileName.split('.').pop();
  switch (extname) {
    case 'html':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'js':
      return 'application/javascript';
    default:
      return 'text/plain';
  }
}