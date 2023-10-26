import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  `asdasldkk2as0dk02qkdasdpksldkassasadasdkjl2`
)

export const signJWT = async (
    payload: { email: string, tokenCode: number },
  ) => {
    try {
      const alg = "HS256";
      const trenutniDatum = Date.now()
      const sutra = (trenutniDatum + (24 * 60 * 60 * 1000));

      return new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt(trenutniDatum)
        .setExpirationTime(sutra)
        .sign(secret);
    } catch (error) {
      throw error;
    }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
    try {
      return (
        await jwtVerify(
          token,
          secret
        )
      ).payload as T;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
};