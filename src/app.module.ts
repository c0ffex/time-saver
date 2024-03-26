import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [UserModule, AvailabilityModule],
})
export class AppModule {}
