const {Router} = require('express');
const {validateJwt} = require('../../middlewares/validate-jwt');
const {validateFields} = require('../../middlewares/validate-fields');
const {
    create,
    update,
    findAll,
    findById,
    deleteOne,
} = require('./event-controller');
const {
    CREATE_EVENT_VALIDATION,
} = require('./validation/event-mw-validation');

const router = Router();

router.use(validateJwt);

router.get(
    '/',
    [],
    findAll,
);

router.get(
    '/:id',
    [],
    findById,
);

router.post(
    '/',
    [
        ...CREATE_EVENT_VALIDATION,
        validateFields,
    ],
    create,
);

router.put(
    '/:id',
    [],
    update,
)

router.delete(
    '/:id',
    [],
    deleteOne,
)

module.exports = router;