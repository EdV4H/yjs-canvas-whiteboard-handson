import { useState } from "react";
import { Layer, Rect, Stage, Star } from "react-konva";

import { Position, RectangleShape, StageScale, StarShape } from "./types.local";

const generateStar = (): StarShape => {
  return {
    id: Math.random().toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
    isFocused: false,
  };
};

const generateRectangle = (a: Position, b: Position): RectangleShape => {
  return {
    id: Math.random().toString(),
    x: a.x,
    y: a.y,
    width: Math.abs(b.x - a.x),
    height: Math.abs(b.y - a.y),
    rotation: 0,
    isDragging: false,
    isFocused: false,
  };
};

const initState: StarShape[] = Array.from({ length: 5 }, generateStar);

export const Template: React.FC = () => {
  const [starts, setStarts] = useState(initState);
  const [rectangles, setRectangles] = useState<RectangleShape[]>([]);
  const [stageScale, setStageScale] = useState<StageScale>({
    scale: 1,
    stageX: 0,
    stageY: 0,
  });

  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Position | null>(null);

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.01;

    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStageScale({
      scale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  const handleStageClick = (e: any) => {
    e.evt.preventDefault();
    if (e.evt.button === 1) {
      console.log("middle click");
      setIsPanning(!isPanning);
    }
    setStarts(
      starts.map((star) => ({
        ...star,
        isFocused: false,
      }))
    );
  };

  const handleObjectSelect = (e: any) => {
    e.evt.preventDefault();
    setStarts(
      starts.map((star) => ({
        ...star,
        isFocused: star.id === e.target.attrs.id,
      }))
    );
  };

  const handleGenRectStart = (e: any) => {
    e.evt.preventDefault();
    setDragStart({ x: e.evt.clientX, y: e.evt.clientY });
  };

  const handleGenRectEnd = (e: any) => {
    e.evt.preventDefault();
    if (!dragStart) return;
    setRectangles([
      ...rectangles,
      generateRectangle(dragStart, { x: e.evt.clientX, y: e.evt.clientY }),
    ]);
    setDragStart(null);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onWheel={handleWheel}
      scaleX={stageScale.scale}
      scaleY={stageScale.scale}
      x={stageScale.stageX}
      y={stageScale.stageY}
      draggable={isPanning}
      onClick={handleStageClick}
      onMouseDown={handleGenRectStart}
      onMouseUp={handleGenRectEnd}
    >
      <Layer>
        {starts.map((star) => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            numPoints={star.isFocused ? 9 : 5}
            innerRadius={20}
            outerRadius={40}
            draggable
            fill={"#89b717"}
            onClick={handleObjectSelect}
            onDragStart={handleObjectSelect}
          />
        ))}
        {rectangles.map((rectangle) => (
          <Rect
            key={rectangle.id}
            id={rectangle.id}
            x={rectangle.x}
            y={rectangle.y}
            width={rectangle.width}
            height={rectangle.height}
            fill={"#89b717"}
            draggable
          />
        ))}
      </Layer>
    </Stage>
  );
};
