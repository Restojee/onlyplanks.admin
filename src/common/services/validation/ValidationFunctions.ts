
export class ValidationFunctions {

  

 
  static required(message?: string) {
    return (value: any) => {
      if (value === null || value === undefined || value === '') {
        return message || 'Поле обязательно для заполнения';
      }
      return true;
    };
  }

  

 
  static min(minValue: number, message?: string) {
    return (value: any) => {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < minValue) {
        return message || `Значение должно быть не менее ${minValue}`;
      }
      return true;
    };
  }

  

 
  static max(maxValue: number, message?: string) {
    return (value: any) => {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue > maxValue) {
        return message || `Значение должно быть не более ${maxValue}`;
      }
      return true;
    };
  }

  

 
  static email(message?: string) {
    return (value: any) => {
      if (typeof value !== 'string') return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return message || 'Введите корректный email адрес';
      }
      return true;
    };
  }

  

 
  static custom(customRule: (value: any) => boolean | string) {
    return (value: any) => {
      const result = customRule(value);
      if (result === true) {
        return true;
      }
      return typeof result === 'string' ? result : 'Validation failed';
    };
  }

  

 
  static minMaxLength(minLen: number, maxLen: number, message?: string) {
    return (value: any) => {
      if (typeof value !== 'string') return true;
      if (value.length < minLen || value.length > maxLen) {
        return message || `Длина должна быть от ${minLen} до ${maxLen} символов`;
      }
      return true;
    };
  }
}
