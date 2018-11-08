const React = require('react')
const ObservableStore = require('obs-store')
const ForceGraph = require('./ForceGraph')
const {
  createNode,
  createNodes,
  createLink,
} = require('./util')

class SimpleGraph extends React.Component {
  constructor () {
    super()

    const nodes = createNodes({ count: 3 })

    const links = [
      createLink({ source: nodes[0].id, target: nodes[1].id }),
      createLink({ source: nodes[0].id, target: nodes[2].id }),
    ]

    let graph = { nodes, links }

    const graphStore = new ObservableStore(graph)
    this.graphStore = graphStore
  }

  addNode () {
    const graph = this.graphStore.getState()
    graph.nodes.push(createNode())
    this.graphStore.putState(graph)
  }

  addLink () {
    const graph = this.graphStore.getState()
    const nodeCount = graph.nodes.length
    const linkCount = graph.links.length
    const source = String(nodeCount-1)
    const target = String(linkCount % nodeCount)
    graph.links.push(createLink({ source, target }))
    this.graphStore.putState(graph)
  }

  render () {
    return (
      <div>
        <button onClick={() => this.addNode()}>add node</button>
        <button onClick={() => this.addLink()}>add link</button>
        <ForceGraph graphStore={this.graphStore}/>
      </div>
    )
  }
}

module.exports = SimpleGraph
