import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository){}

  async create(body: CreatePostDto) {
    return await this.postRepository.create(body);
  }

  async findAll() {
    return await this.postRepository.findAll()
  }

  async findOne(id: number) {
    const response = await this.postRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postRepository.remove(id)  
  }
}
