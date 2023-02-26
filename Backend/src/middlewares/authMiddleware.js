import db from '../db/db.js';

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection('sessions').findOne({
      token
    });

    if (!session) {
      return res.sendStatus(401);
    }

    res.locals.session = {
      userId: session.userId.toString(),
      token,
      userName: session.userName
    };

    next();
  } catch (err) {
    return res.send(err.message);
  }
}

export default authMiddleware;
