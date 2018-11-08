const React = require('react')
const ObservableStore = require('obs-store')
const ForceGraph = require('./ForceGraph')
const {
  createConnectedGraph,
} = require('./util')
const timeout = (duration) => new Promise(resolve => setTimeout(resolve, duration))

class MultiGossipGraph extends React.Component {
  constructor () {
    super()

    const graph = createConnectedGraph({ count: 100 })

    const graphStore = new ObservableStore(graph)
    this.graphStore = graphStore
  }

  async doGossip () {
    const graph = this.graphStore.getState()
    const node = graph.nodes[0]
    const color = 'purple'
    this.gossipFromNode({ graph, node, color })
  }

  async gossipFromNode({ graph, node, color }) {
    const latency = 50
    node.color = color
    this.graphStore.putState(graph)
    await timeout(latency)
    const nodeLinks = graph.links.filter(linksMatchingCurrentNode)
    const nodePairs = nodeLinks.map(getPair)
    const newPairs = nodePairs.filter(pairNode => pairNode.color !== color)
    for (let pairNode of newPairs) {
      pairNode.color = color
      this.graphStore.putState(graph)
      await timeout(latency)
      this.gossipFromNode({ graph, node: pairNode, color })
    }

    function linksMatchingCurrentNode(link) {
      return link.target === node.id || link.source === node.id
    }

    function getPair(link) {
      const currentIsTarget = link.target === node.id
      const pairId = currentIsTarget ? link.source : link.target
      const pairNode = graph.nodes.find(node => node.id === pairId)
      return pairNode
    }
  }

  newGraph () {
    const graph1 = createConnectedGraph({ count: 6 })
    const graph2 = createConnectedGraph({ count: 12 })
    const graph3 = createConnectedGraph({ count: 4 })
    const graph = {
      nodes: [].concat(graph1.nodes, graph2.nodes, graph3.nodes),
      links: [].concat(graph1.links, graph2.links, graph3.links),
    }
    this.graphStore.putState(graph)
  }

  render () {
    return (
      <div>
        <button onClick={() => this.doGossip()}>gossip</button>
        <button onClick={() => this.newGraph()}>restart</button>
        <ForceGraph graphStore={this.graphStore}/>
      </div>
    )
  }
}

module.exports = MultiGossipGraph

function randomColor () {
  return '#'+Math.floor(Math.random()*16777216).toString(16)
}
