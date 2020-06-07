import { handlebarsEngine } from "../utilities/handlebars.ts"
import * as dbTs from "../db.ts"
import * as templatesTs from "../templates.ts"

export const getDinos = async ({ response }: { response: any }) => {
    const all = await dbTs.dinosDB.find({ name: { $ne: null } })
    console.log(all)
    var rendered = templatesTs.navBar+templatesTs.cont;
    for (var i=all.length-1; i>=0; i--){
      rendered += handlebarsEngine(templatesTs.template, {data: all[i]})
      console.log(all[i].claims)
      console.log(all[i]._id.$oid)
    }
    response.body = rendered
  }


export const getDino = async ({
    params,response,
    }: {
    params: {
        name: string
    }
    response: any
    }) => {
    const dino = await dbTs.dinosDB.findOne({ id : params.name})
    if (dino) {
        response.status = 200
        var rendered = templatesTs.navBar+templatesTs.cont

        const claims = await dbTs.claimsDB.find({dinoID:params.name})
        rendered += handlebarsEngine(templatesTs.templateInd, {data: dino})
        for (var i=0 ; i<claims.length; i++){
          rendered += handlebarsEngine(templatesTs.templateOneClaim, {data: claims[i]})
        }
        rendered += handlebarsEngine(templatesTs.down, {data: dino})
        response.body = rendered;
        return
    }
    response.status = 400

    response.body = templatesTs.navBar + templatesTs.cont + `Cannot find dino ${dino.name}`
}