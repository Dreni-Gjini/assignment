export function scrollToBottom(element: HTMLElement): void {
  try {
    element.scrollTop = element.scrollHeight;
  } catch (err) {
    console.error('Error scrolling to bottom:', err);
  }
}
