import { Router } from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import {
  getUserConnections,
  createConnection,
} from '../controllers/connectionsController';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'Users API is Working',
    message: 'Welcome',
  });
});

router
  .route('/users')
  .get(getUsers)
  .post(createUser);
router
  .route('/users/:user_id')
  .get(getUser)
  .patch(updateUser)
  .put(updateUser)
  .delete(deleteUser);
router.route('/users/:user_id/connections').get(getUserConnections);
router.route('/users/connections').post(createConnection);

export default router;
