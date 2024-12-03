// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import useSessionStore from '@/store/useSessionStore';
// import { SessionWithUserInfo } from "@/types/session";
// import { checkPermission } from '@/lib/permissions';
// import { onUpdateSubmit } from '../submitHandler';
// import useStore from '@/store/useStore';
// import { toast } from 'sonner';
// import { mutate } from 'swr';

// import { SupplierEditSchema, EditFormData } from '../schema';
// import StatesPicker from '@/components/CountriesPicker/StatesPicker';
// import CountriesPicker from '@/components/CountriesPicker';
// import FormSheet from '@/components/FormSheet';
// import InputBox from '@/components/InputBox';
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// import { Button } from '@/components/ui/button';
// import { Pencil } from 'lucide-react';


// interface SupplierEditFormProps {
//     supplier: EditFormData; // Assuming you'll pass the supplier data to edit
//     id: number,
//     onClose: () => void
// }

// type ExtendedEditFormData = EditFormData & { actionBy?: string, userId?: string };

// const Edit: React.FC<SupplierEditFormProps> = ({ supplier, id, onClose }) => {


//     const [isOpen, setIsOpen] = useState(false);
//     const { session, loading } = useSessionStore();
//     const userId = (session as any)?.userInfo?.userId;
//     const userName = (session as any)?.user?.name;


//     const { watch, control, handleSubmit, formState: { errors } } = useForm<EditFormData>({
//         resolver: zodResolver(SupplierEditSchema),
//         defaultValues: {
//             ...supplier,
//             address2: supplier.address2 || '',
//             id,
//         }, // Pre-fill the form with supplier data
//     });

//     const handleOpenChange = (open: boolean) => {
//         setIsOpen(open);
//     };

//     const handleDropdownItemSelect = (event: Event) => {
//         event.preventDefault();
//         setIsOpen(true);
//     };

//     const cacheKey = useStore.getState().cacheKey;

//     const onSubmit = async (data: EditFormData) => {

//         // append supplierId int data object
//         const supplierId = supplier.supplierId;
//         data = { ...data, supplierId };


//         try {

//             const hasPermission = await checkPermission(userId, "admin.suppliers.update");

//             if (!hasPermission) {
//                 toast.error("You don't have permission to edit a supplier.");
//                 return;
//             }

//             const extendedData: ExtendedEditFormData = { ...data, actionBy: userName, userId: userId };

//             const response = await onUpdateSubmit(extendedData);

//             //console.log('response', response);

//             if (response) {
//                 toast.success("Supplier Successfully Updated.")
//                 await mutate(['/api/suppliers', cacheKey]);
//                 setIsOpen(false)
//                 onClose();
//             }
//             else {
//                 toast.error("Failed to update supplier.")
//                 //console.log("onUpdateSubmit : Supplier Fail to Update.")
//             }
//         }
//         catch (error) {
//             toast.error("Failed to update supplier.")
//             //console.log('updateSupplier: ', error)
//         }
//     };

//     return (
//         <FormSheet
//             triggerButton={
//                 <Button className="w-8 h-8 p-0" onSelect={() => handleDropdownItemSelect} variant="ghost">
//                     <Pencil size={18}/>
//                 </Button>
//             }
//             title="Edit Supplier"
//             submitButtonText="Save Changes"
//             onSubmit={handleSubmit(onSubmit)}
//             isOpen={isOpen}
//             onOpenChange={handleOpenChange}
//         >
//             <div className='flex gap-4'>
//                 <Controller
//                     name="name"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Company Name"
//                             required
//                             isError={!!errors.name}
//                             errorMessage={errors.name?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//             </div>

//             <div className='flex gap-4'>
//                 <Controller
//                     name="address1"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Address"
//                             required
//                             isError={!!errors.address1}
//                             errorMessage={errors.address1?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//                 <Controller
//                     name="address2"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Address 2"
//                             isError={!!errors.address2}
//                             errorMessage={errors.address2?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//             </div>

//             <div className='flex gap-4'>
//                 <Controller
//                     name="country"
//                     control={control}
//                     render={({ field }) => (
//                         <CountriesPicker
//                             {...field}
//                             label="Country"
//                             required
//                             isError={!!errors.country}
//                             errorMessage={errors.country?.message}
//                             value={field.value}
//                             onChange={(value: string) => {
//                                 //console.log(value);
//                                 field.onChange(value);
//                             }}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//                 <Controller
//                     name="state"
//                     control={control}
//                     render={({ field }) => (
//                         <StatesPicker
//                             {...field}
//                             label="State"
//                             value={field.value}
//                             required
//                             isError={!!errors.state}
//                             errorMessage={errors.state?.message}
//                             selectedCountry={watch('country')}
//                             onChange={(value: string) => {
//                                 //console.log(value);
//                                 field.onChange(value);
//                             }}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//             </div>


//             <div className='flex gap-4'>

//                 <Controller
//                     name="city"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="City"
//                             required
//                             isError={!!errors.city}
//                             errorMessage={errors.city?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />

//                 <Controller
//                     name="postcode"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Postcode"
//                             required
//                             isError={!!errors.postcode}
//                             errorMessage={errors.postcode?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />


//             </div>

//         </FormSheet>
//     );
// };

// export default Edit;
