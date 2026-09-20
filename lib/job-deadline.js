export const DAY = 24 * 60 * 60 * 1000;
const tones = {
  green: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  yellow: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  red: 'text-red-400 bg-red-500/10 border-red-500/30',
  gray: 'text-gray-400 bg-white/5 border-white/10',
};

export function getJobDeadlineState(deadline, now = Date.now()) {
  const timestamp = typeof deadline === 'string' && deadline ? Date.parse(deadline) : NaN;
  if (!Number.isFinite(timestamp)) return { closed: true, status: 'unavailable', label: 'Deadline unavailable', tone: tones.gray, color: 'gray' };
  const remaining = timestamp - now;
  if (remaining <= 0) return { closed: true, status: 'closed', label: 'Applications closed', tone: tones.red, color: 'red' };
  const seconds = Math.ceil(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const label = days > 0 ? `${days}d ${hours}h ${minutes}m remaining` : `${hours}h ${minutes}m ${seconds % 60}s remaining`;
  const color = remaining <= DAY ? 'red' : remaining <= 3 * DAY ? 'orange' : remaining <= 7 * DAY ? 'yellow' : 'green';
  return { closed: false, status: 'open', label, tone: tones[color], color };
}

export function formatJobDeadline(deadline) {
  if (!deadline || !Number.isFinite(Date.parse(deadline))) return null;
  return new Intl.DateTimeFormat('en-KE', { timeZone: 'Africa/Nairobi', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(deadline)) + ' (Nairobi)';
}
