// import { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
// import prisma from '../../../../../prisma';
// import { promisify } from 'util';

// // Configure Multer storage for avatars
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/avatars/'); // Avatar upload directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
//   },
// });

// const upload = multer({ storage: storage });
// const uploadMiddleware = promisify(upload.single('image'));

// // Create the POST handler for avatar upload
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Handle file upload using Multer
//     await uploadMiddleware(req, res);

//     const { filename } = req.file;
//     const { id } = req.query; // Get employee ID from the request

//     // Update the employee's avatar in the database
//     const updatedEmployee = await prisma.employee.update({
//       where: { id: parseInt(id as string, 10) },
//       data: { imagePath: `uploads/avatars/${filename}` },
//     });

//     return res.status(200).json({ success: true, data: updatedEmployee });
//   } catch (error) {
//     console.error('Error while uploading the avatar:', error);
//     return res.status(500).json({ error: 'Failed to upload avatar' });
//   }
// }
