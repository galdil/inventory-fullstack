import express from 'express';


export default function configureRoutes(app: express.Application) {
  app.get('/api/health', (req, res) => res.send('Hello'));
}
