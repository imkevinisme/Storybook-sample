// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'sonner';

// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import { SupplierDeleteSchema, DeleteFormData } from '../schema';
// import FormDialog from '@/components/FormDialog';
// import SupplierService from '@/module/Suppliers/service';
// import useStore from '@/store/useStore';
// import { mutate } from 'swr';
// import { checkPermission } from '@/lib/permissions';
// import ActivityService from '@/module/Activities/service';
// import useSessionStore from '@/store/useSessionStore';
// import { SessionWithUserInfo } from '@/types/session';
// import { Button } from '@/components/ui/button';
// import { Trash } from 'lucide-react';


// interface SupplierDeleteFormProps {
//     supplier: DeleteFormData;
//     id: number; // Assuming you'll pass the supplier data to edit
//     onClose: () => void;
// }


// const Delete: React.FC<SupplierDeleteFormProps> = ({ supplier, id, onClose }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const { session, loading } = useSessionStore();
//     const userId = (session as any)?.userInfo?.userId;
//     const userName = (session as any)?.user?.name;


//     const { watch, control, handleSubmit, formState: { errors } } = useForm<DeleteFormData>({
//         resolver: zodResolver(SupplierDeleteSchema),
//         defaultValues: {
//             ...supplier,
//             id: id,
//         }, // Pre-fill the form with supplier data
//     });

//     const cacheKey = useStore.getState().cacheKey;

//     const onSubmit = async (data: DeleteFormData) => {

//         try {
//             const hasPermission = await checkPermission(userId, "admin.suppliers.delete");

//             if (!hasPermission) {
//                 toast.error("You don't have permission to delete a supplier.");
//                 return;
//             }

//             await SupplierService.deleteSupplier(supplier.supplierId);

//             // create activity
//             const activityPayload = {
//                 supplierId: supplier.supplierId,
//                 action: "DELETE",
//                 description: "Supplier",
//                 request: JSON.stringify(supplier),
//                 actionBy: userName,
//                 userId: userId
//             };
//             toast.success("Supplier Successfully Deleted.")


//             await ActivityService.createActivity(activityPayload);

//             await mutate(['/api/suppliers', cacheKey]);
//             setIsOpen(false)
//             onClose();

//         } catch (error) {
//             console.error("Error deleting supplier:", error);
//             toast.error("Supplier Fail to Delete.")
//         }
//     };

//     const handleOpenChange = (open: boolean) => {
//         setIsOpen(open);
//     };

//     const handleDropdownItemSelect = (event: Event) => {
//         event.preventDefault();
//         setIsOpen(true);
//     };

//     return (
//         <FormDialog
//             triggerButton={
//                 <Button className="w-8 h-8 p-0" onSelect={() => handleDropdownItemSelect} variant="ghost">
//                     <Trash size={18} color='#FD0031'/>
//                 </Button>
//             }
//             title="Delete Supplier"
//             buttonVariant="destructive"
//             submitButtonText="Delete"
//             onSubmit={handleSubmit(onSubmit)}
//             isOpen={isOpen}
//             onOpenChange={handleOpenChange}
//         >
//             <div>
//                 <h1>Are you sure you want to delete this supplier? This action cannot be undone.</h1>
//             </div>

//         </FormDialog>
//     );
// };

// export default Delete;
