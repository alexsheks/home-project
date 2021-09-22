import { Link as LinkR } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { MdClose } from "react-icons/md";
import { CgSearch } from "react-icons/cg";
import { IconContext } from "react-icons";
import React, { useState } from "react";

import { Nav, NavContainer, NavbarMenu, OpenedImg } from "./NavbarElements";
import {
  Container,
  PopUp,
  Content,
  Searchbar,
  LoadingCircle,
} from "./SearchElements";
import CardSlider from "./Slider";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [responseValue, setResponseValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const HandleRequest = async () => {
    await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    })
      .then((response) => {
        setIsLoading(true);
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setResponseValue(data);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  // const HandleKeyPress = (event) => {
  //   if (event.key === "Enter") {

  //     HandleRequest();
  //     setInputValue("");
  //   }
  // };

  const HandleSubmit = () => {
    if (inputValue !== "") {
      setInputValue("");

      HandleRequest();
    } else {
      alert("Введите значение");
    }
  };

  // function truncate(str, n) {
  //   return str?.length > n ? str.substr(0, n - 1) : str;
  // }

  // function truncate2(str, n) {
  //   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  // }
  return (
    <>
      <Nav open={isOpen} sticky={isOpen}>
        <NavContainer>
          <NavbarMenu>
            <LinkR
              to="#"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              {!isOpen ? (
                <img src="/images/search-icon.svg" alt="SEARCH" />
              ) : (
                <img
                  src="/images/search-icon.svg"
                  alt="SEARCH"
                  onClick={HandleSubmit}
                />
              )}
              {!isOpen && <span>SEARCH</span>}
            </LinkR>
          </NavbarMenu>
          {isOpen && (
            <Searchbar
              type="search"
              autoFocus={true}
              onKeyPress={(event) => event.key === "Enter" && HandleSubmit()}
              onChange={(event) => setInputValue(event.target.value)}
              value={inputValue}
              placeholder="Search for some information"
              autoComplete={false}
              pattern="[A-z]"
              minLength="10"
              maxLength="100"
            />
          )}
          {isOpen && (
            <OpenedImg
              className="icon"
              onClick={() => {
                setIsOpen(false);
                setResponseValue([]);
              }}
            >
              <IconContext.Provider value={{ color: "white", size: "30px" }}>
                <MdClose />
              </IconContext.Provider>
            </OpenedImg>
          )}
        </NavContainer>
      </Nav>

      <Container fixed={isOpen}>
        <PopUp hidden={!isOpen}>
          {isLoading && <LoadingCircle />}
          {!isLoading && <CardSlider responseValue={responseValue} />}
        </PopUp>
      </Container>
    </>
  );
};

export default Page;
