import { handlebarsEngine } from "../utilities/handlebars.ts"
import { dinosDB, claimsDB } from "../db.ts"
import {navBar,cont,template,templateInd,down,templateOneClaim} from "../templates.ts"

export const getDinos = async ({ response }: { response: any }) => {
    const all = await dinosDB.find({ name: { $ne: null } })
    console.log(all)
    var rendered = navBar+cont;
    for (var i=all.length-1; i>=0; i--){
      rendered += handlebarsEngine(template, {data: all[i]})
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
    const dino = await dinosDB.findOne({ id : params.name})
    if (dino) {
        response.status = 200
        var rendered = navBar+cont

        const claims = await claimsDB.find({dinoID:params.name})
        rendered += handlebarsEngine(templateInd, {data: dino})
        for (var i=0 ; i<claims.length; i++){
          rendered += handlebarsEngine(templateOneClaim, {data: claims[i]})
        }
        rendered += handlebarsEngine(down, {data: dino})
        response.body = rendered;
        return
    }
    response.status = 400

    response.body = navBar + cont + `Cannot find dino ${dino.name}`
}