import { Jose } from "https://deno.land/x/djwt/create.ts"


export const key = "secret-key";
export const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}
