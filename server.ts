import { Application } from 'https://deno.land/x/oak/mod.ts'
import { router } from "./routes.ts"
import { PORT, HOST } from "./utilities/environment.ts"

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${PORT}...`)

await app.listen(`${HOST}:${PORT}`)
