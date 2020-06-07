import { Router } from 'https://deno.land/x/oak/mod.ts'

import { getClaim, deleteClaim, claim, changeClaim, editClaimPage } from "./controllers/claimControllers.ts"
import { searchName, searchDate, search } from "./controllers/searchControllers.ts"
import { getDinos, getDino } from "./controllers/infoControllers.ts" 
import { change, addDino, newDino, edit, deleteDino } from "./controllers/dinoControllers.ts" 
import { signup, signupLogic, login, loginLogic, auth, logout } from './controllers/authControllers.ts';
import { authMiddleware, noAuthMiddleware } from "./middlewares.ts"

export const router = new Router()
router

  .get('/', getDinos)
  .get('/getDino/:name', getDino)
  .post('/new', authMiddleware, newDino)
  .get('/edit/:name', authMiddleware,edit)
  .get('/deleteClaim/:name', authMiddleware, deleteClaim)
  .get('/delete/:name', authMiddleware, deleteDino)
  .get('/claim/:name', authMiddleware,getClaim)
  .post('/claim', authMiddleware,  claim)
  .post('/change', authMiddleware, change)
  .post('/editClaim', authMiddleware, changeClaim)
  .post('/signup', noAuthMiddleware, signupLogic)
  .post('/login', noAuthMiddleware, loginLogic)
  .get('/search/date/:name', searchDate)
  .get('/search/name/:name', searchName)
  .get('/editClaim/:name', authMiddleware, editClaimPage)
  .get('/addDino', authMiddleware, addDino)
  .get('/signup', noAuthMiddleware, signup)
  .get('/login', noAuthMiddleware, login)
  .get('/search', search)
  .get('/auth', auth)
  .get('/logout', authMiddleware, logout)