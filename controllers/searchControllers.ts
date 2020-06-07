import { handlebarsEngine } from "../utilities/handlebars.ts"
import * as templatesTs from "../templates.ts"
import { dinosDB } from "../db.ts"

export const search =  ({
    request,
    response,
  }: {
    request: any
    response: any
  }) => {
    var rendered = templatesTs.navBar+templatesTs.cont
    rendered+= templatesTs.templateSearch
    response.body = handlebarsEngine(rendered, {data: {} })
  }

export const searchName = async  ({
    params,response,
      }: {
      params: {
          name: string
      }
      response: any
      }) => {
        const temp = dinosDB
        const dinos = await temp.aggregate([{$match:{key:params.name}},{$sort:{name:1}}])
        // console.log("ADD\n",add,"ADD\n")
          console.log("dinos",dinos)
          response.status = 200
          var rendered = templatesTs.navBar+templatesTs.cont;
          for (var i=0; i<dinos.length; i++){
            rendered += handlebarsEngine(templatesTs.template, {data: dinos[i]})
          }
          response.body = rendered
            return
  }

export const searchDate = async  ({
    params,response,
      }: {
      params: {
          name: string
      }
      response: any
      }) => {
        const dinos = await dinosDB.find({ key: params.name })
          console.log("dinos",dinos)
          response.status = 200
          var rendered = templatesTs.navBar+`<div class="flex m-8 items-center justify-center searchName">
          <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sort by name">
        </div>`+templatesTs.cont;
          for (var i=dinos.length-1; i>=0; i--){
            rendered += handlebarsEngine(templatesTs.template, {data: dinos[i]})
          }
          rendered+=`<script>
          document.querySelector(".searchName").addEventListener('click', ()=>{
            var current = window.location.href ;
            var splitted = current.split("/")
            console.log(splitted)
            window.location.href =  "http://" + splitted[2] + "/" + splitted[3] +"/name/" + splitted[5]
          })
          </script>`
          response.body = rendered
            return
  }