import { MantineProvider } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineWhatsApp
} from "react-icons/ai";

import { AiOutlineArrowUp } from "react-icons/ai";

import { Affix, Button, Transition } from "@mantine/core";

import Navbar from "./components/Navbar.js";
import Posts from "./components/Posts.js";
import Footer from "./components/Footer.js";
import posts from "./data/data.js";

export default function App() {
  const [menuItemsList, setMenuItemsList] = useState();
  const [spotlight, setSpotlight] = useState();
  const [colorScheme, setColorScheme] = useState("dark");

  useEffect(() => {
    const tags = posts.map((post) => post.tag);
    const items = [...new Set(tags)];
    items.unshift("Posts");
    items.push("About");
    setMenuItemsList(items);
  }, []);

  const toggleDarkMode = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const colorTheme = (theme) =>
    colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[3];

  const socialLinksList = [
    {
      label: "Github",
      icon: <AiOutlineGithub />,
      url: "https://github.com/ekqt"
    },
    {
      label: "LinkedIn",
      icon: <AiOutlineLinkedin />,
      url: "/"
    },
    {
      label: "Email",
      icon: <AiOutlineMail />,
      url: "mailto:ekheinquarto@gmail.com"
    },
    {
      label: "Whatsapp",
      icon: <AiOutlineWhatsApp />,
      url: "https://wa.me/420608984789"
    }
  ];

  const hashHandler = (param) => {
    window.location.hash = param;
    if (param === "/Posts") {
      setSpotlight(null);
    } else if (param === "/About") {
      window.location.hash = "/About";
      setSpotlight("/Post/hello-world!");
    } else {
      setSpotlight(param);
    }
  };

  return (
    <div className="App">
      <MantineProvider
        theme={{
          fontFamily: "Roboto, sans-serif",
          colorScheme,
          colors: {
            dark: [
              "#D4D1DB", // Date, Titles, Body
              "#acaebf",
              "#8c8fa3",
              "#666980", // Social Links Footer and Dividers
              "#4d4f66",
              "#34354a",
              "#2b2c3d",
              "#21262C", // Background color
              "#0c0d21",
              "#01010a"
            ]
          }
        }}
        withGlobalStyles
        styles={{
          Prism: (theme) => prismStyle(theme)
        }}
      >
        <Navbar
          colorScheme={colorScheme}
          colorTheme={colorTheme}
          toggleDarkMode={toggleDarkMode}
          socialLinksList={socialLinksList}
          hashHandler={hashHandler}
          menuItemsList={menuItemsList}
        />
        {posts.map((post) => (
          <Posts
            key={uuidv4()}
            index={posts.length - 1 - posts.indexOf(post)}
            post={post}
            hashHandler={hashHandler}
            spotlight={spotlight}
            colorScheme={colorScheme}
          />
        ))}
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={true}>
            {(transitionStyles) => (
              <Button
                size="xl"
                compact
                variant="light"
                style={{ transitionStyles, padding: "6px" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <AiOutlineArrowUp />
              </Button>
            )}
          </Transition>
        </Affix>
        <Footer
          socialLinksList={socialLinksList}
          colorScheme={colorScheme}
          colorTheme={colorTheme}
        />
      </MantineProvider>
    </div>
  );
}

/** GLOBAL STYLE DEFINITIONS */

const prismStyle = (theme) => ({
  root: { width: "100%" },
  copy: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
    borderRadius: "5px"
  }
});
