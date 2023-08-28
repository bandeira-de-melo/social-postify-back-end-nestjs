import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { PostService } from 'src/post/post.service';
import { MediaService } from 'src/media/media.service';
import { PostModule } from 'src/post/post.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports:[PostModule, MediaModule],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  exports:[PublicationService]
})
export class PublicationModule {}
