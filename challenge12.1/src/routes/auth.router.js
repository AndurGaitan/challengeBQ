export const checkRole = (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles === role) {
        return next();
      }
      res.status(403).json({ error: 'Acceso no autorizado' });
    };
  }