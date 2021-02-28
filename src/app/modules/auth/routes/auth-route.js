const {Router} = require('express');
const router = Router();
const {fieldValidate} = require('../../../middlewares/field-validate');
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
        fieldValidate,
    ],
    createUser,
);

router.post(
    '/login',
    [
        ...LOGIN_MIDDLEWARE,
        fieldValidate
    ],
    loginUser,
);

router.get('/renew-token', renewToken);

module.exports = router;

