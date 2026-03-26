export interface HttpErrorResult {
  title: string;
  message: string;
  system?: string[];
}

export const handleHttpError = (err: any): HttpErrorResult => {
  let title = 'Ошибка';
  let message = 'Произошла неизвестная ошибка';
  let system: string[];

  if (err?.response) {
    
    const status = err.response.status;
    const responseData = err.response.data;

    let serverMessage = '';

    if (responseData.err) {

      const apiErr = responseData.err;

      if (apiErr.messages) {
        serverMessage = apiErr.messages.join('\n');
      }

      if (apiErr.system) {
        system = apiErr.system;
      }
    }

    serverMessage = serverMessage || responseData.message || responseData.error || responseData.title;

    switch (status) {
      case 400:
        title = 'Ошибка запроса';
        message = serverMessage || 'Некорректные данные запроса';
        break;
      case 401:
        title = 'Не авторизован';
        message = serverMessage || 'Необходима авторизация';
        break;
      case 403:
        title = 'Доступ запрещен';
        message = serverMessage || 'У вас нет прав для выполнения этой операции';
        break;
      case 404:
        title = 'Не найдено';
        message = serverMessage || 'Запрашиваемый ресурс не найден';
        break;
      case 409:
        title = 'Конфликт';
        message = serverMessage || 'Конфликт данных';
        break;
      case 422:
        title = 'Ошибка валидации';
        message = serverMessage || 'Данные не прошли валидацию';
        break;
      case 500:
        title = 'Серверная ошибка';
        message = serverMessage || 'Произошла серверная ошибка (500)';
        break;
      case 502:
        title = 'Ошибка сервера';
        message = serverMessage || 'Сервер временно недоступен (502)';
        break;
      case 503:
        title = 'Сервис недоступен';
        message = serverMessage || 'Сервис временно недоступен (503)';
        break;
      default:
        title = `Ошибка ${status}`;
        message = serverMessage || `Произошла ошибка сервера (${status})`;
    }
  } else if (err?.message) {
    
    message = err.message;
  }

  return { title, message, system };
};
