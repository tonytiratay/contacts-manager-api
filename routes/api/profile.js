const express = require('express');
const router = express.Router();

// @router GET api/profile
// @desc Return a user profile
// @access Private

router.get('/', (req, res) => {
	res.json({
		msg: "Profile route works"
	})
});

module.exports = router;