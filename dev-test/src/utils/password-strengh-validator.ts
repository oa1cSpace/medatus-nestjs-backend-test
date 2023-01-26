import { Injectable } from '@nestjs/common';
import * as zxcvbn from 'zxcvbn';

@Injectable()
export class PasswordStrengthValidator {
  validate(password: string) {
    const passwordScore = zxcvbn(password).score;
    if (passwordScore < 3) {
      return false;
    }
    return true;
  }
}
