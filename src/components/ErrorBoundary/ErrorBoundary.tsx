import React from 'react';
import { Result } from 'antd';

import './ErrorBoundary.less';

type Error = {
  message: string
  stack: string
}

type StateType = {
  hasError: boolean
  errMsg: string
  errStack: string
}

class ErrorBoundary extends React.Component<unknown, StateType> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      hasError: false,
      errMsg: '',
      errStack: '',
    };
  }

  static getDerivedStateFromError(error: Error): StateType {
    return {
      hasError: true,
      errMsg: error.message,
      errStack: error.stack,
    };
  }

  render(): React.ReactNode {
    const { hasError, errMsg, errStack } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className='error-container'>
          <Result
            status='error'
            title='出现了一些问题'
            subTitle={`可能是网络原因导致的，请刷新页面或稍后再试,错误代码${errMsg}`}
          />
          <pre
            style={{
              display: 'none',
            }}
          >
            {errStack}
          </pre>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
