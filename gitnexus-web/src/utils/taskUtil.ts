export interface Task {
  id: string;
  role: string;
  roleColor: string;
  title: string;
  assignee: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  dueDate: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  needsApproval?: boolean;
}

export const PRIORITY_CONFIG = {
  critical: { color: '#ef4444', label: 'Critical' },
  high: { color: '#f97316', label: 'High' },
  medium: { color: '#eab308', label: 'Medium' },
  low: { color: '#6b7280', label: 'Low' },
};

const ROLE_COLORS: Record<string, string> = {
  UI: '#ec4899',
  Architect: '#3b82f6',
  PM: '#7c3aed',
  Security: '#ef4444',
  Backend: '#10b981',
};

export const getRoleColor = (role: string): string => {
  return ROLE_COLORS[role] || '#6366f1';
};

/**
 * Parses a TASK.md content into an array of Task objects.
 * Expects format:
 * ## Section Name
 * - [ ] ID: Title @ Role:Assignee
 */
export const parseTasks = (content: string): Task[] => {
  const tasks: Task[] = [];
  const lines = content.split('\n');
  let currentStatus: Task['status'] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const sectionMatch = trimmed.match(/^##\s+(To Do|In Progress|In Review|Done|Backlog)/i);
    if (sectionMatch) {
      const section = sectionMatch[1].toLowerCase();
      if (section === 'backlog' || section === 'to do') currentStatus = 'To Do';
      else if (section === 'in progress') currentStatus = 'In Progress';
      else if (section === 'in review') currentStatus = 'In Review';
      else if (section === 'done') currentStatus = 'Done';
      continue;
    }

    if (currentStatus && trimmed.match(/^-\s+\[(x| |\/)\]/)) {
      // Regex: - [ ] T-123: Task Title @ Role:Assignee
      const taskMatch = trimmed.match(/^-\s+\[(x| |\/)?\]\s+(T-\d+):\s+(.*?)\s+@\s+([^:\s]+)(?::(\S+))?/);
      if (taskMatch) {
        const [_, checkbox, id, title, role, assignee] = taskMatch;
        const cleanRole = role.trim();
        tasks.push({
          id,
          title,
          role: cleanRole,
          roleColor: ROLE_COLORS[cleanRole] || '#6366f1', // Default to Indigo if not found
          assignee: assignee || 'AI',
          status: currentStatus,
          dueDate: 'Mar 15', // Placeholder, could be parsed from text
          priority: 'medium', // Placeholder, could be parsed from text
          needsApproval: currentStatus === 'In Review',
        });
      }
    }
  }
  return tasks;
};

/**
 * Serializes a list of tasks back into TASK.md format.
 */
export const serializeTasks = (tasks: Task[]): string => {
  const sections: Record<Task['status'], Task[]> = {
    'To Do': [],
    'In Progress': [],
    'In Review': [],
    'Done': [],
  };

  tasks.forEach(task => sections[task.status].push(task));

  let output = '# GitNexus Project Tasks\n\n';

  const order: Task['status'][] = ['To Do', 'In Progress', 'In Review', 'Done'];

  order.forEach(status => {
    output += `## ${status}\n`;
    sections[status].forEach(task => {
      const checkbox = task.status === 'Done' ? 'x' : task.status === 'In Progress' ? '/' : ' ';
      output += `- [${checkbox}] ${task.id}: ${task.title} @ ${task.role}${task.assignee !== 'AI' ? ':' + task.assignee : ''}\n`;
    });
    output += '\n';
  });

  return output;
};
