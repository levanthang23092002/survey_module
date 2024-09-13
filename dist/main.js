"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.useLogger(logger);
    const configService = app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('API with NestJS')
        .setDescription('API developed throughout the API with NestJS course')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'JWT-auth')
        .build();
    app.enableCors({
        origin: 'https://example.com',
        methods: 'GET, POST',
        credentials: true,
        allowedHeaders: 'Content-Type,Authorization',
    });
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = configService.get('PORT') ?? 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map