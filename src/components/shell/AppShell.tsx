import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { AuthGate } from './AuthGate';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen flex flex-col">
          <Topbar />
          <main className="flex-1 p-4 container-responsive">{children}</main>
        </div>
      </div>
    </AuthGate>
  );
}
