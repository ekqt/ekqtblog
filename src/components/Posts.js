import { useState, useEffect } from "react";
import { marked } from "marked";
import { MediaQuery, Container, Divider } from "@mantine/core";
import componentGenerator from "../utils/componentGenerator.js";

export default function Posts({
  post,
  index,
  hashHandler,
  spotlight,
  colorScheme
}) {
  const [title, setTitle] = useState();
  const [tag, setTag] = useState();
  const [card, setCard] = useState();

  useEffect(() => {
    fetch(post.data)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        post.content = marked.lexer(text);
        post.content.unshift({
          type: "tag",
          text: post.tag
        });
        post.content.unshift({ type: "date", text: post.date, index: index });
        setCard(post.content.map((block) => componentGenerator(block)));
        setTitle(
          post.content
            .find((item) => item.type === "heading" && item.depth === 1)
            .text.toLowerCase()
            .replaceAll(" ", "-")
        );
        setTag(post.tag);
      });
    return () => {
      setCard(null);
      setTitle(null);
      setTag(null);
    };
  }, [post, index]);

  if (
    (spotlight && spotlight === `/Post/${title}`) ||
    window.location.hash === `#/Post/${title}` ||
    (window.location.hash === "#/About" && title === "hello-world")
  ) {
    return (
      <MediaQuery largerThan="xl" styles={{ margin: "0 22%" }}>
        <MediaQuery largerThan="md" styles={{ margin: "0 12%" }}>
          <Container
            style={{
              textAlign: "justify",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              lineHeight: "30px"
            }}
            sx={() => ({
              h2: {
                fontSize: "46px",
                lineHeight: "52px",
                margin: "-8px 0 -4px",
                textAlign: "left"
              },
              "h3, h4, h5": {
                margin: "20px 0 -10px"
              },
              a: {
                color: colorScheme === "dark" ? "#D4D1DB" : "#161E26",
                textDecorationColor:
                  colorScheme === "dark" ? "#B9AE99" : "#43B0FC",
                "&:hover": {
                  textDecorationColor:
                    colorScheme === "dark" ? "#D4D1DB" : "#161E26"
                }
              }
            })}
            fluid
          >
            {card}
            <Divider style={{ width: "100%" }} my="sm" />
          </Container>
        </MediaQuery>
      </MediaQuery>
    );
  } else if (spotlight && spotlight === `/${tag}`) {
    return (
      <MediaQuery largerThan="xl" styles={{ margin: "0 22%" }}>
        <MediaQuery largerThan="md" styles={{ margin: "0 12%" }}>
          <Container
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              cursor: "pointer"
            }}
            styles={() => ({
              root: {
                transition: "all 0.2s ease-out",
                "&:hover": {
                  filter:
                    colorScheme === "dark"
                      ? "hue-rotate(120deg)"
                      : "hue-rotate(120deg)",
                  color:
                    colorScheme === "dark"
                      ? "rgba(255 255 255 / 1.5)"
                      : "rgba(0 0 0 / 0.8)",
                  transform: "translateX(-4px)"
                }
              }
            })}
            sx={() => ({
              a: {
                color: colorScheme === "dark" ? "#D4D1DB" : "#161E26",
                textDecorationColor:
                  colorScheme === "dark" ? "#B9AE99" : "#43B0FC",
                "&:hover": {
                  textDecorationColor:
                    colorScheme === "dark" ? "#D4D1DB" : "#161E26"
                }
              }
            })}
            onClick={() => hashHandler(`/Post/${title}`)}
            fluid
          >
            {card && card.slice(0, 4)}
            <Divider style={{ width: "100%" }} my="sm" />
          </Container>
        </MediaQuery>
      </MediaQuery>
    );
  } else if (
    spotlight ||
    window.location.hash === "#/About" ||
    window.location.hash.length > 10
  ) {
    return <></>;
  } else {
    return (
      <MediaQuery largerThan="xl" styles={{ margin: "0 22%" }}>
        <MediaQuery largerThan="md" styles={{ margin: "0 12%" }}>
          <Container
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              cursor: "pointer"
            }}
            styles={() => ({
              root: {
                transition: "all 0.2s ease-out",
                "&:hover": {
                  filter:
                    colorScheme === "dark"
                      ? "hue-rotate(120deg)"
                      : "hue-rotate(120deg)",
                  color:
                    colorScheme === "dark"
                      ? "rgba(255 255 255 / 1.5)"
                      : "rgba(0 0 0 / 0.8)",
                  transform: "translateX(-4px)"
                }
              }
            })}
            sx={() => ({
              a: {
                color: colorScheme === "dark" ? "#D4D1DB" : "#161E26",
                textDecorationColor:
                  colorScheme === "dark" ? "#B9AE99" : "#43B0FC",
                "&:hover": {
                  textDecorationColor:
                    colorScheme === "dark" ? "#D4D1DB" : "#161E26"
                }
              }
            })}
            onClick={() => hashHandler(`/Post/${title}`)}
            fluid
          >
            {card && card.slice(0, 4)}
            <Divider style={{ width: "100%" }} my="sm" />
          </Container>
        </MediaQuery>
      </MediaQuery>
    );
  }
}
