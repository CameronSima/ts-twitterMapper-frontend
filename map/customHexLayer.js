import { HexagonLayer } from 'deck.gl';

export class CustomHexLayer extends HexagonLayer {
    constructor(props) {
        super(props)
    }

  getPickingInfo({info}) {
    const pickedCell = info.picked && info.index > -1 ?
      this.state.hexagons[info.index] : null;

    return Object.assign(info, {
      picked: Boolean(pickedCell),
      // override object with picked cell
      object: pickedCell,
    //   tweets: this.props.dataFull.filter((tweet) => {
    //       return pickedCell.points[0]
    //   })
    });
  }
}

CustomHexLayer.layerName = 'CustomHexLayer';