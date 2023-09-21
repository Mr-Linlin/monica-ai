import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  findAll() {
    return `This action returns all ticket`;
  }
}
