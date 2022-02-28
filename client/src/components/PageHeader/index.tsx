import { PageHeader as AntPageHeader, PageHeaderProps } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, []);

  return (
    <AntPageHeader
      onBack={goBack}
      {...props}
    />
  );
};

export default PageHeader;
