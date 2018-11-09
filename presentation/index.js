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
  Text,
  Image,
  Table, TableHeader, TableHeaderItem, TableBody, TableRow, TableItem,
} from "spectacle";

const SimpleGraph = require('./graphs/SimpleGraph')
const GossipGraph = require('./graphs/GossipGraph')
const MultiGossipGraph = require('./graphs/MultiGossipGraph')

const images = {
  blockchain: require('../assets/ethblockchain_full.png'),
  merkle: require('../assets/merkle-simple.png'),
  mustekalaAdmin: require('../assets/mustekala-admin.png'),
  // mustekalaAdminVideo: require('../assets/visualizer.mov')
}

// preloader(images);

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
          <Heading size={1} fit lineHeight={1} textColor="tertiary">
            MetaMask
          </Heading>
          <Text margin="10px 0 0" textColor="secondary" fit size={2} bold>
            by ConsenSys
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
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            Problem
          </Heading>
          <List>
            <ListItem>centralized infrastructure</ListItem>
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
          <Heading size={3} lineHeight={1} textColor="secondary">
            Light vs Full
          </Heading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderItem></TableHeaderItem>
                <TableHeaderItem>Full</TableHeaderItem>
                <TableHeaderItem>Light</TableHeaderItem>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableItem>syncs blocks</TableItem>
                <TableItem>o</TableItem>
                <TableItem>o</TableItem>
              </TableRow>
              <TableRow>
                <TableItem>has recent state</TableItem>
                <TableItem>o</TableItem>
                <TableItem>x</TableItem>
              </TableRow>
              <TableRow>
                <TableItem>validates state transition</TableItem>
                <TableItem>o</TableItem>
                <TableItem>x</TableItem>
              </TableRow>
              <TableRow>
                <TableItem>can validate state value</TableItem>
                <TableItem>o</TableItem>
                <TableItem>o</TableItem>
              </TableRow>
            </TableBody>
          </Table>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={3} lineHeight={1} textColor="secondary">
            merkle tree
          </Heading>
          <Image src={images.merkle.replace('/', '')} margin="0px auto 40px" />
        </Slide>

        <Slide bgColor="primary">
          <Heading size={3} lineHeight={1} textColor="secondary">
            eth blockchain
          </Heading>
          <Image src={images.blockchain.replace('/', '')} margin="0px auto 40px" />
        </Slide>

        <Slide bgColor="white">
          <Heading size={3} lineHeight={1} textColor="secondary">
            p2p network
          </Heading>
          <SimpleGraph/>
        </Slide>

        <Slide bgColor="white">
          <Heading size={3} lineHeight={1} textColor="secondary">
            gossipping blocks
          </Heading>
          <GossipGraph/>
        </Slide>

        <Slide bgColor="white">
          <Heading size={3} lineHeight={1} textColor="secondary">
            gossipping slices
          </Heading>
          <MultiGossipGraph/>
        </Slide>

        <Slide bgColor="primary">
          <Heading size={3} lineHeight={1} textColor="secondary">
            kitsunet dashboard
          </Heading>
          <Image src={images.mustekalaAdmin.replace('/', '')} margin="0px auto 40px" />
        </Slide>

        <Slide bgColor="primary">
          <Heading size={3} lineHeight={1} textColor="secondary">
            kitsunet dashboard
          </Heading>
          <video src='https://raw.githubusercontent.com/kumavis/talk-dweb-2018/master/videos/visualizer.mov' width="320" height="240" controls preload="auto"></video>

        </Slide>

      </Deck>
    );
  }
}
//
// <Slide bgColor="primary">
//   <Heading size={1} fit lineHeight={1} textColor="secondary">
//     technical problems
//   </Heading>
//   <List>
//     <ListItem>browser light client implementation</ListItem>
//     <ListItem>network for browser transports (!)</ListItem>
//     <ListItem>light clients are leechers</ListItem>
//   </List>
// </Slide>
