import { Context } from "https://deno.land/x/oak/mod.ts";
import { handlebarsEngine } from "../utilities/handlebars.ts"
import { dinosDB, claimsDB } from "../db.ts"
import {navBar,cont,templateAdd,templateEdit} from "../templates.ts"


export const addDino =  ({
    request,
    response,
  }: {
    request: any
    response: any
  }) => {
    response.body = templateAdd
}

export const newDino = async (context : Context, next: any)  => {
    const body = await context.request.body({
      contentTypes: {
        form : ['multipart', 'urlencoded']
      }
    });
    if (body.type === 'form'){
      console.log(Array.from(body.value.keys()));
      // console.log(Array.from(body.value.values()));
      console.log(body.value.values());
      let features = new Array
      features = Array.from(body.value.values());
    
      const find = await dinosDB.findOne({name:features[0]})
      if (features[0]=="" || features[2]=="" || features[7]=="" || find){
        context.response.redirect(`/addDino`)
        return
      }
      var key1 = features[7].split(" ")
      var key2 = features[0].split(" ")
      var key3 = features[2].split(" ")
      var key = key1.concat(key2,key3)
      var insert = await dinosDB.insertOne({
        name: features[0],
        image: features[1],
        scientificName: features[2],
        height: features[3],
        weight: features[4],
        time: features[5],
        areas: features[6],
        summary: features[7],
        references: features[8],
        key : key
      })
      console.log(insert.$oid)
      let id = insert.$oid
      console.log(id)
      const {matchedCount, modifiedCount, upsertedId} = await dinosDB.updateOne({name:features[0]}, { $set : {id:id}})
      context.response.redirect(`/getDino/${id}`)
    }
  }

export const edit =  async  ({
    params,response,
      }: {
      params: {
          name: string
      }
      response: any
      }) => {
        const dino = await dinosDB.findOne({ id : params.name})
        if (dino) {
          console.log(dino)
            response.status = 200
            var rendered = handlebarsEngine(templateEdit, {data:dino})
            response.body = rendered
            return
        }
        response.status = 400
        response.body =  navBar + cont +  `Cannot find dino ${params.name}` 
  }

export const deleteDino = async  ({
    params,response,
      }: {
      params: {
          name: string
      }
      response: any
      }) => {
        const dino = await dinosDB.findOne({ id : params.name})
        if (dino) {
          let deleteDino = await dinosDB.deleteOne({id:params.name})
          let deleteClaim = await claimsDB.deleteMany({dinosID:params.name})
          response.redirect("/")
          return
        }
        response.status = 400
        response.body =  navBar + cont +  `Cannot find dino ${params.name}` 
  }




export const change = async (context : Context, next: any)  => {
    const body = await context.request.body({
      contentTypes: {
        form : ['multipart', 'urlencoded']
      }
    });
    console.log(context.request.url)
    if (body.type === 'form'){
      console.log(Array.from(body.value.keys()));
      console.log(Array.from(body.value.values()));
      let info = new Array
      info = Array.from(body.value.values())
      console.log(info)
      const dino = await dinosDB.findOne({name:info[0]})
      if (info[0]=="" || info[2]=="" || info[7]==""){
        context.response.redirect("/edit/" + dino.id)
        return
      }
      var key1 = info[7].split(" ")
      var key2 = info[0].split(" ")
      var key3 = info[2].split(" ")
      var key = key1.concat(key2,key3)
      const { matchedCount, modifiedCount, upsertedId } = await dinosDB.updateOne(
        {name: info[0] },
        { $set: { name: info[0],
                  image: info[1],
                  scientificName: info[2],
                  height: info[3],
                  weight: info[4],
                  time: info[5],
                  areas: info[6],
                  summary: info[7],
                  references: info[8],
                  key: key
                   } }
      );

        if (matchedCount==0){
          context.response.status = 400
          context.response.body = navBar + cont +  `Cannot find dino ${info[0]}` 
        } else{
          let main = await dinosDB.findOne({name:info[0]})
          console.log(main)
          context.response.redirect(`/getDino/${main.id}`)
        }
  }}