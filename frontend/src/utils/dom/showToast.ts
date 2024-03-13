import iziToast from 'izitoast';

export enum ToastType {
  Info = 'info',
  Danger = 'danger',
}

export function showToast(
  type: ToastType,
  title: string,
  message: string,
): void {
  let color;

  switch (type) {
    case ToastType.Danger:
      color = 'red';
      break;
    default:
      color = 'blue';
  }

  iziToast.show({
    title,
    message,
    color,
    position: 'topRight',
    closeOnClick: true,
    close: false,
    progressBar: false,
  });
}
