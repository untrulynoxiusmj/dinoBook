import { Application } from 'https://deno.land/x/oak/mod.ts'
import { router } from "./routes.ts"
import * as environmentTs from "./utilities/environment.ts"

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${environmentTs.PORT}...`)

await app.listen(`${environmentTs.HOST}:${environmentTs.PORT}`)
