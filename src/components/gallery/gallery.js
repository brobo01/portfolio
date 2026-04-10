"use client"

import React from "react"
import styles from "./styles.module.css"
import Modal from "./modal"

class Gallery extends React.Component {
  state = {
    bigImage: null,
    image: null,
    showModal: "none",
    imageLocation: {
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    },
  }

  showDetails = (event) => {
    var rect = event.target.getBoundingClientRect()

    const bigImage = React.createElement(
      "img",
      {
        src: event.target.src,
      },
      null,
    )

    // icon1.onload = function () {
    this.setState({
      bigImage: bigImage,
      image: event.target,
      imageLocation: {
        top: rect.top,
        left: rect.left,
        height: rect.height,
        width: rect.width,
      },
      showModal: "flex",
    })
  }
  // }

  hideDetails = () => {
    this.setState({
      image: null,
      imageLocation: {
        top: null,
        right: null,
        bottom: null,
        left: null,
      },
      showModal: "none",
    })
  }

  render() {
    const { images } = this.props
    const { image, bigImage, imageLocation, showModal } = this.state

    // const image1 = React.createElement("img", { src: images[0].Image }, null)

    // const help = new Image()
    // help.src = images[0].Image

    // help.onload = function () {
    //   console.log(help)
    // }

    return (
      <div className={styles.container}>
        <div className={styles.image_grid}>
          {images?.map((image, index) => (
            <picture
              className={styles.picture}
              key={index}
              // onClick={this.openModal}
            >
              <img
                src={image}
                alt={index}
                className={styles.image}
                onClick={this.showDetails}
              />
            </picture>
          ))}
        </div>
        <Modal
          image={image}
          bigImage={bigImage}
          showModal={showModal}
          hideModal={this.hideDetails}
          imageLocation={imageLocation}
        />
      </div>
    )
  }
}
export default Gallery

// import styles from "./styles.module.css"

// export default function Gallery(props) {
//   console.log(props)
//   return (
//     <div>
//       <div className={styles.image_grid}>
//         {props.images?.map((image, index) => (
//           <picture
//             className={styles.picture}
//             key={index}
//             // onClick={this.openModal}
//           >
//             <img
//               src={image}
//               alt={index}
//               className={styles.image}
//               // onClick={this.showDetails}
//             />
//           </picture>
//         ))}
//       </div>
//     </div>
//   )
// }
