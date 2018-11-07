const React = require('react')
const { buildGraph, mergeGraph } = require('./viz/build')
const { setupSimulation, setupSimulationForces } = require('./viz/simulation')
const renderGraph = require('./viz/normal')

function createNode({ id }) {
  const node = {
    id,
    x: 960/2,
    y: 600/2,
  }
  return node
}

function createLink({ source, target }) {
  const link = {
    id: `${source}-${target}`,
    source,
    target,
    value: 1,
    distance: 30,
  }
  return link
}

function initialize() {
  const nodes = [
    createNode({ id: '0' }),
    createNode({ id: '1' }),
    createNode({ id: '2' }),
  ]

  const links = [
    createLink({ source: nodes[0].id, target: nodes[1].id }),
    createLink({ source: nodes[0].id, target: nodes[2].id }),
  ]

  let graph = {
    nodes, links,
  }

  // setup force simulation
  const simulation = setupSimulation(graph)
  setupSimulationForces(simulation, graph)

  // setup rerender hooks
  // simulation.on('tick', rerender)
  // store.subscribe(rerender)
  // store.subscribe((state) => rebuildGraph())

  // function rebuildGraph () {
  //   const networkState = store.getState()
  //   // merge state
  //   const clientData = networkState.clients
  //
  //   const newGraph = buildGraph(clientData, networkFilter)
  //   currentGraph = mergeGraph(currentGraph, newGraph)
  //   // reset simulation
  //   setupSimulationForces(simulation, currentGraph)
  // }

  return { graph, simulation }
}

class ForceGraph extends React.Component {
  componentDidMount () {
    const { graph, simulation } = initialize()
    this.graph = graph
    this.simulation = simulation

    this.simulation.on('tick', () => this.forceUpdate())
  }

  componentWillUnmount () {
    this.simulation.stop()
    delete this.simulation
  }

  addNode () {
    const { simulation, graph} = this
    const id = String(graph.nodes.length)
    graph.nodes.push(createNode({ id }))
    setupSimulationForces(simulation, graph)
  }

  addLink () {
    const { simulation, graph} = this
    const nodeCount = graph.nodes.length
    const linkCount = graph.links.length
    const source = String(nodeCount-1)
    const target = String(linkCount % nodeCount)
    graph.links.push(createLink({ source, target }))
    setupSimulationForces(simulation, graph)
  }

  render () {
    const graph = this.graph
    if (!graph) return null

    return (
      <div>
        <button onClick={() => this.addNode()}>add node</button>
        <button onClick={() => this.addLink()}>add link</button>
        {renderGraph({ graph })}
        {style(`
          .links line {
            stroke: #999;
            stroke-opacity: 0.6;
          }
        `)}
      </div>
    )
  }
}

module.exports = ForceGraph

function style(styleContent) {
  return (
    <style dangerouslySetInnerHTML={{__html: styleContent}} />
  )
}
