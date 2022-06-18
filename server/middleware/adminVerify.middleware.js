
const adminVerify = (req, res, next) => {
    if (req.user.role === 'admin') next();
    else res.status(404).json({ message: 'You are not allowed to access this' });
  };
  
  module.exports = { adminVerify };