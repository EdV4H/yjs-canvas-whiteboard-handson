/**
 * Base Shape Type
 *
 * | Name | Description |
 * | ---- | ----------- |
 * | `id` | The unique identifier of the shape. |
 * | `x` | The x coordinate of the shape. |
 * | `y` | The y coordinate of the shape. |
 * | `rotation` | The rotation of the shape. |
 * | `isDragging` | Whether the shape is being dragged. |
 * | `isFocused` | Whether the shape is focused. |
 */
export type BaseShape = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  isDragging: boolean;
  isFocused: boolean;
};

export type StarShape = BaseShape;

export type RectangleShape = BaseShape;

/**
 * Stage Scale Type
 *
 * | Name | Description |
 * | ---- | ----------- |
 * | `scale` | The scale of the stage. |
 * | `stageX` | The x coordinate of the stage. |
 * | `stageY` | The y coordinate of the stage. |
 */
export type StageScale = {
  scale: number;
  stageX: number;
  stageY: number;
};
