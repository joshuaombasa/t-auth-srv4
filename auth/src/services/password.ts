import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

// Configurable constants
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

class Password {
  /**
   * Hash a plain-text password with a random salt
   */
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

    return `${derivedKey.toString('hex')}.${salt}`;
  }

  /**
   * Compare a plain-text password with a stored hash
   */
  static async compare(
    suppliedPassword: string,
    storedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.');

    if (!hashedPassword || !salt) {
      throw new Error('Invalid stored password format');
    }

    const derivedKey = (await scryptAsync(suppliedPassword, salt, KEY_LENGTH)) as Buffer;
    const hashedBuffer = Buffer.from(hashedPassword, 'hex');

    // Ensure buffers are same length before timingSafeEqual
    if (hashedBuffer.length !== derivedKey.length) {
      return false;
    }

    return timingSafeEqual(derivedKey, hashedBuffer);
  }
}

export { Password };
