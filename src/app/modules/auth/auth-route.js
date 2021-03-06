const {Router} = require('express');
const router = Router();
const {validateFields} = require('../../middlewares/validate-fields');
const {validateJwt} = require('../../middlewares/validate-jwt');
const {
    createUser,
    loginUser,
    renewToken,
} = require('./auth-controller');
const {
    CREATE_USER_VALIDATION,
    LOGIN_USER_VALIDATION,
} = require('./validation/auth-mw-validation');

router.post(
    '/register',
    [
        ...CREATE_USER_VALIDATION,
        validateFields,
    ],
    createUser,
);

router.post(
    '/login',
    [
        ...LOGIN_USER_VALIDATION,
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

