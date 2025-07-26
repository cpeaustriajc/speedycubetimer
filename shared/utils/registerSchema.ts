import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 4096, height: 4096 };
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export default z
    .object({
        email: z.email(),
        name: z.string().min(1, 'Name is required'),
        avatar: z
            .file()
            .min(1)
            .max(1024 * 1024)
            .mime(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm Password must be at least 6 characters long'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords don't match",
        path: ['confirmPassword'],
    });
// .refine((data) => data.avatar.size <= MAX_FILE_SIZE, {
//     error: `Avatar must be less than ${MAX_FILE_SIZE / 1024} MB`,
//     path: ['avatar'],
// })
// .refine((data) => ACCEPTED_IMAGE_TYPES.includes(data.avatar.type), {
//     error: 'Avatar must be a JPEG, PNG, or WebP image',
//     path: ['avatar'],
// })
// .refine(
//     (data) =>
//         new Promise((resolve) => {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const img = new Image();
//                 img.onload = () => {
//                     const { width, height } = img;
//                     resolve(
//                         width >= MIN_DIMENSIONS.width &&
//                             height >= MIN_DIMENSIONS.height &&
//                             width <= MAX_DIMENSIONS.width &&
//                             height <= MAX_DIMENSIONS.height
//                     );
//                     img.src = e.target?.result as string;
//                 };
//             };
//             reader.readAsDataURL(data.avatar);
//         }),
//     { error: 'Avatar must be a valid image file', path: ['avatar'] }
// );
