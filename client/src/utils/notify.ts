// Simple notification utility. Replace its implementation later with a toast system when available.

export function info(message: string) {
  console.info(message);
}

export function success(message: string) {
  console.log(message);
}

export function error(message: string) {
  console.error(message);
  window.alert(`Error: ${message}`);
}
