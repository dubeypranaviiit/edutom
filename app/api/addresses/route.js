import Address from "@/modals/Address.modal";
import User from "@/modals/User.modal";
import dbConnect from "@/config/db";

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function getAppUser(clerkId) {
  if (!clerkId) return null;

  const user = await User.findOne({ clerkUserId: clerkId }); // returns a single document
  if (!user) {
    console.warn(`No user found with clerkId: ${clerkId}`);
  }
  return user;
}
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("userId");
    const appUser = await getAppUser(clerkId);
    if (!appUser) return jsonResponse({ message: "User not found." }, 404);

    const addresses = await Address.find({ user: appUser._id }).sort({ isDefault: -1, createdAt: -1 });
    return jsonResponse(addresses);
  } catch (error) {
    console.error("GET /addresses error:", error);
    return jsonResponse({ message: "Error fetching addresses." }, 500);
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId: clerkId, ...rest } = body;

    const appUser = await getAppUser(clerkId);
    console.log(appUser);
    if (!appUser) return jsonResponse({ message: "User not found." }, 404);

    if (rest.isDefault) {
      await Address.updateMany({ user: appUser._id }, { isDefault: false });
    }

    const newAddress = await Address.create({ ...rest, user: appUser._id });
      appUser.address.push(newAddress._id);
    await appUser.save();
    return jsonResponse(newAddress, 201);
  } catch (error) {
    console.error("POST /addresses error:", error);
    return jsonResponse({ message: error.message || "Failed to save address." }, 500);
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId: clerkId, _id, ...rest } = body;

    const appUser = await getAppUser(clerkId);
    if (!appUser || !_id) return jsonResponse({ message: "User or Address ID missing." }, 400);

    if (rest.isDefault) {
      await Address.updateMany({ user: appUser._id }, { isDefault: false });
    }

    const updated = await Address.findOneAndUpdate(
      { _id, user: appUser._id },
      rest,
      { new: true }
    );

    if (!updated) return jsonResponse({ message: "Address not found." }, 404);

    return jsonResponse(updated);
  } catch (error) {
    console.error("PUT /addresses error:", error);
    return jsonResponse({ message: error.message || "Failed to update address." }, 500);
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clerkId = searchParams.get("userId");

    const appUser = await getAppUser(clerkId);
    if (!appUser || !id) return jsonResponse({ message: "Missing info." }, 400);

    const deleted = await Address.findOneAndDelete({ _id: id, user: appUser._id });

    if (!deleted) return jsonResponse({ message: "Address not found." }, 404);

    return jsonResponse({ message: "Address deleted.", success: true });
  } catch (error) {
    console.error("DELETE /addresses error:", error);
    return jsonResponse({ message: "Failed to delete address." }, 500);
  }
}
