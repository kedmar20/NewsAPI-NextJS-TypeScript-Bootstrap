import Link from "next/link";
import Image from "next/image";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "@/assets/images/breaking_news.png";
import styles from "@/styles/NewsArticleEntry.module.css";

const NavBar = () => {
   return (
      // <Navbar sticky="top" className={`${styles.navbar}`}>
      <Navbar variant="dark" sticky="top" expand="lg" collapseOnSelect className={`${styles.navbar}`}>
         <Container>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
               <Nav className={`justify-content-start align-items-center flex-grow-1 pe-3 ${styles.navbar}`}>
                  <Nav.Link as={Link} href="/">
                     <Image src={logo} width={150} alt="logo" />
                  </Nav.Link>

                  <Nav.Link as={Link} href="/search">
                     Search
                  </Nav.Link>
                  <NavDropdown title="Categories" id="categories-dropdown">
                     <NavDropdown.Item as={Link} href="/categories/business">
                        Business
                     </NavDropdown.Item>
                     <NavDropdown.Item as={Link} href="/categories/entertainment">
                        Entertainment
                     </NavDropdown.Item>
                     <NavDropdown.Item as={Link} href="/categories/general">
                        General
                     </NavDropdown.Item>
                     <NavDropdown.Item as={Link} href="/categories/health">
                        Health
                     </NavDropdown.Item>
                     <NavDropdown.Item as={Link} href="/categories/science">
                        Science
                     </NavDropdown.Item>
                     <NavDropdown.Item as={Link} href="/categories/sports">
                        Sports
                     </NavDropdown.Item>
                     <NavDropdown.Item as={Link} href="/categories/technology">
                        Technology
                     </NavDropdown.Item>
                  </NavDropdown>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default NavBar;

// className = "d-inline-block align-top";

// id = "categories-dropdown";
