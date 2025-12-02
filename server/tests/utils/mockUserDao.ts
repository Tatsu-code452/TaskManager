import * as userDao from '../../src/dao/user.dao';

export function setUserDaoMock(user = { id: 1, name: 'test', password: 'test' }) {
  (userDao.default.find as any).mockResolvedValue([user]);
  (userDao.default.findById as any).mockResolvedValue(user);
  (userDao.default.insert as any).mockResolvedValue(user);
  (userDao.default.update as any).mockResolvedValue(1);
  (userDao.default.remove as any).mockResolvedValue(1);
  (userDao.default.transaction as any).mockImplementation(async (fn: any) => await fn({}));
}
