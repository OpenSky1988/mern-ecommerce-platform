import React, { Component, ErrorInfo } from 'react';
import './style.less';

interface IState {
  error: Error;
  errorInfo: ErrorInfo;
}

class ErrorBoundary extends Component<{}, IState> {
  state: IState = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.errorInfo) {
      const title = this.state.error && this.state.error.toString();
      const { stack } = this.state.error;
      const { componentStack } = this.state.errorInfo;
      const errorDescription = `${componentStack}\n\n${stack}`;

      return (
        <div className="error-boundary">
          <pre>
            <h1 style={{ lineHeight: 1.2 }}>
              {title}
            </h1>
            {errorDescription}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
