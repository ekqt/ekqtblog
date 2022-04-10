import {
  Container,
  Burger,
  Drawer,
  Image,
  MediaQuery,
  Button,
  ActionIcon,
  Anchor
} from "@mantine/core";

import { FaSlackHash } from "react-icons/fa";

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

import { useState } from "react";

import logoDark from "../images/logo-dark.svg";
import logoLight from "../images/logo-light.svg";

export default function Navbar({
  colorScheme,
  colorTheme,
  toggleDarkMode,
  socialLinksList,
  hashHandler,
  menuItemsList
}) {
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";

  /*** CREATION OF MENU ITEMS ***/

  const menuItems =
    menuItemsList &&
    menuItemsList.map((item) => (
      <Button
        key={item}
        variant="subtle"
        size="lg"
        styles={(theme) => ({
          root: {
            fontSize: "22px",
            display: "block",
            fontWeight: "600",
            color: colorTheme(theme),
            transition: "all 0.25s ease-out",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
              textDecorationThickness: "3px",
              transform: "translateX(-4px)"
            }
          }
        })}
        onClick={() => {
          hashHandler(`/${item}`);
          setOpened(false);
        }}
      >
        {item !== "Posts" && item !== "About" && <FaSlackHash />}
        {item}
      </Button>
    ));

  /*** CREATION OF MENU ITEMS ***/

  const socialLinks = socialLinksList.map((item) => (
    <Anchor
      key={item.label.toString()}
      href={item.url}
      target="_blank"
      size="lg"
      styles={(theme) => ({
        root: {
          color: colorTheme(theme),
          "&:hover": {
            color:
              colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.dark[4]
          }
        }
      })}
      onClick={() => {
        setOpened(false);
      }}
    >
      <div style={{ fontSize: "32px" }}>{item.icon}</div>
    </Anchor>
  ));

  return (
    <MediaQuery largerThan="md" styles={{ padding: "0 10%" }}>
      <Container
        style={{
          backgroundColor: "transparent",
          height: "60px",
          display: "flex",
          alignItems: "center"
        }}
        fluid
      >
        {/**Mobile Navigation */}
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          title={title}
          style={{ marginRight: "5px" }}
        />
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="xl"
          size="xl"
          title="Thank you for stopping by!"
        >
          {menuItems}
          <Container style={{ margin: "16px", display: "flex", gap: "15px" }}>
            {socialLinks}
          </Container>
        </Drawer>
        {/**Navigation Logo */}
        {colorScheme === "dark" ? (
          <Image
            src={logoDark}
            alt="logo"
            width="120px"
            styles={(theme) => ({
              root: {
                cursor: "pointer",
                "&:hover": { filter: "hue-rotate(120deg)" }
              }
            })}
            onClick={() => {
              hashHandler("");
            }}
          />
        ) : (
          <Image
            src={logoLight}
            alt="logo"
            width="120px"
            styles={(theme) => ({
              root: {
                cursor: "pointer",
                "&:hover": { filter: "hue-rotate(120deg)" }
              }
            })}
            onClick={() => {
              hashHandler("");
            }}
          />
        )}
        {/**Navigation Light/Dark Button */}
        <ActionIcon
          color={colorScheme === "dark" ? "yellow" : "gray"}
          onClick={() => toggleDarkMode()}
          title="Toggle color scheme"
          style={{
            marginLeft: "auto",
            height: "36px",
            width: "36px",
            padding: "6px"
          }}
        >
          {colorScheme === "dark" ? (
            <MdOutlineLightMode
              style={{
                height: "36px",
                width: "36px",
                padding: "0px"
              }}
            />
          ) : (
            <MdOutlineDarkMode
              style={{
                height: "36px",
                width: "36px",
                padding: "2px"
              }}
            />
          )}
        </ActionIcon>
      </Container>
    </MediaQuery>
  );
}
