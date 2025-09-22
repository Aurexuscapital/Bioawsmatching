"use client";
import { useEffect, useState } from 'react';
import * as api from '@/services/api';

export function OrgProjectSwitcher() {
  const [projects, setProjects] = useState<api.ProjectSummary[]>([]);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    api.projects.list().then((ps) => setProjects(ps));
    const saved = localStorage.getItem('currentProjectId');
    setCurrent(saved);
  }, []);

  return (
    <div className="relative">
      <select
        aria-label="Select project"
        className="input-base min-w-[200px]"
        value={current ?? ''}
        onChange={(e) => {
          const id = e.target.value;
          setCurrent(id);
          localStorage.setItem('currentProjectId', id);
        }}
      >
        <option value="" disabled>
          Select project
        </option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
