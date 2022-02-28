import { SendOutlined } from '@ant-design/icons';
import React from 'react';

import './style.less';

const NewsLetter: React.FC<{}> = () => {
  return (
    <div className="newsletter">
      <h1>Наши новости</h1>
      <div className="newsletter__description">Подпишись на обновления о наших продуктах.</div>
      <div className="newsletter__email-input">
        <input placeholder="Ваш e-mail" />
        <button>
          <SendOutlined />
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
