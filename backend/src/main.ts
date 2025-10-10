import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir requisições do frontend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'https://gastos-deputados.vercel.app', // ← Adicione sua URL da Vercel
      /\.vercel\.app$/, // ← Permite todos os subdomínios do Vercel
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Importante: 0.0.0.0 para aceitar conexões externas no Render
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Backend rodando na porta ${port}`);
}

// Executa a função bootstrap e trata erros
bootstrap().catch((error) => {
  console.error('Erro ao iniciar a aplicação:', error);
  process.exit(1);
});
