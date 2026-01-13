// Simple notification utility. Replace its implementation later with a toast system when available.

export function info(message: string) {
  // For now, console and alert
  console.info(message);
  try {
    // keep minimal UI interference: use alert only for errors in defaults; info uses console
  } catch (e) {
    // ignore
  }
}

export function success(message: string) {
  console.log(message);
}

export function error(message: string) {
  console.error(message);
  try {
    window.alert(`Error: ${message}`);
  } catch (e) {
    // ignore (non-browser environments)
  }
}
