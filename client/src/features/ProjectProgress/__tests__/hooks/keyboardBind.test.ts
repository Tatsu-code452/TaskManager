import { describe, expect, it, vi } from 'vitest';
import { keyboardBind } from '../../hooks/handler/keyboardBind';

describe('keyboardBind', () => {
  it('関数として定義されている', () => {
    expect(typeof keyboardBind).toBe('function');
  });

  it('handleKeyDown: バインドしたキーでコールバックが呼ばれる', () => {
    const cb = vi.fn();
    const { handleKeyDown } = keyboardBind({ a: cb });
    const e = { key: 'a', preventDefault: vi.fn() } as any;
    handleKeyDown(e);
    expect(cb).toHaveBeenCalledWith(e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it('handleKeyDown: バインドされていないキーでは何も起きない', () => {
    const cb = vi.fn();
    const { handleKeyDown } = keyboardBind({ a: cb });
    const e = { key: 'b', preventDefault: vi.fn() } as any;
    handleKeyDown(e);
    expect(cb).not.toHaveBeenCalled();
    expect(e.preventDefault).not.toHaveBeenCalled();
  });
});
