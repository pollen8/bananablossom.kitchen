import axios from 'axios';
import React, {
  FC,
  useCallback,
} from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const Zone = styled.div`
  width: 100%;
  border: 1px dotted #ddd;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  onChange: (f: string) => void;
}

const ImageUpload: FC<IProps> = ({
  onChange,
}) => {

  // @TODO - env var this
  const cloudName = 'pollen8';
  const upload_preset = 'fm9zzl3f';
  const onPhotoSelected = async (files) => {
    const url = `https://api.cloudinary.com/v1_1/${
      cloudName
      }/upload`;
    // const title = this.titleEl.value;

    for (let file of files) {

      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const dataUri = reader.result
        console.log(dataUri)

        await axios({
          data: {
            file: dataUri,
            upload_preset,
            multiple: true,
          },
          method: 'post',
          onUploadProgress: ((e: { loaded: number, total: number }) => {
            console.log((e.loaded / e.total) * 100);
          }),
          url,
        })
          .then((res) => {
            console.log('cloudnay res', res);
            onChange(res.data.public_id);
          })
          .catch(() => {
            throw (new Error('upload cancelled'));
          });

      }
      reader.readAsDataURL(file)
    }
  }

  const onDrop = (acceptedFiles: any) => {
    onPhotoSelected(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <Zone {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <div>Drop the files here ...</div> :
          <div>Drag 'n' drop some files here, or click to select files</div>
      }
    </Zone>
  )

}

export default ImageUpload;
