import env from '../../src/common/env';

jest.mock('pg', () => {
    return {
        Pool: jest.fn().mockImplementation((config) => ({ config })),
    };
});

describe('pool', () => {
    afterEach(() => {
        jest.resetModules();
    });

    it('envの値でPoolが生成される', () => {
        jest.doMock('../../src/common/env', () => ({
            __esModule: true,
            default: {
                DB_HOST: 'localhost',
                DB_PORT: '5432',
                DB_USER: 'user',
                DB_PASSWORD: 'pass',
                DB_NAME: 'testdb',
            },
        }));
        const { Pool } = require('pg');
        const poolModule = require('../../src/dao/pool');
        expect(Pool).toHaveBeenCalledWith({
            host: 'localhost',
            port: 5432,
            user: 'user',
            password: 'pass',
            database: 'testdb',
            max: 20,
            idleTimeoutMillis: 30000,
        });
        expect(poolModule.default).toBeDefined();
    });

    it('DB_PORTが数値でも正しく渡る', () => {
        jest.doMock('../../src/common/env', () => ({
            __esModule: true,
            default: {
                DB_HOST: 'localhost',
                DB_PORT: 1234,
                DB_USER: 'user',
                DB_PASSWORD: 'pass',
                DB_NAME: 'testdb',
            },
        }));
        const { Pool } = require('pg');
        require('../../src/dao/pool');
        expect(Pool).toHaveBeenCalledWith(
            expect.objectContaining({ port: 1234 })
        );
    });
});
