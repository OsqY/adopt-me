import { Component, MouseEvent } from "react";

interface IProps {
  images: string[]
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return
    }
    if (e.target.dataset.index) {
      this.setState({
        active: +e.target.dataset.index,
      });
    }

  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        <img className="rounded-full my-4 mx-2" src={images[active]} alt="=animal hero" />
        <div className="my-8 grid gap-2 grid-cols-2 mx-6 rounded-lg">
          {images.map((photo, index) => (
            <img className="grid gap-4 rounded-s"
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo}
              src={photo}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
