const React = require('react')
const ObservableStore = require('obs-store')
const ForceGraph = require('./ForceGraph')
const {
  createRandomGraph,
} = require('./util')
const timeout = (duration) => new Promise(resolve => setTimeout(resolve, duration))

class GossipGraph extends React.Component {
  constructor () {
    super()

    const graph = createRandomGraph({ count: 100 })

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
    const graph = createRandomGraph({ count: 100 })
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

module.exports = GossipGraph

function randomColor () {
  return '#'+Math.floor(Math.random()*16777215).toString(16)
}
