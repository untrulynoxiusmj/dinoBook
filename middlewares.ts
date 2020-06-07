import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { key } from "./utilities/validate.ts"

export const authMiddleware = async (ctx: Context, next: any) => {
    let jwt = ctx.cookies.get("token");
    console.log(jwt);
    if (!jwt) {
      ctx.response.status = 401;
      ctx.response.redirect('/auth');
      return;
    }
    let valid = await validateJwt(jwt, key, { isThrowing: false })
    if (valid) {
      console.log("hi",valid)
      await next();
      return;
    }
    ctx.response.status = 401;
    ctx.response.redirect('/auth');
  };
  
  
export const noAuthMiddleware = async (ctx: Context, next: any) => {
    var iris = true
    let jwt = ctx.cookies.get("token")
    console.log(jwt)
        if (!jwt) {
          iris=false
          await next();
          return;
      }
      if (!(await validateJwt(jwt, key, {isThrowing: false}))){
        iris=false
        await next();
        return;
      }
      if (iris){
        console.log("heythere")
      ctx.response.status = 401;
      ctx.response.redirect('/auth');
      }
      
  }