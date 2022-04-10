import { Container, MediaQuery, Text, Anchor, Center } from "@mantine/core";

export default function Footer({ socialLinksList, colorScheme, colorTheme }) {
  /*** CREATION OF FOOTER ITEMS ***/

  const socialLinks = socialLinksList.map((item) => (
    <Center key={item.label.toString()}>
      {item.icon}
      <Anchor
        href={item.url}
        target="_blank"
        size="xs"
        styles={(theme) => ({
          root: {
            marginRight: "20px",
            paddingLeft: "6px",
            color: colorTheme(theme),
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationThickness: "2px"
            }
          }
        })}
      >
        {item.label}
      </Anchor>
    </Center>
  ));

  return (
    <MediaQuery
      largerThan="md"
      styles={{ flexDirection: "row", padding: "0 10%" }}
    >
      <MediaQuery
        smallerThan="sm"
        styles={{ flexDirection: "column", gap: "8px" }}
      >
        <Container
          style={{
            backgroundColor: "transparent",
            display: "flex",
            margin: "10px 0 25px",
            alignItems: "start"
          }}
          fluid
        >
          {/* <Container> */}
          <Text size="sm" align="left" style={{ marginRight: "auto" }}>
            @ 2022 Hector Sosa
          </Text>
          {/* </Container> */}
          {socialLinks}
        </Container>
      </MediaQuery>
    </MediaQuery>
  );
}
