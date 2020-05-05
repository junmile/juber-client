import React from 'react';
import FindAddressPresenter from './FindAddressPresenter';
import { RouteComponentProps } from 'react-router-dom';
import ReactDOM from 'react-dom';

interface IProps extends RouteComponentProps<any> {}

class FindAddressContainer extends React.Component<IProps> {
  // 맵오브젝트를 저장함
  public mapRef: any;
  public map: google.maps.Map;
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    const { google } = this.map;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    this.map = new maps.Map(mapNode);
  }
  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }
}

export default FindAddressContainer;
