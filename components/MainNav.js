// //  import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
// //  import Link from 'next/link'; // Correct import for Next.js links
// // import { useRouter } from 'next/router';
// // import { useState } from 'react';
// // import { useAtom } from 'jotai';


// // import { searchHistoryAtom } from '@/store';
// // import addToHistory from "@/lib/userData"; // ✅ Required for persistent user data
// // import {getToken,readToken,removeToken} from "@/lib/authenticate"; // ✅ Authentication helpers
// // export default function MainNav() {
// //   const router = useRouter();
// //   const [search, setSearch] = useState('');
// //   const [isExpanded, setIsExpanded] = useState(false);
// //   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  
// //   const token = getToken(); // ✅ Check if user is logged in
// //   let decodedToken = token ? readToken(token)?.userName : null;
// // let userName = decodedToken ? decodedToken.userName : null;

// //   //let userName = token ? readToken(token).userName : null; // ✅ Extract user name from token

// //   console.log("Decoded token:", readToken(token));


// //   const handleSearchSubmit = async (event) => {
// //     event.preventDefault();
// //     if (search.trim()) {
// //       const queryString = `title=true&q=${search}`;
// //       const updatedHistory = await addToHistory(queryString); // ✅ Save to persistent history
// //       setSearchHistory(updatedHistory); // ✅ Update local atom
// //       router.push(`/artwork?${queryString}`);
// //       setIsExpanded(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     setIsExpanded(false);
// //     removeToken(); // ✅ Clear token on logout
// //     router.push('/login'); // ✅ Redirect to login page
// //   };

// //   return (
// //     <>
// //       <Navbar className="fixed-top" expand="lg" style={{ backgroundColor: "#1F364D" }} expanded={isExpanded}>
// //         <Container>
// //           <Navbar.Brand style={{ color: "white", fontWeight: "bold" }}>ANISHA A. RAI</Navbar.Brand>
// //           <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
// //           <Navbar.Collapse id="basic-navbar-nav">
// //             <Nav className="me-auto">
// //               <Link href="/" passHref legacyBehavior>
// //                 <Nav.Link
// //                   active={router.pathname === "/"}
// //                   style={{ color: router.pathname === "/" ? "#14d4b8" : "white" }}
// //                   onClick={() => setIsExpanded(false)}
// //                 >
// //                   Home
// //                 </Nav.Link>
// //               </Link>
// //               {token && ( // ✅ Show only if the user is logged in
// //                 <Link href="/search" passHref legacyBehavior>
// //                   <Nav.Link
// //                     active={router.pathname === "/search"}
// //                     style={{ color: router.pathname === "/search" ? "#14d4b8" : "white" }}
// //                     onClick={() => setIsExpanded(false)}
// //                   >
// //                     Advanced Search
// //                   </Nav.Link>
// //                 </Link>
// //               )}
// //             </Nav>
// //             &nbsp;
// //             {token && ( // ✅ Show search form only if logged in
// //               <Form className="d-flex" onSubmit={handleSearchSubmit}>
// //                 <FormControl
// //                   type="search"
// //                   placeholder="Search"
// //                   className="me-2"
// //                   aria-label="Search"
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                 />
// //                 <Button type="submit" style={{ backgroundColor: "#14d4b8", border: "none" }}>
// //                   Search
// //                 </Button>
// //               </Form>
// //             )}
// //             &nbsp;
// //             <Nav>
// //               {token ? ( // ✅ Show user dropdown and logout options for logged-in users
// //                 <NavDropdown title={userName} style={{ color: 'white' }}>
// //                   <Link href="/favourites" passHref legacyBehavior>
// //                     <NavDropdown.Item
// //                       active={router.pathname === "/favourites"}
// //                       onClick={() => setIsExpanded(false)}
// //                     >
// //                       Favourites
// //                     </NavDropdown.Item>
// //                   </Link>
// //                   <Link href="/history" passHref legacyBehavior>
// //                     <NavDropdown.Item
// //                       active={router.pathname === "/history"}
// //                       onClick={() => setIsExpanded(false)}
// //                     >
// //                       Search History
// //                     </NavDropdown.Item>
// //                   </Link>
// //                   <NavDropdown.Item onClick={handleLogout}>
// //                     Logout
// //                   </NavDropdown.Item>
// //                 </NavDropdown>
// //               ) : ( // ✅ Show Register and Login for non-logged-in users
// //                 <>
// //                   <Link href="/register" passHref legacyBehavior>
// //                     <Nav.Link
// //                       active={router.pathname === "/register"}
// //                       style={{ color: "white" }}
// //                       onClick={() => setIsExpanded(false)}
// //                     >
// //                       Register
// //                     </Nav.Link>
// //                   </Link>
// //                   <Link href="/login" passHref legacyBehavior>
// //                     <Nav.Link
// //                       active={router.pathname === "/login"}
// //                       style={{ color: "white" }}
// //                       onClick={() => setIsExpanded(false)}
// //                     >
// //                       Login
// //                     </Nav.Link>
// //                   </Link>
// //                 </>
// //               )}
// //             </Nav>
// //           </Navbar.Collapse>
// //         </Container>
// //       </Navbar>
// //       <br />
// //       <br />
// //     </>
// //   );
// // }


// // ✅ Updated MainNav.js - Full file
// import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import { useAtom } from 'jotai';

// import { searchHistoryAtom } from '@/store';
// import { getFavourites, getHistory, addToHistory } from '@/lib/userData';
// import { isAuthenticated, getToken, readToken, removeToken } from '@/lib/authenticate';

// export default function MainNav() {
//   const router = useRouter();
//   //const token = getToken();
//   const [search, setSearch] = useState('');
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
//   const [userName, setUserName] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = getToken();
//       if (token) {
//         const decoded = readToken(token);
//         console.log("Decoded token:", decoded);
//         setUserName(decoded?.userName);
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//         setUserName(null);
//       }
//     }
//   }, []);

