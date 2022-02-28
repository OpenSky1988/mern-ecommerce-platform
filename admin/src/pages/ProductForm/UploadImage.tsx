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
import { IProduct, product } from 'src/store/apiActions/products';
import { useDispatch } from 'src/store/hooks';

interface IProductForm {
  data?: IProduct;
  defaultFileList: {
    uid: string;
    name: string;
    url: string;
  }[];
  setDrawerProduct: (product: IProduct) => void;
}

const UploadImage: React.FC<IProductForm> = ({
  data = {},
  defaultFileList,
  setDrawerProduct,
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
      const newImg = await authorizedRequest.post('/products/image/upload', fmData, {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress,
      });

      const newImages = [ ...(data?.img ? data?.img : []) ];
      newImages.push(newImg?.data);

      setDrawerProduct({ ...data, img: newImages });
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

  const removeImage = async (file: UploadFile) => {
    await del(`products/image/${file.name}`);

    const img = data.img.filter((item) => item !== file.name);
    const newProduct = { ...data, img };

    await product.update(data?._id, newProduct, dispatch);
    setDrawerProduct(newProduct);
    await product.getList(dispatch);
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
          maxCount={10}
        >
          {defaultFileList.length < 10 && '+ Upload'}
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
