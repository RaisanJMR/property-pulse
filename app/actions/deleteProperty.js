'use server'
import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function deleteProperty(propertyId) {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required')
    }
    const { userId } = sessionUser;
    console.log('***********************************')
    console.log(userId.toString());
    console.log('***********************************')

    const property = await Property.findById(propertyId)
    console.log(property.owner.toString());
    if (!property) {
        throw new Error('Property Not Found')
    }
    // VERIFY ownership
    if (property.owner.toString() !== userId.toString()) {
        throw new Error('Unaauthorized')
    }
    // Extract public id from image URLs
    const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split('/')
        return parts.at(-1).split('.').at(0);
    })
    // delete images from cloudinary
    if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('propertypulse/' + publicId)

        }
    }
    await property.deleteOne();
    revalidatePath('/', 'layout')
}

export default deleteProperty;
