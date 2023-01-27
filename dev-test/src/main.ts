import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

const PORT = process.env.PORT;
const PID = process.pid;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      name: 'medatus sid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT, () => {
    console.info(
      `[INFO] 🟢 Server started on port ${PORT} with process ID: ${PID}`,
    );
  });
}
bootstrap().then();