//   const handleSearchSubmit = async (event) => {
//     event.preventDefault();
//     if (search.trim()) {
//       const queryString = `title=true&q=${search}`;
//       const updatedHistory = await addToHistory(queryString);
//       setSearchHistory(updatedHistory);
//       router.push(`/artwork?${queryString}`);
//       setSearch("");
//       setIsExpanded(false);
//     }
//   };

//   const handleLogout = () => {
//     setIsExpanded(false);
//     removeToken();
//     setUserName(null);
//     setIsLoggedIn(false);
//     router.push('/login');
//   };

//   return (
//     <>
//       <Navbar className="fixed-top" expand="lg" style={{ backgroundColor: "#1F364D" }} expanded={isExpanded}>
//         <Container>
//           <Navbar.Brand style={{ color: "white", fontWeight: "bold" }}>ANISHA A. RAI</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Link href="/" passHref legacyBehavior>
//                 <Nav.Link
//                   active={router.pathname === "/"}
//                   style={{ color: router.pathname === "/" ? "#14d4b8" : "white" }}
//                   onClick={() => setIsExpanded(false)}
//                 >
//                   Home
//                 </Nav.Link>
//               </Link>
//               {isLoggedIn && (
//                 <Link href="/search" passHref legacyBehavior>
//                   <Nav.Link
//                     active={router.pathname === "/search"}
//                     style={{ color: router.pathname === "/search" ? "#14d4b8" : "white" }}
//                     onClick={() => setIsExpanded(false)}
//                   >
//                     Advanced Search
//                   </Nav.Link>
//                 </Link>
//               )}
//             </Nav>
//             &nbsp;
//             {isLoggedIn  && (
//               <Form className="d-flex" onSubmit={handleSearchSubmit}>
//                 <FormControl
//                   type="search"
//                   placeholder="Search"
//                   className="me-2"
//                   aria-label="Search"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <Button type="submit" style={{ backgroundColor: "#14d4b8", border: "none" }}>
//                   Search
//                 </Button>
//               </Form>
//             )}
//             &nbsp;
//             <Nav>
//               {isLoggedIn ? (
//                 <NavDropdown title={userName} style={{ color: 'white' }}>
//                   <Link href="/favourites" passHref legacyBehavior>
//                     <NavDropdown.Item
//                       active={router.pathname === "/favourites"}
//                       onClick={() => setIsExpanded(false)}
//                     >
//                       Favourites
//                     </NavDropdown.Item>
//                   </Link>
//                   <Link href="/history" passHref legacyBehavior>
//                     <NavDropdown.Item
//                       active={router.pathname === "/history"}
//                       onClick={() => setIsExpanded(false)}
//                     >
//                       Search History
//                     </NavDropdown.Item>
//                   </Link>
//                   <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <>
//                   <Link href="/register" passHref legacyBehavior>
//                     <Nav.Link
//                       active={router.pathname === "/register"}
//                       style={{ color: "white" }}
//                       onClick={() => setIsExpanded(false)}
//                     >
//                       Register
//                     </Nav.Link>
//                   </Link>
//                   <Link href="/login" passHref legacyBehavior>
//                     <Nav.Link
//                       active={router.pathname === "/login"}
//                       style={{ color: "white" }}
//                       onClick={() => setIsExpanded(false)}
//                     >
//                       Login
//                     </Nav.Link>
//                   </Link>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <br />
//       <br />
//     </>
//   );
// }


import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import { searchHistoryAtom } from '@/store';
import { getFavourites, getHistory, addToHistory } from '@/lib/userData';
import { getToken, readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const [userName, setUserName] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = getToken();
      if (token) {
        const decoded = readToken(token);
        setUserName(decoded?.userName);
        setTokenExists(true);
      } else {
        setUserName(null);
        setTokenExists(false);
      }
    };

    checkToken();

    // Listen for token changes (after login/logout)
    window.addEventListener("tokenUpdated", checkToken);

    return () => {
      window.removeEventListener("tokenUpdated", checkToken);
    };
  }, []);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (search.trim()) {
      const queryString = `title=true&q=${search}`;
      const updatedHistory = await addToHistory(queryString);
      setSearchHistory(updatedHistory);
      console.log("search string saved:", updatedHistory);

      router.push(`/artwork?${queryString}`);
      setSearch('');
      setIsExpanded(false);
    }
  };

  const handleLogout = () => {
    setIsExpanded(false);
    removeToken();
    setUserName(null);
    setTokenExists(false);
    window.dispatchEvent(new Event("storage")); // 🔄 trigger navbar update
    router.push('/login');
  };

  return (
    <>
      <Navbar className="fixed-top" expand="lg" style={{ backgroundColor: "#1F364D" }} expanded={isExpanded}>
        <Container>
          <Navbar.Brand style={{ color: "white", fontWeight: "bold" }}>ANISHA A. RAI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  style={{ color: router.pathname === "/" ? "#14d4b8" : "white" }}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>

              {tokenExists && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    style={{ color: router.pathname === "/search" ? "#14d4b8" : "white" }}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>

            &nbsp;

            {tokenExists && (
              <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" style={{ backgroundColor: "#14d4b8", border: "none" }}>
                  Search
                </Button>
              </Form>
            )}

            &nbsp;

            <Nav>
              {tokenExists ? (
                <NavDropdown title={userName} style={{ color: 'white' }}>
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/register"}
                      style={{ color: "white" }}
                      onClick={() => setIsExpanded(false)}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/login"}
                      style={{ color: "white" }}
                      onClick={() => setIsExpanded(false)}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
