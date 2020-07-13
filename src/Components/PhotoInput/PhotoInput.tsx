import React from 'react';
import styled from '../../typed-components';

const Container = styled.div``;

const Image = styled.label`
  cursor: pointer;
  height: 200px;
  width: 100%;
  display: block;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    border-radius: 100px;
    text-align: center;
    object-fit: cover;
    width: 200px;
    height: 200px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  uploading: boolean;
  fileUrl: string;
  onChange: any;
}
const PhotoInput: React.SFC<IProps> = ({ uploading, fileUrl, onChange }) => (
  <Container>
    <Input id={'photo'} type="file" accept="image/*" onChange={onChange} />
    <Image htmlFor="photo" id="ddd">
      {uploading && '⏰'}
      {!uploading && <img alt="" src={fileUrl} />}
    </Image>
  </Container>
);
export default PhotoInput;
