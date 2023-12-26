import { useMemo } from "react";
import { Board } from "../types/Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const useColumnIcons = (currentBoard: Board | null) => {
    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name) || []));

    return useMemo(() => {
      const colors = ["#49c4e5", "#8471f2", "#6ee7b7", "#FF5733", "#FFFF33"];

      return {
          ...currentBoard,
          columns: currentBoard?.columns.map(column => {
              const index = statuses.indexOf(column.name);
              const color = colors[index] || "#000"; 
              const icon = <FontAwesomeIcon icon={faCircle} style={{ color }} />;
              return {
                  ...column,
                  status: {
                      name: column.name,
                      icon: icon
                  }
              };
          })
      };
  }, [currentBoard, statuses]);
}

export default useColumnIcons;
