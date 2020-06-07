import { Context } from "https://deno.land/x/oak/mod.ts";
import { handlebarsEngine } from "../utilities/handlebars.ts"
import {notLogged,logged, navBar, cont, templateSignup, templateLogin} from "../templates.ts"
import { users } from "../db.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import { makeJwt, setExpiration, Payload } from "https://deno.land/x/djwt/create.ts"
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import {key,header} from "../utilities/validate.ts"

export const signup =  ({
    request,
    response,
  }: {
    request: any
    response: any
  }) => {
    var rendered = navBar+cont
    rendered+= templateSignup
    response.body = handlebarsEngine(rendered, {data: {} })
  }


  export const signupLogic = async (context : Context, next: any)  => {
    const body = await context.request.body({
      contentTypes: {
        form : ['multipart', 'urlencoded']
      }
    });
    if (body.type === 'form'){
      console.log(Array.from(body.value.keys()));
      console.log(Array.from(body.value.values()));
      let info = new Array
      info = Array.from(body.value.values())

      const find = await users.findOne({user:info[0]})
      if (find || info[0]=="" || info[1]==""){
        context.response.redirect('/signup')
        return; 
      }
      else{
        const hash = await bcrypt.hash(info[1])
        const insert = await users.insertOne({
        user : info[0],
        password : hash,
        })
        context.response.redirect('/login') 
      }
    }
  }

export const loginLogic = async (context : Context, next: any)  => {
    console.log("running")
    const body = await context.request.body({
      contentTypes: {
        form : ['multipart', 'urlencoded']
      }
    });
    if (body.type === 'form'){
      console.log(Array.from(body.value.keys()));
      console.log(Array.from(body.value.values()));
      let info = new Array
      info = Array.from(body.value.values())
      const user = await users.findOne({ user: info[0] })
      console.log(user)
      if (user){
        console.log(user.password)
        const result = await bcrypt.compare(info[1],user.password)
        console.log(result)
        if (result){
          console.log("exist in db")
          const payload: Payload = {
            iss: user.user,
            exp: setExpiration(new Date().getTime() + 300000),
          }
          let jwt = makeJwt({key, header, payload});
          context.cookies.set("token", jwt)
          context.cookies.set("user", info[0])
          console.log(jwt)
          context.response.redirect('/') 
          return
        }
        context.response.redirect('/login') 
        return
      }
      context.response.redirect('/login') 
      
  }}



  export const auth = async (ctx: Context, next: any) => {
    let jwt = ctx.cookies.get("token")
    console.log(jwt) 
    let loggedIn = false
    if (!jwt) {
    }
    else if (await validateJwt(jwt, key, {isThrowing: false})){
      loggedIn = true
    }
    var rendered = navBar+cont
    if (loggedIn){
      rendered+=logged
      ctx.response.body = handlebarsEngine(rendered, {data: {} })
    }
    else{
      rendered+=notLogged
    ctx.response.body = handlebarsEngine(rendered, {data: {} })
    }
  }

export const logout = (context: Context, next: any) => {
    context.cookies.set("token","")
    context.response.redirect("/")
  }

  export const login =  ({
    request,
    response,
  }: {
    request: any
    response: any
  }) => {
    var rendered = navBar+cont
    rendered+=templateLogin
    response.body = handlebarsEngine(rendered, {data: {} })
  }
  