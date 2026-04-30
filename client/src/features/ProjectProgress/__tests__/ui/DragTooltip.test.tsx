import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DragTooltip } from '../../ui/table/cell/DragTooltip';

describe('DragTooltip', () => {
  it('コンポーネントが関数として定義されている', () => {
    expect(typeof DragTooltip).toBe('function');
  });

  it('tooltipがnullなら何も表示しない', () => {
    const { container } = render(<DragTooltip tooltip={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('mode=moveならfrom→toが表示される', () => {
    const { getByText } = render(
      <DragTooltip tooltip={{ from: 'A', to: 'B', mode: 'move', x: 0, y: 0 }} />
    );
    expect(getByText('A → B')).toBeTruthy();
  });

  it('mode=resizeならedge,from→toが表示される', () => {
    const { getByText } = render(
      <DragTooltip tooltip={{ from: '1', to: '2', mode: 'resize', edge: 'start', x: 0, y: 0 }} />
    );
    expect(getByText(/開始:1/)).toBeTruthy();
    expect(getByText(/→ 2/)).toBeTruthy();
  });
});
