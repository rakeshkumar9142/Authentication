
const passport = require('passport');
const {register,login} = require('../controllers/authController.js');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);

