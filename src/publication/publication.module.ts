import { Module, forwardRef } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PostModule } from 'src/post/post.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports:[forwardRef(() => PostModule), forwardRef(() => MediaModule)],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  exports:[PublicationService]
})
export class PublicationModule {}
