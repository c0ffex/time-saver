import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AvailabilityModule } from './availability/availability.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [UserModule, AvailabilityModule, ServiceModule],
})
export class AppModule {}
