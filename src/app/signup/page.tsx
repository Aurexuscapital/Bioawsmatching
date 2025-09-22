"use client";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthActions } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import Link from 'next/link';

const schema = z.object({ email: z.string().email(), password: z.string().min(6), orgName: z.string().min(2) });

type Form = z.infer<typeof schema>;

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
  const { signup } = useAuthActions();

  const onSubmit = async (data: Form) => {
    try {
      await signup(data.email, data.password, data.orgName);
      toast.success('Account created');
    } catch (e: any) {
      toast.error(e.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-gradient-to-br from-blue-600 to-emerald-500" />
      <div className="flex items-center justify-center p-6">
        <div className="card-surface w-full max-w-md">
          <h1 className="text-xl font-semibold">Create account</h1>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
            <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
            <Input label="Organization" {...register('orgName')} error={errors.orgName?.message} />
            <Button type="submit" loading={isSubmitting}>Sign up</Button>
          </form>
          <p className="mt-4 text-sm text-slate-500">Have an account? <Link className="text-blue-600" href="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
