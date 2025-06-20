const projectMasterDao = require('../../../dao/projectMasterDao');
const commonDao = require('../../../dao/commonDao');

jest.mock('../../../dao/commonDao');

describe('projectMasterDao', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('find: baseFindが呼ばれる', async () => {
    commonDao.find.mockResolvedValue([{ id: 1 }]);
    const res = await projectMasterDao.find({ id: 1 });
    expect(commonDao.find).toHaveBeenCalledWith('project_master', { id: 1 });
    expect(res[0].id).toBe(1);
  });

  it('insert: baseInsertが呼ばれる', async () => {
    commonDao.insert.mockResolvedValue({ id: 2, name: 'foo' });
    const res = await projectMasterDao.insert({ name: 'foo' });
    expect(commonDao.insert).toHaveBeenCalledWith('project_master', expect.any(Object));
    expect(res.name).toBe('foo');
  });

  it('update: baseUpdateが呼ばれる', async () => {
    commonDao.update.mockResolvedValue({ id: 3, name: 'bar' });
    const res = await projectMasterDao.update(3, { name: 'bar' });
    expect(commonDao.update).toHaveBeenCalledWith('project_master', 3, expect.any(Object));
    expect(res.id).toBe(3);
  });

  it('remove: baseRemoveが呼ばれる', async () => {
    commonDao.remove.mockResolvedValue({ id: 4 });
    const res = await projectMasterDao.remove(4);
    expect(commonDao.remove).toHaveBeenCalledWith('project_master', 4);
    expect(res.id).toBe(4);
  });
});
