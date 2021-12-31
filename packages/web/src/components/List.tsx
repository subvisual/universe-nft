import { FC, useState } from "react";

import { Cell } from "./Cell";

export const List: FC = () => {
  const W = 21;
  const H = 21;
  const startX = 101;
  const startY = 101;
  const cellSize = 80;
  const [rows] = useState(Array(W).fill(0));
  const [cols] = useState(Array(H).fill(0));

  return (
    <div>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${W}, ${cellSize}px)`,
          justifyContent: "center",
          listStyleType: "none",
          padding: 0,
          rowGap: 1,
          margin: "auto",
        }}
      >
        {rows.map((_, idxY: number) =>
          cols.map((_, idxX: number) => {
            const x = idxX + startX;
            const y = idxY + startY;
            return (
              <li
                key={`${x}x${y}`}
                style={{ padding: 1, height: cellSize, width: cellSize }}
              >
                <Cell x={x} y={y} size={cellSize} />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
