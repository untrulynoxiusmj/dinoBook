export let notLogged = ` <div class="flex items-center justify-between m-16">
<a href='signup' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Signup</a>
</div> <div class="flex items-center justify-between">
<a href='login' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</a>
</div>`


export let logged = ` <div class="flex items-center justify-between m-16">
<a href='logout' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</a>
</div>`


export let navBar = `<html> <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> `

export let nav = `<nav class="flex items-center w-screen justify-evenly flex-wrap bg-black p-5 text-2xl sticky z-10 mb-4 top-0 left-0 p-0">
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

export let cont = `<div class="flex flex-wrap justify-evenly">`

export let template = `
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


export let templateInd = `
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

<div class="flex items-center justify-between my-8">
<a href='/delete/{{data.id}}' class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</a>
</div>

</div>

</div>
</div>

<div class="flex flex-wrap flex-col items-center justify-evenly">
<div class="flex flex-wrap  w-1/8 rounded overflow-hidden container shadow-lg m-8">

<div class="px-6 py-4 content-center flex flex-col">
  <div class=" text-xl mb-2"> <strong>Claims : </strong> </div>`


  export let down = `
</div>


</div>


<div class="flex items-center justify-between pd-8 mb-16">
<a href='/claim/{{data.id}}' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add claim</a>
</div>

</div>

</div>

</body></html>`

export let templateOneClaim = `
<div class=" text-xl mb-2 pd-8 my-8">{{data.user}} : {{data.claim}}
    <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/editClaim/{{data.id}}">
    Edit </a><a class=" mx-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/deleteClaim/{{data.id}}">
    Delete </a></div>
    
`


export let templateAdd = navBar + `
<div class="flex flex-col items-center m-8" >
    <form action = "/new" method='POST' style="width:50%;">
    <h1 class="text-2xl font-bold my-8">Add a dinosaur</h1>
    <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="name">
      Name <span class="text-red-500 italic">( * required )</span>
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" placeholder="Name">
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 mb-2" for="username">
    Image 
    </label>
    <input type="file" name="image" >
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

export let templateSignup = `<div class="w-full max-w-sm m-4 text-lg">
<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="signup" method="POST">
<h1 class="text-2xl font-bold my-8">Sign Up</h1>
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

export var templateSearch = `
<div class="w-full max-w-sm m-4 text-lg">
<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"">
<h1 class="text-2xl font-bold my-8">Search a keyword</h1>
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
</script>`

export let templateLogin = `<div class="w-full max-w-sm m-4 text-lg">
<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="login" method="POST">
<h1 class="text-2xl font-bold my-8">Login</h1>
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
    <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Login">
  </div>
</form>
</div>`

export let templateClaim = navBar + `
<div class="flex flex-col items-center m-8" >

    <form action = "/claim" method='POST' style="width:50%;">
    <h1 class="text-2xl font-bold my-8">Add Claim</h1>
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

export let templateClaimEdit = navBar + `
<div class="flex flex-col items-center m-8" >
    <form action = "/editClaim" method='POST' style="width:50%;">
    <h1 class="text-2xl font-bold my-8">Edit Claim</h1>
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

  export let templateEdit = navBar + `
<div class="flex flex-col items-center m-8" >
    <form action = "/change" method='POST' style="width:50%;">
    <h1 class="text-2xl font-bold my-8">Edit Dinosaur</h1>
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
