import { Application, Router, Cookies } from 'https://deno.land/x/oak/mod.ts'
import {
  engineFactory,
} from "https://deno.land/x/view_engine/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"


let jwt;
const key = "secret-key";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");
const db = client.database("dinoBook");
const dinosDB = db.collection("dinos");
const users = db.collection("users")
const claimsDB = db.collection("claims")

const env = Deno.env.toObject()
const PORT = env.PORT || 4000
const HOST = env.HOST || '127.0.0.1'

const handlebarsEngine = await engineFactory.getHandlebarsEngine();

let inUse ;

let notLogged = ` <div class="flex items-center justify-between m-16">
<a href='signup' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Signup</a>
</div> <div class="flex items-center justify-between">
<a href='login' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</a>
</div>`


let logged = ` <div class="flex items-center justify-between m-16">
<a href='logout' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</a>
</div>`


let navBar = `<html>
<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
`

const nav = `<nav class="flex items-center w-screen justify-evenly flex-wrap bg-black p-5 text-2xl sticky z-10 mb-4 top-0 left-0 p-0">
<a href = "/" class="flex items-center flex-shrink-0 text-white mr-6 ">
 DinoBook
</a>
    <a href="/addDino" class="flex items-center flex-shrink-0 text-white mr-6">
      Add Dinosaur
    </a>
    <a href="/search" class="flex items-center flex-shrink-0 text-white mr-6">
      Search
    </a>
    <a href="/auth" class="flex items-center flex-shrink-0 text-white mr-6">
      Authenticate
    </a>
    `



navBar+=nav
navBar+="</nav>"

const cont = `<div class="flex flex-wrap justify-evenly">`

const template = `
<a href="/getDino/{{data.id}}" class="p-8">
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-auto h-64" src="{{data.image}}" onerror=this.src="https://image.freepik.com/free-vector/flat-t-rex-dinosaur-background_23-2148156088.jpg" alt="https://image.freepik.com/free-vector/flat-t-rex-dinosaur-background_23-2148156088.jpg">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{{data.name}}</div>
    <!--<p class="text-gray-700 text-base">
      {{data.summary}}
    </p>-->
  </div>
</div>
</a>
`;

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






const templateInd = `
</style>

<body>

<div class="flex flex-wrap justify-evenly w-1/8 rounded overflow-hidden container shadow-lg m-8">
<img class="w-1/2" src="{{data.image}}" onerror=this.src="https://image.freepik.com/free-vector/flat-t-rex-dinosaur-background_23-2148156088.jpg" alt="https://image.freepik.com/free-vector/flat-t-rex-dinosaur-background_23-2148156088.jpg">
<div class="px-6 py-4 content-center flex  m-auto flex-col">
  <div class=" text-xl mb-2"> <strong>Name :</strong> {{data.name}}</div>
  <div class=" text-xl mb-2"><strong>Scientific Name : </strong>{{data.scientificName}}</div>
  <div class=" text-xl mb-2"><strong>Height : </strong>{{data.height}}</div>
  <div class=" text-xl mb-2"><strong>Weight :</strong> {{data.weight}}</div>
  <div class=" text-xl mb-2"><strong>Time : </strong>{{data.time}}</div>
  <div class=" text-xl mb-2"><strong>Areas :</strong> {{data.areas}}</div>
  <div class=" text-xl mb-2"><strong>Summary : </strong><p class="text-gray-600">
  {{data.summary}}
</p></div>
  <div class=" text-xl mb-2"><strong>References :</strong> <p class="text-gray-600">
  {{data.references}}
</p></div>

<div class="flex items-center justify-between">
<a href='/edit/{{data.id}}' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</a>
</div>
</div>

</div>
</div>

<div class="flex flex-wrap flex-col items-center justify-evenly">
<div class="flex flex-wrap  w-1/8 rounded overflow-hidden container shadow-lg m-8">

<div class="px-6 py-4 content-center flex flex-col">
  <div class=" text-xl mb-2"> <strong>Claims : </strong> </div>`


