
// LoginFormProps
export type LoginFormProps = {
  onSubmit: (userId: string, password: string) => void;
  errorMessage?: string;
  isLoading?: boolean;
};

// MenuButtonProps
export type MenuButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

// TaskFilterFormProps
export type TaskFilterFormProps = {
  filters: {
    projectId?: number;
    phaseId?: number;
    categoryId?: number;
    userId?: number;
    statusId?: number;
    keyword?: string;
  };
  onChange: (filters: TaskFilterFormProps['filters']) => void;
};

// Task型
export type Task = {
  id: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  projectId?: number;
  phaseId?: number;
  categoryId?: number;
  userId?: number;
  statusId?: number;
  priority?: 'low' | 'medium' | 'high';
};

// TaskListProps
export type TaskListProps = {
  tasks: Task[];
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onDetail: (taskId: number) => void;
};

// TaskDetailModalProps
export type TaskDetailModalProps = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
};

// TaskEditFormProps
export type TaskEditFormProps = {
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
};

// GanttChartProps
export type GanttChartProps = {
  tasks: Task[];
  onTaskDateChange: (taskId: number, start: Date, end: Date) => void;
  onTaskSelect: (taskId: number) => void;
};

// User型
export type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
  isActive: boolean;
};

// UserListProps
export type UserListProps = {
  users: User[];
  onEdit: (userId: number) => void;
  onDelete: (userId: number) => void;
};

// UserEditFormProps
export type UserEditFormProps = {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
};

// MasterItem型
export type MasterItem = {
  id: number;
  name: string;
  description?: string;
};

// MasterListProps
export type MasterListProps = {
  items: MasterItem[];
  type: 'project' | 'phase' | 'category' | 'status';
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

// MasterEditFormProps
export type MasterEditFormProps = {
  item?: MasterItem;
  type: 'project' | 'phase' | 'category' | 'status';
  onSubmit: (item: MasterItem) => void;
  onCancel: () => void;
};

// Alarm型
export type Alarm = {
  id: number;
  title: string;
  message: string;
  taskId?: number;
  dateTime: Date;
  severity?: 'info' | 'warning' | 'critical';
};

// AlarmListProps
export type AlarmListProps = {
  alarms: Alarm[];
  onDetail: (alarmId: number) => void;
};

// AlarmDetailModalProps
export type AlarmDetailModalProps = {
  alarm: Alarm | null;
  open: boolean;
  onClose: () => void;
};
