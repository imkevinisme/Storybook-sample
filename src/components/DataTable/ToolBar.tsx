// import React, { FC, useState } from "react";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"


// import { cn } from "@/lib/utils";

// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import { ExtendedColumnDef } from "./types";



// interface Props {
//     columns: ExtendedColumnDef<any, any>[];
//     className?: string;
//     children?: React.ReactNode;
//     isLoading?: boolean;
//     onShowColumnsChange?: (columns: ExtendedColumnDef<any, any>[]) => void;
// }


// const DataTableToolBar:FC<Props> = ({
//     columns,
//     className,
//     children,
//     isLoading,
//     onShowColumnsChange,
// }) => {

//     // State management
//     const [showColumns, setShowColumns] = useState(columns);

//     // Handle show column
//     const handleShowColumn = (checked: boolean, column: ExtendedColumnDef<any, any>) => {
//         const newColumns = showColumns.map((c) => {
//             if (c.id === column.id) {
//                 return {
//                     ...c,
//                     show: checked,
//                 };
//             }
//             return c;
//         });

//         // Update the state
//         setShowColumns(newColumns);

//         // Callback
//         const filteredColumns = newColumns.filter((c) => c.show);
//         onShowColumnsChange && onShowColumnsChange(filteredColumns);
//     }



//     return (
//         <div className={cn(
//             'pb-3 flex w-full items-center gap-1',
//             className,
//             isLoading && 'opacity-50 pointer-events-none',
//         )}>
//             <div className="flex items-center gap-1">
//                 {children}
//             </div>

//             <div className="ms-auto">

//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="outline">Columns</Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent className="w-56">
//                         <DropdownMenuLabel>Show/Hide Columns</DropdownMenuLabel>
//                         <DropdownMenuSeparator />

//                         {showColumns.map((column) => (
//                             <DropdownMenuCheckboxItem
//                                 key={column.id}
//                                 checked={column.show}
//                                 onCheckedChange={(checked) => handleShowColumn(checked, column) }
//                             >
//                                 {column.label}
//                             </DropdownMenuCheckboxItem>
//                         ))}

//                     </DropdownMenuContent>
//                 </DropdownMenu>


//             </div>
//         </div>
//     );
// };

// export default DataTableToolBar;
