class Logger {
  static errorHistory = [];
  static maxErrorHistory = 100;

  static error(message, error = {}) {
    const errorObj = {
      timestamp: new Date().toISOString(),
      message,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
      url: window.location.href,
    };

    this.errorHistory.unshift(errorObj);
    if (this.errorHistory.length > this.maxErrorHistory) {
      this.errorHistory.pop();
    }

    console.error(`[ERROR] ${message}`, error);
    this.persistError(errorObj);
  }

  static warn(message, data = {}) {
    const warnObj = {
      timestamp: new Date().toISOString(),
      message,
      data,
    };
    console.warn(`[WARN] ${message}`, data);
  }

  static info(message, data = {}) {
    console.info(`[INFO] ${message}`, data);
  }

  static debug(message, data = {}) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }

  static logError(context, error) {
    this.error(`${context}: ${error.message}`, error);
  }

  static logNodeOperation(operation, node) {
    this.debug(`Node ${operation}:`, node);
  }

  static logEdgeOperation(operation, data) {
    this.debug(`Edge ${operation}:`, data);
  }

  static persistError(errorObj) {
    try {
      const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
      errors.unshift(errorObj);
      if (errors.length > this.maxErrorHistory) {
        errors.pop();
      }
      localStorage.setItem('error_logs', JSON.stringify(errors));
    } catch (e) {
      console.error('Failed to persist error:', e);
    }
  }

  static getErrorHistory() {
    return this.errorHistory;
  }

  static clearErrorHistory() {
    this.errorHistory = [];
    try {
      localStorage.removeItem('error_logs');
    } catch (e) {
      console.error('Failed to clear error history:', e);
    }
  }

  static initializeFromStorage() {
    try {
      const storedErrors = JSON.parse(localStorage.getItem('error_logs') || '[]');
      this.errorHistory = storedErrors;
    } catch (e) {
      console.error('Failed to initialize error history:', e);
    }
  }
}

export default Logger; 