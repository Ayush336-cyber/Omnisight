// Utility to concatenate class names
enum Utils {}
export function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}