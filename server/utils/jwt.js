export const sendToken = (user, statusCode, res) => {
  console.log("trying to create token");
  const token = user.getJwtToken();
  console.log("token is ",token);

  // options for cookies
  const options = {
    expires: new Date(
      Date.now() +  10*24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  console.log("sending res to client")
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};


// adding feature for refersh token thing