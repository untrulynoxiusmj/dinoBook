import { Router } from 'https://deno.land/x/oak/mod.ts'

import * as claimControllersTs from "./controllers/claimControllers.ts"
import * as searchControllersTs from "./controllers/searchControllers.ts"
import * as infoControllersTs from "./controllers/infoControllers.ts" 
import * as dinoControllersTs from "./controllers/dinoControllers.ts" 
import * as authControllersTs from './controllers/authControllers.ts';
import * as middlewaresTs from "./middlewares.ts"

export const router = new Router()
router

  .get('/', infoControllersTs.getDinos)
  .get('/getDino/:name', infoControllersTs.getDino)
  .post('/new', middlewaresTs.authMiddleware, dinoControllersTs.newDino)
  .get('/edit/:name', middlewaresTs.authMiddleware,dinoControllersTs.edit)
  .get('/deleteClaim/:name', middlewaresTs.authMiddleware, claimControllersTs.deleteClaim)
  .get('/delete/:name', middlewaresTs.authMiddleware, dinoControllersTs.deleteDino)
  .get('/claim/:name', middlewaresTs.authMiddleware,claimControllersTs.getClaim)
  .post('/claim', middlewaresTs.authMiddleware,  claimControllersTs.claim)
  .post('/change', middlewaresTs.authMiddleware, dinoControllersTs.change)
  .post('/editClaim', middlewaresTs.authMiddleware, claimControllersTs.changeClaim)
  .post('/signup', middlewaresTs.noAuthMiddleware, authControllersTs.signupLogic)
  .post('/login', middlewaresTs.noAuthMiddleware, authControllersTs.loginLogic)
  .get('/search/date/:name', searchControllersTs.searchDate)
  .get('/search/name/:name', searchControllersTs.searchName)
  .get('/editClaim/:name', middlewaresTs.authMiddleware, claimControllersTs.editClaimPage)
  .get('/addDino', middlewaresTs.authMiddleware, dinoControllersTs.addDino)
  .get('/signup', middlewaresTs.noAuthMiddleware, authControllersTs.signup)
  .get('/login', middlewaresTs.noAuthMiddleware, authControllersTs.login)
  .get('/search', searchControllersTs.search)
  .get('/auth', authControllersTs.auth)
  .get('/logout', middlewaresTs.authMiddleware, authControllersTs.logout)