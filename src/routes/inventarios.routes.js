import { Router } from "express";
import { getInventarios, getInventario, createInventario, updateInventario, deleteInventario, inactivarInventario, getInventariosByLocal } from '../controllers/inventarios.controller.js';

const router = Router()

//Obtener todas las inventarios
router.get('/inventarios', getInventarios);

//Obtener una Inventario
router.get('/inventarios/:id', getInventario)

//Crear Inventario
router.post('/inventarios', createInventario)

//Actualizar Inventario
router.patch('/inventarios/:id', updateInventario)

//Eliminar Inventario
router.delete('/inventarios/:id', deleteInventario)

//Inactivar Inventario
router.patch('/inactivarInventario/:id', inactivarInventario);

//Obtener Inventario por Local
router.get('/inventariosByLocal', getInventariosByLocal);

export default router;