const down = `
</div>


</div>


<div class="flex items-center justify-between pd-8 mb-16">
<a href='/claim/{{data.id}}' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add claim</a>
</div>

</div>

</div>

</body></html>`

const templateOneClaim = `
<div class=" text-xl mb-2 pd-8 my-8">{{data.user}} : {{data.claim}}
    <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/editClaim/{{data.id}}">
    Edit </a></div>
`

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

const templateAdd = navBar + `
<div class="flex flex-col items-center m-8" >
    <form action = "/new" method='POST' style="width:50%;">

    <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="name">
      Name <span class="text-red-500 italic">( * required )</span>
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="Name">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
    Image URL
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="image" type="text" placeholder="Image URL">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Scientific Name <span class="text-red-500 italic">( * required )</span>
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="scientificName" type="text" placeholder="Scientific Name">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Height
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="height" type="text" placeholder="Height">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Weight
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="weight" type="text" placeholder="Weight">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Time
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time" type="text" placeholder="Time">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Areas
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="areas" type="text" placeholder="Areas">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Summary <span class="text-red-500 italic">( * required )</span>
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="summary" type="text" placeholder="Summary">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      References
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="references" type="text" placeholder="References">
  </div>

  <div class="flex items-center justify-between">
    <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Add">
  </div>
    </form>  </div>
`


export const addDino =  ({
    request,
    response,
  }: {
    request: any
    response: any
  }) => {
    response.body = templateAdd
}

const templateSignup = `<div class="w-full max-w-sm m-4 text-lg">
<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="signup" method="POST">
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Username
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username">
  </div>
  <div class="mb-6">
    <label class="block text-gray-700 mb-2" for="password">
      Password
    </label>
    <input class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password">
  </div>
  <div class="flex items-center justify-between">
    <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sign Up">
  </div>
</form>
</div>`

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

var templateSearch = `
<div class="w-full max-w-sm m-4 text-lg">
<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"">
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="searchDate">
      Query
    </label>
    <input class=" query shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="key" type="text" placeholder="Search">
  </div>
  <div class="flex items-center justify-between">
    <input class="searchDate bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Search">
  </div>

</div>
<script>
document.querySelector(".searchDate").addEventListener('click', ()=>{
  var current = window.location.href ;
  var key = document.querySelector(".query").value
  if (current[current.length-1]=="/"){
    window.location.href = current + "date/" + key;
  }
  else{
    window.location.href = current + "/date/" + key;
  }
})
</script>
`

export const search =  ({
  request,
  response,
}: {
  request: any
  response: any
}) => {
  var rendered = navBar+cont
  rendered+= templateSearch
  response.body = handlebarsEngine(rendered, {data: {} })
}


const authMiddleware = async (ctx: Context, next: any) => {
  jwt = ctx.cookies.get("token")
  console.log(jwt)
      if (!jwt) {
      ctx.response.status = 401;
      ctx.response.redirect('/auth')
      return;
    }
    if (await validateJwt(jwt, key, {isThrowing: false})){
      await next();
      return;
    }

    ctx.response.status = 401;
    ctx.response.redirect('/auth')
}

