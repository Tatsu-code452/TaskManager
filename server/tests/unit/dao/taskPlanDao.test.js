const taskPlanDao = require('../../../dao/taskPlanDao');
const commonDao = require('../../../dao/commonDao');

jest.mock('../../../dao/commonDao');

describe('taskPlanDao', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('find: baseFindが呼ばれる', async () => {
    commonDao.find.mockResolvedValue([{ id: 1 }]);
    const res = await taskPlanDao.find({ id: 1 });
    expect(commonDao.find).toHaveBeenCalledWith('task_plan', { id: 1 });
    expect(res[0].id).toBe(1);
  });

  it('insert: baseInsertが呼ばれる', async () => {
    commonDao.insert.mockResolvedValue({ id: 2, title: 'foo' });
    const res = await taskPlanDao.insert({ title: 'foo' });
    expect(commonDao.insert).toHaveBeenCalledWith('task_plan', expect.any(Object));
    expect(res.title).toBe('foo');
  });

  it('update: baseUpdateが呼ばれる', async () => {
    commonDao.update.mockResolvedValue({ id: 3, title: 'bar' });
    const res = await taskPlanDao.update(3, { title: 'bar' });
    expect(commonDao.update).toHaveBeenCalledWith('task_plan', 3, expect.any(Object));
    expect(res.id).toBe(3);
  });

  it('remove: baseRemoveが呼ばれる', async () => {
    commonDao.remove.mockResolvedValue({ id: 4 });
    const res = await taskPlanDao.remove(4);
    expect(commonDao.remove).toHaveBeenCalledWith('task_plan', 4);
    expect(res.id).toBe(4);
  });
});
