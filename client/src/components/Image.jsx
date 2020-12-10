
const {React} = window;
import styles from './../styledComp/styles.jsx';

class Image extends React.Component {
  constructor(props) {
    super(props)
  }
  onClick(e) {
    var id = e.target.id;
    this.props.onClick(id)
  }

  render() {
    return (
      <styles.ProductContainer
        id={this.props.data.id}
        featured={this.props.featured}
        onClick={this.onClick.bind(this)}
      >
        <styles.Image
          id={this.props.data.id}
          src={this.props.data.image}>
        </styles.Image>
        <styles.ProductInfo>
          <styles.Price
            id={this.props.data.id}
          >
            {`$${parseInt(this.props.data.price).toFixed(2)}`}
          </styles.Price>
          <div
            id={this.props.data.id}
          >
            {(this.props.data.name.length < 23) ?
            this.props.data.name :
            this.props.data.name.substr(0, 22).concat('...')}
          </div>
        </styles.ProductInfo>

      </styles.ProductContainer>
    )
  }
}

export default Image;