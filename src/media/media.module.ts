import { Module, forwardRef } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.reposirory';
import { PublicationModule } from 'src/publication/publication.module';

@Module({
  imports:[forwardRef(() => PublicationModule)],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports:[MediaService, MediaRepository]
})
export class MediaModule {}