const noAuthMiddleware = async (ctx: Context, next: any) => {
  var iris = true
  jwt = ctx.cookies.get("token")
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

const templateLogin = `<div class="w-full max-w-sm m-4 text-lg">
<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="login" method="POST">
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
      Username
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username">
  </div>
  <div class="mb-6">
    <label class="block text-gray-700 mb-2" for="password">
      Password
    </label>
    <input class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password">
  </div>
  <div class="flex items-center justify-between">
    <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sign In">
  </div>
</form>
</div>`

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

const templateClaim = navBar + `
<div class="flex flex-col items-center m-8" >

    <form action = "/claim" method='POST' style="width:50%;">

    <div class="mb-4" >
    <label class="block text-gray-700 mb-2" for="name">
      Dinosaur ID
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="id" type="text" value="{{data.id}}" placeholder="name" readonly>
  </div>

    <div class="mb-4" >
    <label class="block text-gray-700 mb-2" for="name">
      Dinosaur Name
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" value="{{data.name}}" placeholder="name" readonly>
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
    Claim
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="claim" type="text" placeholder="Claim">
  </div>
  <div class="flex items-center justify-between">
    <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Claim">
  </div>
  </form>
`

const templateClaimEdit = navBar + `
<div class="flex flex-col items-center m-8" >
    <form action = "/editClaim" method='POST' style="width:50%;">

    <div class="mb-4" >
    <label class="block text-gray-700 mb-2" for="username">
      Dinosaur ID
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="dinoID" type="text" value="{{data.dinoID}}" placeholder="dino ID" readonly>
  </div>

    <div class="mb-4" >
    <label class="block text-gray-700 mb-2" for="username">
      Claim ID
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" value="{{data.id}}" placeholder="Claim ID" readonly>
  </div>

  <div class="mb-4" >
    <label class="block text-gray-700 mb-2" for="username">
      Added by:
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" value="{{data.user}}" placeholder="User" readonly>
  </div>

  <div class="mb-4" >
    <label class="block text-gray-700 mb-2" for="username">
      Claim
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" value="{{data.claim}}" placeholder="Claim " >
  </div>

  <div class="flex items-center justify-between">
  <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Edit">
  </div>

  </form>
  </div>

  `

const templateEdit = navBar + `
<div class="flex flex-col items-center m-8" >
    <form action = "/change" method='POST' style="width:50%;">

    <div class="mb-4" >
    <label class="block text-gray-700 mb-2" for="name">
      Name
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" value="{{data.name}}" placeholder="Username" readonly>
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="image">
    Image URL
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="image" type="text" value="{{data.image}}" placeholder="Image URL">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="sciName">
      Scientific Name <span class="text-red-500 italic">( * required )</span>
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="scientificName" type="text" placeholder="Scientific Name" value="{{data.scientificName}}" >
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="height">
      Height
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="height" type="text" value="{{data.height}}" placeholder="Height">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="weight">
      Weight
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="weight" type="text" placeholder="Weight" value="{{data.weight}}" >
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="time">
      Time
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="time" type="text" value="{{data.time}}" placeholder="Time">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="areas">
      Areas
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="areas" type="text" value="{{data.areas}}" placeholder="Areas">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="summary">
      Summary <span class="text-red-500 italic">( * required )</span>
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="summary" type="text" value="{{data.summary}}" placeholder="Summary">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="references">
      References
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="references" type="text" value="{{data.references}}" placeholder="References">
  </div>
  <div class="flex items-center justify-between">
    <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Edit">
  </div>
    </form>  </div>`

const router = new Router()
router

  .get('/', getDinos)
  // .get('/notLogged', noAuthMiddleware, getDinosNotLogged)
  .get('/getDino/:name', getDino)

  .post('/new', authMiddleware, async context => {
    const body = await context.request.body({
      contentTypes: {
        form : ['multipart', 'urlencoded']
      }
    });
    if (body.type === 'form'){
      console.log(Array.from(body.value.keys()));
      console.log(Array.from(body.value.values()));
      const features = Array.from(body.value.values());
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
      const current = await dinosDB.findOne({name:features[0]})
      let id = current._id.$oid
      console.log(id)
      const {matchedCount, modifiedCount, upsertedId} = await dinosDB.updateOne({name:features[0]}, { $set : {id:id}})
      context.response.redirect(`/getDino/${id}`)
    }
  })




    .get('/edit/:name', authMiddleware, async  ({
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
    })


    .get('/claim/:name', authMiddleware, async  ({
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
              var rendered = templateClaim
              response.body = handlebarsEngine(rendered, {data: dino })
              return
          }
          response.status = 400
          response.body =  navBar + cont +  `Cannot find dino ${params.name}`
    })



    .post('/claim', authMiddleware, async context => {
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
        const find = await claimsDB.findOne({user:user, dinoID:info[0]})
        if (find){
          context.response.body =navBar + `<div class=" text-2xl m-8">You already have one claim
          <br> Edit it <a href = "/editClaim/${find.id}"> here </a></div>`
          return
        }
        const insert = await claimsDB.insertOne({dinoID:info[0], claim:info[2], user:user})
        const up = await claimsDB.updateOne({_id:insert},{$set : {id:insert.$oid}})
        console.log(insert)
          if (!insert){
            context.response.status = 400
            context.response.body = navBar + cont +  `Cannot find dino ${info[0]}`
          } else{
            context.response.redirect(`/getDino/${info[0]}`)
          }

    }})


    .post('/change', authMiddleware, async context => {
      const body = await context.request.body({
        contentTypes: {
          form : ['multipart', 'urlencoded']
        }
      });
      console.log(context.request.url)
      if (body.type === 'form'){
        console.log(Array.from(body.value.keys()));
        console.log(Array.from(body.value.values()));
        const info = Array.from(body.value.values())
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

    }})


    .post('/editClaim', authMiddleware,async context => {
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
          context.response.body = navBar + `<div class=" text-2xl m-8">This claim was not added by you</div>`
          return
        }
        const { matchedCount, modifiedCount, upsertedId } = await claimsDB.updateOne(
          {id: info[1] },
          { $set: { claim : info[3]
                     } }
        );

          if (matchedCount==0){
            context.response.status = 400
            context.response.body = navBar + cont +  `Cannot find claim ${info[3]}`
          } else{
            context.response.redirect(`/getDino/${info[0]}`)
          }

    }})


    .post('/signup', noAuthMiddleware, async context => {
      const body = await context.request.body({
        contentTypes: {
          form : ['multipart', 'urlencoded']
        }
      });
      if (body.type === 'form'){
        console.log(Array.from(body.value.keys()));
        console.log(Array.from(body.value.values()));
        const info = Array.from(body.value.values())

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
    })

    .post('/login', noAuthMiddleware, async context => {
      console.log("running")
      const body = await context.request.body({
        contentTypes: {
          form : ['multipart', 'urlencoded']
        }
      });
      if (body.type === 'form'){
        console.log(Array.from(body.value.keys()));
        console.log(Array.from(body.value.values()));
        const info = Array.from(body.value.values())
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
            jwt = makeJwt({key, header, payload});
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

    }})

    .get('/search/date/:name', async  ({
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
            var rendered = navBar+`<div class="flex m-8 items-center justify-center searchName">
            <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Sort by name">
          </div>`+cont;
            for (var i=dinos.length-1; i>=0; i--){
              rendered += handlebarsEngine(template, {data: dinos[i]})
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
    })

    .get('/search/name/:name', async  ({
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
            var rendered = navBar+cont;
            for (var i=0; i<dinos.length; i++){
              rendered += handlebarsEngine(template, {data: dinos[i]})
            }
            response.body = rendered
              return
    })

    .get('/editClaim/:name', authMiddleware, async  ({
      params,response,
        }: {
        params: {
            name: string
        }
        response: any
        }) => {
          const claim = await claimsDB.findOne({ id: params.name })

          if (claim) {
            console.log(claim)
              response.status = 200
              var rendered = templateClaimEdit
              response.body = handlebarsEngine(rendered, {data: claim })
              return
          }
              // var rendered = handlebarsEngine(templateEdit, {data:dino})
              // response.body = rendered
          response.status = 400
          response.body = { msg: `Cannot find claim ${params.name}` }
    })



  .get('/addDino', authMiddleware, addDino)
  .get('/signup', noAuthMiddleware, signup)
  .get('/login', noAuthMiddleware, login)
  .get('/search', search)

  .get('/auth', async (ctx: Context, next: any) => {
    jwt = ctx.cookies.get("token")
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
  )

  .get('/logout', authMiddleware, async context => {
    context.cookies.set("token","")
    context.response.redirect("/")
  })


const app = new Application()

app.keys = ["asus","pumpkin"]


app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${PORT}...`)

await app.listen(`${HOST}:${PORT}`)
