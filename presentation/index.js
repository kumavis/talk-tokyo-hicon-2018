// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text
} from "spectacle";

const SimpleGraph = require('./graphs/SimpleGraph')
const GossipGraph = require('./graphs/GossipGraph')

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const theme = createTheme({
  // primary: "white",
  // secondary: "#1F2022",
  tertiary: "#03A9FC",
  quaternary: "#CECECE",

  primary: "#7ab0e8",
  secondary: "#1F2022",
  // secondary: "#1F2022",
  tertiary: "#ea8600",
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["slide"]} transitionDuraslide={500} theme={theme}>

        <Slide bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            kumavis
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            it me
          </Text>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            MetaMask
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            what we do
          </Text>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            this talk
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            metamask light client research
          </Text>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Problem statement
          </Heading>
          <List>
            <ListItem>metamask uses centralized infrastructure</ListItem>
            <ListItem>its expensive and requires trust</ListItem>
          </List>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            Solution
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            metamask light client!
          </Text>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            Light vs Full
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            diagram here
          </Text>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            technical problems
          </Heading>
          <List>
            <ListItem>browser light client implementation</ListItem>
            <ListItem>network for browser transports (!)</ListItem>
            <ListItem>light clients are leechers</ListItem>
          </List>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            Light vs Full
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            diagram here
          </Text>
        </Slide>

        <Slide bgColor="white">
          <SimpleGraph/>
        </Slide>

        <Slide bgColor="white">
          <GossipGraph/>
        </Slide>

      </Deck>
    );
  }
}
