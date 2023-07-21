import { UnauthorizedException } from '@nestjs/common';
export class CustomUnauthorizedException extends UnauthorizedException {
  constructor(code: number, message: string) {
    super({ code, message });
  }
}
