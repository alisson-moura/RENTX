import { Router } from 'express'
import multer from 'multer'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController'
import upload from '@config/upload'

const carsRoutes = Router()
const createcarController = new CreateCarController()
const listAvailableCars = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImages = new UploadCarImagesController()

const uploadImages = multer(upload.upload('./tmp/cars'))


carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createcarController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.get("/available", listAvailableCars.handle)

carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, uploadImages.array('images'),  uploadCarImages.handle)

export { carsRoutes }