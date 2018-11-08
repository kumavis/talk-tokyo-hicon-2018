module.exports = {
  createNode,
  createLink,
  createNodes,
  createRandomLinks,
  createRandomGraph,
  createConnectedGraph,
}

let lastNodeId = 0

function createNode(params) {
  const node = Object.assign({
    id: String(lastNodeId),
    color: 'green',
  }, params)
  lastNodeId++
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

function createNodes({ count }) {
  return Array(count).fill().map(createNode)
}

function createRandomLinks({ nodes }) {
  const links = []
  nodes.forEach((node, index) => {
    const source = node.id
    let targetIndex = randomInt({ min: 0, max: nodes.length-1 })
    if (targetIndex >= index) targetIndex++
    const target = nodes[targetIndex].id
    links.push(createLink({ source, target }))
  })
  return links
}

function createConnectedLinks({ nodes }) {
  const links = []
  nodes.forEach((node) => {
    connectNext({ node })
    connectRandomNonNext({ node })
  })
  return links

  function connectNext({ node }) {
    const source = node.id
    const sourceIndex = nodes.indexOf(node)
    const targetIndex = (sourceIndex + 1) % nodes.length
    const target = nodes[targetIndex].id
    links.push(createLink({ source, target }))
  }

  function connectRandomNonNext({ node }) {
    const source = node.id
    const sourceIndex = nodes.indexOf(node)
    const nonNextCount = nodes.length - 2
    const targetRelativeIndex = randomInt({ max: nonNextCount })
    const targetIndex = (sourceIndex + targetRelativeIndex) % nodes.length
    const target = nodes[targetIndex].id
    links.push(createLink({ source, target }))
  }
}

function createRandomGraph({ count }) {
  const nodes = createNodes({ count })
  const links = createRandomLinks({ nodes })
  return { nodes, links }
}

function createConnectedGraph({ count }) {
  const nodes = createNodes({ count })
  const links = createConnectedLinks({ nodes })
  return { nodes, links }
}

function randomInt({ min = 0, max }) {
  return min + Math.floor((max - min)*Math.random() )
}
