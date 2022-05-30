const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log('roles', rolesArray);
    console.log('req.roles', req.roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((result) => result === true);
    console.log(result);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
