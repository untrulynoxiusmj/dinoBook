import { Context } from "https://deno.land/x/oak/mod.ts";
import { handlebarsEngine } from "../utilities/handlebars.ts"
import * as dbTs from "../db.ts"
import * as templatesTs from "../templates.ts"


export const editClaimPage = async  ({
    params,response,
      }: {
      params: {
          name: string
      }
      response: any
      }) => {
        const claim = await dbTs.claimsDB.findOne({ id: params.name })

        if (claim) {
          console.log(claim)
            response.status = 200
            var rendered = templatesTs.templateClaimEdit
            response.body = handlebarsEngine(rendered, {data: claim })
            return
        }
        response.status = 400
        response.body = { msg: `Cannot find claim ${params.name}` }
  }

export const changeClaim = async (context : Context, next: any)  => {
    const body = await context.request.body({
      contentTypes: {
        form : ['multipart', 'urlencoded']
      }
    });
    if (body.type === 'form'){
      console.log(Array.from(body.value.keys()));
      console.log(Array.from(body.value.values()));
      const info = Array.from(body.value.values())
      console.log(info)
      if (context.cookies.get("user")!=info[2]){
        context.response.body = templatesTs.navBar + `<div class=" text-2xl m-8">This claim was not added by you</div>`
        return
      }
      const { matchedCount, modifiedCount, upsertedId } = await dbTs.claimsDB.updateOne(
        {id: info[1] },
        { $set: { claim : info[3]
                   } }
      );

        if (matchedCount==0){
          context.response.status = 400
          context.response.body = templatesTs.navBar + templatesTs.cont +  `Cannot find claim ${info[3]}`
        } else{
          context.response.redirect(`/getDino/${info[0]}`)
        }

  }}



  export const claim = async (context : Context, next: any)  => {
    const body = await context.request.body({
      contentTypes: {
        form : ['multipart', 'urlencoded']
      }
    });
    if (body.type === 'form'){
      console.log(Array.from(body.value.keys()));
      console.log(Array.from(body.value.values()));
      const info = Array.from(body.value.values())
      console.log(info)
      let user = context.cookies.get("user")
      console.log(user)
      const find = await dbTs.claimsDB.findOne({user:user, dinoID:info[0]})
      if (find){
        context.response.body =templatesTs.navBar + `<div class=" text-2xl m-8">You already have one claim
        <br> Edit it <a href = "/editClaim/${find.id}"> here </a></div>`
        return
      }
      const insert = await dbTs.claimsDB.insertOne({dinoID:info[0], claim:info[2], user:user})
      const up = await dbTs.claimsDB.updateOne({_id:insert},{$set : {id:insert.$oid}})
      console.log(insert)
        if (!insert){
          context.response.status = 400
          context.response.body = templatesTs.navBar + templatesTs.cont +  `Cannot find dino ${info[0]}`
        } else{
          context.response.redirect(`/getDino/${info[0]}`)
        }

  }}

export const getClaim =  async  ({
    params,response,
      }: {
      params: {
          name: string
      }
      response: any
      }) => {
        const dino = await dbTs.dinosDB.findOne({ id : params.name})
        if (dino) {
          console.log(dino)
            response.status = 200
            var rendered = templatesTs.templateClaim
            response.body = handlebarsEngine(rendered, {data: dino })
            return
        }
        response.status = 400
        response.body =  templatesTs.navBar + templatesTs.cont +  `Cannot find dino ${params.name}`
  }


  export const deleteClaim = async  (context:any) => {
    const claim = await dbTs.claimsDB.findOne({ id : context.params.name})
    if (context.cookies.get("user")!=claim.user){
      context.response.body = templatesTs.navBar + `<div class=" text-2xl m-8">This claim was not added by you</div>`
      return
    }
    if (claim) {
      let deleteClaim = await dbTs.claimsDB.deleteOne({id:context.params.name})
      context.response.redirect("/getDino/" + claim.dinoID)
      return
    }
    context.response.status = 400
    context.response.body =  templatesTs.navBar + templatesTs.cont +  `Cannot find claim ${context.params.name}`
}