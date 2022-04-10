import {
  Title,
  Text,
  Badge,
  Code,
  Anchor,
  Blockquote,
  Image,
  Center
} from "@mantine/core";
import { Prism } from "@mantine/prism";
import { v4 as uuidv4 } from "uuid";

export default function componentGenerator(Block) {
  switch (Block.type) {
    case "date":
      return (
        <Text
          key={uuidv4()}
          style={{ marginTop: "10px", marginBottom: "-4px" }}
          size="sm"
        >
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }).format(new Date(`${Block.text}`))}{" "}
          — #{Block.index.toString().padStart(3, "0")}
        </Text>
      );
    case "tag":
      return (
        <Badge
          key={uuidv4()}
          color="gray"
          style={{
            width: "fit-content",
            margin: "0 0 -4px",
            fontSize: "11px",
            letterSpacing: "1.2px",
            padding: "10px 11px"
          }}
        >
          {Block.text}
        </Badge>
      );
    case "heading":
      return (
        <Title key={uuidv4()} order={Block.depth + 1}>
          {Block.text}
        </Title>
      );
    case "blockquote":
      return (
        <Blockquote key={uuidv4()}>
          {Block.tokens.map((blockChild) => componentGenerator(blockChild))}
        </Blockquote>
      );
    case "paragraph":
      return (
        <div key={uuidv4()} style={{ margin: 0, textAlign: "justify" }}>
          {Block.tokens.map((blockChild) => componentGenerator(blockChild))}
        </div>
      );
    case "text":
      if (Block.tokens) {
        return (
          <Text key={uuidv4()} style={{ display: "inline" }}>
            {Block.tokens.map((blockChild) => componentGenerator(blockChild))}
          </Text>
        );
      } else {
        return (
          <Text key={uuidv4()} style={{ display: "inline" }}>
            {Block.text
              .replaceAll("&#39;", "'")
              .replaceAll("&gt;", ">")
              .replaceAll("&amp;", "&")
              .replaceAll("&quot;", '"')}
          </Text>
        );
      }
    case "strong":
      return <strong key={uuidv4()}>{Block.text}</strong>;
    case "em":
      return <em key={uuidv4()}>{Block.text}</em>;
    case "link":
      return (
        <Anchor
          key={uuidv4()}
          href={Block.href}
          styles={() => ({
            root: {
              fontWeight: "600",
              backgroundColor: "transparent",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              textDecorationThickness: "3px",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
                textDecorationThickness: "3px"
              }
            }
          })}
        >
          {Block.text}
        </Anchor>
      );
    case "codespan":
      return (
        <Code key={uuidv4()} color="cyan">
          {Block.text
            .replaceAll("&#39;", "'")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")}
        </Code>
      );
    case "image":
      return (
        <Center key={uuidv4()}>
          <Image
            key={uuidv4()}
            radius="sm"
            src={Block.href}
            alt={Block.text}
            caption={Block.text}
            loading="lazy"
          />
        </Center>
      );
    case "list":
      if (Block.ordered) {
        return (
          <ol key={uuidv4()} style={{ margin: "0" }}>
            {Block.items.map((blockChild) => componentGenerator(blockChild))}
          </ol>
        );
      } else {
        return (
          <ul key={uuidv4()} style={{ margin: "0" }}>
            {Block.items.map((blockChild) => componentGenerator(blockChild))}
          </ul>
        );
      }
    case "list_item":
      return (
        <li key={uuidv4()}>
          {Block.tokens.map((blockChild) => componentGenerator(blockChild))}
        </li>
      );
    case "code":
      return (
        <Prism
          key={uuidv4()}
          withLineNumbers
          language={Block.lang}
          scrollAreaComponent="div"
        >
          {Block.text}
        </Prism>
      );
    case "space":
      return;
    default:
      return;
  }
}
