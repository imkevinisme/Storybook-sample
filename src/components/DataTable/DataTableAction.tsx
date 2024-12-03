// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';

// import { IoIosMore } from 'react-icons/io';
// import Edit from './Form/Edit';
// import Delete from './Form/Delete';
// import { hasPermission } from '@/lib/authUtils';
// import { SessionWithUserInfo } from '@/types/session';
// import LoadingSpinner from '@/components/Spinner';
// import useSessionStore from '@/store/useSessionStore';
// import { Eye, Folder } from 'lucide-react';


// interface WithId<T> {
//     id: string;
// }

// interface DataTableRowActionsProps<TData> {
//     row: any;
//     id: number,
// }

// export function DataTableActions<TData extends WithId<string>>({
//     row,
//     id,
// }: DataTableRowActionsProps<TData>) {
    
//     const router = useRouter();
//     const [ isOpen, setIsOpen ] = useState(false);
//     const { session, loading } = useSessionStore();
//     const supplier = row.original;

//     const handleClose = () => {
//         setIsOpen(false); // Function to close the DropdownMenu
//     };


//     if (loading) {
//         return (
//             <div className="flex justify-end w-full">
//                 <LoadingSpinner className="w-4 h-4" />
//             </div>
//         );
//     }

//     return (
//         <div className="flex justify-end w-full">
//             <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//                     {
//                         hasPermission(session as SessionWithUserInfo, 'admin.suppliers.access')
//                         &&
//                         <Button variant="ghost" className="w-8 h-8 p-0" onClick={() => router.push(`/app/suppliers/${supplier.supplierId}/details`)}>
//                             <Folder size={18} />
//                         </Button>
//                     }
//                     {
//                         hasPermission(session as SessionWithUserInfo, 'admin.suppliers.update')
//                         &&
//                         <Edit supplier={supplier as any} id={id} onClose={handleClose} />
//                     }
//                     {
//                         hasPermission(session as SessionWithUserInfo, 'admin.suppliers.delete')
//                         &&
//                         <Delete supplier={supplier as any} id={id} onClose={handleClose} />
//                     }

//                 {/* <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="w-8 h-8 p-0">
//                         <span className="sr-only">Open menu</span>
//                         <IoIosMore size={18} />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     {
//                         hasPermission(session as SessionWithUserInfo, 'admin.suppliers.access')
//                         &&
//                         <Link href={`/app/suppliers/${supplier.supplierId}/details`}>
//                             <DropdownMenuItem>View</DropdownMenuItem>
//                         </Link>
//                     }
//                     {
//                         hasPermission(session as SessionWithUserInfo, 'admin.suppliers.update')
//                         &&
//                         <Edit supplier={supplier as any} id={id} onClose={handleClose} />
//                     }
//                     {
//                         hasPermission(session as SessionWithUserInfo, 'admin.suppliers.delete')
//                         &&
//                         <Delete supplier={supplier as any} id={id} onClose={handleClose} />
//                     }
//                 </DropdownMenuContent> */}
//             </DropdownMenu>
//         </div>
//     )
// }
