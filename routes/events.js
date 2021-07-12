/*
    Events Routes /api/events/
*/

const express = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { fieldValidator } = require("../middlewares/field-validator");
const {
  getEventos,
  actualizarEvento,
  eliminarEvento,
  crearEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

const router = express.Router();

router.use(validarJWT);

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    fieldValidator,
  ],
  crearEvento
);

router.put("/:id", actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
