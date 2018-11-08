module.exports = {
  createNode,
  createLink,
  createNodes,
  createLinks,
  createRandomGraph,
}

function createNode(params) {
  const node = Object.assign({
    color: 'green',
  }, params)
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
  return Array(count).fill().map((_, index) => createNode({ id: String(index) }))
}

function createLinks({ nodes }) {
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

function createRandomGraph({ count }) {
  const nodes = createNodes({ count })
  const links = createLinks({ nodes })
  return { nodes, links }
}

function randomInt({ min, max }) {
  return min + Math.floor((max - min)*Math.random() )
}
