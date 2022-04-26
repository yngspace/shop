import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesModule } from './categories/categories.module'
import { FilesModule } from './files/files.module'
import { FiltersModule } from './filters/filters.module'
import { ProductsModule } from './products/products.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { SettingsModule } from './settings/settings.module'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from './users/users.module'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [__dirname + 'dist/**/*.entity{.ts, .js}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: true
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    CategoriesModule,
    ProductsModule,
    FiltersModule,
    FilesModule,
    SettingsModule,
    UsersModule
  ],
  exports: [JwtModule]
})
export class AppModule {}
