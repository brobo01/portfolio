"use client"
import * as styles from "./styles.module.css"
import * as React from "react"
import Navigation from "@/components/navigation/navigation"
import Image from "next/image"
import HamburgerButton from "../hamburger/hamburger"

class Header extends React.Component {
  state = {
    open: false,
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open })
    document.body.classList.toggle("modal-open")
  }

  render() {
    const { open } = this.state
    const { pageUrls } = this.props
    return (
      <header className={styles.header}>
        <HamburgerButton toggleMenu={this.toggleMenu} open={open} />
        {/* <Image src={image} className={styles.logo} alt="Logo" /> */}
        {/* <button className={styles.burger} onClick={this.toggleMenu}>
          <div
            className={open ? styles.burger_line_open_1 : styles.burger_line_1}
          />
          <div
            className={open ? styles.burger_line_open_2 : styles.burger_line_2}
          />
          <div
            className={open ? styles.burger_line_open_3 : styles.burger_line_3}
          />
        </button> */}
        <div
          className={open ? styles.nav_container_open : styles.nav_container}
          onClick={this.toggleMenu}
        >
          <Navigation open={open} />
        </div>
      </header>
    )
  }
}

export default Header
