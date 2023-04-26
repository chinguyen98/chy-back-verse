import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IDataServices } from 'src/shared/core/data-services.abstract';

@Injectable()
export class VerificationService {
  constructor(private readonly jwtService: JwtService, private dataServices: IDataServices) {}

  public async confirmEmail(email: string) {
    const user = await this.dataServices.users.getBy({ email });
    if (user.isVerify) {
      throw new BadRequestException('Email already confirmed');
    }

    await this.dataServices.users.update(user.id, { isVerify: true });
  }

  public async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
