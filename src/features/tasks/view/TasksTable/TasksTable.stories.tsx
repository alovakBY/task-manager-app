import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen,userEvent, within } from 'storybook/test';

import { hoursFromNow } from '@/mocks/mockData';

import { TasksTable } from './TasksTable';
import type { TaskDTO } from '../../api/types';
import { STATUS_LABELS } from '../../model/constants';

const tasks: TaskDTO[] = [
   {
      listId: 'list-1',
      id: 'cookies',
      title: 'Fix the cookie bug',
      description: 'Move auth to HttpOnly sessions',
      status: 'in_progress',
      priority: 'high',
      deadline: hoursFromNow(-2),
      deadlineStatus: 'overdue',
   },
   {
      listId: 'list-1',
      id: 'demo',
      title: 'Record a demo',
      status: 'new',
      priority: 'medium',
      deadline: hoursFromNow(24),
      deadlineStatus: 'urgent',
   },
];

const meta = {
   title: 'TasksTable',
   component: TasksTable,
   args: {
      updateTaskPending: false,
      tasks: tasks,
      tasksPending: false,
      statusFilter: null,
      onEdit: fn(),
      onDelete: fn(),
      onCreate: fn(),
      onUpdate: fn(),
   },
   decorators: [(Story) => <Story />],
} satisfies Meta<typeof TasksTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ChangeStatus: Story = {
   play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement);

      const statusSelect = canvas.getByText(STATUS_LABELS['new']);
      await userEvent.click(statusSelect);
      const doneStatusButton = await screen.findByText(STATUS_LABELS['done']);
      await expect(doneStatusButton).toBeVisible();
      await userEvent.click(doneStatusButton);
      await expect(args.onUpdate).toHaveBeenCalledWith('demo', 'done');
   },
};
