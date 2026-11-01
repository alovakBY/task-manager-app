import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { LoginForm } from './LoginForm';

const meta = {
   title: 'Auth/LoginForm',
   component: LoginForm,
   args: {
      onSubmit: fn(),
      reset: fn(),
      isPending: false,
   },
   decorators: [
      (Story) => (
         <div style={{ maxWidth: 400 }}>
            <Story />
         </div>
      ),
   ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SubmitsCredentials: Story = {
   play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement);

      await userEvent.type(canvas.getByLabelText('Email'), 'admin@example.com');
      await userEvent.type(canvas.getByLabelText('Password'), 'Admin123!');
      await userEvent.click(canvas.getByRole('button', { name: 'Login' }));

      await expect(args.onSubmit).toHaveBeenCalledWith({
         email: 'admin@example.com',
         password: 'Admin123!',
      });
   },
};

export const Loading: Story = {
   args: {
      isPending: true,
   },
   play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement);

      await userEvent.type(canvas.getByLabelText('Email'), 'admin@example.com');
      await userEvent.type(canvas.getByLabelText('Password'), 'Admin123!');

      const button = canvas.getByRole('button');
      await userEvent.click(button);
      await expect(button).toBeDisabled();

      const loader = canvas.getByRole('status');
      await expect(loader).toBeVisible();

      await expect(args.onSubmit).toHaveBeenCalledTimes(0);
   },
};

export const ShowsValidationErrors: Story = {
   play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement);

      await userEvent.click(canvas.getByRole('button', { name: 'Login' }));

      await expect(canvas.getByText('Invalid email format')).toBeVisible();
      await expect(canvas.getByText('Password is required')).toBeVisible();

      await expect(args.onSubmit).not.toHaveBeenCalled();

      await userEvent.type(canvas.getByLabelText('Email'), 'email');
      await userEvent.type(canvas.getByLabelText('Password'), 'secret');
      await userEvent.click(canvas.getByRole('button', { name: 'Login' }));

      await expect(canvas.getByText('Invalid email format')).toBeVisible();
      await expect(canvas.queryByText('Password is required')).toBeNull();
      await expect(args.onSubmit).not.toHaveBeenCalled();
   },
};

export const WithServerError: Story = {
   args: {
      apiError: 'Incorrect email or password',
   },
   play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);

      await expect(canvas.getByTestId('apiError')).toHaveTextContent(
         'Incorrect email or password',
      );
   },
};
