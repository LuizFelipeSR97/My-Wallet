import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db/db.js';
import { signUpSchema, signInSchema } from '../schemas/userSchema.js';

async function signUp(req, res) {
  const { name, email, password } = req.body;

  const validation = signUpSchema.validate({ name, email, password });

  if (validation.error) {
    return res.status(400).send('Invalid body');
  }

  const encryptedPassword = bcrypt.hashSync(password, 12);

  try {
    const user = await db.collection('users').findOne({ email });

    if (user) {
      return res
        .status(409)
        .send(
          'Esse e-mail já está cadastrado. Crie uma nova conta ou utilize esse e-mail para realizar o login.'
        );
    }

    await db.collection('users').insertOne({
      name,
      email,
      password: encryptedPassword
    });

    return res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  const validation = signInSchema.validate({ email, password });

  if (validation.error) {
    return res.status(400).send('Invalid body');
  }

  try {
    const user = await db.collection('users').findOne({ email });

    const decryptedPassword = bcrypt.compareSync(password, user.password);

    if (!user || !decryptedPassword) {
      return res
        .status(401)
        .send('Credenciais inválidas. Verifique os campos e tente novamente!');
    }

    const token = uuid();
    await db.collection('sessions').insertOne({
      userId: user._id.toString(), // eslint-disable-line no-underscore-dangle
      token,
      userName: user.name
    });

    return res.send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getUserInfo(req, res) {
  const { userName } = res.locals.session;

  return res.status(200).send(userName);
}

async function deleteSession(req, res) {
  const { token } = res.locals.session;

  try {
    await db.collection('sessions').deleteOne({ token });
    return res.status(200).send('Sessão finalizada com sucesso!');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

export { signUp, signIn, getUserInfo, deleteSession };
