import {
  Modal,
  Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

import { del } from 'src/api/core';
import { authorizedRequest } from 'src/requestMethods';
import { getUsers, IUser, updateUser } from 'src/store/apiActions/users';
import { useDispatch } from 'src/store/hooks';

interface IUserForm {
  data?: IUser;
  defaultFileList: {
    uid: string;
    name: string;
    url: string;
  }[];
  setDrawerUser: (user: IUser) => void;
}

const UploadImage: React.FC<IUserForm> = ({
  data = {},
  defaultFileList,
  setDrawerUser,
}) => {
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const onImageUpload = async ({
    onSuccess,
    onError,
    file,
    onProgress,
  }: UploadRequestOption<any>) => {
    const fmData = new FormData();
    fmData.append('file', file);

    const onUploadProgress = (progressEvent: { loaded: number; total: number }) => {
      onProgress({ percent: (progressEvent.loaded / progressEvent.total) * 100 });
    };

    try {
      const newImg = await authorizedRequest.post('/users/image/upload', fmData, {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress,
      });

      setDrawerUser({
          ...data,
          ...{ img: newImg?.data as string },
      });
      onSuccess('Ok');
    } catch (err) {
      console.log('Error: ', err);
      onError(err);
    }
  };

  const onPreview = async (file: UploadFile) => {
    setPreviewImage(file?.url);
    setPreviewVisible(true);
  };

  const onPreviewCancel = () => setPreviewVisible(false);

  const removeImage = async () => {
    await del(`users/image/${defaultFileList[0].name || data?.img}`);
    const newUser = { ...data, img: '' };

    await updateUser(newUser, dispatch);
    setDrawerUser(newUser);
    await getUsers(dispatch);
  };

  return (
    <>
      <ImgCrop rotate={true}>
        <Upload
          listType="picture-card"
          fileList={defaultFileList}
          customRequest={onImageUpload}
          onRemove={removeImage}
          onPreview={onPreview}
          maxCount={1}
        >
          {defaultFileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={onPreviewCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImage;
