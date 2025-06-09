// ダミーデータ
const tasks = [
    { id: 1, name: '要件定義', start: '2025-06-01', end: '2025-06-05', workload: 8, priority: '高', category: '設計', assignee: '山田' },
    { id: 2, name: '設計', start: '2025-06-06', end: '2025-06-10', workload: 10, priority: '中', category: '設計', assignee: '佐藤' },
    { id: 3, name: '開発', start: '2025-06-11', end: '2025-06-20', workload: 20, priority: '高', category: '開発', assignee: '鈴木' },
];

const chartStart = new Date('2025-06-01');
const chartEnd = new Date('2025-06-30');
const dayWidth = 24; // 1日あたりのpx幅

function dateDiff(start, end) {
    return (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
}

function renderGantt() {
    const chart = document.getElementById('ganttChart');
    chart.innerHTML = '';
    tasks.forEach((task, idx) => {
        const left = dateDiff(chartStart, task.start) * dayWidth;
        const width = (dateDiff(task.start, task.end) + 1) * dayWidth;
        const bar = document.createElement('div');
        bar.className = 'gantt-bar';
        bar.style.left = left + 'px';
        bar.style.top = (idx * 40) + 'px';
        bar.style.width = width + 'px';
        bar.textContent = `${task.name}（${task.assignee}）`;
        chart.appendChild(bar);
    });
    chart.style.height = (tasks.length * 40 + 20) + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    renderGantt();
    // D&Dやイナズマ線等の本格実装は後続
});
