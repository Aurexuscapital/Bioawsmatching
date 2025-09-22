"use client";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthActions } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import Link from 'next/link';

const schema = z.object({ email: z.string().email(), password: z.string().min(6), remember: z.boolean().optional() });

type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
  const { login } = useAuthActions();

  const onSubmit = async (data: Form) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back');
    } catch (e: any) {
      toast.error(e.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-gradient-to-br from-blue-600 to-emerald-500" />
      <div className="flex items-center justify-center p-6">
        <div className="card-surface w-full max-w-md">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
            <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('remember')} /> Remember me</label>
              <Link href="#" className="text-sm text-blue-600">Forgot password?</Link>
            </div>
            <Button type="submit" loading={isSubmitting}>Sign in</Button>
          </form>
          <p className="mt-4 text-sm text-slate-500">No account? <Link className="text-blue-600" href="/signup">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}
