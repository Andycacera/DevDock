/** Maps a process name to a material-symbols icon. */
export function serviceIcon(processName?: string): string {
  const name = (processName ?? '').toLowerCase();

  if (name.includes('vite') || name.includes('node') || name.includes('bun') || name.includes('deno')) {
    return 'material-symbols:bolt-rounded';
  }
  if (
    name.includes('postgres') ||
    name.includes('mysql') ||
    name.includes('mariadb') ||
    name.includes('mongo') ||
    name.includes('redis')
  ) {
    return 'material-symbols:database-rounded';
  }
  if (name.includes('ng') || name.includes('java') || name.includes('python') || name.includes('go')) {
    return 'material-symbols:code-rounded';
  }
  return 'material-symbols:dns-rounded';
}
