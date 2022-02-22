// import { useMemo, useState } from "react";
import { BOARD } from "../../enums";
import Square from "../Square";

import "./index.scss";

function Board() {
  // const initialPaths = useMemo(() => new Array(BOARD.).fill(null), []);
  // const [paths, setPaths] = useState([0, ...initialPaths]);

  const targetNode = BOARD.NODES_COUNT - 1;

  const nodes: any = [
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
    { neighbors: [] },
  ];

  const paths: any = { 0: { path: null, weight: 0 } };

  const visitedNodes: any = [];

  const addNeighbors = () => {
    nodes.forEach((node: any, index: number) => {
      const rightNode = index + 1;
      const leftNode = index - 1;
      const bottomNode = index + BOARD.WITH;
      const upperNode = index - BOARD.WITH;

      const upperRightNode = upperNode + 1;
      const upperLeftNode = upperNode - 1;
      const bottomRightNode = bottomNode + 1;
      const bottomLeftNode = bottomNode - 1;

      const atRight = (index + 1) % BOARD.WITH === 0;
      const atTop = index < BOARD.WITH;
      const atLeftSide = index % BOARD.WITH === 0;
      const atBottom = index + BOARD.WITH >= BOARD.NODES_COUNT;

      if (rightNode % BOARD.WITH !== 0) {
        node.neighbors.push(rightNode);
      }
      if (!atLeftSide) {
        node.neighbors.push(leftNode);
      }
      if (!atBottom) {
        node.neighbors.push(bottomNode);
      }
      if (!atTop) {
        node.neighbors.push(upperNode);
      }
      if (!atLeftSide && !atTop) {
        node.neighbors.push(upperLeftNode);
      }
      if (!atTop && !atRight) {
        node.neighbors.push(upperRightNode);
      }
      if (!atLeftSide && !atBottom) {
        node.neighbors.push(bottomLeftNode);
      }
      if (!atRight && !atBottom) {
        node.neighbors.push(bottomRightNode);
      }
    });
  };

  const calculateShortestPath = () => {
    nodes.forEach((node: any, currentNodeIndex: any) => {
      if (visitedNodes.indexOf(currentNodeIndex) > -1) {
        return;
      }
      visitedNodes.push(currentNodeIndex);

      node.neighbors.forEach((neighbor: any) => {
        if (paths[neighbor] === undefined) {
          paths[neighbor] = { weight: 1, path: currentNodeIndex };
        }
      });
    });
  };

  addNeighbors();
  calculateShortestPath();

  const shortestPathArray: any = [];

  let nextNode = paths[targetNode].path;
  shortestPathArray.unshift(nextNode);
  nextNode = paths[nextNode].path;

  shortestPathArray.unshift(nextNode);
  nextNode = paths[nextNode].path;

  shortestPathArray.unshift(nextNode);
  nextNode = paths[nextNode].path;

  if (nextNode === null) shortestPathArray.push(targetNode);
  console.log(nextNode);

  console.log(" shortestPathArray ", shortestPathArray);

  console.log("== ALL NODES ==>", nodes);
  console.log("== ALL PATHS ==>", paths);
  console.log("== VISITED NODES ==>", visitedNodes);

  return (
    <div className="board">
      {nodes.map((node: any, index: any) => (
        <Square index={index} key={index} node={node} />
      ))}
    </div>
  );
}

export default Board;
