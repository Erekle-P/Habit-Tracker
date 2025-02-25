import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialTasks = {
  todo: [{ id: "1", content: "Task 1" }, { id: "2", content: "Task 2" }],
  inProgress: [{ id: "3", content: "Task 3" }],
  done: [{ id: "4", content: "Task 4" }],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;

    const sourceTasks = [...tasks[sourceCol]];
    const destTasks = [...tasks[destCol]];
    
    const [movedTask] = sourceTasks.splice(result.source.index, 1);
    destTasks.splice(result.destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [sourceCol]: sourceTasks,
      [destCol]: destTasks,
    });
  };

  return (
    <div className="kanban-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.keys(tasks).map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                <h2 className="text-xl font-bold">{col.toUpperCase()}</h2>
                {tasks[col].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-card">
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};


export default KanbanBoard;
