const {Router} = require('express');
const router = Router();
const {validateFields} = require('../../../middlewares/validate-fields');
const {validateJwt} = require('../../../middlewares/validate-jwt');
const {
    createUser,
    loginUser,
    renewToken,
} = require('../controllers/auth-controller');
const {
    CREATE_MIDDLEWARE,
    LOGIN_MIDDLEWARE,
} = require('../validation/auth-middleware');

router.post(
    '/create',
    [
        ...CREATE_MIDDLEWARE,
        validateFields,
    ],
    createUser,
);

router.post(
    '/login',
    [
        ...LOGIN_MIDDLEWARE,
        validateFields
    ],
    loginUser,
);

router.get(
    '/renew-token',
    [
        validateJwt,
    ],
    renewToken,
);

module.exports = router;

