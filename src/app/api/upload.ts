// import { NextApiRequest, NextApiResponse } from 'next';
// import { upload } from '../../lib/multerMiddleware';
// import prisma from '../../prisma';
// import nextConnect from 'next-connect';

// // Create a handler using next-connect to use middleware in Next.js API routes
// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Something went wrong: ${error.message}` });
//   },
// });

// apiRoute.use(upload.single('image'));

// apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { originalname, filename } = req.file;
//     const { id } = req.body;

//     // Assuming you want to store the file path in the employee table
//     const updatedEmployee = await prisma.employee.update({
//       where: { id: parseInt(id) },
//       data: { imagePath: `uploads/${filename}` },
//     });

//     // Return the updated employee details
//     return res.status(200).json({ success: true, data: updatedEmployee });
//   } catch (error) {
//     console.error('Error while uploading the image:', error);
//     return res.status(500).json({ error: 'Failed to upload image' });
//   }
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // This is required for file uploads
//   },
// };
