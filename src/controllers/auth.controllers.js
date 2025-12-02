import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  // validation
  if (!email || !password) {
  }
  if (password.length < 8) {
  }

  const isValidated = validateMe(password);
});

export { registerUser };
