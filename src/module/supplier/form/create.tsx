// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { Button } from "@/components/ui/button";
// import InputBox from '@/components/InputBox';
// import FormSheet from '@/components/FormSheet';

// import { CreateFormData, SupplierCreateSchema } from '../schema';
// import { onCreateSubmit } from '../submitHandler';
// import { toast } from 'sonner';
// import StatesPicker from '@/components/CountriesPicker/StatesPicker';
// import CountriesPicker from '@/components/CountriesPicker';
// import useStore from '@/store/useStore';
// import { mutate } from 'swr';
// import { checkPermission } from '@/lib/permissions';
// import useSessionStore from '@/store/useSessionStore';
// import { SessionWithUserInfo } from "@/types/session";
// import SelectBox from '@/components/SelectBox';


// const Create = ({ honorificOption } : any) => {

//     const [isOpen, setIsOpen] = useState(false);
//     const { session, loading } = useSessionStore();
//     const userId = (session as any)?.userInfo?.userId;
//     const userName = (session as any)?.user?.name;

//     const { watch, reset, control, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
//         resolver: zodResolver(SupplierCreateSchema),
//         defaultValues: {
//             name: '',
//             address1: '',
//             address2: '',
//             city: '',
//             state: '',
//             country: '',
//             postcode: '',
//             honorific: '',
//             contactName: '',
//             phone: '',
//             email: '',
//             designation: '',
//             department: '',
//         },
//         resetOptions: {
//             keepErrors: false,
//         }
//     });

//     const cacheKey = useStore.getState().cacheKey;

//     const onSubmit = async (data: CreateFormData) => {

//         try {
//             const hasPermission = await checkPermission(userId, "admin.suppliers.create");

//             if (!hasPermission) {
//                 toast.error("You don't have permission to create a supplier.");
//                 return;
//             }

//             // add actionBy to data
//             const submittedData = {
//                 ...data,
//                 actionBy: userName,
//                 userId: userId
//             }

//             const response = await onCreateSubmit(submittedData);
//             if (response) {
//                 toast.success("Supplier Successfully Created.")
//                 await mutate(['/api/suppliers', cacheKey]);
//                 setIsOpen(false)
//             }
//             else {
//                 toast.error("Supplier Fail to Create.")
//             }
//         }
//         catch (error) {
//             toast.error("Supplier Fail to Create.")
//         }
//     };

//     return (
//         <FormSheet
//             triggerButton={<Button>Create Supplier</Button>}
//             title="Create New Supplier"
//             submitButtonText="Create"
//             onSubmit={handleSubmit(onSubmit)}
//             isOpen={isOpen}
//             onOpenChange={setIsOpen}
//         >

//             <h2 className='text-md mt-2 font-semibold'>Company</h2>

//             <div className='flex gap-4'>
//                 <Controller
//                     name="name"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Name"
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
//                             value={field.value}
//                             required
//                             isError={!!errors.country}
//                             errorMessage={errors.country?.message}
//                             onChange={(value: string) => {
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

//             <hr />
//             <h2 className='text-md mt-2 font-semibold'>Primary Contact</h2>

//             <div className='flex gap-4'>
//                 <Controller
//                     name="honorific"
//                     control={control}
//                     render={({ field }) => (
//                         <SelectBox
//                             label="Title"
//                             required
//                             options={honorificOption}
//                             value={field.value || ''}
//                             onChange={field.onChange}
//                             placeholder="Select Title"
//                             isError={!!errors.honorific}
//                             errorMessage={errors.honorific?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//                 <Controller
//                     name="contactName"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Name"
//                             required
//                             isError={!!errors.contactName}
//                             errorMessage={errors.contactName?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//             </div>

//             <div className='flex gap-4'>
//                 <Controller
//                     name="phone"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Phone"
//                             required
//                             isError={!!errors.phone}
//                             errorMessage={errors.phone?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//                 <Controller
//                     name="email"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Email"
//                             required
//                             isError={!!errors.email}
//                             errorMessage={errors.email?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//             </div>

//             <div className='flex gap-4'>
//                 <Controller
//                     name="designation"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Designation"
//                             required
//                             isError={!!errors.designation}
//                             errorMessage={errors.designation?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//                 <Controller
//                     name="department"
//                     control={control}
//                     render={({ field }) => (
//                         <InputBox
//                             {...field}
//                             label="Department"
//                             required
//                             isError={!!errors.department}
//                             errorMessage={errors.department?.message}
//                             variant="ghost"
//                         />
//                     )}
//                 />
//             </div>

//             {/* <div className="mt-4">
// 				<p>Form State:</p>
// 				<pre className="bg-gray-100 p-2 rounded-md overflow-auto max-h-40 text-sm">
// 					{JSON.stringify(watch(), null, 2)}
// 				</pre>
// 			</div> */}

//         </FormSheet>
//     );
// };

// export default Create;

