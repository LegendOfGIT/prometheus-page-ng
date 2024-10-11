export class Secrets {
  public static ITEMS: any = {
    ADMIN_SECRET: 1728479611,
  };

  public static stringToSecretHash(s: string): number {
    let hash: number = Array.from(s).reduce((s: number, c: string) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
    hash = hash < 0 ? hash * -1 : hash;
    return hash;
  }
}
