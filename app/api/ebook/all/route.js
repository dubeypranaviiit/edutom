import { NextResponse } from 'next/server';
import Ebook from '@/modals/EBook.modal'; // Your updated eBook model
import dbConnect from '@/config/db';
import { uploadToCloudinary } from '@/config/cloudinary';

