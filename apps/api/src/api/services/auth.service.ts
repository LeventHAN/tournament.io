import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class AuthService {
  // TODO: env var from Clerk jwt url
  private readonly client = jwksClient.default({
    jwksUri: 'https://amazed-chow-30.clerk.accounts.dev/.well-known/jwks.json', // JWT public key from dashboard clerk
  });

  async decodeAndVerifyToken(token: string): Promise<any> {
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
      throw new UnauthorizedException('Invalid decoded token');
    }

    const key = await this.getSigningKey(decodedToken.header.kid);

    const publicKey = key.getPublicKey();

    try {
      return jwt.verify(token, publicKey);
    } catch (error) {
      throw new UnauthorizedException('Invalid token signature');
    }
  }

  private async getSigningKey(kid: string): Promise<jwksClient.SigningKey> {
    return new Promise((resolve, reject) => {
      this.client.getSigningKey(kid, (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key);
        }
      });
    });
  }
}
