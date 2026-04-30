import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CellVisual } from '../../ui/table/cell/CellVisual';

describe('CellVisual', () => {
  it('コンポーネントが関数として定義されている', () => {
    expect(typeof CellVisual).toBe('function');
  });

  it('valueが表示される', () => {
    const { getByText } = render(
      <CellVisual value={42} isPlan={true} isToday={false} isDelayed={false} />
    );
    expect(getByText('42')).toBeTruthy();
  });

  it('isPlan, isToday, isDelayedでclassが変わる', () => {
    const { container } = render(
      <CellVisual value={1} isPlan={true} isToday={true} isDelayed={true} />
    );
    const div = container.querySelector('div');
    expect(div?.className).toMatch(/plan_bar/);
    expect(div?.className).toMatch(/today/);
    expect(div?.className).toMatch(/delay_bar/);
  });
});
