import 'dotenv/config';
import app from './app.module';

/**
 * Application bootstrap
 */
function bootstrap() {
    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    });
}

bootstrap();
