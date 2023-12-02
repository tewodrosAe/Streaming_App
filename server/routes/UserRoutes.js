const {
  addToLikedMovies,
  removeFromLikedMovies,
  createUser,
  getUser,
  loginUser,
  addToWatchList,
  removeFromWatchList,
} = require("../controllers/UserController");
const requireAuth = require("../middleware/requireAuth");

const router = require("express").Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.use(requireAuth)
router.get("/", getUser);
router.put("/addliked", addToLikedMovies);
router.put("/removeliked", removeFromLikedMovies);
router.put("/addwatch", addToWatchList);
router.put("/removewatch", removeFromWatchList);


module.exports = router;
