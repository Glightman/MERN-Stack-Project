const router = require("express").Router()

const swaggerUi = reqire("swagger-ui-express")
const swaggerDocument = require("../swagger.json")

router.use("/", swaggerUi.serve)
router.get("/", swaggerUi.setup(swaggerDocument))

module.exports = router