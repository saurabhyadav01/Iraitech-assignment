
module.exports = function (token) {
  return function (req, res, next) {
    // first get the user from the req
    const user = req.user;

    // check if user has any of the permittedRoles
    let isPermitted = false;
    if(token)
    {
      isPermitted=true
    }

    // if not then throw an error
    if (!isPermitted) {
      return res.status(403).send({ message: "Permission denied" });
    }
    // if yes then return next
    return next();
  };
};